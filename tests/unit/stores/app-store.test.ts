import { afterEach, describe, expect, test } from "vitest";
import { useAppStore } from "@/stores/app-store";

const initialState = {
  view: "home" as const,
  activeBuffer: null,
  activeName: "",
  activePath: "",
};

afterEach(() => {
  useAppStore.setState(initialState);
});

describe("app-store", () => {
  describe("initial state", () => {
    test("should default to home view with empty file state", () => {
      const state = useAppStore.getState();

      expect(state.view).toBe("home");
      expect(state.activeBuffer).toBeNull();
      expect(state.activeName).toBe("");
      expect(state.activePath).toBe("");
    });
  });

  describe("openFile", () => {
    test("should switch to viewer view and store file data", () => {
      const buffer = new ArrayBuffer(100);
      useAppStore.getState().openFile(buffer, "test.pdf", "/path/to/test.pdf");

      const state = useAppStore.getState();
      expect(state.view).toBe("viewer");
      expect(state.activeBuffer).toBe(buffer);
      expect(state.activeName).toBe("test.pdf");
      expect(state.activePath).toBe("/path/to/test.pdf");
    });
  });

  describe("closeFile", () => {
    test("should reset all state back to initial values", () => {
      const buffer = new ArrayBuffer(100);
      useAppStore.getState().openFile(buffer, "test.pdf", "/path/to/test.pdf");
      useAppStore.getState().closeFile();

      const state = useAppStore.getState();
      expect(state.view).toBe("home");
      expect(state.activeBuffer).toBeNull();
      expect(state.activeName).toBe("");
      expect(state.activePath).toBe("");
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
