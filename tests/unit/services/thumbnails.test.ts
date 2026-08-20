import { afterEach, describe, expect, test, vi } from "vitest";

const { mockOpenDocumentBuffer, mockRenderThumbnail, mockCloseDocument } = vi.hoisted(() => ({
  mockOpenDocumentBuffer: vi.fn(),
  mockRenderThumbnail: vi.fn(),
  mockCloseDocument: vi.fn(),
}));

vi.mock("@embedpdf/engines", () => ({
  createPdfiumDirectEngine: vi.fn().mockResolvedValue({
    openDocumentBuffer: mockOpenDocumentBuffer,
    renderThumbnail: mockRenderThumbnail,
    closeDocument: mockCloseDocument,
  }),
}));

vi.mock("@/engine/wasm-url", () => ({
  wasmUrl: "/mock/wasm/url",
}));

const { getThumbnail, getCachedThumbnail, clearThumbnailCache } = await import(
  "@/services/thumbnails"
);

afterEach(() => {
  clearThumbnailCache();
  vi.clearAllMocks();
});

describe("thumbnails", () => {
  describe("getThumbnail", () => {
    test("should generate thumbnail from buffer", async () => {
      const fakeBuffer = new ArrayBuffer(100);
      const fakeBlob = new Blob(["thumbnail"], { type: "image/png" });

      mockOpenDocumentBuffer.mockReturnValue({
        toPromise: () =>
          Promise.resolve({
            id: "test.pdf",
            pages: [{ id: 0, width: 100, height: 100 }],
          }),
      });

      mockRenderThumbnail.mockReturnValue({
        toPromise: () => Promise.resolve(fakeBlob),
      });

      mockCloseDocument.mockReturnValue({
        toPromise: () => Promise.resolve(true),
      });

      const result = await getThumbnail("/path/to/test.pdf", fakeBuffer);

      expect(result).toContain("data:image/png;base64,");
      expect(mockOpenDocumentBuffer).toHaveBeenCalledWith({
        id: "/path/to/test.pdf",
        content: fakeBuffer,
      });
    });

    test("should return cached thumbnail on second call", async () => {
      const fakeBuffer = new ArrayBuffer(100);
      const fakeBlob = new Blob(["thumbnail"], { type: "image/png" });

      mockOpenDocumentBuffer.mockReturnValue({
        toPromise: () =>
          Promise.resolve({
            id: "test.pdf",
            pages: [{ id: 0, width: 100, height: 100 }],
          }),
      });

      mockRenderThumbnail.mockReturnValue({
        toPromise: () => Promise.resolve(fakeBlob),
      });

      mockCloseDocument.mockReturnValue({
        toPromise: () => Promise.resolve(true),
      });

      const first = await getThumbnail("/path/to/test.pdf", fakeBuffer);
      const second = await getThumbnail("/path/to/test.pdf", fakeBuffer);

      expect(first).toBe(second);
      expect(mockOpenDocumentBuffer).toHaveBeenCalledTimes(1);
    });

    test("should return null on error", async () => {
      mockOpenDocumentBuffer.mockReturnValue({
        toPromise: () => Promise.reject(new Error("Failed")),
      });

      const result = await getThumbnail("/path/to/error.pdf", new ArrayBuffer(100));

      expect(result).toBeNull();
    });
  });

  describe("getCachedThumbnail", () => {
    test("should return null for uncached path", () => {
      expect(getCachedThumbnail("/nonexistent.pdf")).toBeNull();
    });
  });

  describe("clearThumbnailCache", () => {
    test("should clear all cached thumbnails", async () => {
      const fakeBuffer = new ArrayBuffer(100);
      const fakeBlob = new Blob(["thumbnail"], { type: "image/png" });

      mockOpenDocumentBuffer.mockReturnValue({
        toPromise: () =>
          Promise.resolve({
            id: "test.pdf",
            pages: [{ id: 0, width: 100, height: 100 }],
          }),
      });

      mockRenderThumbnail.mockReturnValue({
        toPromise: () => Promise.resolve(fakeBlob),
      });

      mockCloseDocument.mockReturnValue({
        toPromise: () => Promise.resolve(true),
      });

      await getThumbnail("/path/to/test.pdf", fakeBuffer);
      expect(getCachedThumbnail("/path/to/test.pdf")).not.toBeNull();

      clearThumbnailCache();
      expect(getCachedThumbnail("/path/to/test.pdf")).toBeNull();
    });
  });
});
