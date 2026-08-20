import { useDocumentManagerCapability } from "@embedpdf/plugin-document-manager/react";
import { useRenderCapability } from "@embedpdf/plugin-render/react";
import { useCallback } from "react";

export function usePrintDocument() {
  const { provides: docManager } = useDocumentManagerCapability();
  const { provides: renderCapability } = useRenderCapability();

  const printDocument = useCallback(
    async (documentId: string) => {
      if (!docManager || !renderCapability) return;

      const doc = docManager.getDocument(documentId);
      if (!doc) return;

      const renderScope = renderCapability.forDocument(documentId);
      const pageCount = doc.pageCount;

      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentWindow?.document;
      if (!iframeDoc) return;

      const PRINT_DPI = 300;

      let pageStyles = "";
      for (let i = 0; i < pageCount; i++) {
        pageStyles += `
          @page page-${i} {
            size: auto;
            margin: 0;
          }

          .page-${i} {
            page: page-${i};
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            break-after: page;
            overflow: hidden;
          }

          .page-${i} img {
            display: block;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
          }

        `;
      }

      iframeDoc.documentElement.innerHTML = `
        <head>
          <title>Print</title>
          <style>
            html, body { margin: 0; padding: 0; }
            ${pageStyles}
            .page:last-child { break-after: auto; }
          </style>
        </head>
        <body></body>
      `;
      iframeDoc.close();

      const body = iframeDoc.body;
      const objectUrls: string[] = [];
      const imageLoadPromises: Promise<void>[] = [];

      for (let i = 0; i < pageCount; i++) {
        const task = renderScope.renderPage({
          pageIndex: i,
          options: { scaleFactor: PRINT_DPI / 72 },
        });

        const blob = await task.toPromise();
        const url = URL.createObjectURL(blob);
        objectUrls.push(url);

        const img = iframeDoc.createElement("img");
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.display = "block";

        const loadPromise = new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        imageLoadPromises.push(loadPromise);

        img.src = url;

        const div = iframeDoc.createElement("div");
        div.className = `page page-${i}`;
        div.appendChild(img);
        body.appendChild(div);
      }

      await Promise.all(imageLoadPromises);

      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        for (const url of objectUrls) URL.revokeObjectURL(url);
        document.body.removeChild(iframe);
      }, 1000);
    },
    [docManager, renderCapability],
  );

  return { printDocument };
}
