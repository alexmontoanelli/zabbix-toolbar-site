import { describe, expect, it } from 'vitest';
import { site } from '../src/data/site';
import { faqPageLd, softwareApplicationLd } from '../src/lib/jsonld';

describe('softwareApplicationLd', () => {
  it('describes the Mac App Store app with the three offers', () => {
    const ld = softwareApplicationLd() as Record<string, any>;
    expect(ld['@type']).toBe('SoftwareApplication');
    expect(ld.operatingSystem).toBe('macOS 14 or later');
    expect(ld.softwareVersion).toBe(site.version);
    expect(ld.downloadUrl).toBe(site.links.appStore);
    expect(ld).not.toHaveProperty('fileSize');
    expect(ld.offers.map((o: any) => [o.name, o.price, o.priceCurrency])).toEqual([
      ['Free', '0', 'USD'],
      ['Pro (monthly)', '4.99', 'USD'],
      ['Pro (yearly)', '49.99', 'USD'],
    ]);
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
