---
layout: ../layouts/Prose.astro
title: Privacy Policy
description: What Zabbix Toolbar and this website collect, why, and how to opt out.
effective: October 1, 2026
---

This policy explains what data the Zabbix Toolbar app and the website zabbixtoolbar.montoanelli.com.br collect. Zabbix Toolbar is developed by Alex Montoanelli ("we").

**In short:** nothing about your Zabbix servers ever leaves your Mac. The app sends a few anonymous usage events (you can turn them off), and purchases go through the App Store. This website uses no cookies and no analytics.

## Data that stays on your Mac

The app connects directly from your Mac to the Zabbix servers you configure. Server addresses, names, hosts, host groups, problems and acknowledgements are stored only on your Mac, in `~/Library/Application Support/ZabbixToolbar/`. API tokens and passwords are stored in the macOS Keychain. We never receive any of it.

## Anonymous usage data

To count active installs, the app sends anonymous events to [Aptabase](https://aptabase.com), a privacy-focused analytics service:

| Event | When |
|---|---|
| `app_started` | each time the app launches |
| `daily_active` | once per calendar day while the app is running |
| `server_added` | when a new server is saved |

Each event carries the plan (free or pro), the number of servers in ranges (0, 1, 2–5, 6+) and the interface language. The Aptabase SDK adds the app version and build number, the macOS version, the system locale, the Mac model identifier (for example `Mac14,2`), whether it's a debug build, and a random session ID that is regenerated after a period of inactivity. There is no identifier that follows you across sessions, and never server URLs, hostnames, server names, problems, host groups or credentials. Like any web service, Aptabase receives your IP address with each request; see [Aptabase's privacy policy](https://aptabase.com/legal/privacy).

You can turn this off at any time in **Settings → General → Privacy → Share anonymous usage data**. When it's off, nothing is sent.

## Purchases

Zabbix Toolbar is distributed through the Mac App Store, and Pro subscriptions are sold by Apple. Apple processes your payment under its own [privacy policy](https://www.apple.com/legal/privacy/); we never see your payment details or your Apple ID. The app learns whether Pro is active by reading the App Store transaction records on your Mac, which Apple signs. Apple shares aggregated sales reports with us, not who you are.

## Updates

Updates are delivered by the Mac App Store. The app doesn't check for updates on its own.

## This website

This website is hosted on GitHub Pages. It sets no cookies, runs no analytics or tracking scripts and loads no third-party resources. GitHub may log visitors' IP addresses for security and operations.

## Support requests

Support happens through public GitHub issues. Anything you post there is public — do not include personal data, server addresses or credentials.

## Your rights

Depending on where you live (for example, under Brazil's LGPD or the EU's GDPR), you may have the right to access, correct or delete your personal data. We don't hold personal data about you: purchase and billing data are held by Apple, which you can manage in your Apple ID account and through [Apple's privacy page](https://www.apple.com/legal/privacy/). Usage events are anonymous and cannot be linked back to you. For any other question about this policy, [open an issue](https://github.com/alexmontoanelli/zabbix-toolbar-site/issues) without including personal data, and we will follow up.

## Changes

If this policy changes, we'll update this page and its effective date.
