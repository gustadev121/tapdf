import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileDropped: (buffer: ArrayBuffer, name: string, path: string) => void;
}

export function DropZone({ onFileDropped }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const pdfFile = files.find((f) => f.name.endsWith(".pdf"));

      if (!pdfFile) return;

      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        const path = pdfFile.name;
        onFileDropped(buffer, pdfFile.name, path);
      };
      reader.readAsArrayBuffer(pdfFile);
    },
    [onFileDropped],
  );

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label="Drop PDF files here"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed p-8 transition-colors",
        isDragOver
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-muted-foreground/50",
      )}
    >
      <Upload
        size={48}
        className={cn("transition-colors", isDragOver ? "text-primary" : "text-muted-foreground")}
      />
      <div className="text-center">
        <p className="text-sm font-medium">Drop a PDF here</p>
        <p className="text-xs text-muted-foreground">or use the button above to open a file</p>
      </div>
    </section>
  );
}
