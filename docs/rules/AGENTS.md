# Coding Rules for Agents

## File Naming

| Type             | Convention                    | Example                                |
| ---------------- | ----------------------------- | -------------------------------------- |
| React components | PascalCase                    | `ViewerView.tsx`, `ZoomControls.tsx`   |
| Hooks            | camelCase + `use` prefix      | `use-engine.ts`, `use-settings.ts`     |
| Services         | camelCase + `-service` suffix | `file-service.ts`, `recent-files.ts`   |
| Config           | kebab-case                    | `app-config.ts`, `plugins.registry.ts` |
| Stores           | kebab-case + `-store` suffix  | `app-store.ts`                         |
| Tests            | `*.test.{ts,tsx}` in `tests/`     | `app-store.test.ts`, `FileBar.test.tsx` |
| Test dirs        | Mirror `src/` under `tests/`  | `tests/unit/stores/`, `tests/component/components/ui/` |

## Code Rules

| Rule                                      | Why                                  | Do Instead                                         |
| ----------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| Never use `any` types                     | Loses type safety                    | Use specific types, `unknown` if truly unknown     |
| Never import from barrel files            | Increases bundle size, obscures deps | Import directly from the source file               |
| Never hardcode file paths                 | Breaks cross-platform                | Use Tauri path APIs (`app.path()`)                 |
| Never use postinstall scripts             | Bun blocks them by default           | Add to `trustedDependencies` if needed             |
| Never mix EmbedPDF v2 and v3              | Incompatible APIs                    | Pin all `@embedpdf/*` at `^2.15.0`                 |
| Never block main thread in Rust           | Freezes UI                           | Use async commands for I/O                         |
| Never commit secrets                      | Security                             | Use env vars, never hardcode API keys              |
| Never define components inside renderPage | Causes re-mount, kills perf          | Define components outside, pass documentId as prop |

## Component Patterns

- Use EmbedPDF hooks for all PDF operations — never build PDF logic from scratch
- All plugin hooks require `documentId` — get it from `<EmbedPDF>` children function
- Memoize expensive `renderPage` callbacks with `useCallback`
- Keep `src-tauri/src/main.rs` thin — all logic in `lib.rs`

## Styling

- Tailwind CSS v4 utility classes only
- No CSS modules, no CSS-in-JS
- Component overrides via `className` props
- Dark mode via Tailwind `dark:` variant (when added)
- Use `cn()` for conditional class merging (from `@/lib/utils`)
- Use shadcn/ui `Button` variants instead of manual button styling
- Use semantic color tokens (`bg-background`, `text-muted-foreground`) — never raw values like `bg-blue-500`
- Use `flex` with `gap-*` for spacing — never `space-x-*` or `space-y-*`
- Use `size-*` when width and height are equal
