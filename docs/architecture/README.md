# Architecture

Human-readable overview of the tapdf architecture.

## Three Layers

| Layer | Responsibility |
|---|---|
| **Presentation** | React components, Tailwind styling, EmbedPDF layers |
| **Application** | State management, plugin registry, config, services |
| **Platform** | Tauri Rust backend — file I/O, dialogs, persistence |

## Key Patterns

- **Headless PDF:** EmbedPDF provides hooks and layers, we build the UI
- **Plugin registry:** Single file manages all 24 plugins with dependency ordering
- **Two state domains:** App state (Zustand) vs Plugin state (EmbedPDF hooks)
- **Layered config:** Defaults → user overrides → merged → plugin registration
- **Tauri as bridge:** Frontend owns all logic; Rust handles OS integration

## Design Decisions

See `docs/architecture/AGENTS.md` for the full reference including data flow patterns and component composition details.
