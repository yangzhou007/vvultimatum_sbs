# Game Wiki Mother Template

This repository is the mother template for static game wiki / guide sites. It uses Next.js App Router, MDX content, next-intl, Tailwind CSS, and Cloudflare Pages static export.

## Getting Started

Install dependencies and run the local development server:

```bash
npm ci --legacy-peer-deps
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Static Build

```bash
npx tsc --noEmit
npm run build
```

The build output is `out/`. English pages are served without `/en`; the build copies `out/en` to the root and then removes `out/en`.

## Preview

```bash
npm run preview:static
npm run check:urls
```

## Deploy

Production deploys use Cloudflare Pages Direct Upload from GitHub Actions. Do not deploy this template through Docker, GHCR, Netlify, or a long-running Node server.

See `docs/CLOUDFLARE_PAGES_DEPLOY.md` for required GitHub variables, secrets, DNS setup, and acceptance checks.

## Content

MDX content lives under `content/<locale>/<content-type>/`. Navigation content types come from `src/config/navigation.ts`.
