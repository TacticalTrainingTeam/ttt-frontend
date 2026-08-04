# TTT Frontend

Angular 20 application for Tactical Training Team website.

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── services/        # Singleton services (API, events, medien, members)
│   │   └── interceptors/    # HTTP interceptors (security)
│   ├── shared/
│   │   ├── components/      # Reusable components (page-layout, section-header, external-link-tile)
│   │   ├── directives/      # Custom directives
│   │   └── types/           # TypeScript interfaces
│   └── components/
│       ├── header/          # Navigation
│       ├── footer/          # Footer
│       ├── sidebar/         # Left and right sidebars
│       └── main/            # Content pages
└── environments/            # Environment configs
```

## Getting Started

```bash
pnpm install
pnpm start
```

## Build & Test

```bash
pnpm build          # Production build
pnpm test           # Unit tests
pnpm lint           # ESLint
pnpm prettier       # Format code
```

## Documentation

- [Security](docs/security.md) - Security implementation
- [Backend Overview](docs/backend-overview.md) - API integration

## Tech Stack

- Angular 21
- Optimus UI
- TailwindCSS 4
- RxJS 7
- TypeScript 5
