import { IconX } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

interface DocumentTab {
  id: string;
  name: string;
}

interface DocumentTabsProps {
  documents: DocumentTab[];
  activeDocumentId: string;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export function DocumentTabs({
  documents,
  activeDocumentId,
  onSelect,
  onClose,
}: DocumentTabsProps) {
  if (documents.length <= 1) return null;

  return (
    <div className="flex items-center gap-1 border-b border-border bg-background px-2 py-1 overflow-x-auto">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors cursor-pointer",
            doc.id === activeDocumentId
              ? "bg-accent text-accent-foreground"
              : "hover:bg-muted text-muted-foreground",
          )}
          onClick={() => onSelect(doc.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(doc.id);
            }
          }}
          role="tab"
          tabIndex={0}
          aria-selected={doc.id === activeDocumentId}
        >
          <span className="truncate max-w-30">{doc.name}</span>
          <IconButton
            tooltip={`Close ${doc.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onClose(doc.id);
            }}
            className="size-4 p-0 hover:bg-muted-foreground/20"
          >
            <IconX size={12} />
          </IconButton>
        </div>
      ))}
    </div>
  );
}
