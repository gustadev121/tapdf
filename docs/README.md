# tapdf Documentation

This directory contains project documentation organized for both AI agents and human developers.

## Directory Structure

```
docs/
├── rules/          Coding conventions, commit format, file naming
├── tools/          External platform references and integrations
├── state/          Current project state and progress tracking
├── architecture/   Design decisions, data flow, plugin patterns
└── workflow/       Agent lifecycle and task execution flow
```

## For Agents

Each subdirectory contains an `AGENTS.md` file with instructions specific to that domain. The root `AGENTS.md` in this directory provides a high-level overview.

Agent instruction files are loaded via `opencode.jsonc`:
```json
"instructions": ["docs/**/AGENTS.md", "AGENTS.md"]
```

## For Humans

Each subdirectory also contains a `README.md` for human readability.

## Conventions

- `AGENTS.md` files are written for AI agents — direct, actionable, no fluff
- `README.md` files are written for humans — context, rationale, examples
- State files (`docs/state/`) should be updated as phases complete
- Architecture decisions should be documented when patterns are established
