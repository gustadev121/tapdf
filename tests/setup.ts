import { vi } from "vitest";

vi.mock("@tauri-apps/plugin-dialog", () => ({
  open: vi.fn().mockResolvedValue(null),
}));

vi.mock("@tauri-apps/plugin-fs", () => ({
  readFile: vi.fn().mockResolvedValue(new Uint8Array()),
  exists: vi.fn().mockResolvedValue(true),
}));

vi.mock("@tauri-apps/plugin-store", () => {
  let store = new Map<string, unknown>();

  class MockLazyStore {
    get = vi.fn((key: string) => Promise.resolve(store.get(key)));
    set = vi.fn((key: string, value: unknown) => {
      store.set(key, value);
      return Promise.resolve();
    });
    init = vi.fn().mockResolvedValue(undefined);
    save = vi.fn().mockResolvedValue(undefined);
  }

  return {
    LazyStore: MockLazyStore,
    Store: {
      load: vi.fn().mockResolvedValue({
        get: vi.fn((key: string) => Promise.resolve(store.get(key))),
        set: vi.fn((key: string, value: unknown) => {
          store.set(key, value);
          return Promise.resolve();
        }),
        save: vi.fn().mockResolvedValue(undefined),
      }),
    },
    __resetStore: () => {
      store = new Map<string, unknown>();
    },
  };
});

vi.mock("@embedpdf/engines/react", () => ({
  usePdfiumEngine: vi.fn().mockReturnValue({
    engine: null,
    isLoading: false,
    error: null,
  }),
}));
