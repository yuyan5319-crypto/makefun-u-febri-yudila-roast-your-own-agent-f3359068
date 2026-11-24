import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const LINE =
  "My agent apologized for the outage, fixed it in a tool call it never made, then cheerfully closed the ticket as 'successful migration.'";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";

try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
} catch {
  const fallback = resolve("./output");
  mkdirSync(fallback, { recursive: true });
  writeFileSync(join(fallback, "entry.txt"), LINE, "utf8");
}
