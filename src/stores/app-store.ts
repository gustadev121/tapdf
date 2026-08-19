import { create } from "zustand";

interface AppState {
  view: "home" | "viewer";
  activeBuffer: ArrayBuffer | null;
  activeName: string;
  activePath: string;

  setView: (view: AppState["view"]) => void;
  openFile: (buffer: ArrayBuffer, name: string, path: string) => void;
  closeFile: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: "home",
  activeBuffer: null,
  activeName: "",
  activePath: "",

  setView: (view) => set({ view }),

  openFile: (buffer, name, path) =>
    set({ view: "viewer", activeBuffer: buffer, activeName: name, activePath: path }),

  closeFile: () => set({ view: "home", activeBuffer: null, activeName: "", activePath: "" }),
}));
