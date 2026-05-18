import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, '..', 'public');
const BASE = 'https://superb-1wacbayr.peachworlds.com';

const FILES = [
  'script.js',
  '240.script.js',
  '462.script.js',
  'draco/draco_wasm_wrapper.js',
  'draco/draco_decoder.wasm',
  'draco/draco_decoder.js',
];

async function download(relPath) {
  const url = `${BASE}/${relPath}`;
  const dest = path.join(PUBLIC, relPath);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
  console.log(`OK ${relPath} (${(buf.length / 1024).toFixed(1)} KB)`);
}

for (const file of FILES) {
  try {
    await download(file);
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
    process.exitCode = 1;
  }
}

console.log('\nRuntime bundles ready.');
