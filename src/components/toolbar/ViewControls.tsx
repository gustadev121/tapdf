import { usePan } from "@embedpdf/plugin-pan/react";
import { useRotate } from "@embedpdf/plugin-rotate/react";
import { SpreadMode, useSpread } from "@embedpdf/plugin-spread/react";
import {
  IconBook,
  IconBook2,
  IconFileDescription,
  IconHandClick,
  IconPrinter,
  IconRotate2,
  IconRotateClockwise2,
} from "@tabler/icons-react";
import { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { IconToggle } from "@/components/ui/icon-toggle";
import { ToolbarGroup } from "@/components/ui/toolbar-group";
import { usePrintDocument } from "@/services/print-service";

interface ViewControlsProps {
  documentId: string;
  buffer: ArrayBuffer;
}

const spreadArr = [
  {
    mode: SpreadMode.None,
    tooltip: "Single page",
    icon: IconFileDescription,
  },
  {
    mode: SpreadMode.Odd,
    tooltip: "Book spread",
    icon: IconBook,
  },
  {
    mode: SpreadMode.Even,
    tooltip: "Reverse spread",
    icon: IconBook2,
  },
];

export function ViewControls({ documentId }: ViewControlsProps) {
  const { provides: rotate } = useRotate(documentId);
  const { provides: spread, spreadMode } = useSpread(documentId);
  const [spreadIndex, setSpreadIndex] = useState(spreadArr.findIndex((s) => s.mode === spreadMode));
  const { provides: pan, isPanning } = usePan(documentId);
  const { printDocument } = usePrintDocument();
  const [isPrinting, setIsPrinting] = useState(false);

  const toggleSpread = () => {
    if (!spread) return;
    const nextIndex = (spreadIndex + 1) % spreadArr.length;
    setSpreadIndex(nextIndex);
    spread.setSpreadMode(spreadArr[nextIndex].mode);
  };

  const SpreadIcon = spreadArr[spreadIndex].icon;

  const togglePan = (pressed: boolean) => {
    if (!pan) return;
    if (pressed) {
      pan.enablePan();
    } else {
      pan.disablePan();
    }
  };

  const handlePrint = async () => {
    if (isPrinting) return;
    setIsPrinting(true);
    try {
      await printDocument(documentId);
    } catch (err) {
      console.error("Print failed:", err);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <ToolbarGroup>
      <IconButton tooltip="Rotate left" onClick={rotate?.rotateBackward} disabled={!rotate}>
        <IconRotate2 size={16} />
      </IconButton>
      <IconButton tooltip="Rotate right" onClick={rotate?.rotateForward} disabled={!rotate}>
        <IconRotateClockwise2 size={16} />
      </IconButton>
      <IconButton
        tooltip={spreadArr[spreadIndex].tooltip}
        onClick={toggleSpread}
        disabled={!spread}
      >
        <SpreadIcon size={16} />
      </IconButton>
      <IconToggle
        tooltip={isPanning ? "Disable pan" : "Enable pan"}
        onToggleChanged={togglePan}
        disabled={!pan}
      >
        <IconHandClick size={16} />
      </IconToggle>
      <IconButton tooltip="Print" onClick={handlePrint}>
        <IconPrinter size={16} />
      </IconButton>
    </ToolbarGroup>
  );
}
