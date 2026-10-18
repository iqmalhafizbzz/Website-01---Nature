import type { Metadata } from "next";
import { AnimatedCounter } from "@/components/arc/animated-counter/animated-counter";
import { Placeholder } from "@/components/v2/Placeholder";
import { v2 } from "@/components/v2/links";
import { about, bookCall } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "About (option 2)", description: "The firm's story and the people behind it." };

const initials = (name: string) => name.split(" ").slice(0, 2).map(part => part[0]).join("");

export default function AboutOptionTwo() {
  return (
    <>
      <section className={s.wrap} aria-labelledby="hero-title">
        <div className={s.hero}>
          <h1 id="hero-title" className={s.display}>{about.hero.title}</h1>
          <p className={s.lead}>{about.hero.text}</p>
          <div className={s.heroMedia}><Placeholder search={about.hero.photo} ratio="21 / 9" /></div>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section}`} aria-labelledby="beliefs-title">
        <div className={s.centerHead}><h2 id="beliefs-title" className={s.h2}>{about.beliefs.title}</h2></div>
        <ul className={s.cols3}>
          {about.beliefs.items.map(item => (
            <li key={item} className={s.plan}><p className={s.h3}>{item}</p></li>
          ))}
        </ul>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="team-title">
        <div className={s.centerHead}><h2 id="team-title" className={s.h2}>{about.team.title}</h2></div>
        <ul className={s.cols4}>
          {about.team.people.map(person => (
            <li key={person.name} className={s.col}>
              <div className={s.ph} style={{ aspectRatio: "4 / 5" }} role="img" aria-label={`Initials for ${person.name}`}>
                <span className={s.initials} aria-hidden="true">{initials(person.name)}</span>
              </div>
              <p className={s.meta}>{person.role}</p>
              <h3 className={s.personName}>{person.name}</h3>
              <p className={`${s.text} ${s.muted}`}>{person.about}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.wrapRule}`} aria-labelledby="numbers-title">
        <div className={s.centerHead}><h2 id="numbers-title" className={s.h2}>{about.numbers.title}</h2></div>
        <ul className={s.cols3}>
          {about.numbers.stats.map(stat => (
            <li key={stat.label} className={s.stat}>
              {/* The counter lays out inline-flex, so a plain leading space would collapse. */}
              <AnimatedCounter value={stat.value} suffix={stat.suffix.replace(/^ /, "\u00a0")} animateOnView />
              <p className={s.text}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="visit-title">
        <div className={`${s.split} ${s.splitCenter}`}>
          <Placeholder search={about.visit.photo} ratio="4 / 3" />
          <div className={s.stack}>
            <h2 id="visit-title" className={s.h2}>{about.visit.title}</h2>
            <p className={s.lead}>{about.visit.text}</p>
            <div><a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
