import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { PageIndicator } from "@/components/ui/page-indicator";

describe("PageIndicator", () => {
  describe("rendering", () => {
    test("should display current and total pages in X / Y format", async () => {
      const screen = await render(<PageIndicator current={3} total={10} />);
      await expect.element(screen.getByText("3 / 10")).toBeInTheDocument();
    });

    test("should handle single page documents", async () => {
      const screen = await render(<PageIndicator current={1} total={1} />);
      await expect.element(screen.getByText("1 / 1")).toBeInTheDocument();
    });

    test("should handle zero-based page indices", async () => {
      const screen = await render(<PageIndicator current={0} total={5} />);
      await expect.element(screen.getByText("0 / 5")).toBeInTheDocument();
    });
  });
});
