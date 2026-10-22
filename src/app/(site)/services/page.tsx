import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Placeholder } from "@/components/site/Placeholder";
import { bookCall, services } from "@/content/site";
import s from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "Services", description: services.hero.text };

export default function ServicesPage() {
  return (
    <>
      <Hero
        title={services.hero.title}
        text={services.hero.text}
        actions={services.items.map(item => <a key={item.id} className={`${s.btnSoft} ${s.btnSm}`} href={`#${item.id}`}>{item.title}</a>)}
        visual={<Placeholder search={services.hero.photo} fill />}
      />

      <section className={s.section} aria-label="What we do">
        <ol className={s.rows}>
          {services.items.map((item, index) => (
            <li key={item.id} id={item.id} className={s.row}>
              <span className={s.rowIndex}>0{index + 1}</span>
              <h2 className={s.section2}>{item.title}</h2>
              <p className={s.body}>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={s.section} aria-labelledby="partners-title">
        <div className={s.dark}>
          <div className={s.darkCopy}>
            <h2 id="partners-title" className={s.section2}>{services.partners.title}</h2>
            <p className={s.body}>{services.partners.text}</p>
          </div>
          <a className={s.btnLight} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
