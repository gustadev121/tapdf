# Current Project State — Agent Reference

This file tracks the current project state. For planned work, see `PLAN.md`.

## Phase: P1 Complete

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

### Plugin Inventory (23 at v2.15.0)

| Phase | Plugins |
|---|---|
| P1 ✅ | document-manager, viewport, scroll, render, tiling, interaction-manager, zoom |
| P2 | thumbnail |
| P3 | search, selection, rotate, spread, pan, print, view-manager |
| P4 | annotation, form, stamp, signature, redaction, capture, export |
| P5 | i18n, commands |
| Skipped | layout-analysis (0.0.1 only) |

### Known Issues
- `plugin-layout-analysis` skipped — only at `0.0.1`
- WASM import uses `@embedpdf/pdfium/pdfium.wasm?url` (exports map)
- `bun run tauri dev` not verified (needs display)
- Large JS chunks (347KB + 689KB) — consider code splitting in P6
