import { EmbedPDF } from "@embedpdf/core/react";
import { DocumentContent } from "@embedpdf/plugin-document-manager/react";
import { useState } from "react";
import { FileBar } from "@/components/toolbar/FileBar";
import { PageNav } from "@/components/toolbar/PageNav";
import { ZoomControls } from "@/components/toolbar/ZoomControls";
import { FullScreenStatus } from "@/components/ui/full-screen-status";
import { StatusBar } from "@/components/ui/status-bar";
import { buildPlugins } from "@/config/plugins.registry";
import { useEngine } from "@/engine/use-engine";
import { OpenFileBridge } from "@/views/viewer/OpenFileBridge";
import { ViewerArea } from "@/views/viewer/ViewerArea";

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

function ViewerShell() {
  const [docId, setDocId] = useState<string | null>(null);

  return (
    <div className="flex h-screen flex-col bg-muted">
      <FileBar />
      {!docId && <OpenFileBridge onOpened={setDocId} />}
      <div className="flex-1 overflow-hidden">
        {docId ? (
          <DocumentContent documentId={docId}>
            {({ isLoaded, isLoading, isError }) => {
              if (isError) {
                return <FullScreenStatus variant="error">Failed to load document</FullScreenStatus>;
              }
              if (isLoaded) {
                return <ViewerArea documentId={docId} />;
              }
              return (
                <FullScreenStatus variant="loading">
                  {isLoading ? "Loading document…" : "Waiting…"}
                </FullScreenStatus>
              );
            }}
          </DocumentContent>
        ) : (
          <FullScreenStatus variant="empty">No document loaded</FullScreenStatus>
        )}
      </div>
      {docId && (
        <StatusBar>
          <PageNav documentId={docId} />
          <ZoomControls documentId={docId} />
        </StatusBar>
      )}
    </div>
  );
}
