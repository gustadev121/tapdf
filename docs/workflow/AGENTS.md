# Agent Workflow — Agent Reference

## Change Lifecycle

Every code change follows this cycle:

```
1. Plan    → build agent creates plan (or user describes task)
2. Execute → build agent implements changes
3. Review  → @reviewer runs build + cargo check
4. Test    → @tester runs test suite
5. Commit  → @committer creates conventional commit
```

## When to Use Each Agent

| Agent | Use When | Runs |
|---|---|---|
| `@reviewer` | After any code change, before commit | `bun run build`, `cargo check` |
| `@tester` | When test files exist, after reviewer passes | `bun test` |
| `@committer` | After reviewer + tester pass | `git add`, `git commit` |

## Escalation Rules

1. **Reviewer finds errors** → fix in build agent → re-review
2. **Tester finds failures** → fix in build agent → re-test
3. **Never commit with failing checks** — fix first, then commit
4. **If reviewer and tester both pass** → commit agent proceeds

## Phase Transitions

After completing a phase:

1. Update `docs/state/AGENTS.md` with phase completion
2. Run full review (`@reviewer`) + test (`@tester`)
3. Commit with `feat(phase): description` (e.g., `feat(P1): core viewer`)
4. Plan next phase with the build agent

## Agent Permissions

| Agent | bash | edit | Notes |
|---|---|---|---|
| `@reviewer` | allow | deny | Read-only checks |
| `@tester` | allow | deny | Read-only test execution |
| `@committer` | allow | allow | Needs edit for staging |

## Rules

### Testing Rule
Every code change must include corresponding test files. No untested code commits. Tests live under `tests/` mirroring the `src/` structure (`tests/unit/` for pure logic, `tests/component/` for UI).

### Atomic Rule
Extract shared UI patterns into atomic components under `src/components/ui/` when duplication reaches 3+ instances. Use shadcn/ui primitives (Button, Separator, Tooltip) before building custom markup.

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
