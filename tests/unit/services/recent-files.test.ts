import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  addRecentFile,
  clearRecentFiles,
  getRecentFiles,
  removeRecentFile,
} from "@/services/recent-files";

const storeModule = await import("@tauri-apps/plugin-store");
const __resetStore = (storeModule as Record<string, unknown>).__resetStore as () => void;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2025-01-15T10:00:00Z"));
  __resetStore();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("recent-files", () => {
  describe("getRecentFiles", () => {
    test("should return empty array when no files exist", async () => {
      const files = await getRecentFiles();
      expect(files).toEqual([]);
    });
  });

  describe("addRecentFile", () => {
    test("should add a new file to recent files", async () => {
      await addRecentFile("/path/to/doc.pdf", "doc.pdf");

      const files = await getRecentFiles();
      expect(files).toHaveLength(1);
      expect(files[0]).toEqual({
        path: "/path/to/doc.pdf",
        name: "doc.pdf",
        openedAt: "2025-01-15T10:00:00.000Z",
      });
    });

    test("should move duplicate file to top", async () => {
      await addRecentFile("/path/to/doc1.pdf", "doc1.pdf");
      await addRecentFile("/path/to/doc2.pdf", "doc2.pdf");
      await addRecentFile("/path/to/doc1.pdf", "doc1.pdf");

      const files = await getRecentFiles();
      expect(files).toHaveLength(2);
      expect(files[0].path).toBe("/path/to/doc1.pdf");
      expect(files[1].path).toBe("/path/to/doc2.pdf");
    });

    test("should cap at 20 recent files", async () => {
      for (let i = 0; i < 25; i++) {
        await addRecentFile(`/path/to/doc${i}.pdf`, `doc${i}.pdf`);
      }

      const files = await getRecentFiles();
      expect(files).toHaveLength(20);
      expect(files[0].path).toBe("/path/to/doc24.pdf");
    });
  });

  describe("removeRecentFile", () => {
    test("should remove a file from recent files", async () => {
      await addRecentFile("/path/to/doc1.pdf", "doc1.pdf");
      await addRecentFile("/path/to/doc2.pdf", "doc2.pdf");
      await removeRecentFile("/path/to/doc1.pdf");

      const files = await getRecentFiles();
      expect(files).toHaveLength(1);
      expect(files[0].path).toBe("/path/to/doc2.pdf");
    });

    test("should handle removing non-existent file gracefully", async () => {
      await addRecentFile("/path/to/doc1.pdf", "doc1.pdf");
      await removeRecentFile("/path/to/nonexistent.pdf");

      const files = await getRecentFiles();
      expect(files).toHaveLength(1);
    });
  });

  describe("clearRecentFiles", () => {
    test("should clear all recent files", async () => {
      await addRecentFile("/path/to/doc1.pdf", "doc1.pdf");
      await addRecentFile("/path/to/doc2.pdf", "doc2.pdf");
      await clearRecentFiles();

      const files = await getRecentFiles();
      expect(files).toEqual([]);
    });
  });
});
