import { site } from '../data/site';

export interface AppcastRelease {
  version: string;
  build: number;
  url: string;
  size: number | null;
  pubDate: Date | null;
  minimumSystemVersion: string | null;
}

function tag(item: string, name: string): string | null {
  const match = item.match(new RegExp(`<${name}>([^<]*)</${name}>`));
  return match ? match[1].trim() : null;
}

function parseItem(item: string): AppcastRelease | null {
  const version = tag(item, 'sparkle:shortVersionString');
  const buildRaw = tag(item, 'sparkle:version');
  const build = buildRaw ? Number(buildRaw) : NaN;
  const enclosure = item.match(/<enclosure\b[^>]*>/)?.[0];
  const url = enclosure?.match(/\burl="([^"]+)"/)?.[1];
  if (!version || !Number.isFinite(build) || !enclosure || !url) return null;

  const length = Number(enclosure.match(/\blength="(\d+)"/)?.[1]);
  const pubRaw = tag(item, 'pubDate');
  const pubDate = pubRaw ? new Date(pubRaw) : null;
  return {
    version,
    build,
    url,
    size: Number.isFinite(length) && length > 0 ? length : null,
    pubDate: pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate : null,
    minimumSystemVersion: tag(item, 'sparkle:minimumSystemVersion'),
  };
}

/** Versão mais nova do appcast (maior `sparkle:version`), ou null se nenhum item for válido. */
export function parseAppcast(xml: string): AppcastRelease | null {
  const releases = (xml.match(/<item>[\s\S]*?<\/item>/g) ?? [])
    .map(parseItem)
    .filter((release): release is AppcastRelease => release !== null);
  if (releases.length === 0) return null;
  return releases.reduce((newest, release) => (release.build > newest.build ? release : newest));
}

/** Busca o appcast; qualquer falha devolve null (o build do site nunca quebra por isso). */
export async function fetchLatestRelease(
  url: string = site.links.appcast,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 5000,
): Promise<AppcastRelease | null> {
  try {
    // O CDN do GitHub Pages guarda o appcast por 10 min: URL nova evita ler a versão anterior.
    const response = await fetchImpl(`${url}?nocache=${Date.now()}`, { signal: AbortSignal.timeout(timeoutMs) });
    if (!response.ok) {
      console.warn(`[appcast] HTTP ${response.status} from ${url}; version will be omitted`);
      return null;
    }
    const release = parseAppcast(await response.text());
    if (!release) console.warn(`[appcast] no valid item in ${url}; version will be omitted`);
    return release;
  } catch (error) {
    console.warn(`[appcast] ${String(error)}; version will be omitted`);
    return null;
  }
}

let cached: Promise<AppcastRelease | null> | undefined;

/** Uma busca por build, compartilhada por todas as páginas. */
export function latestRelease(): Promise<AppcastRelease | null> {
  cached ??= fetchLatestRelease();
  return cached;
}

export function formatSize(bytes: number): string {
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}
