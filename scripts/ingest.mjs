import { readdir, readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INBOX = 'public/inbox';
const OUT = 'public/assets/y';

// folder name -> series id (matches gallery.json image keys)
const SERIES = ['azure','desert','gilded','eternity','silent','crimson','urban','wild','studio','artist','cover'];

async function run() {
  if (!existsSync(INBOX)) { console.log('inbox empty - nothing to do'); return; }
  await mkdir(OUT, { recursive: true });
  const folders = await readdir(INBOX, { withFileTypes: true });
  let processed = 0;

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const key = folder.name.toLowerCase();
    const seriesId = SERIES.find((s) => key.includes(s)) || key;
    const dir = path.join(INBOX, folder.name);
    const files = (await readdir(dir))
      .filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f))
      .sort();

    for (let i = 0; i < files.length; i++) {
      const src = path.join(dir, files[i]);
      const name = `${seriesId}-${i + 1}.jpg`;
      const dest = path.join(OUT, name);
      // Optimize: cap width 1600, progressive, high quality, strip metadata
      await sharp(src, { failOn: 'none' })
        .rotate() // respect EXIF orientation
        .resize({ width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 86, progressive: true, mozjpeg: true, optimiseScans: true })
        .toFile(dest + '.tmp');
      await writeFile(dest, await readFile(dest + '.tmp'));
      await rm(dest + '.tmp');
      processed++;
      console.log('optimized:', src, '->', dest);
    }
  }
  console.log(`INGEST DONE: ${processed} assets optimized into ${OUT}`);
}

run().catch((e) => { console.error(e); process.exit(1); });
