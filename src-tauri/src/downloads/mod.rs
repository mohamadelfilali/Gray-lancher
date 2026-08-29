use serde::Serialize;
use std::path::Path;
use tokio::fs::File;
use tokio::io::AsyncWriteExt;
use futures_util::StreamExt;
use sha1::{Sha1, Digest};
use crate::error::LauncherError;

#[derive(Debug, Clone, Serialize)]
pub struct DownloadProgress {
    pub task_name: String,
    pub downloaded_bytes: u64,
    pub total_bytes: u64,
    pub percentage: f64,
    pub speed_mbps: f64,
}

pub async fn download_file_with_hash<F>(
    url: &str,
    target_path: &Path,
    expected_sha1: Option<&str>,
    progress_callback: F,
) -> Result<(), LauncherError>
where
    F: Fn(DownloadProgress),
{
    if let Some(parent) = target_path.parent() {
        tokio::fs::create_dir_all(parent).await?;
    }

    // Check Integrity using SHA-1 Cache
    if target_path.exists() {
        if let Some(expected_hash) = expected_sha1 {
            if verify_hash(target_path, expected_hash).await {
                return Ok(());
            }
        }
    }

    let client = reqwest::Client::new();
    let res = client.get(url).send().await?;
    let total_size = res.content_length().unwrap_or(0);

    let mut file = File::create(target_path).await?;
    let mut stream = res.bytes_stream();
    let mut downloaded: u64 = 0;
    let start_time = std::time::Instant::now();

    while let Some(chunk_result) = stream.next().await {
        let chunk = chunk_result?;
        file.write_all(&chunk).await?;
        downloaded += chunk.len() as u64;

        let elapsed = start_time.elapsed().as_secs_f64();
        let speed = if elapsed > 0.0 {
            (downloaded as f64 / 1024.0 / 1024.0) / elapsed
        } else {
            0.0
        };

        let percentage = if total_size > 0 {
            (downloaded as f64 / total_size as f64) * 100.0
        } else {
            0.0
        };

        progress_callback(DownloadProgress {
            task_name: target_path.file_name().unwrap_or_default().to_string_lossy().to_string(),
            downloaded_bytes: downloaded,
            total_bytes: total_size,
            percentage,
            speed_mbps: speed,
        });
    }

    if let Some(expected_hash) = expected_sha1 {
        if !verify_hash(target_path, expected_hash).await {
            return Err(LauncherError {
                title: "Hash Mismatch".to_string(),
                message: format!("Downloaded file integrity check failed for {}", target_path.display()),
                details: None,
            });
        }
    }

    Ok(())
}

async fn verify_hash(path: &Path, expected_hash: &str) -> bool {
    if let Ok(mut file) = File::open(path).await {
        let mut hasher = Sha1::new();
        let mut buffer = [0u8; 8192];
        use tokio::io::AsyncReadExt;
        
        while let Ok(count) = file.read(&mut buffer).await {
            if count == 0 { break; }
            hasher.update(&buffer[..count]);
        }
        let result = hasher.finalize();
        let hex_hash = hex::encode(result);
        return hex_hash.eq_ignore_ascii_case(expected_hash);
    }
    false
}
