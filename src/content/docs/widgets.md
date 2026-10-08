---
title: Widgets
description: Problems and Servers widgets for the desktop and Notification Center.
order: 4.5
---

Zabbix Toolbar has two widgets, available on Free and Pro. To add one, right-click the desktop, choose *Edit Widgets…* and search for Zabbix Toolbar. They also work in Notification Center.

Widgets show the same problems as the menu bar icon: seen, snoozed and filtered problems are left out.

## Problems

Shows your problems by severity. Right-click the widget and choose *Edit "Problems"* to pick a **Server**, or leave it empty to show all servers.

- Small: the number of problems and a bar with their severities.
- Medium: the three most severe problems.
- Large: up to eight problems.

Click a problem to open it in the Zabbix frontend. Click ✓ to handle it the way the server's **When clicking ✓** setting says: mark it as seen on this Mac, or acknowledge it in Zabbix. The problem disappears from the widget right away.

## Servers

One line per server with its number of problems, or a warning when the connection fails. Click a server to open the **Overview** for it.

## Refreshing

Click ⟳ to check the servers now. Widgets get their data from Zabbix Toolbar, which must be running: if it's closed, the widget shows an orange "Updated … min ago" note, and ✓ and ⟳ run the next time the app opens.
