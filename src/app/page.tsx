import { BookOpenCheck, FileCheck2, Landmark, Users } from "lucide-react";
import { HeroSection } from "@/components/arc/blocks/hero-section/hero-section";
import { CtaSection } from "@/components/arc/blocks/cta-section/cta-section";
import { Badge } from "@/components/arc/badge/badge";
import { Placeholder } from "@/components/site/Placeholder";
import { Section, SectionHead, Split, ui } from "@/components/site/Section";
import { bookCall, home } from "@/content/site";
import b from "@/components/site/blocks.module.css";

const plateIcons = [BookOpenCheck, Landmark, Users, FileCheck2];

export default function HomePage() {
  return (
    <>
      <div className={ui.wash}>
        <HeroSection
          variant="split"
          title={home.hero.title}
          description={home.hero.text}
          primaryAction={bookCall}
          secondaryAction={home.hero.secondary}
          media={<Placeholder search={home.hero.photo} ratio="5 / 4" />}
          className={ui.onTone}
        />
      </div>

      <Section labelledBy="plate-title">
        <SectionHead id="plate-title" title={home.plate.title} />
        <ul className={b.plate} role="list">
          {home.plate.items.map((item, index) => {
            const Icon = plateIcons[index];
            return (
              <li key={item.title} className={b.plateItem}>
                <Icon className={b.plateIcon} size={24} strokeWidth={1.75} aria-hidden="true" />
                <h3 className={b.plateTitle}>{item.title}</h3>
                <p className={b.plateText}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="tinted" labelledBy="why-title">
        <SectionHead id="why-title" title={home.why.title} />
        <ul className={b.reasons} role="list">
          {home.why.items.map(item => (
            <li key={item.title} className={b.reason}>
              <h3 className={b.reasonTitle}>{item.title}</h3>
              <p className={b.reasonText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="start-title">
        <div className={b.stepsSplit}>
          <div className={b.stepsHead}>
            <h2 id="start-title" className={ui.heading}>{home.start.title}</h2>
          </div>
          <ol className={b.steps}>
            {home.start.steps.map(step => (
              <li key={step} className={b.step}>
                <span className={b.stepNumber} aria-hidden="true" />
                <p className={b.stepText}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="tinted" labelledBy="who-title">
        <Split
          reverse
          visual={<Placeholder search={home.who.photo} ratio="4 / 3" />}
          copy={
            <>
              <h2 id="who-title" className={ui.heading}>{home.who.title}</h2>
              <p className={ui.lead}>{home.who.text}</p>
              <ul className={b.tags} aria-label="Industries">
                {home.who.tags.map(tag => (
                  <li key={tag}><Badge tone="neutral">{tag}</Badge></li>
                ))}
              </ul>
            </>
          }
        />
      </Section>

      <CtaSection variant="centered" title={home.cta.title} description={home.cta.text} primaryAction={bookCall} secondaryAction={null} note="" faces={[]} />
    </>
  );
}
