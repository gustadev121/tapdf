# Current Project State — Agent Reference

This file tracks the current project state. For planned work, see `PLAN.md`.

## Phase: P1.5 Complete

### Completed

#### P0 — Scaffold ✅

- 22 `@embedpdf/*` packages installed at `2.15.0`
- `tauri-plugin-{fs,dialog,store}` registered in Rust
- Capabilities: `fs:scope **`, `dialog:default`, `store:default`
- CSP set: `wasm-unsafe-eval` (script), `blob:` (worker)
- Tailwind v4 wired via `@tailwindcss/vite`
- Template stripped, `src/engine/wasm-url.ts` created
- `bun run build` ✅ · `cargo check` ✅

#### P0.5 — Agent Workflow Documentation ✅

- `opencode.jsonc` with instructions and references
- 3 agents: reviewer, tester, committer
- `docs/` with 5 subdirectories (rules, tools, state, architecture, workflow)

#### P1 — Core Viewer ✅

- `@embedpdf/plugin-interaction-manager@2.15.0` installed
- Biome formatter configured (`biome check` + `biome format`)
- `src/engine/use-engine.ts` — PdfiumEngine wrapper with local WASM
- `src/config/plugins.registry.ts` — 7 plugins: document-manager → viewport → scroll → render → tiling → interaction-manager → zoom
- `src/services/file-service.ts` — `openFile()` via Tauri dialog + fs
- `src/stores/app-store.ts` — Zustand store (view, buffer, name, path)
- `src/App.tsx` — view switcher (home ↔ viewer)
- `src/views/home/HomeView.tsx` — "Open a PDF" button + empty state
- `src/views/viewer/ViewerView.tsx` — EmbedPDF provider + full viewer layout
- `src/components/toolbar/FileBar.tsx` — doc name + back button
- `src/components/toolbar/ZoomControls.tsx` — zoom in/out/reset/fit-width
- `src/components/toolbar/PageNav.tsx` — page prev/next + "X of Y"
- `@/` path alias configured (tsconfig + vite)
- `bun run build` ✅ · `bun run format:check` ✅ · `cargo check` ✅

#### P1.5a — shadcn/ui + Atomic Components ✅

- shadcn/ui initialized (New York style, Radix base, lucide icons)
- `components.json`, `src/lib/utils.ts` (`cn()`), CSS variables (`@theme inline`, OKLCH)
- shadcn components: Button, Separator, Tooltip
- Atomic components: IconButton, ToolbarGroup, StatusBar, FullScreenStatus, FileLabel, PageIndicator, ZoomLevelBadge
- Extracted: OpenFileBridge, ViewerArea (from ViewerView)
- Refactored: FileBar, ZoomControls, PageNav, HomeView, ViewerView
- `TooltipProvider` in main.tsx
- Biome CSS parser enabled for Tailwind v4

#### P1.5b — Testing Suite ✅

- Vitest 4.1 + `@vitest/browser-playwright` + `vitest-browser-react`
- Browser mode: Chromium via Playwright, headless
- Global mocks in `tests/setup.ts` (Tauri dialog, fs)
- `tsconfig.vitest.json` for test TypeScript config
- 53 tests across 16 files:
  - Unit: app-store (4), file-service (4), plugins.registry (3)
  - Component: icon-button, toolbar-group, full-screen-status, file-label, page-indicator, zoom-level-badge, status-bar
  - Component: FileBar, ZoomControls, PageNav
  - Views: HomeView, ViewerShell, App

### Plugin Inventory (23 at v2.15.0)

| Phase   | Plugins                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| P1 ✅   | document-manager, viewport, scroll, render, tiling, interaction-manager, zoom |
| P2      | thumbnail                                                                     |
| P3      | search, selection, rotate, spread, pan, print, view-manager                   |
| P4      | annotation, form, stamp, signature, redaction, capture, export                |
| P5      | i18n, commands                                                                |
| Skipped | layout-analysis (0.0.1 only)                                                  |

### Known Issues

- `plugin-layout-analysis` skipped — only at `0.0.1`
- WASM import uses `@embedpdf/pdfium/pdfium.wasm?url` (exports map)
- `bun run tauri dev` not verified (needs display)
- Large JS chunks (347KB + 689KB) — consider code splitting in P6
