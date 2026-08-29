use image::{GenericImageView, ImageBuffer, Rgba, DynamicImage};
use std::path::Path;
use crate::error::LauncherError;

pub enum TotemStyle {
    Style3DSitting,
    Style2DClassic,
}

pub fn generate_custom_totem(
    skin_path: &Path,
    output_path: &Path,
    style: TotemStyle,
) -> Result<(), LauncherError> {
    let skin_img = image::open(skin_path).map_err(|e| LauncherError {
        title: "Invalid Skin File".to_string(),
        message: e.to_string(),
        details: None,
    })?;

    let (width, height) = skin_img.dimensions();
    if width != 64 || (height != 64 && height != 32) {
        return Err(LauncherError {
            title: "Skin Dimension Mismatch".to_string(),
            message: "Minecraft Skins must be 64x64 or 64x32 PNG format.".to_string(),
            details: None,
        });
    }

    let mut totem_canvas = ImageBuffer::from_pixel(16, 16, Rgba([0, 0, 0, 0]));

    match style {
        TotemStyle::Style2DClassic => {
            // Extract Face from Skin (X: 8..16, Y: 8..16)
            for x in 0..8 {
                for y in 0..8 {
                    let pixel = skin_img.get_pixel(8 + x, 8 + y);
                    totem_canvas.put_pixel(4 + x, 4 + y, pixel);
                }
            }
        }
        TotemStyle::Style3DSitting => {
            // Extract Face + Body Overlay mockup mapping
            for x in 0..8 {
                for y in 0..8 {
                    let pixel = skin_img.get_pixel(8 + x, 8 + y);
                    totem_canvas.put_pixel(4 + x, 2 + y, pixel);
                }
            }
            // Base Totem outline mapping
            for x in 2..14 {
                for y in 10..15 {
                    totem_canvas.put_pixel(x, y, Rgba([225, 175, 45, 255]));
                }
            }
        }
    }

    totem_canvas.save(output_path).map_err(|e| LauncherError {
        title: "Totem Export Failed".to_string(),
        message: e.to_string(),
        details: None,
    })?;

    Ok(())
}
