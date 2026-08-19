import type * as React from "react";

import { cn } from "@/lib/utils";

function ToolbarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center gap-1", className)} {...props} />;
}

export { ToolbarGroup };
