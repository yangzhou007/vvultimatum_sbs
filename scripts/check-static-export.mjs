import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const requiredFiles = ["index.html", "sitemap.xml", "robots.txt", "ads.txt"];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

function htmlCandidates(pathname) {
  const normalized = decodeURIComponent(pathname).replace(/^\/+|\/+$/g, "");
  if (!normalized) return [path.join(outDir, "index.html")];
  return [
    path.join(outDir, `${normalized}.html`),
    path.join(outDir, normalized, "index.html"),
  ];
}

function hasHtmlForPath(pathname) {
  return htmlCandidates(pathname).some((candidate) => fs.existsSync(candidate));
}

if (!fs.existsSync(outDir)) {
  throw new Error("Missing out/ directory. Run npm run build first.");
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(outDir, file))) {
    fail(`Missing required static export file: out/${file}`);
  }
}

if (fs.existsSync(path.join(outDir, "en"))) {
  fail("out/en still exists. English pages must be copied to the root and the duplicate locale directory removed.");
}

const sitemapPath = path.join(outDir, "sitemap.xml");
const sitemap = fs.readFileSync(sitemapPath, "utf8");
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]));

if (locs.length === 0) {
  fail("sitemap.xml contains no <loc> entries.");
}

for (const loc of locs) {
  const url = new URL(loc);
  if (url.pathname === "/en" || url.pathname.startsWith("/en/")) {
    fail(`sitemap.xml must not expose English /en URLs: ${loc}`);
  }
  if (!hasHtmlForPath(url.pathname)) {
    const candidates = htmlCandidates(url.pathname).map((candidate) => path.relative(process.cwd(), candidate)).join(", ");
    fail(`No exported HTML file found for sitemap URL ${loc}. Checked: ${candidates}`);
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Static export check passed for ${locs.length} sitemap URLs.`);
