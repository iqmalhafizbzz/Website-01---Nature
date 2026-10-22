// Canvas items: one live preview per site page, side by side at desktop width.
// Add, rename or remove items here; the camera and gesture code never needs to change.
// Each preview is the real page at its route, loaded in a same-origin frame so its media queries see
// the item's own width. The pages make no network requests; the contact form is a demo that sends nothing.

export type CanvasItem = {
  /** Stable key for saved positions. Never reuse an ID for different content. */
  id: string;
  /** Shown above the preview and copied when the name is clicked. Must be unique. */
  name: string;
  /** Route of the page to preview. */
  src: string;
  /** Preview width in canvas pixels. */
  width: number;
  /** Starting height in canvas pixels, used until the page reports its real height. */
  height: number;
  /** Starting position in canvas pixels (top-left of the preview, below its name). */
  x: number;
  y: number;
};

const DESKTOP = 1440;
const GAP = 240;

const pages = [
  { id: "page-home", name: "Home · desktop", src: "/" },
  { id: "page-services", name: "Services · desktop", src: "/services/" },
  { id: "page-about", name: "About · desktop", src: "/about/" },
  { id: "page-how-we-work", name: "How we work & fees · desktop", src: "/how-we-work/" },
  { id: "page-contact", name: "Contact · desktop", src: "/contact/" },
  { id: "page-privacy", name: "Privacy notice · desktop", src: "/privacy/" },
];

export const canvasItems: CanvasItem[] = pages.map((page, index) => ({
  ...page,
  width: DESKTOP,
  height: 3600,
  x: index * (DESKTOP + GAP),
  y: 0,
}));
