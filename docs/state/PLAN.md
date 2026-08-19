# Project Plan — Agent Reference

This file tracks planned work. For current state, see `CURRENT.md`.

## P2 — File Manager + Recents

**Goal:** Home screen with recent files grid, thumbnails, drag & drop, document tabs.

**Plugins:** thumbnail

**Files:**

| File | Action |
|---|---|
| `src/services/recent-files.ts` | NEW — CRUD via tauri-plugin-store, validate paths |
| `src/services/thumbnails.ts` | NEW — render first page → canvas → downscale → dataURL |
| `src/views/home/HomeView.tsx` | MODIFY — recent files grid + thumbnails + drag zone |
| `src/views/home/RecentFileCard.tsx` | NEW — thumbnail + name + date card |
| `src/views/home/DropZone.tsx` | NEW — drag & drop zone for PDF files |
| `src/views/viewer/ViewerView.tsx` | MODIFY — add thumbnail sidebar + tabs |
| `src/components/viewer/DocumentTabs.tsx` | NEW — tab bar for multi-document |
| `src/components/viewer/ThumbnailSidebar.tsx` | NEW — `useThumbnail()` per page |
| `src/stores/app-store.ts` | MODIFY — add `recentFiles: RecentFile[]` |

## P3 — Viewing Plugins

**Goal:** Search, selection, rotate, spread, pan, print, view-manager.

## P4 — Editing

**Goal:** Annotation, forms, stamps, signatures, redaction, capture, export/save.

## P5 — Config System

**Goal:** Settings dialog, i18n, keyboard shortcuts.

## P6 — Hardening

**Goal:** Error handling, perf tuning, production build, OS file association, theming.
