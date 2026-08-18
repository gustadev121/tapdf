# Project Plan — Agent Reference

This file tracks planned work. For current state, see `CURRENT.md`.

## P1 — Core Viewer (next)

**Goal:** Open a PDF from disk, render with zoom, scroll, tiling, and marquee zoom.

**Plugins (7):** document-manager → viewport → scroll → render → tiling → interaction-manager → zoom

**New dependency:** `@embedpdf/plugin-interaction-manager@^2.15.0`

**Files (11):**

| File | Action |
|---|---|
| `package.json` | Add `plugin-interaction-manager` |
| `src/engine/use-engine.ts` | NEW |
| `src/config/plugins.registry.ts` | NEW |
| `src/services/file-service.ts` | NEW |
| `src/stores/app-store.ts` | NEW |
| `src/App.tsx` | MODIFY |
| `src/views/home/HomeView.tsx` | NEW |
| `src/views/viewer/ViewerView.tsx` | NEW |
| `src/components/toolbar/FileBar.tsx` | NEW |
| `src/components/toolbar/ZoomControls.tsx` | NEW |
| `src/components/toolbar/PageNav.tsx` | NEW |

**Also:** Configure formatter (Prettier or Biome), add `format:check` script.

## P2 — File Manager + Recents

**Goal:** Home screen with recent files grid, thumbnails, drag & drop, document tabs.

**Plugins:** thumbnail

## P3 — Viewing Plugins

**Goal:** Search, selection, rotate, spread, pan, print, view-manager.

## P4 — Editing

**Goal:** Annotation, forms, stamps, signatures, redaction, capture, export/save.

## P5 — Config System

**Goal:** Settings dialog, i18n, keyboard shortcuts.

## P6 — Hardening

**Goal:** Error handling, perf tuning, production build, OS file association, theming.
