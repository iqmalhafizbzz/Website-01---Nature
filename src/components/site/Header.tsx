"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { bookCall, nav, site } from "@/content/site";
import s from "./site.module.css";

const links = nav.filter(item => item.value !== "home");

// Matches on the page slug, so it works whatever path the site is served from.
function currentSection(pathname: string) {
  return links.find(item => pathname.includes(item.href.replaceAll("/", "")))?.value;
}

export function Header() {
  const current = currentSection(usePathname());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const items = links.map(item => (
    <li key={item.value}>
      <a className={s.navLink} href={item.href} aria-current={item.value === current ? "page" : undefined}>{item.label}</a>
    </li>
  ));

  return (
    <header className={s.header}>
      <div className={s.bar}>
        <Link className={s.brand} href="/" prefetch={false}><span className={s.mark} aria-hidden="true" />{site.name}</Link>
        <nav aria-label="Main"><ul className={s.navPill}>{items}</ul></nav>
        <div className={s.headerEnd}>
          <a className={s.textLink} href={site.whatsappHref}>WhatsApp us</a>
          <a className={`${s.btnSoft} ${s.btnSm}`} href={bookCall.href}>{bookCall.label}</a>
        </div>
        <button type="button" className={s.menuButton} aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
          {open ? <X size={20} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <nav id="site-menu" className={s.menu} aria-label="Main">
          <ul className={s.menuList}>{items}</ul>
          <div className={s.menuActions}>
            <a className={s.btnSoft} href={site.whatsappHref}>WhatsApp us</a>
            <a className={s.btn} href={bookCall.href}>{bookCall.label}</a>
          </div>
        </nav>
      )}
    </header>
  );
}
