import { vi } from "vitest";

vi.mock("@tauri-apps/plugin-dialog", () => ({
  open: vi.fn().mockResolvedValue(null),
}));

vi.mock("@tauri-apps/plugin-fs", () => ({
  readFile: vi.fn().mockResolvedValue(new Uint8Array()),
}));

vi.mock("@embedpdf/engines/react", () => ({
  usePdfiumEngine: vi.fn().mockReturnValue({
    engine: null,
    isLoading: false,
    error: null,
  }),
}));
