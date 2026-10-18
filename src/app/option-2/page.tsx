import type { Metadata } from "next";
import { BookOpenCheck, Check, FileCheck2, Landmark, Users } from "lucide-react";
import { Placeholder } from "@/components/v2/Placeholder";
import { v2 } from "@/components/v2/links";
import { bookCall, home } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "Design option 2" };

const plateIcons = [BookOpenCheck, Landmark, Users, FileCheck2];

export default function HomeOptionTwo() {
  return (
    <>
      <section className={s.wrap} aria-labelledby="hero-title">
        <div className={s.hero}>
          <p className={s.tag}><Landmark size={14} strokeWidth={1.75} aria-hidden="true" />Tax & Accounting, Petaling Jaya</p>
          <h1 id="hero-title" className={s.display}>{home.hero.title}</h1>
          <p className={s.lead}>{home.hero.text}</p>
          <div className={s.heroActions}>
            <a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a>
            <a className={`${s.pillGhost} ${s.pillLg}`} href={v2(home.hero.secondary.href)}>{home.hero.secondary.label}</a>
          </div>
          <div className={s.heroMedia}><Placeholder search={home.hero.photo} ratio="21 / 9" /></div>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section}`} aria-labelledby="plate-title">
        <div className={s.centerHead}>
          <h2 id="plate-title" className={s.h2}>{home.plate.title}</h2>
        </div>
        <ul className={`${s.cols4} ${s.centered}`}>
          {home.plate.items.map((item, index) => {
            const Icon = plateIcons[index];
            return (
              <li key={item.title}>
                <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                <h3 className={s.h4}>{item.title}</h3>
                <p className={s.text}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="why-title">
        <div className={s.split}>
          <div className={s.stack}>
            <h2 id="why-title" className={s.tag}>{home.why.title}</h2>
            <ul className={s.checks}>
              {home.why.items.map(item => (
                <li key={item.title} className={s.checkLine}><Check strokeWidth={1.5} aria-hidden="true" /><span>{item.title}</span></li>
              ))}
            </ul>
          </div>
          <ul className={s.ruledList}>
            {home.why.items.map(item => (
              <li key={item.title}>
                <h3 className={s.h4}>{item.title.replace(/\.$/, "")}</h3>
                <p className={s.text}>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.wrapRule}`} aria-labelledby="start-title">
        <div className={s.centerHead}>
          <h2 id="start-title" className={s.h2}>{home.start.title}</h2>
        </div>
        <ol className={`${s.track} ${s.track3}`}>
          {home.start.steps.map((step, index) => (
            <li key={step} className={s.trackStep}>
              <span className={s.trackNo}>Step {index + 1}</span>
              <p className={s.stepText}>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="who-title">
        <div className={`${s.split} ${s.splitCenter}`}>
          <Placeholder search={home.who.photo} ratio="4 / 3" />
          <div className={s.stack}>
            <h2 id="who-title" className={s.h2}>{home.who.title}</h2>
            <ul className={s.bigList} aria-label="Industries">{home.who.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
            <p className={s.lead}>{home.who.text}</p>
          </div>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.wrapRule}`} aria-labelledby="cta-title">
        <div className={`${s.hero} ${s.ctaBlock}`}>
          <h2 id="cta-title" className={s.display}>{home.cta.title}</h2>
          <p className={s.lead}>{home.cta.text}</p>
          <div className={s.heroActions}>
            <a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a>
          </div>
        </div>
      </section>
    </>
  );
}
