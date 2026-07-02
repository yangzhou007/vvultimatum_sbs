# Game Site Course Operating Rules

This document translates the local course HTML files into project operating rules for this static game wiki mother template and its generated child sites. It is an execution guide, not a full transcript of the course.

## Source Priority

- Use the HTML files listed in `docs/COURSE_SOURCE_FILES.md` as the course source of truth.
- The combined links document is a companion source for clickable links and cross-lesson references, not a replacement for the individual lesson HTML files.

## Core Strategy

- Build many focused game wiki / guide sites quickly; do not over-polish the first few sites.
- Pick games from real search demand, not personal preference.
- Treat each page as one keyword / one search intent.
- Homepage targets the main game term. Inner pages target long-tail intent such as codes, beginner guide, map, tier list, bosses, races/classes, weapons, skills, builds, and progression.
- Improve the template based on ranking, indexing, traffic, and competitor evidence, not subjective UI preference.
- Do not keep rewriting launched sites without evidence. Apply lessons to the next site unless a live issue blocks indexing, UX, ads, or deployment.

## Keyword And Site Selection

- Use Google Trends, keyword difficulty, SERP competition, video/social activity, and game type together.
- Prefer rising or newly rising games where the trend is not already collapsing.
- For new sites, prefer lower-difficulty opportunities. KD under 30 is easier; 30-60 is medium; high-KD main terms need long-tail pages.
- If the main SERP is dominated by Fandom, official wiki, large media, or mature guide sites, target long-tail pages first.
- Roblox games are often good wiki candidates because codes, tier lists, progression, maps, and guide keywords repeat across titles.
- Avoid risky keyword groups around cheats, hacks, exploits, scripts, pastebin, auto farm, no-key, or infinite money.

## Template Architecture

- Keep this repository as a static game wiki mother template.
- Child-site game branding, content, domain, keywords, and ad keys belong in child repositories.
- Keep English public URLs unprefixed: `/`, `/codes`, `/guide`, not `/en`.
- Cloudflare Pages static export is the production architecture.
- Do not add backend, auth, payments, database, Workers, D1, R2, mkfast, mksaas, or TanStack unless the user explicitly changes the architecture.
- Keep the framework, config, and content layers separate:
  - Framework: routing, layout, MDX rendering, sitemap, robots, SEO, ads/analytics hooks.
  - Config: site identity, official links, contact email, nav, theme, media, env keys.
  - Content: MDX articles and locale JSON copy.

## Homepage Requirements

- First viewport must clearly signal the game / site identity.
- Homepage should include useful sections for the target game, not generic decoration.
- Use real official links, real media, real gameplay facts, and real page modules in child sites.
- Homepage modules should link to real internal pages or category pages.
- If no article exists yet, show a clear empty state rather than broken links.
- Avoid old game names, old official links, old videos, old codes, and old non-English residues.

## Article And Content Rules

- MDX articles use JavaScript metadata export, not YAML frontmatter.
- Article body starts from H2; the page component owns the single H1.
- Each article should target one keyword / one search intent.
- Add useful tables, step-by-step guidance, FAQ, and source links when relevant.
- Keep keyword use natural. Avoid stuffing the game name into every nav label, heading, and title.
- Link new pages to relevant old pages and old pages to relevant new pages.
- Every public page should be discoverable through sitemap or internal links.

## SEO Rules

- `NEXT_PUBLIC_SITE_URL` is required. Builds must fail if it is missing.
- Do not hard-code production domains in sitemap, canonical, OG, Twitter, or JSON-LD.
- Generate sitemap from actual exported routes and MDX content, not hard-coded article arrays.
- `robots.txt` must allow crawl and declare the sitemap URL.
- Every public page should have canonical metadata and OG/Twitter metadata.
- Use structured data:
  - Global / homepage: `WebSite` and `Organization`.
  - Article detail pages: `Article` and `BreadcrumbList`.
  - Listing pages: `ItemList`.
  - FAQ sections: `FAQPage`.
- Image alt text should describe the actual game/media.
- Legal/support pages should exist for launch: About, Contact, Privacy Policy, Terms, Copyright.
- Provide an HTML sitemap and link it from the footer.

## Analytics And Indexing

- Before diagnosing traffic, confirm:
  - HTTPS works.
  - GSC is verified.
  - `sitemap.xml` is submitted and accepted.
  - GA4 is installed when the child site uses analytics.
  - Clarity is installed when the child site uses behavior diagnostics.
  - At least two days of data have passed.
- Use GSC to check indexing, queries, pages, impressions, CTR, and crawl issues.
- If only the homepage appears in GSC, strengthen homepage/category/internal links and confirm the sitemap.
- Use GA4 and Clarity to evaluate engagement, scroll depth, session behavior, and ad/UX issues.

## Ads And Monetization

- Ad keys belong in child repositories / deployment variables, not in this mother template.
- Empty ad env values or `0` must render no ad scripts and no ad DOM.
- AdSense support requires:
  - `ads.txt` configured for the child site.
  - `google-adsense-account` meta when `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is set.
  - AdSense script when `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is set.
- Adsterra banner slots should be isolated so `window.atOptions` does not collide across placements.
- Avoid Popunder, Social Bar, Smartlink, or aggressive redirect formats for guide sites.
- Keep ads below content usefulness: do not let mobile first screen become mostly ads.
- Verify ads on desktop and mobile after enabling keys. Confirm no auto-redirect, popup, overlap, or horizontal overflow.

## Deployment Rules

- Build output must be clean before each export; do not upload stale `out/` files.
- `out/en`, `out/en.html`, and `out/en.txt` must not exist after build.
- `sitemap.xml` must not contain `/en` URLs or old game URLs.
- Every sitemap URL must map to exported HTML.
- Internal links in exported HTML must resolve to exported pages or allowed assets.
- Before claiming deployment complete, run the commands in `docs/CLOUDFLARE_PAGES_DEPLOY.md`.

## Backlinks

- Do not rush backlinks before the site proves indexing or traffic potential.
- Prioritize launch speed, SEO basics, content usefulness, and UX first.
- When doing backlink work, use competitor backlink research and avoid fake high-DR signals.
- Backlink operations, accounts, IPs, and outreach are child-site / operator work, not mother-template code.
