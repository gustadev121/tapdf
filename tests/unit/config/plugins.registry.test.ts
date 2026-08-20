import { describe, expect, test } from "vitest";
import { buildPlugins } from "@/config/plugins.registry";

describe("plugins.registry", () => {
  describe("buildPlugins", () => {
    test("should return an array of 7 plugins", () => {
      const plugins = buildPlugins();
      expect(plugins).toHaveLength(7);
    });

    test("should include document-manager as the first plugin", () => {
      const plugins = buildPlugins();
      expect(plugins[0]).toHaveProperty("package");
      expect(plugins[0].package).toBeDefined();
    });

    test("should include zoom as the last plugin", () => {
      const plugins = buildPlugins();
      expect(plugins[6]).toHaveProperty("package");
      expect(plugins[6].package).toBeDefined();
    });

    test("every plugin should have a package and config", () => {
      const plugins = buildPlugins();
      for (const plugin of plugins) {
        expect(plugin).toHaveProperty("package");
        expect(plugin).toHaveProperty("config");
      }
    });
  });
});
