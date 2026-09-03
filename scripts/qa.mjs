import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/assets/y';

async function ahash(buf) {
  const { data } = await sharp(buf).grayscale().resize(8, 8, { fit: 'fill' })
    .raw().toBuffer({ resolveWithObject: true });
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  return data.map((v) => (v > avg ? 1 : 0)).join('');
}
const ham = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };

async function main() {
  const files = (await readdir(DIR)).filter((f) => /\.jpe?g$/i.test(f)).sort();
  const items = [];
  for (const f of files) {
    const buf = await readFile(path.join(DIR, f));
    const m = await sharp(buf).metadata();
    items.push({ f, w: m.width, h: m.height, hash: await ahash(buf) });
  }
  let issues = 0;
  for (const it of items) {
    if (Math.min(it.w, it.h) < 500) { console.log('LOW-RES ' + it.f + ' ' + it.w + 'x' + it.h); issues++; }
  }
  for (let i = 0; i < items.length; i++)
    for (let j = i + 1; j < items.length; j++)
      if (ham(items[i].hash, items[j].hash) <= 6) { console.log('DUPLICATE ' + items[i].f + ' ~ ' + items[j].f); issues++; }
  console.log(issues ? 'QA: ' + issues + ' issue(s)' : 'QA: clean');
}
main();
