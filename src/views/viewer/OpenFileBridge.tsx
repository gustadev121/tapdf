import { useDocumentManagerCapability } from "@embedpdf/plugin-document-manager/react";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/stores/app-store";

interface OpenFileBridgeProps {
  onOpened: (id: string) => void;
}

export function OpenFileBridge({ onOpened }: OpenFileBridgeProps) {
  const { provides: docManager } = useDocumentManagerCapability();
  const activeBuffer = useAppStore((s) => s.activeBuffer);
  const activeName = useAppStore((s) => s.activeName);
  const called = useRef(false);

  useEffect(() => {
    if (!docManager || !activeBuffer || called.current) return;
    called.current = true;

    const task = docManager.openDocumentBuffer({
      buffer: activeBuffer,
      name: activeName,
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
  }, [docManager, activeBuffer, activeName, onOpened]);

  return null;
}
