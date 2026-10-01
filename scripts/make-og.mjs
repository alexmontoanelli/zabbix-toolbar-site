#!/usr/bin/env node
// Gera public/og-image.png (1200×630) com o Chrome headless a partir de um HTML estático.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const icon = readFileSync('public/icon-512.png').toString('base64');
const rows = [
  ['#e45959', 'db-prod-01 — Zabbix agent is not available', '4m'],
  ['#e97659', 'api-gw-02 — High CPU utilization (over 90% for 5m)', '37m'],
  ['#ffa059', 'fs-backup-01 — Disk space is low (used > 80%)', '5h 20m'],
];
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #161618; color: #f5f5f7; font-family: -apple-system, 'SF Pro Display', sans-serif;
         display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; padding: 72px; }
  img { width: 112px; height: 112px; border-radius: 26px; }
  h1 { font-size: 64px; letter-spacing: -0.02em; margin: 28px 0 14px; }
  p { font-size: 30px; color: #a8a8b0; line-height: 1.3; }
  .pill { margin-top: 28px; font: 600 22px ui-monospace, 'SF Mono', monospace; color: #ff7076; }
  .list { background: #26262a; border-radius: 18px; padding: 22px; box-shadow: 0 30px 80px rgba(0,0,0,.6); display: grid; gap: 14px; }
  .row { display: flex; align-items: center; gap: 14px; font-size: 21px; white-space: nowrap; overflow: hidden; }
  .bar { width: 7px; height: 26px; border-radius: 3px; flex: none; }
  .t { overflow: hidden; text-overflow: ellipsis; flex: 1; }
  .d { color: #98989f; font-size: 18px; }
  .head { display: flex; justify-content: space-between; font-weight: 700; font-size: 20px; margin-bottom: 4px; }
  .c { background: #ff453a; border-radius: 999px; padding: 0 12px; font-size: 18px; }
</style></head><body>
  <div><img src="data:image/png;base64,${icon}"><h1>Zabbix Toolbar</h1>
  <p>Your Zabbix problems, one click away in the menu bar.</p><div class="pill">macOS 14+ · Zabbix 6.0 – 7.x</div></div>
  <div class="list"><div class="head"><span>Production</span><span class="c">3</span></div>
  ${rows.map(([c, t, d]) => `<div class="row"><span class="bar" style="background:${c}"></span><span class="t">${t}</span><span class="d">${d}</span></div>`).join('')}</div>
</body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const file = join(dir, 'og.html');
writeFileSync(file, html);
const out = resolve('public/og-image.png');
execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${out}`, `file://${file}`], { stdio: 'inherit' });
console.log(`wrote ${out}`);
