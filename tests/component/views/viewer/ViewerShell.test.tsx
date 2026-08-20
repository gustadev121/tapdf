import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { FileBar } from "@/components/toolbar/FileBar";
import { useAppStore } from "@/stores/app-store";
import { TestWrapper } from "@/tests/helpers";

describe("ViewerShell", () => {
  describe("rendering", () => {
    test("should render FileBar with the active document name", async () => {
      useAppStore.setState({ activeName: "document.pdf", view: "viewer" });
      const screen = await render(
        <TestWrapper>
          <FileBar />
        </TestWrapper>,
      );

      await expect.element(screen.getByText("document.pdf")).toBeInTheDocument();
    });
  });
});
