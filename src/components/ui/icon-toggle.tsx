import type * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IconToggleProps extends React.ComponentProps<typeof Toggle> {
  tooltip: string;
}

function IconToggle({ tooltip, children, ...props }: IconToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Toggle size="sm" aria-label={tooltip} {...props}>
          {children}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { IconToggle };
