import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const STATIC_PREFIXES = ["/_next/", "/images/", "/ads/"];
const STATIC_FILE_PATTERN =
  /\.(avif|css|eot|gif|ico|jpeg|jpg|js|json|map|mjs|mp4|pdf|png|svg|ttf|txt|webmanifest|webm|webp|woff|woff2|xml|zip)$/i;

function listHtmlFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractHrefs(html) {
  return [...html.matchAll(/\shref=(["'])(.*?)\1/g)].map((match) => match[2]);
}

function stripHashAndQuery(href) {
  return href.split("#")[0].split("?")[0] || "/";
}

function shouldCheckHref(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  if (STATIC_PREFIXES.some((prefix) => href.startsWith(prefix))) return false;
  return !STATIC_FILE_PATTERN.test(stripHashAndQuery(href));
}

function htmlCandidates(outDir, href) {
  let pathname = stripHashAndQuery(href);

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Keep the original path if it is not valid URI-encoded text.
  }

  const normalized = pathname.replace(/^\/+|\/+$/g, "");
  if (!normalized) return [path.join(outDir, "index.html")];

  return [
    path.join(outDir, `${normalized}.html`),
    path.join(outDir, normalized, "index.html"),
  ];
}

function hasExportedTarget(outDir, href) {
  return htmlCandidates(outDir, href).some((candidate) => fs.existsSync(candidate));
}

export function findBrokenInternalLinks(outDir = path.join(process.cwd(), "out")) {
  const failures = [];
  const htmlFiles = listHtmlFiles(outDir);

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    const from = path.relative(outDir, file).split(path.sep).join("/");

    for (const href of extractHrefs(html)) {
      if (!shouldCheckHref(href)) continue;
      if (!hasExportedTarget(outDir, href)) {
        failures.push({ from, href });
      }
    }
  }

  return failures;
}

function main() {
  const outDir = path.resolve(process.argv[2] || "out");
  if (!fs.existsSync(outDir)) {
    console.error(`Missing static export directory: ${path.relative(process.cwd(), outDir)}`);
    process.exit(1);
  }

  const failures = findBrokenInternalLinks(outDir);
  if (failures.length > 0) {
    console.error(`Internal link check failed with ${failures.length} broken link occurrence(s):`);
    for (const failure of failures) {
      console.error(`- ${failure.href} <- ${failure.from}`);
    }
    process.exit(1);
  }

  console.log(`Internal link check passed for ${listHtmlFiles(outDir).length} HTML files.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
