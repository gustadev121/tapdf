import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IconToggleProps extends React.ComponentProps<typeof Button> {
  tooltip: string;
  onToggleChanged?: (pressed: boolean) => void;
}

function IconToggle({ tooltip, children, onToggleChanged, ...props }: IconToggleProps) {
  const [isPressed, setIsPressed] = useState(false);
  const handleClick = () => {
    setIsPressed(!isPressed);
    onToggleChanged?.(!isPressed);
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          aria-label={tooltip}
          variant={isPressed ? "secondary" : "ghost"}
          {...props}
          onClick={handleClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { IconToggle };
