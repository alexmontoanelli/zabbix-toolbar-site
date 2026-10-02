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
    a: `Nothing about your Zabbix servers: addresses, hosts, problems and credentials stay on your Mac, and the app talks directly to your Zabbix. The app sends a few anonymous usage events, which you can turn off, and purchases go through the App Store. Details in the <a href="/privacy/">Privacy Policy</a>.`,
    short: true,
  },
  {
    q: 'Do I need Pro?',
    a: 'No. The Free plan monitors one server with the full problem list and notifications, with no time limit. Pro adds unlimited servers, acknowledging in Zabbix, snooze, minimum severity and alerts per severity.',
    short: true,
  },
  {
    q: 'How many Macs can use Pro?',
    a: 'Pro is an App Store subscription, so it works on every Mac signed in with the same Apple ID.',
    short: true,
  },
  {
    q: 'What happens if I cancel?',
    a: 'Cancel anytime in your App Store account. Pro stays active until the end of the period you paid for. Then the app goes back to Free and keeps all your settings; one server stays monitored, and you choose which one.',
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
    a: 'Through the Mac App Store, like any other app. Turn on automatic updates in App Store settings to always have the latest version.',
  },
  {
    q: 'How do refunds work?',
    a: `Purchases are made through the App Store, so Apple handles billing and refunds. Request a refund at <a href="${site.links.reportAProblem}">reportaproblem.apple.com</a>, and manage or cancel your subscription in <a href="${site.links.manageSubscriptions}">your App Store account</a>.`,
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
