---
title: The problem list
description: How to read the menu bar icon and the problem list, and switch between compact and extended views.
order: 2
---

## The menu bar icon

| Icon | Meaning |
|---|---|
| Outline "Z" | Nothing pending. |
| Red "Z" with a number | Active problems you haven't seen yet. |
| Yellow "Z" | No pending problems, but at least one server has an error (for example, it can't be reached). |

On the first poll after launch, existing problems are counted but you're not notified about them — only problems that appear after that trigger notifications.

## The list

Click the icon to open the list, grouped by server. Each server shows how many active problems it has; **stale** next to its name means the last poll failed and you're seeing the last known state.

- Click a problem to open the event in the Zabbix frontend. Clicking a notification does the same.
- **✓** marks the problem as seen (see [Acknowledge and snooze](/docs/acknowledge-and-snooze/)). Seen problems stay in the list, dimmed, until they're resolved in Zabbix.
- A seal icon means the problem was acknowledged in Zabbix; a crossed-out eye means it's suppressed by a maintenance.

The buttons at the top toggle the list density, **Refresh now**, open Settings and **Quit**.

## Compact and extended

- **Compact**: one line per problem — host, problem name and how long it's been active.
- **Extended**: problem name, then host, severity, start time and duration, with host groups as tags.

Toggle it with the list button at the top of the list or in **Settings → General → Problem list → Display**. The app remembers your choice.

## Overview

**Settings → Overview** shows the same list in a larger window. Use **Show problems from** to see one server or **All servers**.
