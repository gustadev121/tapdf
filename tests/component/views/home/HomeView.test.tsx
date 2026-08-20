import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { HomeView } from "@/views/home/HomeView";

describe("HomeView", () => {
  describe("rendering", () => {
    test("should display the app heading", async () => {
      const screen = await render(<HomeView />);
      await expect.element(screen.getByRole("heading", { name: "tapdf" })).toBeInTheDocument();
    });

    test("should display the open PDF button", async () => {
      const screen = await render(<HomeView />);
      await expect.element(screen.getByRole("button", { name: /open pdf/i })).toBeInTheDocument();
    });

    test("should display a subtitle", async () => {
      const screen = await render(<HomeView />);
      await expect.element(screen.getByText(/open a pdf to begin/i)).toBeInTheDocument();
    });
  });
});
