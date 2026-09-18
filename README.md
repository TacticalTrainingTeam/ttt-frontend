# TTT-Frontend

Website of the Tactical Training Team (Angular, Optimus UI, Tailwind CSS).

## Development

```bash
pnpm install
pnpm start          # dev server, /api is proxied to localhost:8080
pnpm build          # production build into dist/
pnpm test           # unit tests (Vitest)
pnpm lint           # ESLint
pnpm prettier       # formatting
```

## Structure

```
src/app/
├── core/        services and HTTP interceptor
├── shared/      reusable components, directives, types, constants
└── components/  header, footer, sidebars and the pages under main/
```

More docs: [Backend integration](docs/backend-overview.md), [Security](docs/security.md)
