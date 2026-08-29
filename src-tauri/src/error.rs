use serde::Serialize;
use std::fmt;

#[derive(Debug, Serialize)]
pub struct LauncherError {
    pub title: String,
    pub message: String,
    pub details: Option<String>,
}

impl fmt::Display for LauncherError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}: {}", self.title, self.message)
    }
}

impl std::error::Error for LauncherError {}

impl From<std::io::Error> for LauncherError {
    fn from(err: std::io::Error) -> Self {
        LauncherError {
            title: "File I/O Error".to_string(),
            message: err.to_string(),
            details: None,
        }
    }
}

impl From<reqwest::Error> for LauncherError {
    fn from(err: reqwest::Error) -> Self {
        LauncherError {
            title: "Network Error".to_string(),
            message: err.to_string(),
            details: None,
        }
    }
}
