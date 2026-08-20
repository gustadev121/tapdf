import { afterEach, describe, expect, test, vi } from "vitest";
import { useAppStore } from "@/stores/app-store";

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

const initialState = {
  view: "home" as const,
  documents: [],
  activeDocumentId: null,
  recentFiles: [],
};

afterEach(() => {
  useAppStore.setState(initialState);
});

describe("app-store", () => {
  describe("initial state", () => {
    test("should default to home view with empty state", () => {
      const state = useAppStore.getState();

      expect(state.view).toBe("home");
      expect(state.documents).toEqual([]);
      expect(state.activeDocumentId).toBeNull();
      expect(state.recentFiles).toEqual([]);
    });
  });

  describe("openFile", () => {
    test("should switch to viewer view and store document", () => {
      const buffer = new ArrayBuffer(100);
      const id = useAppStore.getState().openFile(buffer, "test.pdf", "/path/to/test.pdf");

      const state = useAppStore.getState();
      expect(state.view).toBe("viewer");
      expect(state.documents).toHaveLength(1);
      expect(state.documents[0].id).toBe(id);
      expect(state.documents[0].buffer).toBe(buffer);
      expect(state.documents[0].name).toBe("test.pdf");
      expect(state.documents[0].path).toBe("/path/to/test.pdf");
      expect(state.activeDocumentId).toBe(id);
    });

    test("should support multiple documents", () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "doc1.pdf", "/path/doc1.pdf");
      const id2 = useAppStore
        .getState()
        .openFile(new ArrayBuffer(200), "doc2.pdf", "/path/doc2.pdf");

      const state = useAppStore.getState();
      expect(state.documents).toHaveLength(2);
      expect(state.activeDocumentId).toBe(id2);
    });
  });

  describe("closeFile", () => {
    test("should remove document and switch to remaining", () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "doc1.pdf", "/path/doc1.pdf");
      useAppStore.getState().openFile(new ArrayBuffer(200), "doc2.pdf", "/path/doc2.pdf");
      const { documents } = useAppStore.getState();
      useAppStore.getState().closeFile(documents[0].id);

      const state = useAppStore.getState();
      expect(state.documents).toHaveLength(1);
      expect(state.documents[0].name).toBe("doc2.pdf");
    });

    test("should switch to home when last document closed", () => {
      useAppStore.getState().openFile(new ArrayBuffer(100), "doc1.pdf", "/path/doc1.pdf");
      const { documents } = useAppStore.getState();
      useAppStore.getState().closeFile(documents[0].id);

      const state = useAppStore.getState();
      expect(state.view).toBe("home");
      expect(state.documents).toHaveLength(0);
      expect(state.activeDocumentId).toBeNull();
    });
  });

  describe("setActiveDocument", () => {
    test("should switch active document", () => {
      const id1 = useAppStore
        .getState()
        .openFile(new ArrayBuffer(100), "doc1.pdf", "/path/doc1.pdf");
      useAppStore.getState().openFile(new ArrayBuffer(200), "doc2.pdf", "/path/doc2.pdf");

      useAppStore.getState().setActiveDocument(id1);

      expect(useAppStore.getState().activeDocumentId).toBe(id1);
    });
  });

  describe("setView", () => {
    test("should update view to the specified value", () => {
      useAppStore.getState().setView("viewer");
      expect(useAppStore.getState().view).toBe("viewer");
    });

    test("should toggle between home and viewer", () => {
      const { setView } = useAppStore.getState();

      setView("viewer");
      expect(useAppStore.getState().view).toBe("viewer");

      setView("home");
      expect(useAppStore.getState().view).toBe("home");
    });
  });
});
