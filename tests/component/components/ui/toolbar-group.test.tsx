import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ToolbarGroup } from "@/components/ui/toolbar-group";

describe("ToolbarGroup", () => {
  describe("rendering", () => {
    test("should render all children", async () => {
      const screen = await render(
        <ToolbarGroup>
          <span>Child 1</span>
          <span>Child 2</span>
        </ToolbarGroup>,
      );

      await expect.element(screen.getByText("Child 1")).toBeInTheDocument();
      await expect.element(screen.getByText("Child 2")).toBeInTheDocument();
    });

    test("should apply flex layout with gap", async () => {
      const { container } = await render(
        <ToolbarGroup>
          <span>Test</span>
        </ToolbarGroup>,
      );

      const root = container.firstElementChild;
      expect(root?.className).toContain("flex");
      expect(root?.className).toContain("gap-1");
    });

    test("should accept custom className", async () => {
      const { container } = await render(
        <ToolbarGroup className="custom-class">
          <span>Test</span>
        </ToolbarGroup>,
      );

      expect(container.firstElementChild?.className).toContain("custom-class");
    });
  });
});
