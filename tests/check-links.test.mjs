import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { findBrokenLinks, resolveTarget } from '../scripts/check-links.mjs';

function makeDist(files) {
  const dir = mkdtempSync(join(tmpdir(), 'dist-'));
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(join(dir, path, '..'), { recursive: true });
    writeFileSync(join(dir, path), content);
  }
  return dir;
}

describe('resolveTarget', () => {
  const dist = '/d';
  it('ignores external, protocol-relative, mailto, data and same-page anchors', () => {
    for (const href of ['https://x.com/a', 'http://x', '//cdn.x/a.js', 'mailto:a@b.c', 'data:image/png;base64,AA', '#top']) {
      expect(resolveTarget(href, '/d/index.html', dist)).toBeNull();
    }
  });
  it('maps directory URLs to index.html and strips hash and query', () => {
    expect(resolveTarget('/docs/', '/d/index.html', dist)).toBe('/d/docs/index.html');
    expect(resolveTarget('/#pricing', '/d/faq/index.html', dist)).toBe('/d/index.html');
    expect(resolveTarget('/faq/?x=1#a', '/d/index.html', dist)).toBe('/d/faq/index.html');
  });
  it('resolves relative paths against the current file', () => {
    expect(resolveTarget('../license/', '/d/docs/alerts/index.html', dist)).toBe('/d/docs/license/index.html');
    expect(resolveTarget('img.png', '/d/docs/index.html', dist)).toBe('/d/docs/img.png');
  });
});

describe('findBrokenLinks', () => {
  it('reports missing targets and accepts existing ones', async () => {
    const dist = makeDist({
      'index.html': '<a href="/docs/">Docs</a><a href="/faq/">FAQ</a><a href="/#pricing">P</a><img src="/icon-64.png"><a href="https://example.com/">x</a>',
      'docs/index.html': '<a href="../">Home</a><a href="/docs/missing/">M</a>',
      'icon-64.png': 'x',
    });
    const broken = await findBrokenLinks(dist);
    expect(broken).toEqual([
      { file: 'docs/index.html', href: '/docs/missing/' },
      { file: 'index.html', href: '/faq/' },
    ]);
  });
});
