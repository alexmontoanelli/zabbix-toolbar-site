# Zabbix Toolbar — website

Source of https://zabbixtoolbar.montoanelli.com.br — landing page, docs, FAQ, privacy policy and terms for [Zabbix Toolbar](https://zabbixtoolbar.montoanelli.com.br), a macOS menu bar app for Zabbix.

Found a problem with the app or the docs? [Open an issue](https://github.com/alexmontoanelli/zabbix-toolbar-site/issues) — never include server addresses, tokens or passwords.

## Development

Requires Node 22.12+.

    npm install
    npm run dev          # http://localhost:4321
    npm test             # unit tests (appcast, JSON-LD, link checker)
    npm run check        # astro check (types)
    npm run build        # static site in dist/ (reads the latest version from the appcast)
    npm run check-links  # internal links in dist/
    npm run og           # regenerates public/og-image.png (needs Google Chrome)

Docs live in `src/content/docs/*.md`. **Bold is reserved for app UI text**; check it against the app with
`node scripts/check-ui-labels.mjs <app>/App/Localizable.xcstrings <app>/ZabbixKit/Sources/ZabbixKit/Resources/en.lproj/Localizable.strings`.

Prices and store/download URLs live only in `src/data/site.ts` and must match the app's `App/PolarConfig.swift`.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds, tests and publishes to GitHub Pages on every push to `main`, weekly, and when the app's `release.sh` publishes a new version (`gh workflow run deploy.yml`).

## Custom domain (one-time)

1. At the DNS provider of `montoanelli.com.br`, create: `zabbixtoolbar  CNAME  alexmontoanelli.github.io.`
2. Repo → Settings → Pages: Source **GitHub Actions**, Custom domain `zabbixtoolbar.montoanelli.com.br`, then **Enforce HTTPS** once the certificate is issued.
