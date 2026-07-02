# Project Codex Rules

- This repository is the mother template for static game wiki / guide sites.
- Deploy this template with Cloudflare Pages static export only. Do not restore Docker, GHCR image deployment, Netlify deployment, or a long-running Node server unless the user explicitly changes the architecture.
- Do not migrate this template to mkfast, mksaas, TanStack, Workers, D1, R2, auth, payments, or a backend by default.
- Keep English public URLs unprefixed. English pages should be served at `/`, `/bosses`, and `/guide/...`, not `/en/...`.
- Treat generated child sites as separate repositories. Child-site content, game branding, domain names, keywords, and ad keys belong in child repositories, not in this mother template.
- Before claiming deployment work is complete, run the static export build and sitemap checks documented in `docs/CLOUDFLARE_PAGES_DEPLOY.md`.
