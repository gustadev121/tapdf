import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { PageNav } from "@/components/toolbar/PageNav";
import { TestWrapper } from "@/tests/helpers";

const { useScroll, mockScroll } = vi.hoisted(() => {
  const mockScroll = {
    scrollToPreviousPage: vi.fn(),
    scrollToNextPage: vi.fn(),
    getCurrentPage: vi.fn(),
    getTotalPages: vi.fn(),
    getPageChangeState: vi.fn(),
    scrollToPage: vi.fn(),
    getSpreadPagesWithRotatedSize: vi.fn(),
    getMetrics: vi.fn(),
    getLayout: vi.fn(),
    getRectPositionForPage: vi.fn(),
    setScrollStrategy: vi.fn(),
    onPageChange: vi.fn(),
    onScroll: vi.fn(),
    onLayoutChange: vi.fn(),
  };
  return {
    useScroll: vi.fn().mockReturnValue({
      provides: mockScroll,
      state: { currentPage: 3, totalPages: 10 },
    }),
    mockScroll,
  };
});

vi.mock("@embedpdf/plugin-scroll/react", () => ({
  useScroll,
}));

describe("PageNav", () => {
  describe("rendering", () => {
    test("should display current page and total pages", async () => {
      const screen = await render(
        <TestWrapper>
          <PageNav documentId="doc-1" />
        </TestWrapper>,
      );

      await expect.element(screen.getByText("3 / 10")).toBeInTheDocument();
    });

    test("should render previous and next buttons", async () => {
      const screen = await render(
        <TestWrapper>
          <PageNav documentId="doc-1" />
        </TestWrapper>,
      );

      await expect
        .element(screen.getByRole("button", { name: /previous page/i }))
        .toBeInTheDocument();
      await expect.element(screen.getByRole("button", { name: /next page/i })).toBeInTheDocument();
    });
  });

  describe("navigation boundaries", () => {
    test("should disable previous button on first page", async () => {
      useScroll.mockReturnValue({
        provides: mockScroll,
        state: { currentPage: 0, totalPages: 10 },
      });

      const screen = await render(
        <TestWrapper>
          <PageNav documentId="doc-1" />
        </TestWrapper>,
      );

      const prevButton = screen.getByRole("button", { name: /previous page/i });
      await expect.element(prevButton).toHaveAttribute("disabled", "");
    });

    test("should disable next button on last page", async () => {
      useScroll.mockReturnValue({
        provides: mockScroll,
        state: { currentPage: 10, totalPages: 10 },
      });

      const screen = await render(
        <TestWrapper>
          <PageNav documentId="doc-1" />
        </TestWrapper>,
      );

      const nextButton = screen.getByRole("button", { name: /next page/i });
      await expect.element(nextButton).toHaveAttribute("disabled", "");
    });
  });

  describe("when scroll is unavailable", () => {
    test("should render nothing", async () => {
      useScroll.mockReturnValue({
        provides: null,
        state: { currentPage: 0, totalPages: 0 },
      });

      const screen = await render(
        <TestWrapper>
          <PageNav documentId="doc-1" />
        </TestWrapper>,
      );

      expect(screen.container.innerHTML).toBe("");
    });
  });
});
