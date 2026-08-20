import { IconFileText, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { RecentFile } from "@/services/recent-files";

interface RecentFileCardProps {
  file: RecentFile;
  onOpen: (path: string) => void;
  onRemove: (path: string) => void;
}

export function RecentFileCard({ file, onOpen, onRemove }: RecentFileCardProps) {
  const date = new Date(file.openedAt).toLocaleDateString();

  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent/50">
      <button
        type="button"
        className="flex flex-1 flex-col gap-2 cursor-pointer text-left"
        onClick={() => onOpen(file.path)}
      >
        <div className="flex items-center justify-center h-24 rounded-md bg-muted">
          <IconFileText size={32} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </button>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Remove from recents"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.path);
              }}
            >
              <IconTrash size={14} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove from recents</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
