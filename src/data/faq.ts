import { site } from './site';

export interface FaqItem {
  q: string;
  /** HTML. */
  a: string;
  /** Também aparece no FAQ curto da landing. */
  short?: boolean;
}

export const faq: FaqItem[] = [
  {
    q: 'Which Zabbix versions are supported?',
    a: 'Zabbix 6.0 through 7.x, including 7.2 and later. You can sign in with an API token or a username and password.',
    short: true,
  },
  {
    q: 'What data leaves my Mac?',
    a: `Nothing about your Zabbix servers: addresses, hosts, problems and credentials stay on your Mac, and the app talks directly to your Zabbix. The app sends a few anonymous usage events (you can turn them off), license checks to Polar and a daily update check. Details in the <a href="/privacy/">Privacy Policy</a>.`,
    short: true,
  },
  {
    q: 'Do I need Pro?',
    a: 'No. The Free plan monitors one server with the full problem list and notifications, with no time limit. Pro adds unlimited servers, acknowledging in Zabbix, snooze, minimum severity and alerts per severity.',
    short: true,
  },
  {
    q: 'How many Macs can use one license?',
    a: `Up to ${site.pricing.maxMacs} Macs at the same time. To move a license, open Settings → License → Deactivate on this Mac on the old one.`,
    short: true,
  },
  {
    q: 'What happens if I cancel?',
    a: 'Pro stays active until the end of the period you paid for. Then the app goes back to Free and keeps all your settings; one server stays monitored, and you choose which one.',
    short: true,
  },
  {
    q: 'Does it work offline?',
    a: `Yes. Monitoring only needs your Zabbix server. If the app can’t reach the license server, Pro keeps working for ${site.pricing.offlineGraceDays} days.`,
    short: true,
  },
  {
    q: 'Do I need to install anything on the Zabbix server?',
    a: 'No. The app uses the standard Zabbix API. To acknowledge, close or change severity from the app, the Zabbix user (or the token’s user) needs permission to do that in Zabbix.',
  },
  {
    q: 'Can I use a server with a self-signed certificate?',
    a: 'Yes. Turn on Ignore TLS certificate validation in the server’s settings. Use it only with self-signed certificates on trusted networks.',
  },
  {
    q: 'How do updates work?',
    a: 'The app checks for updates once a day and asks before installing. You can also check any time in Settings → General → Updates → Check Now. Every version is signed and notarized by Apple.',
  },
  {
    q: 'How do refunds work?',
    a: `Purchases are processed by <a href="https://polar.sh">Polar</a>, our merchant of record, which handles billing, taxes and refunds under its <a href="${site.links.polarTerms}">terms</a>. You can manage or cancel your subscription in the <a href="${site.links.customerPortal}">customer portal</a>.`,
  },
  {
    q: 'Is this an official Zabbix product?',
    a: 'No. Zabbix Toolbar is an independent app. It is not affiliated with or endorsed by Zabbix SIA.',
  },
  {
    q: 'Is there a Windows or Linux version?',
    a: `No. Zabbix Toolbar is a native Mac app for ${site.requirements}.`,
  },
];
