import { useScroll } from "@embedpdf/plugin-scroll/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavProps {
  documentId: string;
}

export function PageNav({ documentId }: PageNavProps) {
  const { provides: scroll, state } = useScroll(documentId);

  if (!scroll) return null;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => scroll.scrollToPreviousPage()}
        disabled={state.currentPage <= 0}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-30 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="min-w-15 text-center text-xs text-neutral-600 dark:text-neutral-400">
        {state.currentPage + 1} / {state.totalPages}
      </span>
      <button
        type="button"
        onClick={() => scroll.scrollToNextPage()}
        disabled={state.currentPage >= state.totalPages - 1}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-30 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
