use std::process::Command;
use std::path::PathBuf;
use crate::error::LauncherError;
use crate::auth::UserProfile;

pub struct LaunchOptions {
    pub game_dir: PathBuf,
    pub java_path: PathBuf,
    pub min_ram_mb: u32,
    pub max_ram_mb: u32,
    pub version: String,
    pub user_profile: UserProfile,
    pub jvm_args: Vec<String>,
}

pub fn launch_game(opts: LaunchOptions) -> Result<(), LauncherError> {
    let mut cmd = Command::new(&opts.java_path);

    // RAM Constraints
    cmd.arg(format!("-Xms{}M", opts.min_ram_mb));
    cmd.arg(format!("-Xmx{}M", opts.max_ram_mb));

    // Custom JVM Args
    for arg in opts.jvm_args {
        cmd.arg(arg);
    }

    // Main Class & Minecraft Params
    cmd.arg("net.minecraft.client.main.Main");
    cmd.arg("--username").arg(&opts.user_profile.username);
    cmd.arg("--version").arg(&opts.version);
    cmd.arg("--gameDir").arg(&opts.game_dir);
    cmd.arg("--assetsDir").arg(opts.game_dir.join("assets"));
    cmd.arg("--assetIndex").arg(&opts.version);
    cmd.arg("--uuid").arg(&opts.user_profile.uuid);
    cmd.arg("--accessToken").arg(opts.user_profile.access_token.unwrap_or_else(|| "0".to_string()));
    cmd.arg("--userType").arg("legacy");

    cmd.spawn().map_err(|e| LauncherError {
        title: "Launch Execution Failed".to_string(),
        message: e.to_string(),
        details: Some("Failed to spawn Java process for Minecraft Execution.".to_string()),
    })?;

    Ok(())
}
