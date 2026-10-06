// Converts original screenshots in assets/projects/<slug>/ to WebP in public/projects/<slug>/.
//
//   cover.*            → max 1600px wide
//   portrait images    → max 800px wide (phone screenshots)
//   everything else    → max 1200px wide (gallery)
//
// Each output must be ≤ 250 KB: quality steps down until it fits, and the script
// fails if it still doesn't. Unchanged sources are skipped; pass --force to redo all.

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "assets/projects";
const OUT_DIR = "public/projects";
const INPUT_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const MAX_BYTES = 250 * 1024;
const QUALITY_STEPS = [82, 75, 68, 60, 52];
const WIDTH = { cover: 1600, mobile: 800, desktop: 1200 };

const force = process.argv.includes("--force");

async function exists(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}

async function targetWidth(src) {
  if (path.parse(src).name === "cover") return WIDTH.cover;
  const { width = 0, height = 0 } = await sharp(src).metadata();
  return height > width ? WIDTH.mobile : WIDTH.desktop;
}

async function encode(src, width) {
  for (const quality of QUALITY_STEPS) {
    const buffer = await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    if (buffer.length <= MAX_BYTES) return { buffer, quality };
  }
  return null;
}

async function optimize(src, out) {
  const srcStat = await stat(src);
  const outStat = await exists(out);
  if (!force && outStat && outStat.mtimeMs >= srcStat.mtimeMs) return "skipped";

  const width = await targetWidth(src);
  const result = await encode(src, width);
  if (!result) {
    throw new Error(
      `${src} is over ${MAX_BYTES / 1024} KB even at quality ${QUALITY_STEPS.at(-1)}. Crop or split it.`,
    );
  }

  await sharp(result.buffer).toFile(out);
  const kb = Math.round(result.buffer.length / 1024);
  console.log(`  ${out}  (≤${width}px, q${result.quality}, ${kb} KB)`);
  return "written";
}

async function main() {
  if (!(await exists(SRC_DIR))) {
    console.log(`images: no ${SRC_DIR}/ folder, nothing to do`);
    return;
  }

  const counts = { written: 0, skipped: 0 };
  const slugs = await readdir(SRC_DIR, { withFileTypes: true });

  for (const slug of slugs.filter((d) => d.isDirectory())) {
    const srcDir = path.join(SRC_DIR, slug.name);
    const outDir = path.join(OUT_DIR, slug.name);
    await mkdir(outDir, { recursive: true });

    const files = (await readdir(srcDir)).filter((f) =>
      INPUT_EXT.has(path.extname(f).toLowerCase()),
    );
    for (const file of files) {
      const out = path.join(outDir, `${path.parse(file).name}.webp`);
      counts[await optimize(path.join(srcDir, file), out)]++;
    }
  }

  console.log(`images: ${counts.written} written, ${counts.skipped} unchanged`);
}

main().catch((err) => {
  console.error(`images: ${err.message}`);
  process.exit(1);
});
