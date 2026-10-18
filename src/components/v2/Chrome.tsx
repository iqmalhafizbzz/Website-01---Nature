"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { bookCall, site } from "@/content/site";
import { v2, v2Nav, v2Section } from "./links";
import s from "./v2.module.css";

export function Banner() {
  return (
    <div className={s.banner} role="region" aria-label="Demo notice">
      <span>{site.demoBanner}</span>
      {/* A full page load keeps each design option's stylesheet to itself. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/">See design option 1<ArrowRight size={12} strokeWidth={1.75} aria-hidden="true" /></a>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const current = v2Section(pathname);
  const [open, setOpen] = useState(false);
  const label = v2Nav.find(item => item.value === current)?.label;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = v2Nav.map(item => (
    <li key={item.value}>
      <a className={s.navLink} href={item.href} aria-current={item.value === current ? "page" : undefined}>{item.label}</a>
    </li>
  ));

  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <div className={s.bar}>
          <a className={s.brand} href={v2("/")}><span className={s.mark} aria-hidden="true" />{site.name}</a>
          <nav aria-label="Main"><ul className={s.nav}>{links}</ul></nav>
          <div className={s.actions}>
            <a className={s.pillGhost} href={v2(site.whatsappHref)}>WhatsApp us</a>
            <a className={s.pill} href={v2(bookCall.href)}>{bookCall.label}</a>
          </div>
          <button type="button" className={s.menuButton} aria-expanded={open} aria-controls="v2-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(value => !value)}>
            {open ? <X size={22} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={22} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>
        {open && (
          <nav id="v2-menu" className={s.panel} aria-label="Main">
            <ul className={s.panelList}>{links}</ul>
            <div className={s.panelActions}>
              <a className={`${s.pillGhost} ${s.pillLg}`} href={v2(site.whatsappHref)}>WhatsApp us</a>
              <a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a>
            </div>
          </nav>
        )}
        {label && current !== "home" && <p className={s.pageLabel}>{label}</p>}
      </div>
    </header>
  );
}
