# Halia & Co. demo site

A demo website by Primaxoft for an invented tax and accounting firm. It is a static Next.js site, laid out after Titan (via Mobbin). See `docs/design-plan.md` for the design plan.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/ (deploy to Cloudflare Pages)
npm run lint
```

- Copy: `src/content/site.ts`
- Tokens and type sizes: `src/app/globals.css`
- Layout, header, footer and components: `src/components/site/`
- Arc components (vendored, installed with `npx shadcn@latest add @uiarc/<id>`): `src/components/arc/`
- Photos: each `<Placeholder search="…">` is a grey rectangle that names the Unsplash search to use

`python3 scripts/flatten-preview.py out preview` turns the export into flat pages with relative paths, for hosting the site under any sub-path.

## Page canvas (development only)

`npm run dev`, then open http://localhost:3000/canvas/ to see every page live, side by side, at desktop width. The canvas has pan, zoom, fit all, reset view, movable pages and copyable names. Pages are listed in `src/canvas/registry.ts`, and the canvas code lives in `src/canvas/`. Normal builds leave the canvas out; build with `HALIA_CANVAS=1` to include it, for a private preview.
