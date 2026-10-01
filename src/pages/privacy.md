---
layout: ../layouts/Prose.astro
title: Privacy Policy
description: What Zabbix Toolbar and this website collect, why, and how to opt out.
effective: October 1, 2026
---

This policy explains what data the Zabbix Toolbar app and the website zabbixtoolbar.montoanelli.com.br collect. Zabbix Toolbar is developed by Alex Montoanelli ("we").

**In short:** nothing about your Zabbix servers ever leaves your Mac. The app sends a few anonymous usage events (you can turn them off), license checks to our store, and a daily update check. This website uses no cookies and no analytics.

## Data that stays on your Mac

The app connects directly from your Mac to the Zabbix servers you configure. Server addresses, names, hosts, host groups, problems and acknowledgements are stored only on your Mac, in `~/Library/Application Support/ZabbixToolbar/`. API tokens and passwords are stored in the macOS Keychain. We never receive any of it.

## Anonymous usage data

To count active installs, the app sends anonymous events to [Aptabase](https://aptabase.com), a privacy-focused analytics service:

| Event | When |
|---|---|
| `app_started` | each time the app launches |
| `daily_active` | once per calendar day while the app is running |
| `server_added` | when a new server is saved |

Each event carries the plan (free, pro or internal), the number of servers in ranges (0, 1, 2–5, 6+) and the interface language. The Aptabase SDK adds the app version and build number, the macOS version, the system locale, the Mac model identifier (for example `Mac14,2`), whether it's a debug build, and a random session ID that is regenerated after a period of inactivity. There is no identifier that follows you across sessions, and never server URLs, hostnames, server names, problems, host groups or credentials. Like any web service, Aptabase receives your IP address with each request; see [Aptabase's privacy policy](https://aptabase.com/legal/privacy).

You can turn this off at any time in **Settings → General → Privacy → Share anonymous usage data**. When it's off, nothing is sent.

## Licenses and payments

Pro subscriptions are sold by [Polar](https://polar.sh), which acts as merchant of record: Polar processes your payment, handles taxes and invoices, and stores your billing details under its own [privacy policy](https://polar.sh/legal/privacy). We receive from Polar your email address, your order and subscription status, and license activations.

To check a Pro license, the app sends Polar the license key and this Mac's activation ID once a day, plus the Mac's name and the app version when activating, so you can tell your Macs apart in the customer portal. Nothing about your Zabbix servers is sent.

## Update checks

Once a day the app downloads a small file (`appcast.xml`) from GitHub Pages to see whether a new version exists; no information about your system is sent. Downloads of the app come from GitHub Releases. As with any website, GitHub may log your IP address; see the [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

## This website

This website is hosted on GitHub Pages. It sets no cookies, runs no analytics or tracking scripts and loads no third-party resources. GitHub may log visitors' IP addresses for security and operations.

## Support requests

Support happens through public GitHub issues. Anything you post there is public — do not include personal data, server addresses or credentials.

## Your rights

Depending on where you live (for example, under Brazil's LGPD or the EU's GDPR), you may have the right to access, correct or delete your personal data. The only personal data related to the app is the billing data held by Polar: you can view and update it in the [customer portal](https://polar.sh/zabbixtoolbar/portal) or contact Polar's support. Usage events are anonymous and cannot be linked back to you. For any other question about this policy, [open an issue](https://github.com/alexmontoanelli/zabbix-toolbar-site/issues) without including personal data, and we will follow up.

## Changes

If this policy changes, we'll update this page and its effective date.
