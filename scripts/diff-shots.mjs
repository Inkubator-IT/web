// Pixel-compares two screenshot sets produced by shoot.mjs.
//
//   node scripts/diff-shots.mjs baseline phase1
//
// Reports, per image, the share of pixels that differ beyond a small tolerance
// (JPEG-ish noise and sub-pixel AA shouldn't count as a regression).

import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const HERE = dirname(fileURLToPath(import.meta.url));
const [aName, bName] = process.argv.slice(2);

if (!aName || !bName) {
  console.error("usage: node scripts/diff-shots.mjs <setA> <setB>");
  process.exit(2);
}

const dirA = join(HERE, ".shots", aName);
const dirB = join(HERE, ".shots", bName);

const CHANNEL_TOLERANCE = 4; // out of 255

const raw = (file) =>
  sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const files = (await readdir(dirA)).filter((f) => f.endsWith(".png"));
let worst = 0;

for (const file of files.sort()) {
  let a, b;
  try {
    [a, b] = await Promise.all([raw(join(dirA, file)), raw(join(dirB, file))]);
  } catch {
    console.log(`  MISSING   ${file}`);
    worst = 100;
    continue;
  }

  if (a.info.width !== b.info.width || a.info.height !== b.info.height) {
    console.log(
      `  SIZE      ${file}  ${a.info.width}x${a.info.height} vs ${b.info.width}x${b.info.height}`,
    );
    worst = 100;
    continue;
  }

  let differing = 0;
  const px = a.info.width * a.info.height;
  for (let i = 0; i < a.data.length; i += 4) {
    if (
      Math.abs(a.data[i] - b.data[i]) > CHANNEL_TOLERANCE ||
      Math.abs(a.data[i + 1] - b.data[i + 1]) > CHANNEL_TOLERANCE ||
      Math.abs(a.data[i + 2] - b.data[i + 2]) > CHANNEL_TOLERANCE
    ) {
      differing++;
    }
  }

  const pct = (differing / px) * 100;
  worst = Math.max(worst, pct);
  const verdict =
    pct === 0 ? "IDENTICAL" : pct < 0.1 ? "~same    " : "DIFFERENT";
  console.log(`  ${verdict} ${file}  ${pct.toFixed(4)}% pixels differ`);
}

console.log(`\nWorst difference: ${worst.toFixed(4)}%`);
process.exitCode = worst >= 0.1 ? 1 : 0;
