export const site = {
  name: 'Zabbix Toolbar',
  tagline: 'Zabbix problems in your Mac menu bar',
  url: 'https://zabbixtoolbar.montoanelli.com.br',
  author: 'Alex Montoanelli',
  requirements: 'macOS 14 Sonoma or later',
  zabbixVersions: 'Zabbix 6.0 to 7.x',
  /** Versão publicada na Mac App Store — atualizar a cada release. */
  version: '1.2.0',
  links: {
    appStore: 'https://apps.apple.com/app/id6818347240',
    manageSubscriptions: 'https://apps.apple.com/account/subscriptions',
    support: 'https://github.com/alexmontoanelli/zabbix-toolbar-site/issues',
    appleEula: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/',
    applePrivacy: 'https://www.apple.com/legal/privacy/',
    reportAProblem: 'https://reportaproblem.apple.com',
    githubPrivacy: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
    aptabase: 'https://aptabase.com',
  },
  // Referência em USD; o preço local vem da App Store. Manter igual ao App Store Connect.
  pricing: {
    monthly: { price: '$4.99', amount: '4.99' },
    yearly: { price: '$49.99', amount: '49.99', note: '2 months free' },
    trialDays: 7,
    currency: 'USD',
    note: 'Prices in USD; your local App Store price may differ.',
  },
} as const;
