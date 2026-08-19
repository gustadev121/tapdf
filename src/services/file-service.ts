import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";

export interface OpenFileResult {
  buffer: ArrayBuffer;
  name: string;
  path: string;
}

export async function openFile(): Promise<OpenFileResult | null> {
  try {
    const selected = await open({
      multiple: false,
      directory: false,
      filters: [{ name: "PDF", extensions: ["pdf"] }],
    });

    if (!selected) return null;

    const filePath = typeof selected === "string" ? selected : selected;
    const bytes = await readFile(filePath);
    const name = filePath.split(/[/\\]/).pop() || "document.pdf";

    return {
      buffer: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
      name,
      path: filePath,
    };
  } catch (err) {
    console.error("Failed to open file:", err);
    return null;
  }
}
