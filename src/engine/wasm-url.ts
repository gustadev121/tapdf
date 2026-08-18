// Self-hosted PDFium WASM asset. Vite emits the file and returns its URL,
// so the engine works fully offline inside the Tauri webview (no CDN).
// The package's exports map explicitly exposes "./pdfium.wasm" as a subpath.
import wasmUrl from "@embedpdf/pdfium/pdfium.wasm?url";

export { wasmUrl };
