import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import { describe, expect, test, vi } from "vitest";

import { openFile } from "@/services/file-service";

describe("file-service", () => {
  describe("openFile", () => {
    test("should return null when dialog is cancelled", async () => {
      vi.mocked(open).mockResolvedValue(null);

      const result = await openFile();

      expect(result).toBeNull();
    });

    test("should return buffer, name, and path when file is selected", async () => {
      const fakePath = "/home/user/document.pdf";
      const fakeBytes = new Uint8Array([72, 69, 88]);
      vi.mocked(open).mockResolvedValue(fakePath);
      vi.mocked(readFile).mockResolvedValue(fakeBytes);

      const result = await openFile();

      expect(result).toEqual({
        buffer: fakeBytes.buffer,
        name: "document.pdf",
        path: fakePath,
      });
    });

    test("should return null when readFile throws an error", async () => {
      vi.mocked(open).mockResolvedValue("/home/user/error.pdf");
      vi.mocked(readFile).mockRejectedValue(new Error("Permission denied"));

      const result = await openFile();

      expect(result).toBeNull();
    });

    test("should call dialog with PDF filter configuration", async () => {
      vi.mocked(open).mockResolvedValue(null);

      await openFile();

      expect(open).toHaveBeenCalledWith({
        multiple: false,
        directory: false,
        filters: [{ name: "PDF", extensions: ["pdf"] }],
      });
    });

    test("should extract filename from full path", async () => {
      vi.mocked(open).mockResolvedValue("/deep/nested/path/report-final.pdf");
      vi.mocked(readFile).mockResolvedValue(new Uint8Array());

      const result = await openFile();

      expect(result?.name).toBe("report-final.pdf");
    });
  });
});
