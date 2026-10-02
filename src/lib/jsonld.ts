import { site } from '../data/site';
import type { FaqItem } from '../data/faq';

export function softwareApplicationLd(): object {
  const { pricing } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    description: 'A macOS menu bar app that monitors Zabbix 6.x and 7.x servers and notifies you about new problems.',
    operatingSystem: 'macOS 14 or later',
    applicationCategory: 'DeveloperApplication',
    url: site.url,
    downloadUrl: site.links.appStore,
    softwareVersion: site.version,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: pricing.currency },
      { '@type': 'Offer', name: 'Pro (monthly)', price: pricing.monthly.amount, priceCurrency: pricing.currency },
      { '@type': 'Offer', name: 'Pro (yearly)', price: pricing.yearly.amount, priceCurrency: pricing.currency },
    ],
  };
}

export function faqPageLd(items: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.replace(/<[^>]+>/g, '') },
    })),
  };
}
