import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { ZoomControls } from "@/components/toolbar/ZoomControls";
import { TestWrapper } from "@/tests/helpers";

const { useZoom } = vi.hoisted(() => {
  const mockZoom = {
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    requestZoom: vi.fn(),
    requestZoomBy: vi.fn(),
    zoomToArea: vi.fn(),
    enableMarqueeZoom: vi.fn(),
    disableMarqueeZoom: vi.fn(),
    toggleMarqueeZoom: vi.fn(),
    isMarqueeZoomActive: vi.fn(),
    getState: vi.fn(),
    onZoomChange: vi.fn(),
    onStateChange: vi.fn(),
  };
  return {
    useZoom: vi.fn().mockReturnValue({
      provides: mockZoom,
      state: { zoomLevel: 1.0, currentZoomLevel: 1.0, isMarqueeZoomActive: false },
    }),
    mockZoom,
  };
});

vi.mock("@embedpdf/plugin-zoom/react", () => ({
  useZoom,
  ZoomMode: { FitWidth: "fit-width" },
}));

describe("ZoomControls", () => {
  describe("rendering", () => {
    test("should display the current zoom level as percentage", async () => {
      const screen = await render(
        <TestWrapper>
          <ZoomControls documentId="doc-1" />
        </TestWrapper>,
      );

      await expect.element(screen.getByText("100%")).toBeInTheDocument();
    });

    test("should render zoom in and zoom out buttons", async () => {
      const screen = await render(
        <TestWrapper>
          <ZoomControls documentId="doc-1" />
        </TestWrapper>,
      );

      await expect.element(screen.getByRole("button", { name: /zoom in/i })).toBeInTheDocument();
      await expect.element(screen.getByRole("button", { name: /zoom out/i })).toBeInTheDocument();
    });

    test("should render fit width button", async () => {
      const screen = await render(
        <TestWrapper>
          <ZoomControls documentId="doc-1" />
        </TestWrapper>,
      );

      await expect.element(screen.getByRole("button", { name: /fit width/i })).toBeInTheDocument();
    });
  });

  describe("when zoom is unavailable", () => {
    test("should render nothing", async () => {
      useZoom.mockReturnValue({
        provides: null,
        state: { zoomLevel: 1.0, currentZoomLevel: 1.0, isMarqueeZoomActive: false },
      });

      const screen = await render(
        <TestWrapper>
          <ZoomControls documentId="doc-1" />
        </TestWrapper>,
      );

      expect(screen.container.innerHTML).toBe("");
    });
  });
});
