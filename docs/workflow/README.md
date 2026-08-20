# Agent Workflow

Human-readable overview of the agent workflow for the tapdf project.

## Overview

We use specialized AI agents for different tasks:

| Agent | Role |
|---|---|
| **Build** | Implements code changes (main agent) |
| **Reviewer** | Runs code quality checks |
| **Tester** | Runs the test suite |
| **Doc-updater** | Audits documentation for consistency |
| **Committer** | Creates conventional commits |

## The Workflow

```
User describes task
    ↓
Build agent creates plan (plan mode)
    ↓
User approves plan
    ↓
Build agent executes (build mode)
    ↓
@reviewer checks code
    ↓ (pass)
@tester runs tests
    ↓ (pass)
@doc-updater audits docs
    ↓ (pass)
@committer creates commit
    ↓
Done
```

## Conventions

- **Conventional commits:** `type(scope): description`
- **Build before commit:** Always run `bun run build` + `cargo check`
- **No secrets in code:** Never commit API keys, tokens, or credentials
- **Phase tracking:** Update `docs/state/` when phases complete

## Getting Started

1. Read `docs/state/AGENTS.md` for current project state
2. Read `docs/rules/AGENTS.md` for coding conventions
3. Read `docs/architecture/AGENTS.md` for design patterns
4. Describe your task to the build agent
