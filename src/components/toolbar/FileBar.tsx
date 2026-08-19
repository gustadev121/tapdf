import { ArrowLeft } from "lucide-react";

import { FileLabel } from "@/components/ui/file-label";
import { IconButton } from "@/components/ui/icon-button";
import { useAppStore } from "@/stores/app-store";

export function FileBar() {
  const activeName = useAppStore((s) => s.activeName);
  const closeFile = useAppStore((s) => s.closeFile);

  return (
    <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-2">
      <IconButton tooltip="Back to home" onClick={closeFile}>
        <ArrowLeft size={18} />
      </IconButton>
      <FileLabel name={activeName} />
    </div>
  );
}
