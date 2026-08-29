pub mod error;
pub mod minecraft;
pub mod downloads;
pub mod assets;
pub mod auth;
pub mod instances;
pub mod mods;
pub mod utils;

use tauri::Emitter;
use crate::minecraft::version_manifest::{fetch_version_manifest, VersionManifest};
use crate::assets::custom_totem::{generate_custom_totem, TotemStyle};
use crate::error::LauncherError;
use crate::auth::UserProfile;
use std::path::PathBuf;

#[tauri::command]
async fn get_versions() -> Result<VersionManifest, LauncherError> {
    fetch_version_manifest().await
}

#[tauri::command]
async fn create_totem(
    skin_path: String,
    output_path: String,
    is_3d: bool,
) -> Result<(), LauncherError> {
    let style = if is_3d {
        TotemStyle::Style3DSitting
    } else {
        TotemStyle::Style2DClassic
    };
    generate_custom_totem(
        std::path::Path::new(&skin_path),
        std::path::Path::new(&output_path),
        style,
    )
}

#[tauri::command]
fn create_offline_account(username: String) -> UserProfile {
    UserProfile::create_offline(&username)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_versions,
            create_totem,
            create_offline_account
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
