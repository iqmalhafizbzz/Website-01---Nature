import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";
import { bookCall, nav, site } from "@/content/site";
import s from "./site.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footPanel}>
        <div className={s.footTop}>
          <div className={s.footCol}>
            <a className={s.backTop} href="#main"><ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />Back to top</a>
          </div>
          <div className={s.footCol}>
            <h2>Pages</h2>
            <ul>{nav.map(item => <li key={item.value}><a href={item.href}>{item.label}</a></li>)}</ul>
          </div>
          <div className={s.footCol}>
            <h2>Contact</h2>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.whatsappHref}>WhatsApp us</a></li>
            </ul>
            <p>{site.address[0]}<br />{site.address[1]}</p>
            <p>{site.hours}</p>
          </div>
          <div className={s.footCol}>
            <a className={s.btnOutline} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
          </div>
        </div>
        <div className={s.footBottom}>
          <Link className={s.footBrand} href="/" prefetch={false}><span className={s.mark} aria-hidden="true" />{site.name}</Link>
          <span className={s.copyright}>© 2026 {site.name} {site.tagline}</span>
          <ul className={s.footLinks}>
            <li><a href="/privacy/">Privacy notice</a></li>
            {site.socials.map(social => <li key={social.label}><a href={social.href}>{social.label}</a></li>)}
          </ul>
        </div>
      </div>
      <p className={s.legal}>{site.demoBanner}</p>
    </footer>
  );
}
