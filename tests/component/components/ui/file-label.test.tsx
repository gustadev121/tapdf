import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { FileLabel } from "@/components/ui/file-label";

describe("FileLabel", () => {
  describe("rendering", () => {
    test("should display the file name", async () => {
      const screen = await render(<FileLabel name="document.pdf" />);
      await expect.element(screen.getByText("document.pdf")).toBeInTheDocument();
    });

    test("should render a folder icon", async () => {
      const { container } = await render(<FileLabel name="test.pdf" />);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
    });

    test("should apply flex layout", async () => {
      const { container } = await render(<FileLabel name="test.pdf" />);
      expect(container.firstElementChild?.className).toContain("flex");
    });
  });
});
