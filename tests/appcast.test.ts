import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { fetchLatestRelease, formatSize, parseAppcast } from '../src/lib/appcast';

const fixture = (name: string) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

describe('parseAppcast', () => {
  it('reads the real 1.0.0 appcast', () => {
    const release = parseAppcast(fixture('appcast-1.0.0.xml'));
    expect(release).toEqual({
      version: '1.0.0',
      build: 2,
      url: 'https://github.com/alexmontoanelli/zabbix-toolbar-releases/releases/download/v1.0.0/ZabbixToolbar-1.0.0.dmg',
      size: 2718491,
      pubDate: new Date('2026-10-01T18:16:57Z'),
      minimumSystemVersion: '14.0',
    });
  });

  it('picks the highest build, not the first item, and skips items without enclosure', () => {
    const release = parseAppcast(fixture('appcast-multi.xml'));
    expect(release?.version).toBe('1.2.0');
    expect(release?.build).toBe(10);
  });

  it('returns null size and date when they are missing or invalid', () => {
    const release = parseAppcast(fixture('appcast-multi.xml'));
    expect(release?.size).toBeNull();
    expect(release?.pubDate).toBeNull();
    expect(release?.minimumSystemVersion).toBeNull();
  });

  it('returns null for empty or non-appcast input', () => {
    expect(parseAppcast('')).toBeNull();
    expect(parseAppcast('<html><body>404</body></html>')).toBeNull();
    expect(parseAppcast('<rss><channel><item><title>x</title></item></channel></rss>')).toBeNull();
  });
});

describe('fetchLatestRelease', () => {
  it('parses a successful response', async () => {
    const fetchImpl = vi.fn(async () => new Response(fixture('appcast-1.0.0.xml'), { status: 200 }));
    const release = await fetchLatestRelease('https://x/appcast.xml', fetchImpl as unknown as typeof fetch);
    expect(release?.version).toBe('1.0.0');
  });

  it('bypasses the CDN cache so a just-published version is seen', async () => {
    const fetchImpl = vi.fn(async (_url: string) => new Response(fixture('appcast-1.0.0.xml'), { status: 200 }));
    await fetchLatestRelease('https://x/appcast.xml', fetchImpl as unknown as typeof fetch);
    expect(fetchImpl.mock.calls[0][0]).toMatch(/^https:\/\/x\/appcast\.xml\?nocache=\d+$/);
  });

  it('returns null on HTTP errors', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => new Response('nope', { status: 503 }));
    expect(await fetchLatestRelease('https://x/appcast.xml', fetchImpl as unknown as typeof fetch)).toBeNull();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('returns null when fetch throws (offline, timeout)', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fetchImpl = vi.fn(async () => { throw new TypeError('fetch failed'); });
    expect(await fetchLatestRelease('https://x/appcast.xml', fetchImpl as unknown as typeof fetch)).toBeNull();
    warn.mockRestore();
  });
});

describe('formatSize', () => {
  it('formats bytes as decimal megabytes with one decimal', () => {
    expect(formatSize(2718491)).toBe('2.7 MB');
    expect(formatSize(3000000)).toBe('3.0 MB');
  });
});
