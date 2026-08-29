use serde::{Deserialize, Serialize};
use crate::error::LauncherError;

const MANIFEST_URL: &str = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VersionItem {
    pub id: String,
    pub r#type: String,
    pub url: String,
    pub time: String,
    pub releaseTime: String,
    pub sha1: String,
    pub complianceLevel: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LatestVersions {
    pub release: String,
    pub snapshot: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VersionManifest {
    pub latest: LatestVersions,
    pub versions: Vec<VersionItem>,
}

pub async fn fetch_version_manifest() -> Result<VersionManifest, LauncherError> {
    let client = reqwest::Client::new();
    let response = client
        .get(MANIFEST_URL)
        .header("User-Agent", "CoreLauncher/1.0.0")
        .send()
        .await?;

    if !response.status().is_success() {
        return Err(LauncherError {
            title: "Manifest Fetch Error".to_string(),
            message: format!("Server responded with status: {}", response.status()),
            details: None,
        });
    }

    let manifest: VersionManifest = response.json().await?;
    Ok(manifest)
}
