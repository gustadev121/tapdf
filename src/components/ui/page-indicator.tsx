import { cn } from "@/lib/utils";

interface PageIndicatorProps extends React.ComponentProps<"span"> {
  current: number;
  total: number;
}

function PageIndicator({ current, total, className, ...props }: PageIndicatorProps) {
  return (
    <span
      className={cn("min-w-15 text-center text-xs text-muted-foreground", className)}
      {...props}
    >
      {current} / {total}
    </span>
  );
}

export { PageIndicator };
