import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";
import { describe, expect, test } from "vitest";

describe("test setup", () => {
  test("Tauri dialog mock resolves to null by default", async () => {
    const result = await open({ multiple: false });
    expect(result).toBeNull();
  });

  test("Tauri fs mock resolves to empty Uint8Array by default", async () => {
    const result = await readFile("/fake/path.pdf");
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toHaveLength(0);
  });
});
