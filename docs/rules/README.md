# Coding Rules

Human-readable coding conventions for the tapdf project.

## Commits

Conventional Commits format: `type(scope): description`

```
feat(viewer): add zoom controls toolbar
fix(tauri): correct CSP for wasm worker
docs(state): update P1 progress
```

## File Naming

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `ViewerView.tsx` |
| Hooks | camelCase + `use` | `use-engine.ts` |
| Services | camelCase | `file-service.ts` |
| Config | kebab-case | `app-config.ts` |

## Key Rules

- No `any` types — use proper TypeScript types
- No barrel imports — import directly from source
- No hardcoded paths — use Tauri path APIs
- No secrets in code — use environment variables
- No EmbedPDF v2/v3 mixing — pin at `^2.15.0`

## Styling

Tailwind CSS v4 utility classes. No CSS modules or CSS-in-JS.
