#!/usr/bin/env node
// Checa links internos (href/src) de todos os HTML de um build estático.
import { existsSync, statSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function resolveTarget(href, fromFile, distDir) {
  if (href.startsWith('#') || EXTERNAL.test(href)) return null;
  const path = decodeURI(href.split(/[?#]/)[0]);
  const base = path.startsWith('/') ? join(distDir, path) : resolve(dirname(fromFile), path);
  return path === '' || path.endsWith('/') ? join(base, 'index.html') : base;
}

function exists(target) {
  if (existsSync(target) && statSync(target).isFile()) return true;
  return existsSync(join(target, 'index.html'));
}

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(entry.parentPath, entry.name));
}

export async function findBrokenLinks(distDir) {
  const dist = resolve(distDir);
  const broken = [];
  for (const file of (await htmlFiles(dist)).sort()) {
    const html = await readFile(file, 'utf8');
    for (const [, href] of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      const target = resolveTarget(href, file, dist);
      if (target && !exists(target)) broken.push({ file: relative(dist, file), href });
    }
  }
  return broken;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const dist = process.argv[2] ?? 'dist';
  const broken = await findBrokenLinks(dist);
  for (const { file, href } of broken) console.error(`broken: ${file} → ${href}`);
  console.log(broken.length === 0 ? 'All internal links OK' : `${broken.length} broken link(s)`);
  process.exit(broken.length === 0 ? 0 : 1);
}
