import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { FullScreenStatus } from "@/components/ui/full-screen-status";

describe("FullScreenStatus", () => {
  describe("rendering", () => {
    test("should render children text", async () => {
      const screen = await render(<FullScreenStatus>Loading...</FullScreenStatus>);
      await expect.element(screen.getByText("Loading...")).toBeInTheDocument();
    });

    test("should render inside a centered container", async () => {
      const { container } = await render(<FullScreenStatus>Content</FullScreenStatus>);

      expect(container.firstElementChild?.className).toContain("flex");
      expect(container.firstElementChild?.className).toContain("items-center");
    });
  });

  describe("variants", () => {
    test("should apply error color for error variant", async () => {
      const { container } = await render(
        <FullScreenStatus variant="error">Error occurred</FullScreenStatus>,
      );

      const text = container.querySelector("p");
      expect(text?.className).toContain("text-red-500");
    });

    test("should apply muted color for loading variant", async () => {
      const { container } = await render(
        <FullScreenStatus variant="loading">Loading...</FullScreenStatus>,
      );

      const text = container.querySelector("p");
      expect(text?.className).toContain("text-muted-foreground");
    });

    test("should apply muted color for empty variant", async () => {
      const { container } = await render(
        <FullScreenStatus variant="empty">Nothing here</FullScreenStatus>,
      );

      const text = container.querySelector("p");
      expect(text?.className).toContain("text-muted-foreground");
    });
  });
});
