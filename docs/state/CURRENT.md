# Current Project State — Agent Reference

This file tracks the current project state. For planned work, see `PLAN.md`.

## Phase: P2 Complete

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
- `src/config/plugins.registry.ts` — 8 plugins: document-manager → viewport → scroll → render → tiling → thumbnail → interaction-manager → zoom
- `src/services/file-service.ts` — `openFile()` via Tauri dialog + fs
- `src/stores/app-store.ts` — Zustand store with multi-document support
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
- Global mocks in `tests/setup.ts` (Tauri dialog, fs, store)
- `tsconfig.vitest.json` for test TypeScript config

#### P2 — File Manager + Recents ✅

- `src/services/recent-files.ts` — CRUD via tauri-plugin-store, 20 file limit
- `src/services/thumbnails.ts` — Canvas-based thumbnail generation via EmbedPDF engine
- `src/views/home/RecentFileCard.tsx` — Card with thumbnail + name + date
- `src/views/home/DropZone.tsx` — Drag & drop zone for PDF files
- `src/views/home/HomeView.tsx` — Recent files grid + drop zone
- `src/components/viewer/DocumentTabs.tsx` — Tab bar for multi-document
- `src/components/viewer/ThumbnailSidebar.tsx` — Virtualized thumbnail sidebar using EmbedPDF plugin
- `src/views/viewer/ViewerView.tsx` — Updated with tabs + thumbnail sidebar
- `src/views/viewer/OpenFileBridge.tsx` — Updated for multi-document support
- `src/stores/app-store.ts` — Multi-document state (documents[], activeDocumentId, recentFiles)
- `@embedpdf/plugin-thumbnail@2.15.0` registered in plugins registry
- 68 tests across 18 files
- `bun run build` ✅ · `bun run format:check` ✅ · `cargo check` ✅

### Plugin Inventory (23 at v2.15.0)

| Phase   | Plugins                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| P1 ✅   | document-manager, viewport, scroll, render, tiling, interaction-manager, zoom |
| P2 ✅   | thumbnail                                                                     |
| P3      | search, selection, rotate, spread, pan, print, view-manager                   |
| P4      | annotation, form, stamp, signature, redaction, capture, export                |
| P5      | i18n, commands                                                                |
| Skipped | layout-analysis (0.0.1 only)                                                  |

### Known Issues

- `plugin-layout-analysis` skipped — only at `0.0.1`
- WASM import uses `@embedpdf/pdfium/pdfium.wasm?url` (exports map)
- `bun run tauri dev` not verified (needs display)
- Large JS chunks (310KB + 689KB) — consider code splitting in P6
