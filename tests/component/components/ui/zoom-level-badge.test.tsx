import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ZoomLevelBadge } from "@/components/ui/zoom-level-badge";

describe("ZoomLevelBadge", () => {
  describe("rendering", () => {
    test("should display 100% for zoom level 1.0", async () => {
      const screen = await render(<ZoomLevelBadge level={1.0} />);
      await expect.element(screen.getByText("100%")).toBeInTheDocument();
    });

    test("should display 50% for zoom level 0.5", async () => {
      const screen = await render(<ZoomLevelBadge level={0.5} />);
      await expect.element(screen.getByText("50%")).toBeInTheDocument();
    });

    test("should round fractional percentages correctly", async () => {
      const screen = await render(<ZoomLevelBadge level={0.756} />);
      await expect.element(screen.getByText("76%")).toBeInTheDocument();
    });

    test("should handle zero zoom level", async () => {
      const screen = await render(<ZoomLevelBadge level={0} />);
      await expect.element(screen.getByText("0%")).toBeInTheDocument();
    });
  });
});
