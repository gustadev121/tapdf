import { useScroll } from "@embedpdf/plugin-scroll/react";
import { ThumbImg, ThumbnailsPane, useThumbnailCapability } from "@embedpdf/plugin-thumbnail/react";
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

interface ThumbnailSidebarProps {
  documentId: string;
}

export function ThumbnailSidebar({ documentId }: ThumbnailSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { provides: scroll } = useScroll(documentId);
  useThumbnailCapability();

  const handleThumbnailClick = (pageIndex: number) => {
    scroll?.scrollToPage({ pageNumber: pageIndex + 1 });
  };

  return (
    <div className="flex h-full">
      <div
        className={cn(
          "flex h-full overflow-hidden border-r border-border transition-all duration-200",
          isOpen ? "w-45" : "w-0",
        )}
      >
        {isOpen && (
          <div className="relative h-full w-full overflow-hidden">
            <ThumbnailsPane documentId={documentId}>
              {(m) => (
                <button
                  key={m.pageIndex}
                  type="button"
                  className="absolute inset-x-0 cursor-pointer bg-transparent border-0 px-2"
                  style={{ top: m.top, height: m.wrapperHeight }}
                  onClick={() => handleThumbnailClick(m.pageIndex)}
                >
                  <div
                    className="mx-auto overflow-hidden rounded border border-border"
                    style={{ width: m.width, height: m.height }}
                  >
                    <ThumbImg documentId={documentId} meta={m} />
                  </div>
                  <span className="mt-1 block text-center text-xs text-muted-foreground">
                    {m.pageIndex + 1}
                  </span>
                </button>
              )}
            </ThumbnailsPane>
          </div>
        )}
      </div>
      <IconButton
        tooltip={isOpen ? "Close thumbnails" : "Open thumbnails"}
        onClick={() => setIsOpen(!isOpen)}
        className="size-8 shrink-0"
      >
        {isOpen ? (
          <IconLayoutSidebarLeftCollapse size={16} />
        ) : (
          <IconLayoutSidebarLeftExpand size={16} />
        )}
      </IconButton>
    </div>
  );
}
