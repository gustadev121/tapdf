import { IconFileText, IconTrash } from "@tabler/icons-react";
import { IconButton } from "@/components/ui/icon-button";
import type { RecentFile } from "@/services/recent-files";

interface RecentFileCardProps {
  file: RecentFile;
  onOpen: (path: string) => void;
  onRemove: (path: string) => void;
}

export function RecentFileCard({ file, onOpen, onRemove }: RecentFileCardProps) {
  const date = new Date(file.openedAt).toLocaleDateString();

  return (
    <button
      type="button"
      className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50 cursor-pointer text-left"
      onClick={() => onOpen(file.path)}
    >
      <div className="flex items-center justify-center h-24 rounded-md bg-muted">
        <IconFileText size={32} className="text-muted-foreground" />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <IconButton
          tooltip="Remove from recents"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(file.path);
          }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <IconTrash size={14} />
        </IconButton>
      </div>
    </button>
  );
}
