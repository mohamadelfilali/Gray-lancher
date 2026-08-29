pub mod profile;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum AuthType {
    Offline,
    MicrosoftOAuth,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserProfile {
    pub uuid: String,
    pub username: String,
    pub access_token: Option<String>,
    pub auth_type: AuthType,
    pub skin_url: Option<String>,
    pub cape_url: Option<String>,
}

impl UserProfile {
    pub fn create_offline(username: &str) -> Self {
        let uuid = format!("{:x}", sha1::Sha1::digest(username.as_bytes()));
        UserProfile {
            uuid,
            username: username.to_string(),
            access_token: None,
            auth_type: AuthType::Offline,
            skin_url: None,
            cape_url: None,
        }
    }
}
