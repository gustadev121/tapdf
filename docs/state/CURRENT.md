# Current Project State — Agent Reference

This file tracks the current project state. For planned work, see `PLAN.md`.

## Phase: P0.5 Complete

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

### Plugin Inventory (23 at v2.15.0)

| Phase | Plugins |
|---|---|
| P1 | document-manager, viewport, scroll, render, tiling, interaction-manager, zoom |
| P2 | thumbnail |
| P3 | search, selection, rotate, spread, pan, print, view-manager |
| P4 | annotation, form, stamp, signature, redaction, capture, export |
| P5 | i18n, commands |
| Skipped | layout-analysis (0.0.1 only) |

### Known Issues
- `plugin-layout-analysis` skipped — only at `0.0.1`
- WASM import uses `@embedpdf/pdfium/pdfium.wasm?url` (exports map)
- No formatter configured yet (note for P1)
- `bun run tauri dev` not verified (needs display)
