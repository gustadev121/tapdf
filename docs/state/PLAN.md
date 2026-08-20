# Project Plan — Agent Reference

This file tracks planned work. For current state, see `CURRENT.md`.

## P1.5a — shadcn/ui + Atomic Components ✅

**Goal:** Initialize shadcn/ui (New York, Radix), extract shared UI patterns into atomic components, refactor existing toolbar/viewer to use them.

**Components:** button, separator, tooltip

**Files:**

| File | Action |
|---|---|
| `src/index.css` | MODIFY — shadcn CSS variables (`@theme inline`, OKLCH) |
| `src/lib/utils.ts` | NEW — `cn()` helper (clsx + tailwind-merge) |
| `src/components/ui/icon-button.tsx` | NEW — wraps shadcn Button (ghost + icon) |
| `src/components/ui/toolbar-group.tsx` | NEW — flex gap wrapper |
| `src/components/ui/status-bar.tsx` | NEW — bottom bar layout |
| `src/components/ui/full-screen-status.tsx` | NEW — centered loading/error/empty |
| `src/components/ui/file-label.tsx` | NEW — icon + truncated name |
| `src/components/ui/page-indicator.tsx` | NEW — "X / Y" display |
| `src/components/ui/zoom-level-badge.tsx` | NEW — zoom percentage |
| `src/views/viewer/OpenFileBridge.tsx` | NEW — extracted from ViewerView |
| `src/views/viewer/ViewerArea.tsx` | NEW — extracted from ViewerView |
| `src/components/toolbar/FileBar.tsx` | MODIFY — use IconButton + FileLabel |
| `src/components/toolbar/ZoomControls.tsx` | MODIFY — use IconButton + ZoomLevelBadge |
| `src/components/toolbar/PageNav.tsx` | MODIFY — use IconButton + PageIndicator |
| `src/views/viewer/ViewerView.tsx` | MODIFY — use FullScreenStatus + StatusBar |

## P1.5b — Testing Suite ✅

**Goal:** Vitest browser mode with Playwright, test all P1 components.

## P2 — File Manager + Recents ✅

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

## P3 — Viewing Plugins 🔄

**Goal:** Search, selection, rotate, spread, pan, print, view-manager.

**Plugins registered (6/7):** search, selection, rotate, spread, pan, print

**Pending:** view-manager

## P4 — Editing

**Goal:** Annotation, capture, export, form, redaction, signature, stamp.

## P5 — Config System

**Goal:** Settings dialog, i18n, keyboard shortcuts.

## P6 — Hardening

**Goal:** Error handling, perf tuning, production build, OS file association, theming.
