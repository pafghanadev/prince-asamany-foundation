import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const scanDirs = ['app', 'components', 'lib'];
const pattern = /(?<![A-Za-z0-9_\-.\/])\/(media\/[^'"`)]+?\.(?:webp|png|jpe?g|svg))(?=['"`)\s])/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|css)$/.test(name)) out.push(full);
  }
  return out;
}

const missing = new Set();
for (const dir of scanDirs) {
  const base = join(root, dir);
  if (!existsSync(base)) continue;
  for (const file of walk(base)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(pattern)) {
      const ref = (m[1] ?? m[2]).replace(/^\//, '');
      if (ref.startsWith('http')) continue;
      const target = join(root, 'public', ref);
      if (!existsSync(target)) missing.add(`${relative(root, file)} -> /${ref}`);
    }
  }
}

if (missing.size) {
  console.error('Missing public assets:');
  for (const line of missing) console.error('  ' + line);
  process.exit(1);
}
console.log('All referenced public assets exist.');
