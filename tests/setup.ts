import { vi } from "vitest";

declare global {
  // biome-ignore lint/suspicious/noExplicitAny: test helper
  var __testStore: Map<string, any>;
}

vi.mock("@tauri-apps/plugin-dialog", () => ({
  open: vi.fn().mockResolvedValue(null),
}));

vi.mock("@tauri-apps/plugin-fs", () => ({
  readFile: vi.fn().mockResolvedValue(new Uint8Array()),
  writeFile: vi.fn().mockResolvedValue(undefined),
  exists: vi.fn().mockResolvedValue(true),
}));

vi.mock("@tauri-apps/plugin-opener", () => ({
  openPath: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@tauri-apps/api/path", () => ({
  tempDir: vi.fn().mockResolvedValue("/tmp"),
}));

vi.mock("@tauri-apps/plugin-store", () => {
  if (!globalThis.__testStore) {
    globalThis.__testStore = new Map<string, unknown>();
  }

  class MockLazyStore {
    get = vi.fn((key: string) => Promise.resolve(globalThis.__testStore.get(key)));
    set = vi.fn((key: string, value: unknown) => {
      globalThis.__testStore.set(key, value);
      return Promise.resolve();
    });
    init = vi.fn().mockResolvedValue(undefined);
    save = vi.fn().mockResolvedValue(undefined);
  }

  return {
    LazyStore: MockLazyStore,
  };
});

vi.mock("@embedpdf/engines/react", () => ({
  usePdfiumEngine: vi.fn().mockReturnValue({
    engine: null,
    isLoading: false,
    error: null,
  }),
}));
