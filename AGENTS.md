# tapdf — Agent Instructions

## Project

PDF viewer and editor built with Tauri v2 + React 19 + EmbedPDF v2.15.0 headless components. Desktop app distributed as native binary via Tauri.

## Tech Stack

| Layer      | Technology                       | Version     |
| ---------- | -------------------------------- | ----------- |
| Frontend   | React, TypeScript                | 19.x, 5.8   |
| Build      | Vite, Bun                        | 7.x, 1.3    |
| Styling    | Tailwind CSS, shadcn/ui          | 4.x, latest |
| State      | zustand, zod                     | 5.x, 4.x    |
| PDF Engine | EmbedPDF (headless)              | 2.15.0      |
| Backend    | Rust, Tauri                      | 2.x         |
| Plugins    | tauri-plugin-{fs, dialog, store, log, opener} | 2.x         |

## Build Commands

| Command                                            | Purpose                                  |
| -------------------------------------------------- | ---------------------------------------- |
| `bun run build`                                    | TypeScript check + Vite production build |
| `cargo check --manifest-path src-tauri/Cargo.toml` | Rust compilation check                   |
| `bun run tauri dev`                                | Full app in dev mode (needs display)     |
| `bun run test`                                     | Run test suite                           |
| `bun run format:check`                             | Biome format + lint check                |

## Phase Status

| Phase | Status     | Description                                                       |
| ----- | ---------- | ----------------------------------------------------------------- |
| P0    | ✅ Done    | Scaffold: deps, Tailwind, CSP, WASM self-host                     |
| P0.5  | ✅ Done    | Agent workflow documentation                                      |
| P1    | ✅ Done    | Core viewer: engine, 7 plugins, file open, toolbar                |
| P1.5  | ✅ Done    | Testing suite, shadcn/ui, atomic components                       |
| P2    | ✅ Done    | File manager: recents, thumbnails, drag & drop, tabs              |
| P3    | 🔄 In Progress | Viewing plugins: search, selection, rotate, spread, pan, print (6/7 registered) |
| P4    | 📋 Planned | Editing: annotation, capture, export, form, redaction, signature, stamp |
| P5    | 📋 Planned | Config system: settings dialog, i18n, shortcuts                   |
| P6    | 📋 Planned | Hardening: error handling, perf, production build                 |

## Documentation Structure

- `docs/rules/` — coding conventions, commit format, file naming
- `docs/tools/` — external platform references (EmbedPDF, Tauri, Vite, Bun)
- `docs/state/` — current project state, what's done, what's next
- `docs/architecture/` — design decisions, data flow, plugin patterns
- `docs/workflow/` — agent lifecycle, when to use each agent

## Skills Available

12 autoskills loaded from `.agents/skills/`:

| Skill                     | When to Use                                              |
| ------------------------- | -------------------------------------------------------- |
| tauri-v2                  | Tauri commands, capabilities, IPC, plugins, build issues |
| vite                      | Vite config, plugins, build optimization                 |
| bun                       | Bun runtime, package management, scripts                 |
| react-best-practices      | React performance, re-render optimization, patterns      |
| typescript-advanced-types | Complex type logic, generics, utility types              |
| frontend-design           | UI components, styling, design systems                   |
| composition-patterns      | React composition, compound components                   |
| accessibility             | WCAG compliance, screen reader support                   |
| seo                       | Search engine optimization (less relevant for desktop)   |
| tdd                       | TDD, red-green-refactor, test-first, integration tests   |
| shadcn                    | shadcn/ui components, theming, CLI commands               |
| vitest                    | Vitest testing, mocking, coverage, browser mode           |

## Key Conventions

- Pin all `@embedpdf/*` at `^2.15.0` — never mix with v3
- Self-host WASM via Vite `?url` import — no CDN in desktop app
- Use zustand for app state, EmbedPDF plugin hooks for plugin state
- Run `bun run build` + `cargo check` before committing
- Follow conventional commits: `type(scope): description`
- Run `@doc-updater` after code/test changes to audit docs for consistency
