import { useCallback } from "react";

import { Button } from "@/components/ui/button";
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
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight">tapdf</h1>
        <p className="text-sm text-muted-foreground">Open a PDF to begin</p>
        <Button size="lg" onClick={handleOpen}>
          Open PDF
        </Button>
      </div>
    </main>
  );
}
