import { usePan } from "@embedpdf/plugin-pan/react";
import { usePrint } from "@embedpdf/plugin-print/react";
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

interface ViewControlsProps {
  documentId: string;
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
  const { provides: print } = usePrint(documentId);

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
        onPressedChange={togglePan}
        pressed={isPanning}
        disabled={!pan}
      >
        <IconHandClick size={16} />
      </IconToggle>
      <IconButton tooltip="Print" onClick={() => print?.print()} disabled={!print}>
        <IconPrinter size={16} />
      </IconButton>
    </ToolbarGroup>
  );
}
