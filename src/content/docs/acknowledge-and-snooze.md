---
title: Acknowledge and snooze
description: Mark problems as seen, acknowledge them in Zabbix and snooze them for a while.
order: 3
---

## What ✓ does

Each server has a setting for the ✓ button: **Settings → (server) → Behavior → When clicking ✓**.

- **Mark as seen (this Mac only)**: the problem is marked as seen on this Mac. Nothing changes in Zabbix. Available on Free and Pro.
- **Acknowledge in Zabbix**: ✓ acknowledges the problem in Zabbix, for everyone. Requires Pro.

## The actions menu

Right-click a problem for more actions:

- **Acknowledge in Zabbix…** opens a panel where you can add a **Message (optional)**, **Acknowledge** (or **Unacknowledge**), **Close problem** when the trigger allows manual close, and **Change severity**. Click **Apply**.
- **Snooze** (see below).
- **Mark as seen** and **Open in Zabbix**.
- **Unacknowledge in Zabbix** appears when the problem is already acknowledged.

Acknowledging and snoozing are part of Pro; on Free these items show "(Pro)" and open the License pane.

If Zabbix refuses an action — for example, the token's user can't acknowledge problems — the error appears right under the problem. While a problem is being closed you'll see **closing…** until the next poll.

## Problems acknowledged by someone else

**Settings → (server) → Behavior → Acknowledged in Zabbix by anyone** decides what happens when anyone acknowledges a problem in Zabbix:

- **Stays pending** (default): it still counts in the icon until you mark it as seen.
- **Counts as seen**: it's treated as seen on this Mac too.

## Snooze

Right-click a problem → **Snooze** and pick **1 hour**, **4 hours**, **Until 8 AM tomorrow** (or today, before 8 AM) or **Custom…** to choose a date and time.

Snoozed problems move to a collapsed **Snoozed** section at the end of their server, showing when they come back. When the time is up they return to the list on their own, without a new notification. To bring one back earlier, click **Unsnooze**.
