import { describe, expect, it } from 'vitest';
import { faqPageLd, softwareApplicationLd } from '../src/lib/jsonld';

const release = {
  version: '1.0.0', build: 2, url: 'https://x/ZabbixToolbar-1.0.0.dmg', size: 2718491,
  pubDate: new Date('2026-10-01T18:16:57Z'), minimumSystemVersion: '14.0',
};

describe('softwareApplicationLd', () => {
  it('describes the app with the three offers', () => {
    const ld = softwareApplicationLd(release) as Record<string, any>;
    expect(ld['@type']).toBe('SoftwareApplication');
    expect(ld.operatingSystem).toBe('macOS 14 or later');
    expect(ld.softwareVersion).toBe('1.0.0');
    expect(ld.fileSize).toBe('2.7 MB');
    expect(ld.offers.map((o: any) => [o.name, o.price, o.priceCurrency])).toEqual([
      ['Free', '0', 'USD'],
      ['Pro (monthly)', '4.99', 'USD'],
      ['Pro (yearly)', '49.90', 'USD'],
    ]);
  });

  it('omits version fields when the appcast is unavailable', () => {
    const ld = softwareApplicationLd(null) as Record<string, any>;
    expect(ld).not.toHaveProperty('softwareVersion');
    expect(ld).not.toHaveProperty('fileSize');
    expect(ld.offers).toHaveLength(3);
  });
});

describe('faqPageLd', () => {
  it('strips HTML from answers', () => {
    const ld = faqPageLd([{ q: 'Q?', a: 'See <a href="/privacy/">Privacy</a>.' }]) as Record<string, any>;
    expect(ld['@type']).toBe('FAQPage');
    expect(ld.mainEntity[0]).toEqual({
      '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'See Privacy.' },
    });
  });
});
