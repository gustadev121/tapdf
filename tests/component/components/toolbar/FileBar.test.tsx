import { afterEach, describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { FileBar } from "@/components/toolbar/FileBar";
import { useAppStore } from "@/stores/app-store";
import { TestWrapper } from "@/tests/helpers";

describe("FileBar", () => {
  afterEach(() => {
    useAppStore.setState({
      documents: [],
      activeDocumentId: null,
      view: "home",
    });
  });

  describe("rendering", () => {
    test("should display the active file name from store", async () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "test.pdf", "/path/test.pdf");
      const screen = await render(
        <TestWrapper>
          <FileBar />
        </TestWrapper>,
      );

      await expect.element(screen.getByText("test.pdf")).toBeInTheDocument();
    });

    test("should render the back button with accessible name", async () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "test.pdf", "/path/test.pdf");
      const screen = await render(
        <TestWrapper>
          <FileBar />
        </TestWrapper>,
      );

      await expect
        .element(screen.getByRole("button", { name: /back to home/i }))
        .toBeInTheDocument();
    });
  });
});
