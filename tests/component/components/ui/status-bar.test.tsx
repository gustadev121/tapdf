import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { StatusBar } from "@/components/ui/status-bar";

describe("StatusBar", () => {
  describe("rendering", () => {
    test("should render all children", async () => {
      const screen = await render(
        <StatusBar>
          <span>Left</span>
          <span>Right</span>
        </StatusBar>,
      );

      await expect.element(screen.getByText("Left")).toBeInTheDocument();
      await expect.element(screen.getByText("Right")).toBeInTheDocument();
    });

    test("should apply border-top styling", async () => {
      const { container } = await render(
        <StatusBar>
          <span>Content</span>
        </StatusBar>,
      );

      expect(container.firstElementChild?.className).toContain("border-t");
    });

    test("should apply flex layout with spacing", async () => {
      const { container } = await render(
        <StatusBar>
          <span>Content</span>
        </StatusBar>,
      );

      const root = container.firstElementChild;
      expect(root?.className).toContain("flex");
      expect(root?.className).toContain("items-center");
      expect(root?.className).toContain("justify-between");
    });
  });
});
