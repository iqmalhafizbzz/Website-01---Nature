# Halia & Co. demo site: design plan

Source: `brief.md` and `content-pack.md` (Halia & Co., invented firm). Scope: Standard, 5 pages plus the privacy notice.

## Direction

**Trustworthy, calm, approachable.** It is closer to Mercury and Linear than to a typical accounting site: lots of white space, few words per section, one idea per section, no handshake photos and no long bullet walls.

| Decision | Choice | Why |
|---|---|---|
| Stack | Next.js 15 (App Router), static export | Plain HTML on Cloudflare Pages; no server needed (the form sends nothing) |
| UI library | [Arc](https://uiarc.dev) free blocks and components, installed with the shadcn CLI into `src/components/arc` | The brief asked for Arc wherever possible |
| Font | Inter (variable) for everything, via `next/font` (`--font-inter`) | Requested; swap in `src/app/layout.tsx` and `src/app/brand.css` |
| Ink and primary | Deep green `oklch(25% .045 165)` for text and primary buttons | Trust; reads as near-black, so it stays calm |
| Accent | Green `oklch(41% .085 165)` for active nav, icons and checks | Arc spends the accent only on state and emphasis |
| Brand detail | Ginger `oklch(70% .145 58)`: logo mark, step numbers, belief numbers | "Halia" means ginger; used sparingly so it stays special |
| Backdrop | Faint green to ginger wash behind each page hero | The one gradient Arc allows (a marketing backdrop) |
| Photos | Placeholder rectangles that show their Unsplash search term | Swap each one for an `<img>` once photos are picked |

All colours are semantic tokens in `src/app/brand.css`, layered over Arc's `foundation.css`. Change them there and every component follows.

## References (Mobbin)

- Split hero with copy and visual: [Ramp](https://mobbin.com/sites/sections/16357375-1402-4490-9be0-0a39d44ad6ff), [Kajabi](https://mobbin.com/sites/sections/c05626d4-008e-4977-abf1-052cb7cfed46)
- Four services in one ruled row: [Stripe](https://mobbin.com/sites/sections/6aa0864b-575a-40ac-9972-20a01167c8c4), [Loom](https://mobbin.com/sites/sections/dbde8b55-4ad6-4bd1-9a03-eeead0dae6d1)
- Numbered steps: [Clay](https://mobbin.com/sites/sections/28c16d19-1b1c-4c38-b06e-660c77901cbc) (fees process cards), [Railway](https://mobbin.com/sites/sections/35a42526-d3b6-4e26-abf7-47667d6e7479) (vertical list)
- Plan cards with "from" prices and check lists: [TravelPerk](https://mobbin.com/sites/sections/7960b30e-a40a-4ef8-b4e2-89d4c80cb113), [Assembly](https://mobbin.com/sites/sections/d85b73b7-54b8-4133-8aca-0c8781651569)

## Global

| Element | Arc item |
|---|---|
| Demo banner (every page) | `announcement-bar`, inverted, not dismissible |
| Header: text logo, nav, "WhatsApp us" and "Book a free call" | `site-header` (simple); folds into a sheet below 760px |
| Footer: address, phone, email, privacy notice, LinkedIn, Facebook | `site-footer` (columns, no newsletter) |
| WhatsApp button | Floating pill (icon only on phones), links to Contact as the brief asks |

## Pages

### Home
1. Hero: `hero-section` split, with "Book a free call" and "See our fees", and a photo placeholder
2. What we take off your plate: four services in one bordered row, icon and short text
3. Why business owners stay with us: three open columns under a rule (tinted band)
4. Getting started takes two weeks: sticky heading beside a numbered list
5. Who we work with: photo beside copy, with industry `badge`s (tinted band)
6. Not sure where your books stand?: `cta-section` centered

### Services
1. Hero: `hero-section` split with photo
2. Jump links, then the four services as full-width rows (title left, detail right), each with an anchor (`#bookkeeping`, `#tax`, `#payroll`, `#e-invoicing`)
3. Audit and company secretarial: panel with "Book a free call"

### About
1. Hero (story): `hero-section` split with photo
2. What we believe: three large numbered statements
3. The team: four cards with `avatar` initials, no faces
4. In numbers: `stats-band` divided, counting up
5. Come and see us: copy, button and photo

### How we work & fees
1. Hero: `hero-section` minimal
2. From first call to first report: four step cards
3. Fees: three plan cards (Starter, Company, Payroll)
4. Always included, never extra: check list panel
5. Questions we often hear: `faq-section` accordion
6. Get your fixed quote: `cta-section` centered

### Contact
1. Hero: `hero-section` minimal
2. Form, built from Arc `input`, `radio-group` (business type), `select` (what you need), `textarea` and `button`. It validates name and email; on send it shows "Thanks! This is a demo site…" in place and sends nothing
3. Other ways to reach us: details list, social links and photo
4. What happens next: numbered list

### Privacy notice
Placeholder structure with the Data Protection Officer contact. **Replace it with the standard template.** The registration number is left blank.

## Responsive

Checked at 390, 768, 1024 and 1440px, with no sideways scroll on any page. Multi-column layouts collapse to two columns around 1000px and to one around 800px. Gutters are 40px, or 16px on phones. Touch targets are at least 44px.

## Open points for the owner

- The content pack's hero and "why us" headings end with full stops. Arc's style drops them, but the client copy is kept as written.
- Payroll card: its three bullets (payslips; EPF, SOCSO, EIS and PCB; EA forms) come from the Services page copy.
- Social links are text links (LinkedIn, Facebook), not icons, because that is how Arc's footer renders them.
- The site is set to `noindex`, because every name and contact detail is invented. Remove `robots` in `layout.tsx` if it should appear in search.
