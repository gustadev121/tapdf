# Architecture — Agent Reference

## System Overview

tapdf is a desktop application with three layers:

1. **Presentation** — React components, Tailwind styling, EmbedPDF headless layers
2. **Application** — Zustand state, plugin registry, config system, services
3. **Platform** — Tauri Rust backend (file I/O, persistence, native dialogs)

## Component Composition

The viewer composes EmbedPDF headless components into a layered structure:

```
Viewport
├── ZoomGestureWrapper          — wheel/pinch zoom (viewport level)
│   └── Scroller                — virtual scrolling, page layout
│       └── renderPage callback — per-page composition below
│           └── PagePointerProvider — per-page pointer event context
│               ├── RenderLayer     — base render (P1)
│               ├── TilingLayer     — high-res tiling (P1)
│               ├── SearchLayer     — search highlight overlays (P3)
│               ├── SelectionLayer  — text selection marquee (P3)
│               └── MarqueeZoom     — zoom-to-rect selection (P1)
├── PanMode                     — pan interaction mode (P3)
└── PrintFrame                  — print overlay (P3)
```

Each page is wrapped in `PagePointerProvider` (from interaction-manager) which provides pointer event context for all per-page interaction layers. The `renderPage` callback is memoized with `useCallback` and must not define components inline (performance rule).

## Plugin System

Plugins are registered in dependency order. The registry:
1. Declares each plugin with its config and dependencies
2. Filters by enabled flag from merged config
3. Sorts by dependency graph (roots first)
4. Returns the ordered array for the provider

The provider remounts (via React key) when config changes, since plugins cannot be hot-registered.

## State Architecture

Two distinct state domains:

- **App state** (Zustand) — view mode, open file buffer, recent files, settings
- **Plugin state** (EmbedPDF hooks) — document state, zoom level, scroll position, annotations

They never mix. App state drives view switching and file management. Plugin state drives the viewer UI.

## Data Flow Patterns

### File Open
User action → service layer (native dialog + fs read) → ArrayBuffer → app state → viewer mount → plugin opens document buffer → document ID → plugins render.

### Save
Plugin exports modified document → ArrayBuffer → service layer (native save dialog + fs write) → file on disk.

### Config Change
Settings dialog → merged config update → new key hash → EmbedPDF remount → plugins reinitialize with new config.

## Tauri Integration

The Rust layer provides three capabilities:
- **File system** — read/write arbitrary files (scoped by capabilities)
- **Dialogs** — native open/save file pickers
- **Store** — JSON key-value persistence for recents and settings

No custom Rust commands. All logic lives in the frontend; Tauri is the bridge to the OS.
