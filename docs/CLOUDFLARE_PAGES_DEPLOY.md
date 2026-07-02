# Cloudflare Pages Deployment

This repository is a static Next.js game wiki mother template. The production target is Cloudflare Pages with prebuilt assets uploaded from GitHub Actions.

## Required GitHub Configuration

Create these repository variables:

- `CLOUDFLARE_PAGES_PROJECT`: Cloudflare Pages project name.
- `NEXT_PUBLIC_SITE_URL`: production site URL, for example `https://example.wiki`.
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- `NEXT_PUBLIC_MICROSOFT_CLARITY_ID`
- `NEXT_PUBLIC_GOOGLE_ADSENSE_ID`
- `NEXT_PUBLIC_AD_SOCIAL_BAR`
- `NEXT_PUBLIC_AD_NATIVE_BANNER`
- `NEXT_PUBLIC_AD_BANNER_728X90`
- `NEXT_PUBLIC_AD_BANNER_300X250`
- `NEXT_PUBLIC_AD_BANNER_468X60`
- `NEXT_PUBLIC_AD_SIDEBAR_160X600`
- `NEXT_PUBLIC_AD_SIDEBAR_160X300`
- `NEXT_PUBLIC_AD_MOBILE_320X50`

Create these repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

The Cloudflare API token needs permission to deploy the target Pages project.

## Local Commands

```bash
npm ci --legacy-peer-deps
npx tsc --noEmit
npm run build
npm run preview:static
npm run check:urls
```

`npm run build` writes the static site to `out/`, copies English pages from `out/en` to the root, removes `out/en`, and validates `sitemap.xml`.

## Cloudflare Pages Project

Create the Pages project before the first GitHub Actions deployment:

```bash
npx wrangler pages project create "$CLOUDFLARE_PAGES_PROJECT" --production-branch main
```

Then push to `main`. The workflow builds the static export and runs:

```bash
npx wrangler pages deploy out --project-name "$CLOUDFLARE_PAGES_PROJECT" --branch main
```

## DNS And Custom Domain

After the first Pages deployment:

1. Add the custom domain in Cloudflare Pages.
2. Point DNS to the Pages target Cloudflare shows.
3. Set `NEXT_PUBLIC_SITE_URL` to the final production URL.
4. Re-run the GitHub Actions deployment so sitemap, robots, Open Graph URLs, and canonical URLs use the final domain.

## Deployment Acceptance

The deployment is valid only when all of these pass:

- `out/index.html` exists.
- English root URLs are exported without `/en`.
- `out/en` does not exist after build.
- `out/sitemap.xml` contains no `/en/` URLs.
- Every sitemap URL maps to an exported HTML file.
- Preview URLs return HTTP 200 for `/`, `/bosses`, `/guide/vv-ultimatum-beginner-guide-2026`, `/ja`, `/ja/bosses`, `/robots.txt`, `/sitemap.xml`, and `/ads.txt`.
