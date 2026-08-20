import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { openFile } from "@/services/file-service";
import { useAppStore } from "@/stores/app-store";
import { DropZone } from "@/views/home/DropZone";
import { RecentFileCard } from "@/views/home/RecentFileCard";

export function HomeView() {
  const openFileStore = useAppStore((s) => s.openFile);
  const recentFiles = useAppStore((s) => s.recentFiles);
  const loadRecentFiles = useAppStore((s) => s.loadRecentFiles);
  const removeRecentFile = useAppStore((s) => s.removeRecentFile);

  useEffect(() => {
    loadRecentFiles();
  }, [loadRecentFiles]);

  const handleOpen = useCallback(async () => {
    const result = await openFile();
    if (result) {
      openFileStore(result.buffer, result.name, result.path);
    }
  }, [openFileStore]);

  const handleDrop = useCallback(
    (buffer: ArrayBuffer, name: string, path: string) => {
      openFileStore(buffer, name, path);
    },
    [openFileStore],
  );

  const handleOpenRecent = useCallback(
    async (path: string) => {
      const { readFile } = await import("@tauri-apps/plugin-fs");
      const bytes = await readFile(path);
      const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
      const name = path.split(/[/\\]/).pop() || "document.pdf";
      openFileStore(buffer, name, path);
    },
    [openFileStore],
  );

  return (
    <main className="flex h-screen w-screen flex-col bg-background text-foreground">
      <div className="flex flex-1 flex-col gap-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">tapdf</h1>
            <p className="text-sm text-muted-foreground">Open a PDF to begin</p>
          </div>
          <Button size="lg" onClick={handleOpen}>
            Open PDF
          </Button>
        </div>

        {recentFiles.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Recent Files</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {recentFiles.map((file) => (
                <RecentFileCard
                  key={file.path}
                  file={file}
                  onOpen={handleOpenRecent}
                  onRemove={removeRecentFile}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex-1">
          <DropZone onFileDropped={handleDrop} />
        </div>
      </div>
    </main>
  );
}
