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
  writeFile(
    outDir,
    "index.html",
    [
      '<a href="/">Home</a>',
      '<a href="/guide">Guide</a>',
      '<a href="/guide/page?utm=test#top">Guide page</a>',
      '<a href="/images/hero.webp">Image</a>',
      '<a href="https://example.com">External</a>',
      '<a href="mailto:test@example.com">Email</a>',
    ].join(""),
  );
  writeFile(outDir, "guide.html", "guide");
  writeFile(outDir, "guide/page.html", "page");
  writeFile(outDir, "images/hero.webp", "image");

  const failures = findBrokenInternalLinks(outDir);

  assert.deepEqual(failures, []);
});

test("reports links to directories without exported index pages", () => {
  const outDir = makeOutDir();
  writeFile(outDir, "index.html", '<a href="/guide">Guide</a>');
  writeFile(outDir, "guide/child.html", "child");

  const failures = findBrokenInternalLinks(outDir);

  assert.equal(failures.length, 1);
  assert.equal(failures[0].href, "/guide");
  assert.equal(failures[0].from, "index.html");
});
