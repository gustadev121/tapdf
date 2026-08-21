# Current Project State — Agent Reference

This file tracks the current project state. For planned work, see `PLAN.md`.

## Phase: P3 In Progress (6/7 plugins registered)

### Completed

#### P0 — Scaffold ✅

- 26 `@embedpdf/*` packages installed at `2.15.0`
- `tauri-plugin-{fs,dialog,store,log,opener}` registered in Rust
- Capabilities: `fs:default`, `fs:allow-read-file`, `fs:allow-write-file`, `fs:allow-exists`, `dialog:default`, `store:default`, `opener:default`, `log:default`
- CSP set: `wasm-unsafe-eval` (script), `blob:` (worker)
- Tailwind v4 wired via `@tailwindcss/vite`
- Template stripped, `src/engine/wasm-url.ts` created
- `bun run build` ✅ · `cargo check` ✅

#### P0.5 — Agent Workflow Documentation ✅

- `opencode.jsonc` with instructions and references
- 4 agents: reviewer, tester, doc-updater, committer
- `docs/` with 5 subdirectories (rules, tools, state, architecture, workflow)

#### P1 — Core Viewer ✅

- `@embedpdf/plugin-interaction-manager@2.15.0` installed
- Biome formatter configured (`biome check` + `biome format`)
- `src/engine/use-engine.ts` — PdfiumEngine wrapper with local WASM
- `src/config/plugins.registry.ts` — 14 plugins registered (was 7 at P1, now includes P2 thumbnail + P3 search/selection/rotate/spread/pan/print)
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

- shadcn/ui initialized (New York style, Radix base, tabler icons)
- `components.json`, `src/lib/utils.ts` (`cn()`), CSS variables (`@theme inline`, OKLCH)
- shadcn components: Button, Separator, Tooltip
- Atomic components: IconButton, ToolbarGroup, StatusBar, FullScreenStatus, FileLabel, PageIndicator, ZoomLevelBadge
- Extracted: OpenFileBridge, ViewerArea, ViewerShell (from ViewerView)
- Refactored: FileBar, ZoomControls, PageNav, HomeView, ViewerView
- `TooltipProvider` in main.tsx
- Biome CSS parser enabled for Tailwind v4

#### P1.5b — Testing Suite ✅

- Vitest 4.1 + `@vitest/browser-playwright` + `vitest-browser-react`
- Browser mode: Chromium via Playwright, headless
- Global mocks in `tests/setup.ts` (Tauri dialog, fs, store, opener, path)
- `tsconfig.vitest.json` for test TypeScript config

#### P2 — File Manager + Recents ✅

- `src/services/recent-files.ts` — CRUD via tauri-plugin-store, 20 file limit
- `src/services/thumbnails.ts` — Canvas-based thumbnail generation via EmbedPDF engine
- `src/views/home/RecentFileCard.tsx` — Card with thumbnail + name + date
- `src/views/home/DropZone.tsx` — Drag & drop zone for PDF files
- `src/views/home/HomeView.tsx` — Recent files grid + drop zone
- `src/components/viewer/DocumentTabs.tsx` — Tab bar for multi-document
- `src/components/viewer/ThumbnailSidebar.tsx` — Virtualized thumbnail sidebar using EmbedPDF plugin
- `src/components/viewer/ViewerShell.tsx` — Extracted shell with local pluginDocId state
- `src/views/viewer/ViewerView.tsx` — Updated with tabs + thumbnail sidebar
- `src/views/viewer/OpenFileBridge.tsx` — Accepts buffer/name as props
- `src/stores/app-store.ts` — Multi-document state (documents[], activeDocumentId, recentFiles)
- `@embedpdf/plugin-thumbnail@2.15.0` registered in plugins registry
- 67 tests across 17 files
- `bun run build` ✅ · `bun run format:check` ✅ · `cargo check` ✅

#### P3 — Viewing Plugins (6/7 registered) 🔄

- `@embedpdf/plugin-search@2.15.0` registered in plugins registry
- `@embedpdf/plugin-selection@2.15.0` registered in plugins registry
- `@embedpdf/plugin-rotate@2.15.0` registered in plugins registry
- `@embedpdf/plugin-spread@2.15.0` registered in plugins registry
- `@embedpdf/plugin-pan@2.15.0` registered in plugins registry
- `@embedpdf/plugin-print@2.15.0` registered in plugins registry (print rendered via custom `src/services/print-service.ts` — iframe-based, not PrintFrame component)
- `view-manager` — not yet registered (pending)
- `bun run build` ✅ · `bun run format:check` ✅ · `cargo check` ✅

### Plugin Inventory (26 packages at v2.15.0, 14 registered)

| Phase   | Plugins                                                                       |
| ------- | ----------------------------------------------------------------------------- |
| P1 ✅   | document-manager, viewport, scroll, render, tiling, interaction-manager, zoom |
| P2 ✅   | thumbnail                                                                     |
| P3 🔄   | search ✅, selection ✅, rotate ✅, spread ✅, pan ✅, print ✅* , view-manager (pending) |
| P4      | annotation, form, stamp, signature, redaction, capture, export                |
| P5      | i18n, commands                                                                |
| Skipped | layout-analysis (0.0.1 only)                                                  |

\* Print plugin is registered but rendering uses custom `src/services/print-service.ts` (iframe-based, not EmbedPDF PrintFrame component)

### Known Issues

- `plugin-layout-analysis` skipped — only at `0.0.1`
- `@embedpdf/plugin-print` removed from `package.json` but still imported in `plugins.registry.ts` (resolves via node_modules cache)
- WASM import uses `@embedpdf/pdfium/pdfium.wasm?url` (exports map)
- `bun run tauri dev` not verified (needs display)
- Large JS chunks (456KB + 689KB) — consider code splitting in P6
