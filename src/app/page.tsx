import { ArrowDown, ArrowRight, BookOpenCheck, FileCheck2, Landmark, Play, Users } from "lucide-react";
import { Hero } from "@/components/site/Hero";
import { Placeholder } from "@/components/site/Placeholder";
import { about, bookCall, home } from "@/content/site";
import s from "@/components/site/site.module.css";

const plateIcons = [BookOpenCheck, Landmark, Users, FileCheck2];

export default function HomePage() {
  return (
    <>
      <Hero
        top={<a className={s.announce} href={bookCall.href}><span className={s.badge}>Free</span><span>20-minute call, no obligation</span></a>}
        title={home.hero.title}
        text={home.hero.text}
        actions={
          <>
            <a className={s.btn} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
            <a className={s.btnText} href={home.hero.secondary.href}>{home.hero.secondary.label}<Play size={12} strokeWidth={1.75} aria-hidden="true" /></a>
          </>
        }
        visual={<Placeholder search={home.hero.photo} fill />}
        facts={
          <div className={s.facts}>
            <div className={s.factsLeft}>
              <p className={s.body}>Tax & Accounting for small businesses in the Klang Valley</p>
              <a className={s.down} href="#plate-title" aria-label="Skip to what we do"><ArrowDown size={14} strokeWidth={1.75} aria-hidden="true" /></a>
            </div>
            <dl className={s.stats}>
              {about.numbers.stats.map(stat => (
                <div key={stat.label} className={s.stat}>
                  <dt className={s.label}>{stat.label.charAt(0).toUpperCase() + stat.label.slice(1)}</dt>
                  <dd className={s.figure}>{stat.value}{stat.suffix}</dd>
                </div>
              ))}
            </dl>
          </div>
        }
      />

      <section className={s.section} aria-labelledby="plate-title">
        <div className={s.sectionHead}><h2 id="plate-title" className={s.section2}>{home.plate.title}</h2></div>
        <ul className={`${s.cards} ${s.cards4}`}>
          {home.plate.items.map((item, index) => {
            const Icon = plateIcons[index];
            return (
              <li key={item.title} className={s.card}>
                <div className={s.cardTop}>
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  <h3 className={s.title}>{item.title}</h3>
                </div>
                <p className={s.body}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="why-title">
        <div className={s.narrow}>
          <div className={s.sectionHead}><h2 id="why-title" className={s.section2}>{home.why.title}</h2></div>
          <ol className={s.rows}>
            {home.why.items.map((item, index) => (
              <li key={item.title} className={s.row}>
                <span className={s.rowIndex}>0{index + 1}</span>
                <h3 className={s.title}>{item.title.replace(/\.$/, "")}</h3>
                <p className={`${s.body} ${s.muted}`}>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.section} aria-labelledby="start-title">
        <div className={s.narrow}>
          <div className={s.sectionHead}>
            <h2 id="start-title" className={s.section2}>{home.start.title}</h2>
          </div>
          <ol className={s.rows}>
            {home.start.steps.map((step, index) => (
              <li key={step} className={`${s.row} ${s.rowSimple}`}>
                <span className={s.rowIndex}>Step {index + 1}</span>
                <p className={s.title}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.section} aria-labelledby="who-title">
        <div className={s.feature}>
          <div className={s.featureCard}>
            <h2 id="who-title" className={s.section2}>{home.who.title}</h2>
            <p className={s.body}>{home.who.text}</p>
            <Placeholder search={home.who.photo} ratio="16 / 10" />
          </div>
          <ul className={s.featureList} aria-label="Industries">
            {home.who.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </section>

      <section className={s.section} aria-labelledby="cta-title">
        <div className={s.dark}>
          <div className={s.darkCopy}>
            <h2 id="cta-title" className={s.section2}>{home.cta.title}</h2>
            <p className={s.body}>{home.cta.text}</p>
          </div>
          <a className={s.btnLight} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
