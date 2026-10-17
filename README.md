# Halia & Co. demo site

A demo website by Primaxoft for an invented tax and accounting firm. It is a static Next.js site built with [Arc](https://uiarc.dev) components. See `docs/design-plan.md` for the design plan.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/ (deploy to Cloudflare Pages)
npm run lint
```

- Copy: `src/content/site.ts`
- Brand colours and fonts: `src/app/brand.css`, `src/app/layout.tsx`
- Page layout and sections: `src/components/site/`
- Arc components (vendored, installed with `npx shadcn@latest add @uiarc/<id>`): `src/components/arc/`
- Photos: each `<Placeholder search="…">` names the Unsplash search to use
