import { useScroll } from "@embedpdf/plugin-scroll/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { PageIndicator } from "@/components/ui/page-indicator";
import { ToolbarGroup } from "@/components/ui/toolbar-group";

interface PageNavProps {
  documentId: string;
}

export function PageNav({ documentId }: PageNavProps) {
  const { provides: scroll, state } = useScroll(documentId);

  if (!scroll) return null;

  return (
    <ToolbarGroup>
      <IconButton
        tooltip="Previous page"
        onClick={() => scroll.scrollToPreviousPage()}
        disabled={state.currentPage <= 0}
      >
        <ChevronLeft size={16} />
      </IconButton>
      <PageIndicator current={state.currentPage} total={state.totalPages} />
      <IconButton
        tooltip="Next page"
        onClick={() => scroll.scrollToNextPage()}
        disabled={state.currentPage >= state.totalPages}
      >
        <ChevronRight size={16} />
      </IconButton>
    </ToolbarGroup>
  );
}
