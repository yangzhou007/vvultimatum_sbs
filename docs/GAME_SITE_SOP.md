# Game Site SOP

This SOP turns the course HTML files into one executable workflow for launching static game wiki sites from this mother template.

## 0. Operating Principles

- Build many focused game wiki sites; do not over-polish the first few sites.
- Pick games from search demand, not personal preference.
- Go online fast when the keyword is fresh. Speed matters more than perfect automation before the first 10 sites.
- Treat one page as one keyword and one search intent.
- Use the launched site as feedback. Bring lessons into the next site unless a live issue blocks indexing, UX, ads, or deployment.
- Keep this repository as the mother template. Create each child game site as a separate repository.
- Keep Cloudflare Pages static export as the production architecture.

## 1. Keyword Discovery And Site Decision

### Input

- Candidate game name.
- Google Trends curve.
- Keyword difficulty or equivalent SEO difficulty signal.
- Google SERP for the main game term and `game name wiki`.
- Recent YouTube / TikTok / community activity.
- Basic game type: Roblox or non-Roblox.

### Steps

1. Check Google Trends first.
   - Keep rising or newly rising games.
   - Be careful with curves that already peaked and are falling.
   - Ignore short-lived spikes unless there is proof the game keeps updating or community demand continues.

2. Check keyword difficulty.
   - Prefer KD under 30 for early sites.
   - Treat KD 30-60 as medium difficulty.
   - For high difficulty main terms, only proceed if long-tail pages have clear demand.

3. Check Google SERP.
   - Search the game name directly.
   - Search `game name wiki`.
   - Record independent small sites on page one.
   - Watch whether SERP is dominated by Fandom, official wiki, large media, or mature guide sites.
   - If strong sites dominate the main term, target long-tail pages first.

4. Check game type.
   - Roblox games are often good candidates because codes, tier lists, progression, maps, and guide pages repeat across titles.
   - Non-Roblox games need stronger proof of lasting demand, official media, and enough content depth.

5. Reject risky or low-quality intent groups.
   - Do not build around cheats, hacks, exploits, scripts, pastebin, auto farm, no-key, infinite money, or similar terms.
   - Do not rely on keywords where user intent is only download piracy or account abuse.

### Output

Create a launch brief with:

- Game name.
- Target domain.
- Main keyword.
- Top 10 long-tail keywords.
- Game type.
- Trends verdict.
- SERP difficulty verdict.
- Go / no-go decision.
- Notes on competitor pages worth studying.

### Acceptance

Proceed only when the brief explains why the game can get search traffic and which pages will satisfy demand.

## 2. Competitor Selection And Reference Capture

### Input

- Approved game from stage 1.
- Google SERP results.
- Candidate independent game wiki / guide sites.

### Steps

1. Search the main game term, not only `game name wiki`.
2. Find independent small sites that rank despite low authority.
3. Check whether the site has useful structure:
   - Homepage.
   - Category / list page.
   - Article detail page.
   - Internal links.
   - Clear navigation.
   - High information density.
4. Pick one primary reference site. Do not merge many designs into one first version.
5. Capture:
   - Homepage screenshot.
   - List page screenshot.
   - Article page screenshot.
   - Header, sidebar, footer, mobile layout.
   - Ad positions if visible.
   - Structured sections and internal link patterns.

### Output

Save a short competitor note:

- Target URL.
- Homepage URL.
- List page URL.
- Article page URL.
- What to copy structurally.
- What not to copy.

### Acceptance

There is one clear reference target before design or template work starts.

## 3. Child Repository Setup

### Input

- Mother template.
- Launch brief.
- Target domain.
- Cloudflare Pages project name.

### Steps

1. Create a separate child repository.
2. Copy or fork the mother template into the child repository.
3. Keep public English URLs unprefixed.
4. Set required environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - `CLOUDFLARE_PAGES_PROJECT`
5. Keep child-specific values out of the mother template:
   - Game branding.
   - Domain.
   - Keywords.
   - Content.
   - Images.
   - Ad keys.
   - Analytics keys.

### Output

Child repository with template running locally.

### Acceptance

The child repository builds independently and does not require changing the mother template.

## 4. Game Data Collection

### Input

- Official game page.
- Official/community links.
- YouTube gameplay/tutorial/showcase videos.
- Google Trends related queries.
- Google Suggest.
- Similarweb or equivalent keyword data provided by the operator.
- YouTube titles and view counts.

### Steps

1. Create `00-basic-info.md` or equivalent launch notes for the child site.
2. Collect:
   - Game name.
   - Short name.
   - Platform.
   - Genre.
   - Release/update status.
   - Official game URL.
   - Discord/community URL.
   - YouTube or trailer URL.
   - Contact email.
   - Domain.
   - Theme colors.
   - Logo/favicon source.
   - Hero image source.
3. Create homepage module data.
   - Codes.
   - Beginner guide.
   - Tier list.
   - Maps.
   - Bosses.
   - Classes/races/factions.
   - Weapons/skills.
   - Builds/progression.
4. Create keyword data for inner pages.
   - Main keyword.
   - Long-tail keyword.
   - Search intent.
   - Suggested content type.
   - Priority.
   - Source signal.
5. Group keywords into site categories.
6. Remove duplicate intent. Do not create multiple pages for the same user question.

### Output

Requirements pack:

- `00-basic-info.md`
- `00-homepage-modules.md`
- `01-keywords.csv` or equivalent table
- `02-content-plan.md`
- Media source notes

### Acceptance

The site can be built from the requirements pack without guessing game facts.

## 5. Base Skin Replacement

### Input

- Child repository.
- Requirements pack.

### Steps

1. Replace site identity:
   - `SITE_CONFIG.gameName`
   - `siteName`
   - `shortName`
   - `logoText`
   - `description`
   - `defaultTitle`
   - `contactEmail`
   - official links
2. Replace media:
   - Hero image.
   - Trailer thumbnail.
   - Trailer YouTube ID.
   - Favicon assets.
   - Manifest text.
3. Replace theme colors in the existing theme system.
4. Replace legal and trust copy:
   - About.
   - Contact.
   - Privacy Policy.
   - Terms.
   - Copyright.
5. Remove old game residue:
   - Old game name.
   - Old domain.
   - Old article URLs.
   - Old official links.
   - Old video IDs.
   - Old images.
   - Old ad keys.

### Output

Child site has correct identity and no visible old-game branding.

### Acceptance

Global search for old game/domain terms returns no public output source except intentional ignore lists or migration notes.

## 6. Homepage Build

### Input

- Homepage module data.
- `src/locales/en.json`.
- Existing homepage component.

### Steps

1. Keep the homepage component generic.
2. Put homepage content in locale/config data, not hard-coded component text.
3. Set homepage title and description for the main game query.
4. Make the first viewport clearly identify the game/site.
5. Put the video module near the hero when a real gameplay/trailer video exists.
6. Build homepage sections from real game demand:
   - Latest updates or recent guides.
   - Starter guide.
   - Popular guides.
   - About game.
   - Feature modules.
   - FAQ.
   - Final CTA.
7. Link homepage modules only to existing exported routes.
8. If content does not exist yet, show a real empty state or keep the module informational.
9. Avoid placeholder stats, placeholder codes, fake official links, and generic template copy.

### Output

Homepage matching game demand and ready for indexing.

### Acceptance

Homepage has one H1, strong game identity, useful links, no broken internal links, and no old-game wording.

## 7. Article And Content Production

### Input

- Keyword table.
- Content plan.
- Game data sources.
- Existing MDX content model.

### Steps

1. Create articles under `content/en/<content-type>/<slug>.mdx`.
2. Use JavaScript metadata export.
3. Required metadata:
   - title
   - description
   - category
   - date
4. Optional metadata:
   - image
   - summary
   - lastModified
   - badge
5. Start article body from H2. Do not put H1 in MDX.
6. Match one page to one search intent.
7. Include useful content:
   - Direct answer near the top.
   - Tables when comparison helps.
   - Step-by-step instructions when the user needs action.
   - FAQ when search intent has repeated questions.
   - Internal links to related pages.
   - External source links only when useful and real.
8. Keep keyword usage natural.
9. Translate only after English content and routing work.
10. Remove old example content or exclude it from export.

### Output

Initial article set covering main long-tail opportunities.

### Acceptance

Every article has clear intent, metadata, exactly one rendered H1 through the page component, and useful internal links.

## 8. Navigation, Internal Links, And URL Structure

### Input

- Content categories.
- MDX files.
- Locale labels.
- Sitemap generation.

### Steps

1. Keep English URLs unprefixed.
2. Define navigation from actual content categories.
3. Keep nav labels short and useful.
4. Keep sidebar/category ordering stable.
5. Ensure every public page is discoverable through:
   - Header/footer nav.
   - Sidebar.
   - Homepage modules.
   - Article internal links.
   - XML sitemap.
   - HTML sitemap.
6. Do not add links to pages that do not exist.
7. Check old pages do not leak into sitemap.
8. Keep listing pages useful:
   - Category title.
   - Category description.
   - Article cards.
   - Empty state if no content exists.

### Output

Navigation and sitemap match exported content.

### Acceptance

Internal link checker passes and no public URL uses `/en`.

## 9. SEO Implementation

### Input

- Site config.
- Homepage content.
- MDX metadata.
- Production domain.

### Steps

1. Require `NEXT_PUBLIC_SITE_URL`.
2. Use the production domain for:
   - Canonical.
   - Sitemap.
   - Robots.
   - OG.
   - Twitter card.
   - JSON-LD.
3. Set metadata by page type:
   - Homepage: main game query.
   - Listing page: category query.
   - Article page: article keyword.
4. Use structured data:
   - Homepage: `WebSite`, `Organization`, FAQ when present.
   - Listing page: `ItemList`.
   - Article page: `Article`, `BreadcrumbList`, FAQ when present.
5. Use descriptive image alt text.
6. Configure robots:
   - Allow crawl.
   - Include sitemap URL.
7. Generate sitemap from actual routes and MDX content.
8. Provide HTML sitemap and footer link.

### Output

Search-ready static export.

### Acceptance

Rendered pages expose correct metadata and structured data for the child domain.

## 10. Local Verification Before Deploy

### Input

- Child repository.
- Production domain.

### Steps

Run:

```bash
npm ci --legacy-peer-deps
npx tsc --noEmit
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
npm run preview:static
npm run check:urls
npm run check:internal-links
```

Replace `https://example.wiki` with the real child domain.

Then verify:

- `/` returns 200.
- `/contact` returns 200.
- `/sitemap` returns 200.
- `/robots.txt` returns 200.
- `/sitemap.xml` returns 200.
- `/ads.txt` returns 200 when configured.
- `/en` is not publicly exported.
- Old game URLs return 404 or are absent.
- Browser desktop view has no horizontal overflow or blocking error.
- Browser mobile view has no overlap, hidden CTA, or horizontal overflow.
- Console has no relevant runtime error.

### Output

Build and preview verification record.

### Acceptance

Do not deploy until typecheck, static export, sitemap check, internal link check, and browser checks pass.

## 11. Cloudflare Pages Deployment

### Input

- Passing local verification.
- Cloudflare Pages project.
- Production environment variables.

### Steps

1. Configure Cloudflare Pages static export deployment.
2. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL`
   - analytics variables if enabled
   - ad variables if enabled
3. Deploy from the child repository.
4. Verify production URLs:
   - homepage
   - representative listing page
   - representative article page
   - contact/legal pages
   - sitemap
   - robots
   - ads.txt if used
5. Confirm production source does not contain old game/domain residue.

### Output

Live child site.

### Acceptance

Only claim launch complete after production pages render and sitemap/internal-link checks pass.

## 12. Search Console, Analytics, And Indexing

### Input

- Live production domain.
- Google Search Console.
- GA4 if used.
- Microsoft Clarity if used.

### Steps

1. Add the domain to Google Search Console.
2. Verify ownership, preferably through DNS.
3. Submit `/sitemap.xml`.
4. Install GA4 if analytics are used.
5. Install Clarity if behavior diagnosis is used.
6. Confirm analytics scripts appear only when env variables are set.
7. Wait at least two days before judging traffic.
8. Diagnose in this order:
   - Can Google access the site?
   - Is sitemap submitted and accepted?
   - Are pages discovered?
   - Are pages indexed?
   - Are impressions appearing?
   - Are rankings close enough to get clicks?
   - Are users bouncing because the page does not answer intent?

### Output

Indexing and analytics status note.

### Acceptance

GSC shows the domain and sitemap correctly; analytics are either verified or explicitly not enabled.

## 13. Ads And Monetization

### Input

- Live child site.
- AdSense or Adsterra account.
- Child-site ad keys.

### Steps

1. Do not put ad keys in the mother template.
2. Configure `ads.txt` for the child site.
3. For AdSense:
   - Add site in AdSense.
   - Verify domain ownership.
   - Add publisher ID through env.
   - Render AdSense script only when ID exists.
4. For Adsterra:
   - Add the child site in Adsterra.
   - Create ad units per site.
   - Use separate env vars for banner/sidebar/sticky slots.
   - Isolate banner scripts so global `window.atOptions` does not collide.
5. Do not enable Popunder, Social Bar, Smartlink, or aggressive redirect formats for guide sites.
6. Verify on desktop and mobile:
   - No popup.
   - No auto-redirect.
   - No layout overlap.
   - No horizontal overflow.
   - First screen is still useful content, not mostly ads.

### Output

Ad-enabled production site or documented no-ad launch.

### Acceptance

Ads render only when configured and do not break UX.

## 14. Post-Launch Diagnosis

### Input

- Production site.
- GSC data.
- GA4 / Clarity data if enabled.
- Google Trends.
- SERP snapshots.

### Steps

1. Do not diagnose traffic too early. Wait at least two days after deployment and sitemap submission.
2. Search Google manually:
   - game name
   - game name wiki
   - main long-tail pages
3. Check Trends:
   - If demand is falling, traffic drop may be keyword-side.
   - If demand is rising but impressions are absent, check indexing and internal links.
4. Check GSC:
   - submitted sitemap
   - indexed pages
   - impressions
   - average position
   - CTR
   - crawl errors
5. Check GA4:
   - sessions
   - engagement
   - source/medium
   - top pages
6. Check Clarity:
   - rage clicks
   - dead clicks
   - scroll depth
   - mobile usability issues
7. If only homepage appears:
   - strengthen homepage links to inner pages.
   - verify sitemap includes inner pages.
   - add HTML sitemap link in footer.
   - add relevant article-to-article links.
8. If pages are indexed but not clicked:
   - improve title and description.
   - make the answer clearer above the fold.
   - compare SERP competitors.
9. If ranking falls:
   - check whether the game trend fell.
   - check if stronger competitors appeared.
   - check if the site changed recently.
   - do not rewrite everything without evidence.

### Output

Diagnosis note with:

- confirmed facts
- likely cause
- one next action
- what not to change

### Acceptance

Every diagnosis is tied to GSC, SERP, Trends, GA, Clarity, or production behavior evidence.

## 15. Backlinks

### Input

- Site with indexing potential.
- Competitor backlink examples.
- Operator-managed accounts.

### Steps

1. Do not rush backlinks before the site proves indexing or traffic potential.
2. Use competitor backlink research to find relevant platform types.
3. Prioritize legitimate places:
   - relevant community posts
   - product/site directories
   - profile pages
   - article submissions
   - forum or Q&A discussions where the link adds context
4. Avoid fake high-authority signals, spam, irrelevant comments, and platform abuse.
5. Keep backlink work as operator work, not mother-template code.
6. Track:
   - source URL
   - target URL
   - anchor text
   - rel type
   - status
   - date

### Output

Backlink tracking sheet for child site operations.

### Acceptance

Backlinks are relevant, documented, and do not require code changes in the mother template.

## 16. Review And Iteration

### Input

- Launch record.
- Verification logs.
- GSC / GA / Clarity data.
- SERP snapshots.

### Steps

1. After each launched site, record:
   - chosen keyword
   - domain
   - launch date
   - build/deploy result
   - indexing status
   - early impressions/clicks
   - ranking snapshot
   - mistakes found
   - what to reuse next time
2. Do not keep rewriting launched sites without evidence.
3. If a problem is template-level, fix the mother template.
4. If a problem is child-specific content, fix only the child site.
5. If a problem is keyword demand, keep the lesson and move to the next game.

### Output

One short post-launch review per site.

### Acceptance

The next site starts with at least one concrete improvement from the previous site.

## 17. Codex Execution Protocol

Use this protocol when asking Codex to run the SOP.

1. Provide the target game name and domain.
2. Codex reads:
   - `docs/COURSE_SOURCE_FILES.md`
   - `docs/GAME_SITE_COURSE.md`
   - `docs/GAME_SITE_LAUNCH_CHECKLIST.md`
   - this SOP
   - the relevant child repository files
3. Codex creates or updates the child-site requirements pack.
4. Codex changes only the child repository unless the issue is truly mother-template-level.
5. Codex verifies with:
   - typecheck
   - static export build
   - sitemap check
   - internal link check
   - browser desktop/mobile check for user-visible pages
6. Codex reports:
   - changed files
   - dependency changes
   - verification commands
   - failed checks
   - residual risks
   - commit/push status when applicable

## 18. Stop Conditions

Stop and report the current state when:

- Required source files are missing.
- Domain or production target is unknown.
- External platform login, payment, permission, captcha, or account setup is required.
- A destructive file operation would affect files outside the current project.
- Build or verification fails and the failure is outside the current requested scope.
- The SOP conflicts with `AGENTS.md`; `AGENTS.md` wins.
