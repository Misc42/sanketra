# Sanketra Web

Public marketing website for `sanketra.app`, built with Next.js 15 App Router.

## Local build

```bash
npm install
npm run build
```

## Development

```bash
npm run dev
```

## Deploy

GitHub Pages workflow `.github/workflows/pages.yml` watches `web/**` on
master and auto-deploys the Next.js static export to
`https://misc42.github.io/sanketra/`. No vendor login or CLI step
required — push to master, wait ~1 min, the new build is live.

Local config knobs that make the static export work on a sub-path:
- `next.config.js` sets `output: 'export'`, `basePath: '/sanketra'`,
  `trailingSlash: true`, `images.unoptimized: true`.
- All internal `<Link href>` targets must start with `/sanketra`-aware
  prefixes (Next handles this via `basePath` automatically; only watch
  for hand-coded `<a href>` to internal routes).

When the `sanketra.app` custom domain is attached, drop the `basePath`
from `next.config.js` and add a `CNAME` file under `web/public/` with
the apex. GitHub Pages takes care of the HTTPS cert.

## Content

- Blog posts live in `content/blog/*.mdx`.
- `/changelog` reads `../CHANGELOG.md` at build time and revalidates every hour.
- Replace `public/og-image.png`, add `public/demo.mp4`, and add GIFs under
  `public/gifs/` before launch.
