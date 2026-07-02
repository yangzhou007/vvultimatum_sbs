# Game Wiki Template Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current game-specific static wiki into a safer reusable game wiki mother template without adding backend features or new content categories. A later course-alignment pass added optional analytics and controlled banner ad hooks because the launch course treats them as deployment requirements.

**Architecture:** Keep the existing Next.js static export architecture and MDX content model. Add a small shared site configuration module for reusable site identity, URLs, official links, active codes, and legal copy; keep game-specific example content in place but remove scattered hard-coded behavior from layout, metadata, header, footer, JSON-LD, home trailer, and legal pages.

**Tech Stack:** Next.js App Router, TypeScript, MDX content, next-intl, Tailwind CSS, Cloudflare Pages static export, Node.js validation scripts.

---

## File Map

- Create `src/config/site.ts`: single source for public site identity, required site URL, images, trailer video ID, official links, active sidebar codes, footer links, and legal page copy.
- Create `scripts/check-internal-links.mjs`: scans `out/**/*.html` for internal `<a href>` links and fails when an exported HTML target is missing.
- Create `scripts/check-internal-links.test.mjs`: Node test runner coverage for the internal-link scanner.
- Modify `package.json`: add `check:internal-links` and run it after static export checks in `build`.
- Modify `src/config/navigation.ts`: remove empty `/updates` from exported content types until real update content exists.
- Modify `src/components/site.tsx`: read brand, official links, footer links, active codes, and trailer thumbnail alt from `SITE_CONFIG`.
- Modify `src/components/locale-shell.tsx`: read Organization JSON-LD from `SITE_CONFIG`.
- Modify `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, `src/app/[locale]/[...slug]/page.tsx`: read `siteUrl`, site name, descriptions, images, and publisher data from `SITE_CONFIG`.
- Modify `src/app/[locale]/HomePageClient.tsx`: read trailer video ID, CTA hrefs, and official game URL from `SITE_CONFIG`.
- Modify `src/app/[locale]/about/page.tsx`, `src/app/[locale]/privacy-policy/page.tsx`, `src/app/[locale]/terms-of-service/page.tsx`, `src/app/[locale]/copyright/page.tsx`: render copy from `SITE_CONFIG.legalPages`.
- Modify `public/manifest.json`: make it neutral enough for template use, while keeping static JSON for now.
- Modify `docs/CLOUDFLARE_PAGES_DEPLOY.md`: document that analytics and ad variables are reserved/not wired unless the child site implements components, and local builds require `NEXT_PUBLIC_SITE_URL`.

## Out of Scope

- Do not add a `builds` content category.
- Do not add backend, auth, database, Workers, D1, R2, payment, or server runtime.
- Do not implement Popunder, Social Bar, Smartlink, or other aggressive ad formats.
- Do not batch-delete the existing example MDX content in this cleanup; centralize template configuration and fix reusable-template hard failures first.

## Task 1: Baseline Branch and Plan

**Files:**
- Create: `docs/superpowers/plans/2026-07-02-template-cleanup.md`

- [ ] **Step 1: Confirm branch and clean workspace**

Run:

```bash
git status --short --branch
```

Expected: current branch is `codex/template-cleanup` and no unrelated tracked changes exist.

- [ ] **Step 2: Save this implementation plan**

Use `apply_patch` to create this file.

- [ ] **Step 3: Track execution status**

Use the task plan tracker with these phases: plan, link gate, hard fixes, site config, migration, docs, verification, commit/push.

## Task 2: Internal Link Checker, Test First

**Files:**
- Create: `scripts/check-internal-links.test.mjs`
- Create: `scripts/check-internal-links.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing Node tests for link scanning**

Create `scripts/check-internal-links.test.mjs` with tests that import `findBrokenInternalLinks` from `scripts/check-internal-links.mjs`. Cover these cases:

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { findBrokenInternalLinks } from "./check-internal-links.mjs";

function makeOutDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "internal-links-"));
}

function writeFile(root, relativePath, contents) {
  const target = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents);
}

test("reports missing internal HTML targets", () => {
  const outDir = makeOutDir();
  writeFile(outDir, "index.html", '<a href="/missing">Missing</a>');

  const failures = findBrokenInternalLinks(outDir);

  assert.equal(failures.length, 1);
  assert.equal(failures[0].href, "/missing");
  assert.equal(failures[0].from, "index.html");
});

test("accepts exported html, assets, hashes, queries, mailto, and external links", () => {
  const outDir = makeOutDir();
  writeFile(outDir, "index.html", [
    '<a href="/">Home</a>',
    '<a href="/guide">Guide</a>',
    '<a href="/guide/page?utm=test#top">Guide page</a>',
    '<a href="/images/hero.webp">Image</a>',
    '<a href="https://example.com">External</a>',
    '<a href="mailto:test@example.com">Email</a>',
  ].join(""));
  writeFile(outDir, "guide.html", "guide");
  writeFile(outDir, "guide/page.html", "page");
  writeFile(outDir, "images/hero.webp", "image");

  const failures = findBrokenInternalLinks(outDir);

  assert.deepEqual(failures, []);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run:

```bash
node --test scripts/check-internal-links.test.mjs
```

Expected: fails because `scripts/check-internal-links.mjs` does not exist or does not export `findBrokenInternalLinks`.

- [ ] **Step 3: Implement minimal scanner**

Create `scripts/check-internal-links.mjs` that:
- Recursively reads `out/**/*.html`.
- Extracts `href="..."`.
- Checks only same-site internal links beginning with `/`.
- Ignores `/_next/`, `/images/`, `/ads/`, common static file extensions, hashes, queries, external URLs, `mailto:`, `tel:`, and non-page assets.
- Treats `/path`, `/path/`, `/path?x`, and `/path#x` as valid only if `out/path.html` or `out/path/index.html` exists.
- Exports `findBrokenInternalLinks(outDir)`.
- When run directly, checks `process.argv[2] || "out"` and exits non-zero with readable failures.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
node --test scripts/check-internal-links.test.mjs
```

Expected: 3 tests pass.

- [ ] **Step 5: Wire script into package commands**

Modify `package.json`:

```json
"build": "next build && node scripts/copy-default-locale-to-root.mjs && node scripts/check-static-export.mjs && node scripts/check-internal-links.mjs",
"check:internal-links": "node scripts/check-internal-links.mjs",
```

- [ ] **Step 6: Prove the new gate catches current broken links**

Run:

```bash
npm run build
```

Expected: Next static export succeeds, then `check-internal-links.mjs` fails on `/beginner-guide` and `/builds`.

## Task 3: Fix Current Hard Failures

**Files:**
- Modify: `src/components/site.tsx`
- Modify: `src/config/navigation.ts`
- Modify: `src/locales/en.json`
- Modify: `src/locales/ja.json`

- [ ] **Step 1: Fix footer links to existing pages**

Change footer guide links so:
- Guide Index points to `/guide`.
- Build Guides points to `/guide`.

- [ ] **Step 2: Remove empty updates content type**

Remove this entry from `NAVIGATION_CONFIG`:

```ts
{ key: "updates", path: "/updates", icon: Zap, isContentType: true },
```

Also remove the unused `Zap` import if it is no longer needed.

- [ ] **Step 3: Remove stale updates nav copy**

Remove or leave harmless locale keys only if no component references them. The target state is no visible `/updates` nav link and no `/updates` sitemap URL.

- [ ] **Step 4: Run link gate**

Run:

```bash
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
```

Expected: build and internal-link check pass once current hard failures are fixed.

## Task 4: Required Site URL and Shared Site Config

**Files:**
- Create: `src/config/site.ts`
- Modify: all files currently using the old hard-coded production site URL fallback.

- [ ] **Step 1: Write a failing required-env test**

Add a Node test in `scripts/check-internal-links.test.mjs` or a new config-focused test only if importing TypeScript config is practical without adding test dependencies. If not practical, use build verification as the fail-fast test:

```bash
unset NEXT_PUBLIC_SITE_URL; npm run build
```

Expected after implementation: build fails with a clear `Missing required environment variable: NEXT_PUBLIC_SITE_URL` message.

- [ ] **Step 2: Add `src/config/site.ts`**

Create a TypeScript config module with:
- `getRequiredEnv(name: string): string`
- `SITE_CONFIG.siteUrl`
- `SITE_CONFIG.gameName`
- `SITE_CONFIG.siteName`
- `SITE_CONFIG.shortName`
- `SITE_CONFIG.logoText`
- `SITE_CONFIG.description`
- `SITE_CONFIG.defaultTitle`
- `SITE_CONFIG.heroImage`
- `SITE_CONFIG.trailerThumbnail`
- `SITE_CONFIG.trailerYoutubeId`
- `SITE_CONFIG.officialLinks`
- `SITE_CONFIG.activeCodes`
- `SITE_CONFIG.footerGuideLinks`
- `SITE_CONFIG.legalPages`

- [ ] **Step 3: Replace URL fallbacks**

Replace all direct old production site URL fallback usage with `SITE_CONFIG.siteUrl`.

- [ ] **Step 4: Verify missing env fails**

Run:

```bash
unset NEXT_PUBLIC_SITE_URL; npm run build
```

Expected: build fails early with the missing env message.

- [ ] **Step 5: Verify env-present build passes**

Run:

```bash
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
```

Expected: build passes.

## Task 5: Migrate Template Identity to Config

**Files:**
- Modify: `src/components/site.tsx`
- Modify: `src/components/locale-shell.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/[locale]/page.tsx`
- Modify: `src/app/[locale]/[...slug]/page.tsx`
- Modify: `src/app/[locale]/HomePageClient.tsx`
- Modify: legal page files under `src/app/[locale]/`

- [ ] **Step 1: Header reads config**

Header logo text and visible brand read from `SITE_CONFIG.logoText` and `SITE_CONFIG.gameName`.

- [ ] **Step 2: Footer reads config**

Footer hero label, quick external links, guide links, and copyright-adjacent site identity read from config plus locale messages.

- [ ] **Step 3: Sidebar active codes read config**

Replace hard-coded launch codes with `SITE_CONFIG.activeCodes`.

- [ ] **Step 4: Metadata and JSON-LD read config**

Use `SITE_CONFIG.siteName`, `SITE_CONFIG.siteUrl`, `SITE_CONFIG.heroImage`, and `SITE_CONFIG.description` for layout metadata, homepage WebSite JSON-LD, Organization JSON-LD, Article author/publisher, and list page fallbacks.

- [ ] **Step 5: Home trailer and CTAs read config**

Use `SITE_CONFIG.trailerYoutubeId`, `SITE_CONFIG.footerGuideLinks.beginnerGuide`, and `SITE_CONFIG.officialLinks.game` in `HomePageClient`.

- [ ] **Step 6: Legal pages read config**

Use `SITE_CONFIG.legalPages.about`, `privacyPolicy`, `termsOfService`, and `copyright`.

- [ ] **Step 7: Run focused checks**

Run:

```bash
npx tsc --noEmit
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
```

Expected: both pass.

## Task 6: Manifest and Deployment Docs

**Files:**
- Modify: `public/manifest.json`
- Modify: `docs/CLOUDFLARE_PAGES_DEPLOY.md`

- [ ] **Step 1: Neutralize static manifest**

Change manifest text from game-specific copy to reusable game wiki template copy. Keep icons and colors unchanged for this cleanup.

- [ ] **Step 2: Document required local env**

Update local build commands to show:

```bash
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
```

- [ ] **Step 3: Mark analytics/ad variables as reserved**

Clarify that GA, Clarity, AdSense, and ad slot variables are optional/reserved and are not rendered unless a child site adds the corresponding components.

- [ ] **Step 4: Update deployment acceptance**

Remove `/updates` from preview acceptance. Add `npm run check:internal-links` to acceptance commands.

## Task 7: Final Verification and Git Finish

**Files:**
- All modified files.

- [ ] **Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: exit 0.

- [ ] **Step 2: Run full static build with required site URL**

```bash
NEXT_PUBLIC_SITE_URL=https://example.wiki npm run build
```

Expected: exit 0; static export and internal link checks pass.

- [ ] **Step 3: Run sitemap URL check against local preview**

Start:

```bash
npm run preview:static -- --port 8788
```

Then run:

```bash
npm run check:urls
```

Expected: sitemap URLs return 200 at `http://localhost:8788`.

- [ ] **Step 4: Run internal link check explicitly**

```bash
npm run check:internal-links
```

Expected: exit 0.

- [ ] **Step 5: Check git status and diff**

```bash
git status --short
git diff --stat
```

Expected: only planned files changed.

- [ ] **Step 6: Commit and push**

```bash
git add <planned files>
git commit -m "chore: clean game wiki mother template"
git push -u origin codex/template-cleanup
```

Expected: branch pushed for review.
