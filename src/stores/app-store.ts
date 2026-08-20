import { create } from "zustand";
import {
  addRecentFile as addRecentFileToStore,
  getRecentFiles as fetchRecentFiles,
  type RecentFile,
  removeRecentFile as removeRecentFileFromStore,
} from "@/services/recent-files";

export interface Document {
  id: string;
  buffer: ArrayBuffer;
  name: string;
  path: string;
}

interface AppState {
  view: "home" | "viewer";

  documents: Document[];
  activeDocumentId: string | null;

  recentFiles: RecentFile[];

  setView: (view: AppState["view"]) => void;
  openFile: (buffer: ArrayBuffer, name: string, path: string) => string;
  closeFile: (id: string) => void;
  closeAllFiles: () => void;
  setActiveDocument: (id: string) => void;

  loadRecentFiles: () => Promise<void>;
  addRecentFile: (path: string, name: string) => Promise<void>;
  removeRecentFile: (path: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  view: "home",

  documents: [],
  activeDocumentId: null,

  recentFiles: [],

  setView: (view) => set({ view }),

  openFile: (buffer, name, path) => {
    const id = `doc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const doc: Document = { id, buffer, name, path };

    set((state) => ({
      documents: [...state.documents, doc],
      activeDocumentId: id,
      view: "viewer",
    }));

    get().addRecentFile(path, name);

    return id;
  },

  closeFile: (id) => {
    set((state) => {
      const remaining = state.documents.filter((d) => d.id !== id);
      const newActiveId =
        state.activeDocumentId === id
          ? remaining.length > 0
            ? remaining[remaining.length - 1].id
            : null
          : state.activeDocumentId;

      return {
        documents: remaining,
        activeDocumentId: newActiveId,
        view: remaining.length === 0 ? "home" : state.view,
      };
    });
  },

  closeAllFiles: () =>
    set({
      documents: [],
      activeDocumentId: null,
      view: "home",
    }),

  setActiveDocument: (id) => set({ activeDocumentId: id }),

  loadRecentFiles: async () => {
    const files = await fetchRecentFiles();
    set({ recentFiles: files });
  },

  addRecentFile: async (path, name) => {
    await addRecentFileToStore(path, name);
    const files = await fetchRecentFiles();
    set({ recentFiles: files });
  },

  removeRecentFile: async (path) => {
    await removeRecentFileFromStore(path);
    const files = await fetchRecentFiles();
    set({ recentFiles: files });
  },
}));

export function getActiveDocument(): Document | null {
  const { documents, activeDocumentId } = useAppStore.getState();
  return documents.find((d) => d.id === activeDocumentId) ?? null;
}
