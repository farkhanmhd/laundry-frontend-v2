# Laundry Frontend v2

Next.js frontend for the Laundry App. Built with `create-next-app`, `next-intl` for i18n, `better-auth` for authentication, and `@elysiajs/eden` to talk to the Elysia backend.

## Prerequisites

- [Bun](https://bun.sh) (used by all package.json scripts)

## Environment Variables

Copy the example file and adjust the values:

```bash
cp .env.example .env.development   # used when running `npm run dev`
cp .env.example .env.production    # used when building / starting production
```

> The env files are loaded based on the `NODE_ENV` exported in the package.json scripts. `.env.example` is committed as a template; `.env.development` and `.env.production` are git-ignored.

| Variable                  | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`     | Public base URL of the backend API (client-side fetch, auth, eden). Also used for Next image `remotePatterns` and server action `allowedOrigins`. |
| `NEXT_PUBLIC_FRONTEND_URL`| Public base URL of this frontend.                                  |
| `INTERNAL_API_URL`        | Internal (server-side) base URL of the backend API.                |

## Getting Started

Install dependencies:

```bash
bun install
```

### Development

```bash
npm run dev
```

Runs the dev server (with Turbopack) at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Creates an optimized production build.

### Run production server

```bash
npm run start        # serves the build on port 3100
npm run start:dev    # serves the build on the default port (3000)
```

## Lint & Format

```bash
npm run lint     # TypeScript typecheck + ultracite check
npm run format   # ultracite fix
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
