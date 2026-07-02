# Game Site Launch Checklist

Use this checklist before launching any child game wiki built from this mother template.

## 1. Child Repository Setup

- Create the child site as a separate repository.
- Do not put child-site branding, domain, keywords, ad keys, or content into this mother template.
- Set `NEXT_PUBLIC_SITE_URL` to the final production domain.
- Set `CLOUDFLARE_PAGES_PROJECT` for the child Pages project.
- Keep Cloudflare Pages static export as the deployment target.

## 2. Game Identity And Config

- Replace `SITE_CONFIG.gameName`, `siteName`, `shortName`, `logoText`, `description`, and `defaultTitle`.
- Replace `SITE_CONFIG.heroImage`, trailer thumbnail, and trailer YouTube ID if used.
- Set `SITE_CONFIG.contactEmail` to a real operator email.
- Fill official links for game, community, video, and builder/planner only when real.
- Update theme colors and favicon assets for the child site.
- Confirm manifest text matches the child game site.

## 3. Homepage Data

- Replace generic homepage copy in `src/locales/en.json`.
- Homepage title should target the main game query.
- Description should be natural and around normal search snippet length.
- Use real homepage modules for codes, beginner guide, map, tier list, bosses, classes/races, weapons, skills, builds, or progression.
- Every homepage module link should point to an existing exported route.
- Remove placeholder stats, placeholder codes, placeholder official links, and template wording before public launch.

## 4. Content And Navigation

- Generate content categories from the keyword set, not from old game structure.
- Add MDX files under `content/en/<content-type>/<slug>.mdx`.
- Each MDX file exports `metadata` with title, description, category, date, and optional image/summary/lastModified.
- Article body starts at H2; no article-level H1 in MDX.
- Keep one keyword / one intent per page.
- Remove or ignore old example content so old game URLs are not exported.
- Confirm nav, content directories, locale labels, and sitemap content types stay in sync.

## 5. SEO And Structured Data

- Build fails when `NEXT_PUBLIC_SITE_URL` is missing.
- Canonical, sitemap, robots, OG, Twitter, and JSON-LD use the child domain.
- `sitemap.xml` contains only intended child-site URLs.
- `robots.txt` includes the sitemap URL.
- Homepage has `WebSite`, `Organization`, and FAQ JSON-LD when FAQ exists.
- Article pages have `Article` and `BreadcrumbList` JSON-LD.
- Listing pages have `ItemList` JSON-LD.
- Each rendered page has exactly one H1.
- No public URL is prefixed with `/en`.

## 6. Legal, Contact, And Trust

- `/about` exists and describes the child site accurately.
- `/contact` exists and includes the real child-site contact email.
- `/privacy-policy`, `/terms-of-service`, and `/copyright` exist.
- Footer links include Contact, Privacy Policy, Terms, and HTML Sitemap.
- Do not claim official status unless the child site is actually official.

## 7. Analytics And Search Console

- Add the production domain to Google Search Console.
- Verify GSC, preferably through DNS.
- Submit `/sitemap.xml`.
- Configure GA4 if analytics are used.
- Configure Clarity if behavior diagnosis is used.
- Confirm scripts appear only when env variables are set.
- Link GSC and GA4 when appropriate.

## 8. Ads

- Configure `ads.txt` for the child site before AdSense review.
- Set `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` only for the child site.
- Set Adsterra banner env vars only for the child site.
- Keep empty or `0` ad env values when ads should be disabled.
- Do not enable Popunder, Social Bar, Smartlink, or aggressive redirect formats.
- Verify desktop and mobile ad rendering after deployment.
- Confirm no overlap, horizontal overflow, popup, or auto-redirect.

## 9. Required Local Verification

Run these commands before deploy:

```bash
npm ci --legacy-peer-deps
npx tsc --noEmit
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
npm run preview:static
npm run check:urls
npm run check:internal-links
```

Replace `https://example.wiki` with the child production domain.

Also verify:

- `/` returns 200.
- `/contact` returns 200.
- `/sitemap` returns 200.
- `/robots.txt` returns 200.
- `/sitemap.xml` returns 200.
- `/en` returns 404 or is not publicly exported.
- Old game article URLs return 404.
- Browser desktop and mobile views have no horizontal overflow.
- Browser console has no page error/warning relevant to the site.

## 10. Deployment Acceptance

Only claim launch/deployment complete when:

- Static export build passes.
- Sitemap URL check passes.
- Internal link check passes.
- Public pages render in browser on desktop and mobile.
- GSC, GA4, Clarity, and ad setup are either verified or explicitly not enabled for this child site.
- No old game name, old domain, old article URL, old video, old official link, or old ad key remains in exported output.
