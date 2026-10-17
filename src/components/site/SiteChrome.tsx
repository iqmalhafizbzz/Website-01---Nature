"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { AnnouncementBar } from "@/components/arc/announcement-bar/announcement-bar";
import { SiteHeader } from "@/components/arc/blocks/site-header/site-header";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import { bookCall, nav, site } from "@/content/site";
import styles from "./chrome.module.css";

function currentSection(pathname: string) {
  const match = nav.find(item => item.href !== "/" && pathname.startsWith(item.href.replace(/\/$/, "")));
  return match?.value ?? (pathname === "/" ? "home" : undefined);
}

export function DemoBanner() {
  return <AnnouncementBar tone="inverted" dismissible={false} autoPlay={false} label="Demo notice" messages={[{ id: "demo", message: site.demoBanner }]} />;
}

export function Header() {
  const pathname = usePathname();
  return (
    <SiteHeader
      variant="simple"
      label="Main"
      brand={{ name: site.name, href: "/", mark: <span className={styles.mark} aria-hidden="true" /> }}
      items={nav.filter(item => item.value !== "home")}
      current={currentSection(pathname)}
      secondaryAction={{ label: "WhatsApp us", href: site.whatsappHref }}
      primaryAction={bookCall}
    />
  );
}

export function Footer() {
  return (
    <SiteFooter
      variant="columns"
      brand={{ name: site.name, href: "/", mark: <span className={styles.mark} aria-hidden="true" /> }}
      tagline={`${site.tagline}. ${site.address.join(", ")}.`}
      columns={[
        { title: "Pages", links: nav.map(({ label, href }) => ({ label, href })) },
        {
          title: "Contact",
          links: [
            { label: site.phone, href: site.phoneHref },
            { label: site.email, href: `mailto:${site.email}` },
            { label: "WhatsApp us", href: site.whatsappHref },
          ],
        },
      ]}
      legal={[{ label: "Privacy notice", href: "/privacy/" }]}
      socials={site.socials}
      newsletter={null}
      status={null}
      year={2026}
      className={styles.footer}
    />
  );
}

/** Floating WhatsApp button. Per the brief it opens the Contact page rather than wa.me. */
export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;
  return (
    <a className={styles.whatsapp} href={site.whatsappHref}>
      <MessageCircle size={20} strokeWidth={1.75} aria-hidden="true" />
      <span>WhatsApp us</span>
    </a>
  );
}
