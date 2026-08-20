import { useDocumentManagerCapability } from "@embedpdf/plugin-document-manager/react";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/stores/app-store";

interface OpenFileBridgeProps {
  onOpened: (id: string) => void;
}

export function OpenFileBridge({ onOpened }: OpenFileBridgeProps) {
  const { provides: docManager } = useDocumentManagerCapability();
  const activeDocumentId = useAppStore((s) => s.activeDocumentId);
  const documents = useAppStore((s) => s.documents);
  const called = useRef(false);

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  useEffect(() => {
    if (!docManager || !activeDoc || called.current) return;
    called.current = true;

    const task = docManager.openDocumentBuffer({
      buffer: activeDoc.buffer,
      name: activeDoc.name,
    });

    task.wait(
      (result) => {
        onOpened(result.documentId);
      },
      (err) => {
        console.error("Failed to open document:", err);
        called.current = false;
      },
    );
  }, [docManager, activeDoc, onOpened]);

  return null;
}
