import type * as React from "react";

import { cn } from "@/lib/utils";

function StatusBar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-t border-border bg-background px-4 py-2",
        className,
      )}
      {...props}
    />
  );
}

export { StatusBar };
