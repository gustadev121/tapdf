# tapdf Documentation — Agent Instructions

This is the main documentation entry point for agents.

## Project Context

tapdf is a PDF viewer and editor. Read `AGENTS.md` (root) for tech stack and build commands. Read `docs/state/AGENTS.md` for current progress.

## Documentation Index

- **`docs/rules/AGENTS.md`** — Coding conventions, commit format, file naming, import order
- **`docs/tools/AGENTS.md`** — External platform references and URLs
- **`docs/state/CURRENT.md`** — What's done, current phase, known issues
- **`docs/state/PLAN.md`** — Planned phases, upcoming work, file lists
- **`docs/architecture/AGENTS.md`** — Design decisions, data flow, plugin patterns
- **`docs/workflow/AGENTS.md`** — Agent lifecycle, when to use each agent

## Quick Reference

### Before Making Changes
1. Read `docs/state/CURRENT.md` to understand current phase
2. Read `docs/rules/AGENTS.md` for coding conventions
3. Read `docs/architecture/AGENTS.md` for relevant patterns

### After Making Changes
1. Run `bun run build` (frontend)
2. Run `cargo check --manifest-path src-tauri/Cargo.toml` (Rust)
3. Update `docs/state/CURRENT.md` if phase progress changed
4. Commit with conventional format per `docs/rules/AGENTS.md`
