---
title: Troubleshooting
description: Fix connection, certificate and permission problems, and find where the app keeps its data.
order: 8
---

## The icon is yellow

No problems are pending, but at least one server has an error. Open the list: the error appears under the server name. Servers whose last poll failed show **stale** and keep the last known problems.

When there are pending problems the icon stays red even if a server has an error — so also check the list for **stale** servers and error messages.

## "Test connection" fails

- Use the same **Frontend URL** you open in the browser, including the path — often `/zabbix` (for example `https://zabbix.example.com/zabbix`).
- Make sure your Mac can reach the server (VPN, firewall).
- Check the token or the username and password. API tokens can expire or be disabled in Zabbix.
- Only Zabbix 6.0 through 7.x is supported.

## Certificate errors

If your server uses a self-signed or internal certificate, turn on **Ignore TLS certificate validation** for that server. Use it only with self-signed certificates on trusted networks.

## Acknowledging fails

The error shows under the problem. Usually the Zabbix user (or the token's user) lacks permission to acknowledge, close or change severity for that host. Check the user role and host permissions in Zabbix. Closing also requires the trigger to allow manual close.

## No notifications

- Allow notifications for Zabbix Toolbar in *System Settings → Notifications* (macOS).
- Check **Settings → General → Alerts** (Pro) — a severity may have **Notification** off.
- Problems that already existed when the app started are counted but not notified.

## Where the app keeps its data

Settings live in `~/Library/Application Support/ZabbixToolbar/`. Tokens and passwords are stored in the macOS Keychain.

## Getting help

[Open an issue](https://github.com/alexmontoanelli/zabbix-toolbar-site/issues) with your app version (**Settings → General → About**), macOS version and Zabbix version. Issues are public — never include server addresses, hostnames, tokens or passwords.
