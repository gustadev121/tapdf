import type * as React from "react";

import { cn } from "@/lib/utils";

interface FullScreenStatusProps extends React.ComponentProps<"div"> {
  variant?: "loading" | "error" | "empty";
}

function FullScreenStatus({
  variant = "empty",
  className,
  children,
  ...props
}: FullScreenStatusProps) {
  return (
    <div className={cn("flex h-full items-center justify-center", className)} {...props}>
      <p
        className={cn(
          "text-sm",
          variant === "error" && "text-red-500",
          variant === "loading" && "text-muted-foreground",
          variant === "empty" && "text-muted-foreground",
        )}
      >
        {children}
      </p>
    </div>
  );
}

export { FullScreenStatus };
