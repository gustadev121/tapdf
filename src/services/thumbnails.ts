import { createPdfiumDirectEngine } from "@embedpdf/engines";
import type { PdfEngine } from "@embedpdf/models";
import { wasmUrl } from "@/engine/wasm-url";

const thumbnailCache = new Map<string, string>();

let enginePromise: Promise<PdfEngine<Blob>> | null = null;

async function getEngine(): Promise<PdfEngine<Blob>> {
  if (!enginePromise) {
    enginePromise = createPdfiumDirectEngine(wasmUrl);
  }
  return enginePromise;
}

export async function getThumbnail(path: string, buffer: ArrayBuffer): Promise<string | null> {
  const cached = thumbnailCache.get(path);
  if (cached) return cached;

  try {
    const engine = await getEngine();
    const doc = await engine
      .openDocumentBuffer({
        id: path,
        content: buffer,
      })
      .toPromise();

    const firstPage = doc.pages[0];
    const blob = await engine
      .renderThumbnail(doc, firstPage, {
        scaleFactor: 0.25,
      })
      .toPromise();

    const dataUrl = await blobToDataUrl(blob);

    thumbnailCache.set(path, dataUrl);
    await engine.closeDocument(doc).toPromise();

    return dataUrl;
  } catch (err) {
    console.error("Failed to generate thumbnail:", err);
    return null;
  }
}

export function getCachedThumbnail(path: string): string | null {
  return thumbnailCache.get(path) ?? null;
}

export function clearThumbnailCache(): void {
  thumbnailCache.clear();
}

async function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
