import { usePan } from "@embedpdf/plugin-pan/react";
import { usePrint } from "@embedpdf/plugin-print/react";
import { useRotate } from "@embedpdf/plugin-rotate/react";
import { SpreadMode, useSpread } from "@embedpdf/plugin-spread/react";
import {
  IconArrowBack,
  IconArrowForward,
  IconHandClick,
  IconLayoutColumns,
  IconPrinter,
} from "@tabler/icons-react";

import { IconButton } from "@/components/ui/icon-button";
import { ToolbarGroup } from "@/components/ui/toolbar-group";

interface ViewControlsProps {
  documentId: string;
}

export function ViewControls({ documentId }: ViewControlsProps) {
  const { provides: rotate } = useRotate(documentId);
  const { provides: spread, spreadMode } = useSpread(documentId);
  const { provides: pan, isPanning } = usePan(documentId);
  const { provides: print } = usePrint(documentId);

  const toggleSpread = () => {
    if (!spread) return;
    if (spreadMode === SpreadMode.None) {
      spread.setSpreadMode(SpreadMode.Odd);
    } else if (spreadMode === SpreadMode.Odd) {
      spread.setSpreadMode(SpreadMode.Even);
    } else {
      spread.setSpreadMode(SpreadMode.None);
    }
  };

  const spreadLabel =
    spreadMode === SpreadMode.None
      ? "Single page"
      : spreadMode === SpreadMode.Odd
        ? "Book spread"
        : "Reverse spread";

  return (
    <ToolbarGroup>
      <IconButton tooltip="Rotate left" onClick={() => rotate?.rotateBackward()} disabled={!rotate}>
        <IconArrowBack size={16} />
      </IconButton>
      <IconButton tooltip="Rotate right" onClick={() => rotate?.rotateForward()} disabled={!rotate}>
        <IconArrowForward size={16} />
      </IconButton>
      <IconButton tooltip={spreadLabel} onClick={toggleSpread} disabled={!spread}>
        <IconLayoutColumns size={16} />
      </IconButton>
      <IconButton
        tooltip={isPanning ? "Disable pan" : "Enable pan"}
        onClick={() => pan?.togglePan()}
        disabled={!pan}
      >
        <IconHandClick size={16} />
      </IconButton>
      <IconButton tooltip="Print" onClick={() => print?.print()} disabled={!print}>
        <IconPrinter size={16} />
      </IconButton>
    </ToolbarGroup>
  );
}
