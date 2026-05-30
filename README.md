# Restaurant Technology Solutions

Restaurant Technology Solutions is a Next.js prototype for restaurant operations visibility dashboards and module demos.

The app is a marketing site plus multiple local/product demo routes for restaurant operators:

- `/` marketing homepage
- `/dashboard` restaurant operations dashboard demo
- `/modules` modules overview
- `/modules/sales-labor`
- `/modules/inventory-food-cost`
- `/modules/shift-operations`
- `/modules/guest-experience-intelligence`
- `/pnl-demo`

## Framework

This project uses:

- Next.js 14
- React 18
- App Router
- Global CSS in `app/globals.css`

## Local Development

```bash
npm install
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
```

## Deployment

Cloudflare Pages is the preferred deployment target for the Restaurant Technology Solutions brand.

The existing Netlify configuration is retained for compatibility and historical deployments. Do not delete `netlify.toml` unless the Netlify deployment is intentionally retired.

See [Cloudflare Pages deployment notes](./CLOUDFLARE_PAGES.md) for exact settings.
