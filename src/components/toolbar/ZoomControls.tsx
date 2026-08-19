import { useZoom, ZoomMode } from "@embedpdf/plugin-zoom/react";
import { Maximize, ZoomIn, ZoomOut } from "lucide-react";

interface ZoomControlsProps {
  documentId: string;
}

export function ZoomControls({ documentId }: ZoomControlsProps) {
  const { provides: zoom, state } = useZoom(documentId);

  if (!zoom) return null;

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={zoom.zoomOut}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Zoom out"
      >
        <ZoomOut size={16} />
      </button>
      <span className="min-w-12 text-center text-xs text-neutral-600 dark:text-neutral-400">
        {Math.round(state.currentZoomLevel * 100)}%
      </span>
      <button
        type="button"
        onClick={zoom.zoomIn}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Zoom in"
      >
        <ZoomIn size={16} />
      </button>
      <button
        type="button"
        onClick={() => zoom.requestZoom(ZoomMode.FitWidth)}
        className="rounded-md p-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-100"
        title="Fit width"
      >
        <Maximize size={16} />
      </button>
    </div>
  );
}
