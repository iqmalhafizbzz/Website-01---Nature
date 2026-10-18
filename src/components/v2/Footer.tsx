import { nav, site } from "@/content/site";
import { v2 } from "./links";
import s from "./v2.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.wrapRule}`}>
        <div className={s.footGrid}>
          <div className={s.col}>
            <a className={s.brand} href={v2("/")}><span className={s.mark} aria-hidden="true" />{site.name}</a>
            <p className={`${s.text} ${s.muted}`}>{site.tagline}</p>
          </div>
          <div className={s.col}>
            <h2 className={s.h4}>Pages</h2>
            <ul className={s.footList}>{nav.map(item => <li key={item.value}><a href={v2(item.href)}>{item.label}</a></li>)}</ul>
          </div>
          <div className={s.col}>
            <h2 className={s.h4}>Contact</h2>
            <ul className={s.footList}>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={v2(site.whatsappHref)}>WhatsApp us</a></li>
            </ul>
          </div>
          <div className={s.col}>
            <h2 className={s.h4}>Office</h2>
            <p className={s.text}>{site.address[0]}<br />{site.address[1]}</p>
            <p className={`${s.text} ${s.muted}`}>{site.hours}</p>
          </div>
        </div>
        <div className={s.footBottom}>
          <span>© 2026 {site.name}</span>
          <ul>
            <li><a href={v2("/privacy/")}>Privacy notice</a></li>
            {site.socials.map(social => <li key={social.label}><a href={social.href}>{social.label}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
