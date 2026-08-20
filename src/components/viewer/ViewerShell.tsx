import { DocumentContent } from "@embedpdf/plugin-document-manager/react";
import { useState } from "react";
import { FileBar } from "@/components/toolbar/FileBar";
import { PageNav } from "@/components/toolbar/PageNav";
import { ZoomControls } from "@/components/toolbar/ZoomControls";
import { FullScreenStatus } from "@/components/ui/full-screen-status";
import { StatusBar } from "@/components/ui/status-bar";
import { DocumentTabs } from "@/components/viewer/DocumentTabs";
import { ThumbnailSidebar } from "@/components/viewer/ThumbnailSidebar";
import { useAppStore } from "@/stores/app-store";
import { OpenFileBridge } from "@/views/viewer/OpenFileBridge";
import { ViewerArea } from "@/views/viewer/ViewerArea";

export function ViewerShell() {
  const documents = useAppStore((s) => s.documents);
  const activeDocumentId = useAppStore((s) => s.activeDocumentId);
  const setActiveDocument = useAppStore((s) => s.setActiveDocument);
  const closeFile = useAppStore((s) => s.closeFile);

  const [pluginDocId, setPluginDocId] = useState<string | null>(null);

  const activeDoc = documents.find((d) => d.id === activeDocumentId);

  return (
    <div className="flex h-screen flex-col bg-muted">
      <FileBar />
      <DocumentTabs
        documents={documents.map((d) => ({ id: d.id, name: d.name }))}
        activeDocumentId={activeDocumentId ?? ""}
        onSelect={setActiveDocument}
        onClose={closeFile}
      />
      {activeDoc && !pluginDocId && (
        <OpenFileBridge buffer={activeDoc.buffer} name={activeDoc.name} onOpened={setPluginDocId} />
      )}
      <div className="flex flex-1 overflow-hidden">
        {activeDoc && pluginDocId ? (
          <>
            <ThumbnailSidebar documentId={pluginDocId} />
            <div className="flex-1 overflow-hidden">
              <DocumentContent documentId={pluginDocId}>
                {({ isLoaded, isLoading, isError }) => {
                  if (isError) {
                    return (
                      <FullScreenStatus variant="error">Failed to load document</FullScreenStatus>
                    );
                  }
                  if (isLoaded) {
                    return <ViewerArea documentId={pluginDocId} />;
                  }
                  return (
                    <FullScreenStatus variant="loading">
                      {isLoading ? "Loading document…" : "Waiting…"}
                    </FullScreenStatus>
                  );
                }}
              </DocumentContent>
            </div>
          </>
        ) : (
          <FullScreenStatus variant="empty">No document loaded</FullScreenStatus>
        )}
      </div>
      {activeDoc && pluginDocId && (
        <StatusBar>
          <PageNav documentId={pluginDocId} />
          <ZoomControls documentId={pluginDocId} />
        </StatusBar>
      )}
    </div>
  );
}
