export const site = {
  name: 'Zabbix Toolbar',
  tagline: 'Zabbix problems in your Mac menu bar',
  url: 'https://zabbixtoolbar.montoanelli.com.br',
  author: 'Alex Montoanelli',
  requirements: 'macOS 14 Sonoma or later',
  zabbixVersions: 'Zabbix 6.0 to 7.x',
  links: {
    download: 'https://github.com/alexmontoanelli/zabbix-toolbar-releases/releases/latest/download/ZabbixToolbar.dmg',
    releases: 'https://github.com/alexmontoanelli/zabbix-toolbar-releases/releases',
    checkout: 'https://buy.polar.sh/polar_cl_oHEp0FaJZ2JHeXFl0G66RCOCTOw8G2eT86DW94PknvV',
    customerPortal: 'https://polar.sh/zabbixtoolbar/portal',
    support: 'https://github.com/alexmontoanelli/zabbix-toolbar-site/issues',
    appcast: 'https://alexmontoanelli.github.io/zabbix-toolbar-releases/appcast.xml',
    polarTerms: 'https://polar.sh/legal/terms',
    polarPrivacy: 'https://polar.sh/legal/privacy',
    githubPrivacy: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
    aptabase: 'https://aptabase.com',
  },
  // Mesmos valores de App/PolarConfig.swift (monthlyPrice/yearlyPrice) — mudar os dois juntos.
  pricing: {
    monthly: { price: '$4.99', amount: '4.99' },
    yearly: { price: '$49.90', amount: '49.90', note: '2 months free' },
    currency: 'USD',
    maxMacs: 2,
    offlineGraceDays: 7,
  },
} as const;
