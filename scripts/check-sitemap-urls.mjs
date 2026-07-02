const baseUrl = new URL(process.argv[2] || process.env.SITE_BASE_URL || "http://localhost:8788");

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

async function main() {
  const sitemapUrl = new URL("/sitemap.xml", baseUrl);
  const sitemapResponse = await fetch(sitemapUrl);
  if (sitemapResponse.status !== 200) {
    throw new Error(`Expected ${sitemapUrl} to return 200, got ${sitemapResponse.status}.`);
  }

  const sitemap = await sitemapResponse.text();
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]));
  if (locs.length === 0) {
    throw new Error("sitemap.xml contains no <loc> entries.");
  }

  const failures = [];
  for (const loc of locs) {
    const pathname = new URL(loc).pathname;
    const target = new URL(pathname, baseUrl);
    const response = await fetch(target, { redirect: "manual" });
    if (response.status !== 200) {
      failures.push(`${target} -> ${response.status}`);
    }
  }

  if (failures.length > 0) {
    throw new Error(`Sitemap URL check failed:\n${failures.join("\n")}`);
  }

  console.log(`Sitemap URL check passed for ${locs.length} URLs at ${baseUrl.origin}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
