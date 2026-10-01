---
title: Updates
description: How Zabbix Toolbar keeps itself up to date.
order: 7
---

Zabbix Toolbar checks for a new version once a day and asks before installing it. Every version is signed and notarized by Apple.

- To turn automatic checks off, uncheck **Settings → General → Updates → Automatically check for updates**.
- To check right now, click **Check Now** in the same section, or **Check for Updates…** in the app menu while Settings is open.
- Your installed version is shown in **Settings → General → About → Version**.

The [changelog](https://github.com/alexmontoanelli/zabbix-toolbar-releases/releases) lists what changed in each version.

*Upgrading from a 0.1 test build:* the app's identifier changed in 1.0.0, so macOS asks for notification permission again and **Open at login** must be turned on again in **Settings → General**.
