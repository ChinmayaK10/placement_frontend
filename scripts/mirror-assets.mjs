import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const ASSETS = path.join(PUBLIC, 'assets');
const BASE = 'https://superb-1wacbayr.peachworlds.com';

const URL_PATTERN =
  /https?:\/\/(?:files\.peachworlds\.com|pwb-uploads-staging\.s3\.amazonaws\.com|pwb-uploads-production\.s3\.amazonaws\.com|files\.staging\.peachworlds\.com|framerusercontent\.com)[^\s"'\\]+/g;

const FILES_TO_SCAN = [
  path.join(PUBLIC, 'index.html'),
  path.join(PUBLIC, 'styles.css'),
  path.join(PUBLIC, 'website-base.css'),
  path.join(PUBLIC, 'ui-state.json'),
  path.join(PUBLIC, 'scene-state', '2e9abea3-55c0-4563-9baa-8deeab210e58.json'),
];

function sanitizeFilename(url) {
  try {
    const u = new URL(url.split('?')[0]);
    const parts = u.pathname.split('/').filter(Boolean);
    const name = decodeURIComponent(parts[parts.length - 1] || 'asset');
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
    const safe = name.replace(/[<>:"|?*]/g, '_');
    return `${hash}-${safe}`;
  } catch {
    return crypto.createHash('md5').update(url).digest('hex') + '.bin';
  }
}

async function downloadFile(url, dest) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  return buf.length;
}

async function collectUrls() {
  const urls = new Set();
  for (const file of FILES_TO_SCAN) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const matches = content.match(URL_PATTERN) || [];
      matches.forEach((u) => urls.add(u.replace(/\\$/, '')));
    } catch {
      /* file may not exist yet */
    }
  }
  return [...urls];
}

async function main() {
  await fs.mkdir(ASSETS, { recursive: true });

  const urls = await collectUrls();
  console.log(`Found ${urls.length} unique remote asset URLs`);

  const urlMap = new Map();
  let ok = 0;
  let fail = 0;

  for (const url of urls) {
    const filename = sanitizeFilename(url);
    const localPath = path.join(ASSETS, filename);
    const webPath = `/assets/${filename}`;

    try {
      if (!(await fs.stat(localPath).catch(() => null))) {
        const size = await downloadFile(url, localPath);
        console.log(`  OK ${(size / 1024).toFixed(1)}KB ${filename}`);
      } else {
        console.log(`  skip (exists) ${filename}`);
      }
      urlMap.set(url, webPath);
      ok++;
    } catch (e) {
      console.warn(`  FAIL ${url}: ${e.message}`);
      fail++;
    }
  }

  for (const file of FILES_TO_SCAN) {
    try {
      let content = await fs.readFile(file, 'utf8');
      let changed = false;
      for (const [remote, local] of urlMap) {
        if (content.includes(remote)) {
          content = content.split(remote).join(local);
          changed = true;
        }
      }
      if (changed) {
        await fs.writeFile(file, content, 'utf8');
        console.log(`Rewrote ${path.relative(ROOT, file)}`);
      }
    } catch {
      /* skip */
    }
  }

  console.log(`\nDone: ${ok} assets, ${fail} failures`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
