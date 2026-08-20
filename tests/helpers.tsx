import type { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

export function TestWrapper({ children }: { children: ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
