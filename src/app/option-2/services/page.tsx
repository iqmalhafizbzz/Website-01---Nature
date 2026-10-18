import type { Metadata } from "next";
import { BookOpenCheck, FileCheck2, Landmark, Users } from "lucide-react";
import { Placeholder } from "@/components/v2/Placeholder";
import { v2 } from "@/components/v2/links";
import { bookCall, services } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "Services (option 2)", description: services.hero.text };

const icons = [BookOpenCheck, Landmark, Users, FileCheck2];

export default function ServicesOptionTwo() {
  return (
    <>
      <section className={s.wrap} aria-labelledby="hero-title">
        <div className={s.hero}>
          <h1 id="hero-title" className={s.display}>{services.hero.title}</h1>
          <p className={s.lead}>{services.hero.text}</p>
          <div className={s.heroMedia}><Placeholder search={services.hero.photo} ratio="21 / 9" /></div>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section}`} aria-label="What we do">
        <div className={s.ruled}>
          {services.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.id} id={item.id} className={s.row} aria-labelledby={`${item.id}-title`}>
                <div className={s.rowHead}>
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <h2 id={`${item.id}-title`} className={s.h3}>{item.title}</h2>
                </div>
                <div className={s.rowBody}>
                  <p className={`${s.lead} ${s.span2}`}>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="partners-title">
        <div className={`${s.row} ${s.ruled}`}>
          <div className={s.rowHead}>
            <h2 id="partners-title" className={s.h3}>{services.partners.title}</h2>
          </div>
          <div className={s.rowBody}>
            <div className={`${s.stack} ${s.span2}`}>
              <p className={s.lead}>{services.partners.text}</p>
              <div><a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
