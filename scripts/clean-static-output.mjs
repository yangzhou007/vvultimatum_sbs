import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

fs.rmSync(outDir, { recursive: true, force: true });
console.log("Removed stale static export directory: out/");
