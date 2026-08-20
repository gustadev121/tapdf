import { PagePointerProvider } from "@embedpdf/plugin-interaction-manager/react";
import { PanMode } from "@embedpdf/plugin-pan/react";
import { PrintFrame } from "@embedpdf/plugin-print/react";
import { RenderLayer } from "@embedpdf/plugin-render/react";
import { type PageLayout, Scroller } from "@embedpdf/plugin-scroll/react";
import { SearchLayer } from "@embedpdf/plugin-search/react";
import { SelectionLayer } from "@embedpdf/plugin-selection/react";
import { TilingLayer } from "@embedpdf/plugin-tiling/react";
import { Viewport } from "@embedpdf/plugin-viewport/react";
import { MarqueeZoom, ZoomGestureWrapper } from "@embedpdf/plugin-zoom/react";
import { type ReactNode, useCallback } from "react";

interface ViewerAreaProps {
  documentId: string;
}

export function ViewerArea({ documentId }: ViewerAreaProps) {
  const renderPage = useCallback<(pageLayout: PageLayout) => ReactNode>(
    ({ pageIndex }) => (
      <PagePointerProvider documentId={documentId} pageIndex={pageIndex}>
        <RenderLayer documentId={documentId} pageIndex={pageIndex} scale={1.0} />
        <TilingLayer documentId={documentId} pageIndex={pageIndex} />
        <SearchLayer documentId={documentId} pageIndex={pageIndex} />
        <SelectionLayer documentId={documentId} pageIndex={pageIndex} />
        <MarqueeZoom documentId={documentId} pageIndex={pageIndex} />
      </PagePointerProvider>
    ),
    [documentId],
  );

  return (
    <Viewport documentId={documentId} className="h-full w-full bg-muted dark:bg-neutral-800">
      <ZoomGestureWrapper documentId={documentId}>
        <Scroller documentId={documentId} renderPage={renderPage} />
      </ZoomGestureWrapper>
      <PanMode />
      <PrintFrame />
    </Viewport>
  );
}
