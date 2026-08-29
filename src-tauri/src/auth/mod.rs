use sha1::{Digest, Sha1};

pub fn generate_offline_uuid(username: &str) -> String {
    let mut hasher = Sha1::new();
    hasher.update(format!("OfflinePlayer:{}", username).as_bytes());
    let result = hasher.finalize();
    format!("{:x}", result)
}
