# Cloudflare Pages Deployment

Preferred Cloudflare project/subdomain:

```text
restaurant-technology-solutions
```

Expected public URL:

```text
https://restaurant-technology-solutions.pages.dev
```

## Framework

This project is a Next.js 14 App Router application, not Vite.

The requested deployment target is Cloudflare Pages with the `restaurant-technology-solutions.pages.dev` subdomain.

For Cloudflare Pages, use the Next.js Pages adapter workflow through `@cloudflare/next-on-pages`.

Current Cloudflare documentation also notes that the newer preferred Cloudflare runtime for full Next.js applications is the OpenNext Cloudflare adapter on Cloudflare Workers. That newer path is useful for a future Workers migration, but the settings below are the practical Cloudflare Pages settings for the requested `pages.dev` deployment.

## Recommended Cloudflare Pages Settings

Use these settings when creating the Cloudflare Pages project:

| Setting | Value |
|---|---|
| Framework preset | Next.js |
| Root directory | `/` |
| Build command | `npm run cloudflare:build` |
| Output directory | `.vercel/output/static` |
| Node.js version | `20` or newer |

## Environment Variables

No application-specific environment variables are currently required.

Recommended Cloudflare Pages environment variable:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `20` |

## Compatibility Flags

For Next.js on Cloudflare Pages, enable:

```text
nodejs_compat
```

Apply this compatibility flag in the Cloudflare Pages project settings if prompted or if server/runtime compatibility warnings appear.

## Build Script

The project includes:

```bash
npm run cloudflare:build
```

which runs:

```bash
npx @cloudflare/next-on-pages@1
```

This produces Cloudflare-compatible output in:

```text
.vercel/output/static
```

Note: Running `npm run cloudflare:build` on Windows can fail if the adapter tries to spawn `bash`. Cloudflare Pages builds run on Linux, so the command is intended for Cloudflare's build environment. The standard local verification command remains `npm run build`.

## Existing Netlify Setup

The project still includes:

- `netlify.toml`
- `@netlify/plugin-nextjs`
- `npm run netlify:build`

These are retained intentionally. Cloudflare Pages is now documented as the preferred deployment target, but the Netlify setup remains available unless it is deliberately retired later.

## Local Verification Before Deploy

Run:

```bash
npm run build
```

For Cloudflare adapter verification, run:

```bash
npm run cloudflare:build
```

If the Cloudflare adapter build succeeds, deploy the project in Cloudflare Pages with the settings above.

## Future OpenNext / Workers Option

If the project is later moved from Cloudflare Pages to Cloudflare Workers, use Cloudflare's current OpenNext adapter workflow:

```bash
npx opennextjs-cloudflare build
```

That path uses `.open-next` output and a Worker deployment model rather than the Pages `.vercel/output/static` deployment flow documented above.
