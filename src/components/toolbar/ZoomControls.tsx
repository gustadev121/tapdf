import { useZoom, ZoomMode } from "@embedpdf/plugin-zoom/react";
import { IconMaximize, IconZoomIn, IconZoomOut } from "@tabler/icons-react";

import { IconButton } from "@/components/ui/icon-button";
import { ToolbarGroup } from "@/components/ui/toolbar-group";
import { ZoomLevelBadge } from "@/components/ui/zoom-level-badge";

interface ZoomControlsProps {
  documentId: string;
}

export function ZoomControls({ documentId }: ZoomControlsProps) {
  const { provides: zoom, state } = useZoom(documentId);

  if (!zoom || !state) return null;

  return (
    <ToolbarGroup>
      <IconButton tooltip="Zoom out" onClick={zoom.zoomOut}>
        <IconZoomOut size={16} />
      </IconButton>
      <ZoomLevelBadge level={state.currentZoomLevel} />
      <IconButton tooltip="Zoom in" onClick={zoom.zoomIn}>
        <IconZoomIn size={16} />
      </IconButton>
      <IconButton tooltip="Fit width" onClick={() => zoom.requestZoom(ZoomMode.FitWidth)}>
        <IconMaximize size={16} />
      </IconButton>
    </ToolbarGroup>
  );
}
