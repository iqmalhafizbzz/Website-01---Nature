import type { Metadata } from "next";
import { HeroSection } from "@/components/arc/blocks/hero-section/hero-section";
import { StatsBand } from "@/components/arc/blocks/stats-band/stats-band";
import { Avatar } from "@/components/arc/avatar/avatar";
import { LinkButton } from "@/components/site/LinkButton";
import { Placeholder } from "@/components/site/Placeholder";
import { Section, SectionHead, Split, ui } from "@/components/site/Section";
import { about, bookCall } from "@/content/site";
import b from "@/components/site/blocks.module.css";

export const metadata: Metadata = { title: "About", description: "The firm's story and the people behind it." };

export default function AboutPage() {
  return (
    <>
      <div className={ui.wash}>
        <HeroSection variant="split" title={about.hero.title} description={about.hero.text} media={<Placeholder search={about.hero.photo} ratio="5 / 4" />} className={ui.onTone} />
      </div>

      <Section labelledBy="beliefs-title">
        <SectionHead id="beliefs-title" title={about.beliefs.title} />
        <ol className={b.beliefs}>
          {about.beliefs.items.map(item => (
            <li key={item} className={b.belief}><p className={b.beliefText}>{item}</p></li>
          ))}
        </ol>
      </Section>

      <Section tone="tinted" labelledBy="team-title">
        <SectionHead id="team-title" title={about.team.title} />
        <ul className={b.team} role="list">
          {about.team.people.map(person => (
            <li key={person.name} className={b.person}>
              <Avatar name={person.name} size="lg" />
              <div>
                <h3 className={b.personName}>{person.name}</h3>
                <p className={b.personRole}>{person.role}</p>
              </div>
              <p className={b.personAbout}>{person.about}</p>
            </li>
          ))}
        </ul>
      </Section>

      <StatsBand layout="divided" title={about.numbers.title} stats={about.numbers.stats} />

      <Section tone="tinted" labelledBy="visit-title">
        <Split
          visual={<Placeholder search={about.visit.photo} ratio="4 / 3" />}
          copy={
            <>
              <h2 id="visit-title" className={ui.heading}>{about.visit.title}</h2>
              <p className={ui.lead}>{about.visit.text}</p>
              <LinkButton {...bookCall} />
            </>
          }
        />
      </Section>
    </>
  );
}
