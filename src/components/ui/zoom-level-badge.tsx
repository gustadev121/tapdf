import { cn } from "@/lib/utils";

interface ZoomLevelBadgeProps extends React.ComponentProps<"span"> {
  level: number;
}

function ZoomLevelBadge({ level, className, ...props }: ZoomLevelBadgeProps) {
  return (
    <span
      className={cn("min-w-12 text-center text-xs text-muted-foreground", className)}
      {...props}
    >
      {Math.round(level * 100)}%
    </span>
  );
}

export { ZoomLevelBadge };
