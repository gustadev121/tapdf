import { usePdfiumEngine } from "@embedpdf/engines/react";
import { wasmUrl } from "@/engine/wasm-url";

export function useEngine() {
  const { engine, isLoading, error } = usePdfiumEngine({
    wasmUrl,
    worker: false,
  });
  return { engine, isLoading, error };
}
