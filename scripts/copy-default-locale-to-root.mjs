import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const defaultLocaleDir = path.join(outDir, "en");

if (!fs.existsSync(outDir)) {
  throw new Error("Missing out/ directory. Run next build before copying the default locale.");
}

if (!fs.existsSync(defaultLocaleDir)) {
  throw new Error("Missing out/en directory. The default locale was not exported.");
}

for (const entry of fs.readdirSync(defaultLocaleDir)) {
  const source = path.join(defaultLocaleDir, entry);
  const target = path.join(outDir, entry);
  fs.cpSync(source, target, { recursive: true, force: true });
}

fs.rmSync(defaultLocaleDir, { recursive: true, force: true });
console.log("Copied default locale from out/en to out/ and removed out/en.");
