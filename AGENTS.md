# Project Codex Rules

- This repository is the mother template for static game wiki / guide sites.
- Deploy this template with Cloudflare Pages static export only. Do not restore Docker, GHCR image deployment, Netlify deployment, or a long-running Node server unless the user explicitly changes the architecture.
- Do not migrate this template to mkfast, mksaas, TanStack, Workers, D1, R2, auth, payments, or a backend by default.
- Keep English public URLs unprefixed. English pages should be served at `/`, `/bosses`, and `/guide/...`, not `/en/...`.
- Treat generated child sites as separate repositories. Child-site content, game branding, domain names, keywords, and ad keys belong in child repositories, not in this mother template.
- For game wiki template or child-site launch work, follow `docs/GAME_SITE_COURSE.md` and `docs/GAME_SITE_LAUNCH_CHECKLIST.md`. These docs translate the local course HTML files into project operating rules. If they conflict with this file, this file wins.
- Use the course HTML files listed in `docs/COURSE_SOURCE_FILES.md` as the course source of truth.
- Do not move, delete, rename, or commit the course HTML source files listed in `docs/COURSE_SOURCE_FILES.md` unless the user explicitly asks for that exact file operation.
- Before claiming deployment work is complete, run the static export build and sitemap checks documented in `docs/CLOUDFLARE_PAGES_DEPLOY.md`.
