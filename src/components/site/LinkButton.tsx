import { ActionLink } from "@/components/arc/blocks/hero-section/hero-content";

/** A link styled as an Arc button, for navigation (Arc: navigate with a link, not a button). */
export function LinkButton({ label, href, kind = "primary", className }: { label: string; href: string; kind?: "primary" | "secondary"; className?: string }) {
  return <ActionLink action={{ label, href }} kind={kind} className={className} />;
}
