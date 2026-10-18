# Halia & Co. demo site

A demo website by Primaxoft for an invented tax and accounting firm. It is a static Next.js site built with [Arc](https://uiarc.dev) components. See `docs/design-plan.md` for the design plan.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/ (deploy to Cloudflare Pages)
npm run lint
```

- Design option 1: `src/app/(option-1)/` (served at `/`)
- Design option 2 (Altitude layout): `src/app/option-2/` and `src/components/v2/` (served at `/option-2/`)
- Copy, shared by both options: `src/content/site.ts`
- Brand colours and fonts: `src/app/brand.css`, `src/app/layout.tsx`
- Page layout and sections: `src/components/site/`
- Arc components (vendored, installed with `npx shadcn@latest add @uiarc/<id>`): `src/components/arc/`
- Photos: each `<Placeholder search="…">` names the Unsplash search to use

## Preview build

`python3 scripts/flatten-preview.py out preview` turns the export into flat pages with relative paths (`home.html`, `services.html`, …), so the site can be previewed from any sub-path, such as a claude.ai artifact.
