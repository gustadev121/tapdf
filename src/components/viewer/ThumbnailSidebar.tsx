import { useScroll } from "@embedpdf/plugin-scroll/react";
import { ThumbImg, ThumbnailsPane, useThumbnailCapability } from "@embedpdf/plugin-thumbnail/react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
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
                  style={{
                    position: "absolute",
                    top: m.top,
                    height: m.wrapperHeight,
                    width: "100%",
                  }}
                  className="cursor-pointer px-2 bg-transparent border-0"
                  onClick={() => scroll?.scrollToPage({ pageNumber: m.pageIndex + 1 })}
                >
                  <div
                    style={{ width: m.width, height: m.height }}
                    className="mx-auto overflow-hidden rounded border border-border"
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
        className="h-8 w-8 shrink-0"
      >
        {isOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
      </IconButton>
    </div>
  );
}
