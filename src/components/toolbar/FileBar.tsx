import { IconArrowLeft } from "@tabler/icons-react";

import { FileLabel } from "@/components/ui/file-label";
import { IconButton } from "@/components/ui/icon-button";
import { useAppStore } from "@/stores/app-store";

export function FileBar() {
  const activeDocumentId = useAppStore((s) => s.activeDocumentId);
  const documents = useAppStore((s) => s.documents);
  const closeFile = useAppStore((s) => s.closeFile);

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  return (
    <div className="flex items-center gap-3 border-b border-border bg-background px-4 py-2">
      <IconButton
        tooltip="Back to home"
        onClick={() => activeDocumentId && closeFile(activeDocumentId)}
      >
        <IconArrowLeft size={18} />
      </IconButton>
      <FileLabel name={activeDoc?.name ?? ""} />
    </div>
  );
}
