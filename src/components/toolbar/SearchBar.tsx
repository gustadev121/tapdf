import { useSearch } from "@embedpdf/plugin-search/react";
import { IconChevronLeft, IconChevronRight, IconSearch, IconX } from "@tabler/icons-react";
import {
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  documentId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ documentId, isOpen, onClose }: SearchBarProps) {
  const { provides: search, state } = useSearch(documentId);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = state?.results ?? [];
  const activeResultIndex = state?.activeResultIndex ?? -1;
  const totalResults = results.length;
  const hasResults = totalResults > 0;

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleNext = useCallback(() => {
    if (!search) return;
    search.nextResult();
  }, [search]);

  const handlePrevious = useCallback(() => {
    if (!search) return;
    search.previousResult();
  }, [search]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          handlePrevious();
        } else {
          handleNext();
        }
      }
      if (e.key === "Escape") {
        onClose();
      }
    },
    [handleNext, handlePrevious, onClose],
  );

  if (!isOpen) return null;

  return (
    <div className="flex items-center gap-2 border-b px-3 py-2 bg-background">
      <IconSearch size={16} className="shrink-0 text-muted-foreground" />
      <input
        ref={inputRef as RefObject<HTMLInputElement>}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search in document…"
        className={cn(
          "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
        )}
      />
      {hasResults && (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {activeResultIndex + 1} of {totalResults}
        </span>
      )}
      <IconButton tooltip="Previous result" onClick={handlePrevious} disabled={!hasResults}>
        <IconChevronLeft size={16} />
      </IconButton>
      <IconButton tooltip="Next result" onClick={handleNext} disabled={!hasResults}>
        <IconChevronRight size={16} />
      </IconButton>
      <IconButton tooltip="Close search" onClick={onClose}>
        <IconX size={16} />
      </IconButton>
    </div>
  );
}
