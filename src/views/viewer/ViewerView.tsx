import { EmbedPDF } from "@embedpdf/core/react";
import {
  DocumentContent,
  useDocumentManagerCapability,
} from "@embedpdf/plugin-document-manager/react";
import { PagePointerProvider } from "@embedpdf/plugin-interaction-manager/react";
import { RenderLayer } from "@embedpdf/plugin-render/react";
import { type PageLayout, Scroller } from "@embedpdf/plugin-scroll/react";
import { TilingLayer } from "@embedpdf/plugin-tiling/react";
import { Viewport } from "@embedpdf/plugin-viewport/react";
import { MarqueeZoom, ZoomGestureWrapper } from "@embedpdf/plugin-zoom/react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FileBar } from "@/components/toolbar/FileBar";
import { PageNav } from "@/components/toolbar/PageNav";
import { ZoomControls } from "@/components/toolbar/ZoomControls";
import { buildPlugins } from "@/config/plugins.registry";
import { useEngine } from "@/engine/use-engine";
import { useAppStore } from "@/stores/app-store";

const plugins = buildPlugins();

export function ViewerView() {
  const { engine, isLoading, error } = useEngine();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <p className="text-sm text-neutral-500">Loading PDF engine…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
        <p className="text-sm text-red-500">Failed to load engine: {error.message}</p>
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
    <div className="flex h-screen flex-col bg-neutral-100 dark:bg-neutral-900">
      <FileBar />
      {!docId && <OpenFileBridge onOpened={setDocId} />}
      <div className="flex-1 overflow-hidden">
        {docId ? (
          <DocumentContent documentId={docId}>
            {({ isLoaded, isLoading, isError }) => {
              if (isError) {
                return (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-red-500">Failed to load document</p>
                  </div>
                );
              }
              if (isLoaded) {
                return <ViewerArea documentId={docId} />;
              }
              return (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-neutral-500">
                    {isLoading ? "Loading document…" : "Waiting…"}
                  </p>
                </div>
              );
            }}
          </DocumentContent>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-neutral-500">No document loaded</p>
          </div>
        )}
      </div>
      {docId && (
        <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
          <PageNav documentId={docId} />
          <ZoomControls documentId={docId} />
        </div>
      )}
    </div>
  );
}

function OpenFileBridge({ onOpened }: { onOpened: (id: string) => void }) {
  const { provides: docManager } = useDocumentManagerCapability();
  const activeBuffer = useAppStore((s) => s.activeBuffer);
  const activeName = useAppStore((s) => s.activeName);
  const called = useRef(false);

  useEffect(() => {
    if (!docManager || !activeBuffer || called.current) return;
    called.current = true;

    const task = docManager.openDocumentBuffer({
      buffer: activeBuffer,
      name: activeName,
    });

    task.wait(
      (result) => {
        onOpened(result.documentId);
      },
      (err) => {
        console.error("Failed to open document:", err);
        called.current = false;
      },
    );
  }, [docManager, activeBuffer, activeName, onOpened]);

  return null;
}

function ViewerArea({ documentId }: { documentId: string }) {
  const renderPage = useCallback<(pageLayout: PageLayout) => ReactNode>(
    ({ pageIndex }) => (
      <PagePointerProvider documentId={documentId} pageIndex={pageIndex}>
        <RenderLayer documentId={documentId} pageIndex={pageIndex} scale={1.0} />
        <TilingLayer documentId={documentId} pageIndex={pageIndex} />
        <MarqueeZoom documentId={documentId} pageIndex={pageIndex} />
      </PagePointerProvider>
    ),
    [documentId],
  );

  return (
    <Viewport documentId={documentId} className="h-full w-full bg-neutral-200 dark:bg-neutral-800">
      <ZoomGestureWrapper documentId={documentId}>
        <Scroller documentId={documentId} renderPage={renderPage} />
      </ZoomGestureWrapper>
    </Viewport>
  );
}
