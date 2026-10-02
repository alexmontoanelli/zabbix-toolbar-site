#!/usr/bin/env node
// Uso: node scripts/check-overflow.mjs [baseUrl]   (com `npm run preview` rodando)
// Abre cada página no Chrome headless emulando 375 px (via DevTools Protocol) e falha se
// document.documentElement.scrollWidth passar da largura da tela (= rolagem horizontal).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const base = process.argv[2] ?? 'http://localhost:4321';
const PORT = 9333;
const WIDTH = 375;
const pages = ['/', '/docs/', '/docs/problem-list/', '/docs/acknowledge-and-snooze/', '/docs/alerts/', '/docs/servers/', '/docs/license/', '/docs/updates/', '/docs/troubleshooting/', '/faq/', '/privacy/', '/terms/', '/blog/why-i-built-zabbix-toolbar/', '/nao-existe/'];

const profile = mkdtempSync(join(tmpdir(), 'chrome-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

async function pageSocketUrl() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = targets.find((target) => target.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // Chrome ainda subindo.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error('Chrome did not start');
}

function connect(url) {
  const ws = new WebSocket(url);
  const pending = new Map();
  const waiters = [];
  let nextId = 0;
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
      return;
    }
    for (const waiter of [...waiters]) waiter(message);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    nextId += 1;
    pending.set(nextId, (message) => (message.error ? reject(new Error(message.error.message)) : resolve(message.result)));
    ws.send(JSON.stringify({ id: nextId, method, params }));
  });
  const once = (method) => new Promise((resolve) => {
    const waiter = (message) => {
      if (message.method !== method) return;
      waiters.splice(waiters.indexOf(waiter), 1);
      resolve(message.params);
    };
    waiters.push(waiter);
  });
  return new Promise((resolve, reject) => {
    ws.addEventListener('open', () => resolve({ send, once, close: () => ws.close() }));
    ws.addEventListener('error', reject);
  });
}

let failed = 0;
try {
  const cdp = await connect(await pageSocketUrl());
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 800, deviceScaleFactor: 2, mobile: true });
  for (const page of pages) {
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: `${base}${page}` });
    await loaded;
    const { result } = await cdp.send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth' });
    const ok = result.value <= WIDTH;
    if (!ok) failed += 1;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${page} scrollWidth=${result.value}`);
  }
  cdp.close();
} finally {
  // Espera o Chrome sair antes de apagar o perfil (senão ele ainda grava nele: ENOTEMPTY).
  const exited = new Promise((resolve) => chrome.once('exit', resolve));
  chrome.kill();
  await exited;
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
process.exit(failed === 0 ? 0 : 1);
