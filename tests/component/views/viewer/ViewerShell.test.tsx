import { afterEach, describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { FileBar } from "@/components/toolbar/FileBar";
import { useAppStore } from "@/stores/app-store";
import { TestWrapper } from "@/tests/helpers";

describe("ViewerShell", () => {
  afterEach(() => {
    useAppStore.setState({
      documents: [],
      activeDocumentId: null,
      view: "home",
    });
  });

  describe("rendering", () => {
    test("should render FileBar with the active document name", async () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "document.pdf", "/path/document.pdf");
      const screen = await render(
        <TestWrapper>
          <FileBar />
        </TestWrapper>,
      );

      await expect.element(screen.getByText("document.pdf")).toBeInTheDocument();
    });
  });
});
