# Halia & Co. demo site: design plan

Source: `brief.md` and `content-pack.md` (Halia & Co., an invented firm). Scope: Standard, 5 pages plus the privacy notice.

The site follows the layout of [Titan](https://mobbin.com/sites/titan-531f63fb-1ae0-4c09-8027-32e6a46fbbf7/989dabdd-348c-4842-8daf-9234f5e3929c/preview) on Mobbin. Earlier design options (Arc blocks, then an Altitude-style layout) were removed and remain in git history.

## Titan references

- [Split hero with stats row](https://mobbin.com/sites/sections/5e0d4910-5a39-4fa3-ae69-df856ef207a9)
- [Warm card grid ("Here's how Titan can help")](https://mobbin.com/sites/sections/4a668be2-df52-43f5-b883-5d45a9a8b8ff)
- [Split statement row](https://mobbin.com/sites/sections/711a886f-3d1c-4016-b874-af5114203fcb)
- [How it works steps](https://mobbin.com/sites/sections/0d103afa-c85e-4568-a98a-0a1e7cbd5e8f)
- [Pricing card with ruled rows](https://mobbin.com/sites/sections/d12538ca-944f-4b4d-87e5-aeb40c32680e)
- [Dark band](https://mobbin.com/sites/sections/f2e96a69-ac49-4209-8bf4-35c85e0a15a9)
- [Dark footer panel](https://mobbin.com/sites/sections/fcd49a83-357e-400b-88c4-e260b5b43baa)

## System

| Element | Choice |
|---|---|
| Frame | One white column up to 1256px wide, with 1px hairlines on both sides (hidden on phones) and 32px inner padding (16px on phones) |
| Sections | Stacked on full-width rules, with 96px of vertical padding (64px on phones) |
| Hero heading | Inter, **Semibold 42px**, line-height 1.1 |
| Section heading | Inter, **Semibold 30px**, line-height 1.2 |
| Body | Inter, **Medium 16px**, line-height 1.55 |
| Card and row titles | Inter, Semibold 20px |
| Labels, buttons, figures | Geist Mono, 12px uppercase for labels and buttons, 28–40px for prices and numbers |
| Colour | White page, deep green-black ink, warm grey cards, a dark green-black band and footer; ginger only on the logo mark and the "Free" badge |
| Buttons | Rounded pills: ink for the main action, warm grey in the nav, white on dark |
| Images | Plain grey rectangles labelled with their Unsplash search. No images are generated. |

All tokens live in `src/app/globals.css`, and the layout and components in `src/components/site/site.module.css`. Arc's Accordion, AnimatedCounter and form fields are reused and read the same tokens.

## Pages

- **Home:**
  - Split hero: a "Free" badge, the heading, body text, actions, and a grey rectangle on the right.
  - A ruled facts row with three stats.
  - Four warm service cards.
  - Numbered "why us" rows and the three getting-started steps.
  - A featured card for "Who we work with" beside a ruled list of industries.
  - A dark closing band.
- **Services:** split hero with jump pills, the four services as numbered rows, and the partners section as a dark band.
- **About:** split hero with a grey rectangle, beliefs as three warm cards, the team as initials on grey squares, numbers as counter cards, and a visit row.
- **How we work & fees:**
  - Opening heading and the four steps as an accordion.
  - Three plan cards with ruled rows.
  - "Always included" rows beside the note.
  - The FAQ accordion and a dark closing band.
- **Contact:** split layout with the heading and contact details on the left and the enquiry form in a warm card on the right, then the next-step rows. The form shows the demo message and sends nothing.
- **Privacy notice:** placeholder rows until the standard template is pasted in. The registration number is left blank.

## Open points for the owner

- The mono uppercase labels and buttons come from Titan. If Inter should be the only face, switch `--font-code` in `globals.css` to `--font-sans`.
- The "Free · 20-minute call, no obligation" badge and the "Tax & Accounting for small businesses in the Klang Valley" line in the hero are built from the content pack's wording. They are not separate copy in the pack.
- The site is set to `noindex`, because every name and contact detail is invented.
