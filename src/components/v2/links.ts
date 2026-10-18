import { nav } from "@/content/site";

/** Option 2 lives under /option-2/; content hrefs are written for option 1. */
export const v2 = (href: string) => (href.startsWith("/") ? `/option-2${href}` : href);

export const v2Nav = nav.filter(item => item.value !== "home").map(item => ({ ...item, href: v2(item.href) }));

/** The section a path belongs to, from its slug, so it works on any host path. */
export function v2Section(pathname: string) {
  return v2Nav.find(item => pathname.includes(item.value === "fees" ? "how-we-work" : item.value))?.value ?? "home";
}
