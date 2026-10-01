#!/usr/bin/env node
// Uso: node scripts/check-ui-labels.mjs <catálogo> [<catálogo>...]
//   catálogos: App/Localizable.xcstrings (JSON) e ZabbixKit/.../en.lproj/Localizable.strings
// Confere se cada trecho em **negrito** da docs (partido em " → ") é um texto da UI do app.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const catalogs = process.argv.slice(2);
if (catalogs.length === 0) { console.error('usage: check-ui-labels.mjs <catalog> [<catalog>...]'); process.exit(2); }

function catalogKeys(path) {
  const text = readFileSync(path, 'utf8');
  if (path.endsWith('.xcstrings')) return Object.keys(JSON.parse(text).strings);
  return [...text.matchAll(/^"((?:[^"\\]|\\.)*)"\s*=/gm)].map((m) => m[1]);
}

const keys = new Set();
for (const key of catalogs.flatMap(catalogKeys)) {
  keys.add(key);
  // "Snoozed (%lld)" também vale como "Snoozed": a docs cita o rótulo sem o número.
  if (key.includes('%')) keys.add(key.slice(0, key.indexOf('%')).replace(/[\s(]+$/, ''));
}
// Textos que a UI mostra mas não vêm dos catálogos (nome do app, pasta do DMG, marcadores da docs).
const allowed = new Set(['Zabbix Toolbar', 'Applications', '(server)', 'Free', 'Pro', '✓']);
const dir = 'src/content/docs';
let missing = 0;
for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
  const text = readFileSync(join(dir, file), 'utf8');
  for (const [, bold] of text.matchAll(/\*\*([^*]+)\*\*/g)) {
    for (const part of bold.split(' → ').map((s) => s.trim())) {
      if (!keys.has(part) && !allowed.has(part)) { console.error(`${file}: "${part}" not found in the app`); missing += 1; }
    }
  }
}
console.log(missing === 0 ? 'All UI labels found' : `${missing} label(s) not found`);
process.exit(missing === 0 ? 0 : 1);
