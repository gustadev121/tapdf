# External Tools and Platforms — Agent Reference

## PDF Engine

### EmbedPDF v2.15.0
- **Docs:** https://www.embedpdf.com/docs
- **React headless:** https://www.embedpdf.com/docs/react/headless/introduction
- **Plugin APIs:** https://www.embedpdf.com/docs/react/headless/plugins/plugin-document-manager
- **GitHub:** https://github.com/embedpdf/embed-pdf-viewer

Key packages: `@embedpdf/core`, `@embedpdf/engines`, `@embedpdf/models`, `@embedpdf/pdfium`, `@embedpdf/plugin-*`

## Desktop Framework

### Tauri v2
- **Docs:** https://v2.tauri.app/
- **Commands:** https://v2.tauri.app/develop/calling-rust/
- **Capabilities:** https://v2.tauri.app/security/capabilities/
- **Config:** https://v2.tauri.app/reference/config/
- **Plugins:** https://v2.tauri.app/plugin/

Plugins used: `tauri-plugin-fs`, `tauri-plugin-dialog`, `tauri-plugin-store`

## Build Tools

### Vite 7
- **Docs:** https://vite.dev/
- **Config:** https://vite.dev/config/

### Bun
- **Docs:** https://bun.com/docs
- **Package manager:** https://bun.com/docs/pm

## UI Libraries

### Tailwind CSS v4
- **Docs:** https://tailwindcss.com/docs

### shadcn/ui
- **Docs:** https://ui.shadcn.com/docs
- **Components:** https://ui.shadcn.com/docs/components
- **CLI:** `bunx --bun shadcn@latest <command>`
- **Theming:** https://ui.shadcn.com/docs/theming

Style: New York. Base: Radix. Icon library: lucide-react.
Components live in `src/components/ui/`. Utilities in `src/lib/utils.ts` (`cn()`).

### Lucide React
- **Docs:** https://lucide.dev/

## Testing

### Vitest + Browser Mode
- **Docs:** https://vitest.dev/guide/browser/
- **React render:** https://vitest.dev/api/browser/react
- **Config:** https://vitest.dev/config/

Packages: `vitest`, `@vitest/browser-playwright`, `vitest-browser-react`
Browser: Chromium via Playwright. Tauri APIs mocked globally in `tests/setup.ts`. Plugin mocks use `vi.hoisted()` at top-level with `vi.mock()`.
Tests in `tests/unit/` (pure logic) and `tests/component/` (browser DOM).

## State Management

### Zustand
- **Docs:** https://zustand-demo.pmnd.rs/

### Zod
- **Docs:** https://zod.dev/
