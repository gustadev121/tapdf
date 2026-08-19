import { useCallback } from "react";

import { openFile } from "@/services/file-service";
import { useAppStore } from "@/stores/app-store";

export function HomeView() {
  const openFileStore = useAppStore((s) => s.openFile);

  const handleOpen = useCallback(async () => {
    const result = await openFile();
    if (result) {
      openFileStore(result.buffer, result.name, result.path);
    }
  }, [openFileStore]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">tapdf</h1>
        <p className="text-sm text-neutral-500">Open a PDF to begin</p>
        <button
          type="button"
          onClick={handleOpen}
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800"
        >
          Open PDF
        </button>
      </div>
    </main>
  );
}
