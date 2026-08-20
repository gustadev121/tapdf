import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import App from "@/App";
import { useAppStore } from "@/stores/app-store";

import { TestWrapper } from "@/tests/helpers";

vi.mock("@embedpdf/engines/react", () => ({
  usePdfiumEngine: vi.fn().mockReturnValue({
    engine: null,
    isLoading: false,
    error: null,
  }),
}));

describe("App", () => {
  describe("view switching", () => {
    test("should render HomeView when view is 'home'", async () => {
      useAppStore.setState({ view: "home" });
      const screen = await render(
        <TestWrapper>
          <App />
        </TestWrapper>,
      );

      await expect.element(screen.getByRole("heading", { name: "tapdf" })).toBeInTheDocument();
    });
  });
});
