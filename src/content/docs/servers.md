---
title: Servers and host groups
description: Add servers, choose how to authenticate, filter host groups and set a minimum severity.
order: 5
---

## Adding and editing servers

In **Settings**, servers are listed under **Servers** in the sidebar. Use **Add server** to add one, select a server to edit it, and right-click → **Remove…** to delete it (its credential and local acknowledgements are deleted too).

Each server has these sections:

- **Connection**: **Name**, **Frontend URL** and **Ignore TLS certificate validation**.
- **Authentication**: **Method** — **API token** or **Username and password**. Secrets are stored in the macOS Keychain.
- **Monitoring**: **Polling interval**, **Host groups**, and the **Hosts** and **Problems** filters.
- **Behavior**: **When clicking ✓**, **Acknowledged in Zabbix by anyone** and **Minimum severity**.

Click **Test connection** before **Save** to check the URL and credentials.

## Host groups

**Host groups → Choose…** lists the groups from your Zabbix. Uncheck groups to ignore their problems everywhere — list, icon and notifications. **Check all** and **Uncheck all** help with long lists. Host group filtering is available on Free.

## Host and problem filters

**Hosts** and **Problems** filter a server with a **Regular expression**. Choose **Hide matching** to drop what matches, or **Show only matching** to keep only that. Matching is case-insensitive:

- **Hosts** matches the host's visible name or its technical host name. `-(test|lab)$` with **Hide matching** hides test and lab hosts.
- **Problems** matches the problem name as shown in the list. `backup|restarted` with **Hide matching** hides backup and restart noise.

Filtered problems disappear everywhere — list, menu bar icon, widgets and notifications. Leave the expression empty to show everything. An invalid expression is shown in red and isn't saved. Requires Pro.

## Minimum severity

**Minimum severity** hides problems below the chosen severity for that server: they're not fetched, counted or notified. Requires Pro.

## More than one server

Pro monitors unlimited servers. On Free, one server is monitored; the others stay saved and show **Not monitored (Free plan)**. Open one of them and click **Monitor this server instead** to switch.
