# Agent Workflow — Agent Reference

## Change Lifecycle

Every code change follows this cycle:

```
1. Plan      → build agent creates plan (or user describes task)
2. Execute   → build agent implements changes
3. Review    → @reviewer runs build + cargo check
4. Test      → @tester runs test suite
5. Doc-Check → @doc-updater audits docs for consistency
6. Commit    → @committer creates conventional commit
```

## When to Use Each Agent

| Agent | Use When | Runs |
|---|---|---|
| `@reviewer` | After any code change, before commit | `bun run build`, `cargo check` |
| `@tester` | When test files exist, after reviewer passes | `bun run test`, type check, lint |
| `@doc-updater` | After code or test changes, before commit | Audits `docs/` for consistency |
| `@committer` | After reviewer + tester + doc-updater pass | `git add`, `git commit` |

## Agent Instructions

### @tester

Runs the test suite and validates test quality.

**Commands:**

| Step | Command | Purpose |
|---|---|---|
| Run tests | `bun run test` | Execute full test suite in browser mode |
| Type check tests | `bunx tsc --noEmit -p tsconfig.vitest.json` | Catch type errors in test files |
| Lint check | `bun run format:check` | Biome format + lint |

**Test quality checks:**

- No `await import()` inside test cases — use `vi.hoisted()` for mock references
- Mock return values must satisfy the plugin's TypeScript interface (check `node_modules/@embedpdf/*/dist/` for types)
- No redundant `vi.mock()` calls when `tests/setup.ts` already defines the mock
- Test count in `docs/state/CURRENT.md` must match actual count

**Escalation:**
- Tests fail → report to build agent with file:line and error message
- Type errors in tests → report with full `tsc` output
- All pass → report success, proceed to doc-updater

### @doc-updater

Audits documentation for consistency, accuracy, and duplications.

**Scope:**

| File | What to Check |
|---|---|
| `docs/state/CURRENT.md` | Test counts match actual, phase status accurate, known issues current |
| `docs/rules/AGENTS.md` | File naming conventions match actual patterns, code rules reflect real practices |
| `docs/architecture/AGENTS.md` | Data flows match actual implementation, component patterns accurate |
| `docs/tools/AGENTS.md` | Tool versions match `package.json`, URLs valid, package lists current |
| `docs/workflow/AGENTS.md` | Agent list matches actual agents, permissions accurate |
| `AGENTS.md` (root) | Phase status, build commands, tech stack match reality |

**Checklist:**

1. **Counts** — Test counts, file counts, plugin counts match actuals
2. **Names** — File names in docs match actual filenames (PascalCase vs kebab-case)
3. **Commands** — Build/test commands in docs match `package.json` scripts
4. **Duplications** — No same info repeated across files with different values
5. **Staleness** — No references to removed/renamed files or unused patterns
6. **Cross-refs** — Links between docs are valid and point to correct files

**Escalation:**
- Inconsistencies found → fix directly (has edit permission)
- Ambiguous cases → report to user for decision
- All clean → report success

### @reviewer

Read-only build verification.

**Commands:**

| Step | Command |
|---|---|
| Frontend build | `bun run build` (tsc + vite build) |
| Rust check | `cargo check --manifest-path src-tauri/Cargo.toml` |
| Format check | `bun run format:check` |

**Escalation:**
- Build fails → report error with file:line to build agent
- All pass → report success, proceed to tester

### @committer

Creates conventional commits.

**Format:** `type(scope): description`

**Types:** feat, fix, refactor, test, docs, chore, perf

**Scopes:** P0-P6 (phase), or component name (e.g., `toolbar`, `store`, `config`)

**Escalation:**
- Pre-commit checks fail → report to build agent
- All pass → commit and report SHA

## Escalation Rules

1. **Reviewer finds errors** → fix in build agent → re-review
2. **Tester finds failures** → fix in build agent → re-test
3. **Doc-updater finds inconsistencies** → fix directly → re-verify if needed
4. **Never commit with failing checks** — fix first, then commit
5. **If all agents pass** → commit agent proceeds

## Phase Transitions

After completing a phase:

1. Update `docs/state/AGENTS.md` with phase completion
2. Run full review (`@reviewer`) + test (`@tester`) + doc-check (`@doc-updater`)
3. Commit with `feat(phase): description` (e.g., `feat(P1): core viewer`)
4. Plan next phase with the build agent

## Agent Permissions

| Agent | bash | edit | Notes |
|---|---|---|---|
| `@reviewer` | allow | deny | Read-only checks |
| `@tester` | allow | deny | Read-only test execution |
| `@doc-updater` | allow | allow | Fixes docs directly |
| `@committer` | allow | allow | Needs edit for staging |

## Rules

### Testing Rule
Every code change must include corresponding test files. No untested code commits. Tests live under `tests/` mirroring the `src/` structure (`tests/unit/` for pure logic, `tests/component/` for UI). During implementation, agents must load the `tdd` skill (`.agents/skills/tdd/SKILL.md`) and follow the red-green-refactor cycle.

### Atomic Rule
Extract shared UI patterns into atomic components under `src/components/ui/` when duplication reaches 3+ instances. Use shadcn/ui primitives (Button, Separator, Tooltip) before building custom markup.

### Mock Rule
- Global mocks (Tauri APIs) go in `tests/setup.ts` — never repeat them in individual test files
- Plugin mocks use `vi.hoisted()` at file top-level with `vi.mock()` — never use `await import()` inside test cases
- Mock return values must satisfy the plugin's TypeScript interface

## Workflow Modes

### Plan Mode
- Agent reads codebase, creates execution plan
- No file edits allowed
- Plan presented to user for approval
- User approves → switch to build mode

### Build Mode
- Agent executes the approved plan
- File edits and shell commands allowed
- Runs verification after each step
- Commits only when explicitly asked

### Review Mode
- `@reviewer` agent runs checks
- Reports pass/fail with error details
- Build agent fixes issues if needed
