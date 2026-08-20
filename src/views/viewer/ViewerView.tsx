import { EmbedPDF } from "@embedpdf/core/react";
import { FullScreenStatus } from "@/components/ui/full-screen-status";
import { ViewerShell } from "@/components/viewer/ViewerShell";
import { buildPlugins } from "@/config/plugins.registry";
import { useEngine } from "@/engine/use-engine";

const plugins = buildPlugins();

export function ViewerView() {
  const { engine, isLoading, error } = useEngine();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <FullScreenStatus variant="loading">Loading PDF engine…</FullScreenStatus>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <FullScreenStatus variant="error">Failed to load engine: {error.message}</FullScreenStatus>
      </div>
    );
  }

  if (!engine) return null;

  return (
    <EmbedPDF engine={engine} plugins={plugins}>
      <ViewerShell />
    </EmbedPDF>
  );
}
