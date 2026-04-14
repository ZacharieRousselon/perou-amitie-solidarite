/**
 * Script de conversion WebP
 * Usage: node scripts/convert-webp.mjs
 * Convertit tous les JPG/PNG de public/assets/images/ en WebP (qualité 80, max 1280px)
 * Les originaux sont conservés comme fallback.
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const INPUT_DIR = 'public/assets/images';
const MAX_WIDTH = 1280;
const WEBP_QUALITY = 80;
const SUPPORTED = ['.jpg', '.jpeg', '.png'];

let converted = 0, skipped = 0, failed = 0;

const files = await readdir(INPUT_DIR);

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.includes(ext)) { skipped++; continue; }

  const inputPath  = join(INPUT_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(INPUT_DIR, outputName);

  // Skip si le WebP est déjà à jour
  try {
    const [inStat, outStat] = await Promise.all([stat(inputPath), stat(outputPath)]);
    if (outStat.mtimeMs > inStat.mtimeMs) { skipped++; continue; }
  } catch { /* le webp n'existe pas encore — on continue */ }

  try {
    const img = sharp(inputPath);
    const meta = await img.metadata();
    const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

    await img
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(outputPath);

    process.stdout.write(`✓ ${file.padEnd(60)} → ${outputName}\n`);
    converted++;
  } catch (err) {
    process.stderr.write(`✗ ${file}: ${err.message}\n`);
    failed++;
  }
}

console.log(`\nTerminé : ${converted} convertis, ${skipped} ignorés, ${failed} erreurs.`);
