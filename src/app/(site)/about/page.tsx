import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { AnimatedCounter } from "@/components/arc/animated-counter/animated-counter";
import { Hero } from "@/components/site/Hero";
import { Placeholder } from "@/components/site/Placeholder";
import { about, bookCall } from "@/content/site";
import s from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "About", description: "The firm's story and the people behind it." };

const initials = (name: string) => name.split(" ").slice(0, 2).map(part => part[0]).join("");

export default function AboutPage() {
  return (
    <>
      <Hero title={about.hero.title} text={about.hero.text} visual={<Placeholder search={about.hero.photo} fill />} />

      <section className={s.section} aria-labelledby="beliefs-title">
        <div className={s.sectionHead}><h2 id="beliefs-title" className={s.section2}>{about.beliefs.title}</h2></div>
        <ul className={`${s.cards} ${s.cards3}`}>
          {about.beliefs.items.map((item, index) => (
            <li key={item} className={s.card}>
              <span className={s.rowIndex}>0{index + 1}</span>
              <p className={s.title}>{item}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="team-title">
        <div className={s.sectionHead}><h2 id="team-title" className={s.section2}>{about.team.title}</h2></div>
        <ul className={`${s.cards} ${s.cards4}`}>
          {about.team.people.map(person => (
            <li key={person.name} className={s.person}>
              <div className={s.ph} style={{ aspectRatio: "1 / 1" }} role="img" aria-label={`Initials for ${person.name}`}>
                <span className={s.initials} aria-hidden="true">{initials(person.name)}</span>
              </div>
              <div>
                <h3 className={s.title}>{person.name}</h3>
                <p className={s.personRole}>{person.role}</p>
              </div>
              <p className={`${s.body} ${s.muted}`}>{person.about}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="numbers-title">
        <div className={s.sectionHead}><h2 id="numbers-title" className={s.section2}>{about.numbers.title}</h2></div>
        <dl className={`${s.cards} ${s.cards3}`}>
          {about.numbers.stats.map(stat => (
            <div key={stat.label} className={s.card}>
              <dt className={s.body}>{stat.label.charAt(0).toUpperCase() + stat.label.slice(1)}</dt>
              {/* The counter lays out inline-flex, so a plain leading space would collapse. */}
              <dd className={s.counter}><AnimatedCounter value={stat.value} suffix={stat.suffix.replace(/^ /, " ")} animateOnView /></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={s.section} aria-labelledby="visit-title">
        <div className={s.feature}>
          <Placeholder search={about.visit.photo} ratio="4 / 3" />
          <div className={s.featureSide}>
            <div className={s.heroCopy}>
              <h2 id="visit-title" className={s.section2}>{about.visit.title}</h2>
              <p className={s.body}>{about.visit.text}</p>
              <a className={s.btn} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
