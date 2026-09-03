import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INBOX = 'public/inbox';
const OUT = 'public/assets/y';
const MIN_EDGE = 500;          // quality gate: reject tiny/blurry sources
const SERIES = ['azure','desert','gilded','eternity','silent','crimson','urban','wild','studio','artist','cover'];

// ---- perceptual hash (aHash) for dedup ----
async function ahash(buf) {
  const { data } = await sharp(buf).grayscale().resize(8, 8, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  return data.map((v) => (v > avg ? 1 : 0)).join('');
}
const hamming = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };

// ---- dominant hue bucket for auto-classifying flat dumps ----
async function hueBucket(buf) {
  const { data } = await sharp(buf).resize(24, 24).raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, n = data.length / 3;
  for (let i = 0; i < data.length; i += 3) { r += data[i]; g += data[i + 1]; b += data[i + 2]; }
  r /= n; g /= n; b /= n;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const sat = (mx - mn) / (mx || 1);
  if (sat < 0.10) return r < 90 ? 'silent' : 'urban';
  if (g > r * 1.08 && g > b * 1.08) return 'wild';
  if (r > 150 && g > 60 && g < 150 && b < 100) return 'desert';
  if (b > r * 1.1) return 'azure';
  if (r > 120 && Math.abs(r - g) < 40 && r - b > 30) return 'gilded';
  if (r > 170 && g > 170 && b > 170) return 'eternity';
  if (r > g * 1.3 && r > b * 1.3) return 'crimson';
  return 'studio';
}

async function collectFiles(dir) {
  const out = [];
  const walk = async (d) => {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.(jpe?g|png|webp|heic|tiff?)$/i.test(e.name)) out.push(p);
    }
  };
  await walk(dir);
  return out.sort();
}

async function run() {
  if (!existsSync(INBOX)) { console.log('inbox empty'); return; }
  await mkdir(OUT, { recursive: true });
  const seenHashes = [];
  const counters = {};
  const report = [];

  for (const file of await collectFiles(INBOX)) {
    const buf = await readFile(file);
    const meta = await sharp(buf, { failOn: 'none' }).metadata();
    const edge = Math.min(meta.width || 0, meta.height || 0);

    // quality gate
    if (edge < MIN_EDGE) { report.push(`SKIP low-res ${path.basename(file)} (${edge}px)`); continue; }

    // dedup gate
    const h = await ahash(buf);
    if (seenHashes.some((x) => hamming(x, h) <= 6)) { report.push(`SKIP duplicate ${path.basename(file)}`); continue; }
    seenHashes.push(h);

    // series: folder name wins, else auto-classify by hue
    const rel = path.relative(INBOX, file);
    const top = rel.split(path.sep)[0].toLowerCase();
    const series = SERIES.find((s) => top.includes(s)) || (rel.includes(path.sep) ? top : await hueBucket(buf));
    const key = SERIES.includes(series) ? series : 'studio';
    counters[key] = (counters[key] || 0) + 1;
    const dest = path.join(OUT, `${key}-${counters[key]}.jpg`);

    await sharp(buf, { failOn: 'none' })
      .rotate()                                   // auto-orient EXIF
      .resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 86, progressive: true, mozjpeg: true, optimiseScans: true })
      .toFile(dest + '.tmp');
    await writeFile(dest, await readFile(dest + '.tmp'));
    await rm(dest + '.tmp');
    report.push(`OK ${path.basename(file)} -> ${key}-${counters[key]}.jpg`);
  }

  console.log(report.join('\n'));
  console.log(`INGEST DONE: ${Object.values(counters).reduce((a, b) => a + b, 0)} assets published`);
}
run().catch((e) => { console.error(e); process.exit(1); });
