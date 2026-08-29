pub mod auth;

use auth::generate_offline_uuid;

#[tauri::command]
fn launch_game(username: String) -> Result<String, String> {
    let uuid = generate_offline_uuid(&username);
    Ok(format!("Starting Minecraft for user: {} (UUID: {})", username, uuid))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_game])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
