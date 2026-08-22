use tauri::AppHandle;
use tauri_plugin_fs::FsExt;

#[tauri::command]
pub fn allow_fs_path(app: AppHandle, path: String) -> Result<(), String> {
    app.fs_scope().allow_file(path).map_err(|e| e.to_string())
}
