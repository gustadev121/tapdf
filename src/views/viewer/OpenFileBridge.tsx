import { useDocumentManagerCapability } from "@embedpdf/plugin-document-manager/react";
import { useEffect, useRef } from "react";

interface OpenFileBridgeProps {
  buffer: ArrayBuffer;
  name: string;
  onOpened: (id: string) => void;
}

export function OpenFileBridge({ buffer, name, onOpened }: OpenFileBridgeProps) {
  const { provides: docManager } = useDocumentManagerCapability();
  const called = useRef(false);

  useEffect(() => {
    if (!docManager || !buffer || called.current) return;
    called.current = true;

    const task = docManager.openDocumentBuffer({
      buffer,
      name,
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
  }, [docManager, buffer, name, onOpened]);

  return null;
}
