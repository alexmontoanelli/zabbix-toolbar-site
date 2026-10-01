---
title: Getting started
description: Install Zabbix Toolbar and connect your first Zabbix server in a couple of minutes.
order: 1
---

## Requirements

- A Mac with macOS 14 Sonoma or later.
- A Zabbix server running 6.0 through 7.x, reachable from your Mac.
- An API token, or a Zabbix username and password.

## Install

1. [Download the latest version](https://github.com/alexmontoanelli/zabbix-toolbar-releases/releases/latest/download/ZabbixToolbar.dmg).
2. Open the DMG and drag **Zabbix Toolbar** to **Applications**.
3. Open it from Applications. The app is signed and notarized by Apple, so macOS opens it without warnings.

A "Z" icon appears in the menu bar. There's no Dock icon — the app lives in the menu bar.

## Add your first server

1. Click the "Z" icon in the menu bar, then the gear → **Settings…**. Settings opens on **Overview**; with no servers yet, it walks you through adding the first one.
2. Enter a **Name** and the **Frontend URL** — the same address you open in the browser, for example `https://zabbix.example.com/zabbix`.
3. Under **Authentication**, pick a **Method**: **API token** or **Username and password**.
   To create a token, open *User settings → API tokens → Create API token* in the Zabbix frontend.
4. If your server uses a self-signed certificate, turn on **Ignore TLS certificate validation**. Use it only on trusted networks.
5. Click **Test connection**. It shows the Zabbix version and how many problems are active. Then click **Save**. Monitoring starts right away.

The first time a new problem shows up, macOS asks for permission to show notifications. Allow it to be notified.

## Start at login

Turn on **Settings → General → Startup → Open at login**. The app must be in the Applications folder.

## Language

The interface is in English, with Brazilian Portuguese available in **Settings → General → Language**. After changing it, click **Restart now**.

## Next steps

- [The problem list](/docs/problem-list/) — reading the icon, compact and extended lists.
- [Acknowledge and snooze](/docs/acknowledge-and-snooze/) — act on problems without opening Zabbix.
- [Free and Pro](/docs/license/) — what each plan includes.
