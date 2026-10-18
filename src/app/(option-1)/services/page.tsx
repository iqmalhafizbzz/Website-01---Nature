import type { Metadata } from "next";
import { BookOpenCheck, FileCheck2, Landmark, Users } from "lucide-react";
import { HeroSection } from "@/components/arc/blocks/hero-section/hero-section";
import { LinkButton } from "@/components/site/LinkButton";
import { Placeholder } from "@/components/site/Placeholder";
import { Section, ui } from "@/components/site/Section";
import { bookCall, services } from "@/content/site";
import b from "@/components/site/blocks.module.css";

export const metadata: Metadata = { title: "Services", description: services.hero.text };

const icons = [BookOpenCheck, Landmark, Users, FileCheck2];

export default function ServicesPage() {
  return (
    <>
      <div className={ui.wash}>
        <HeroSection variant="split" title={services.hero.title} description={services.hero.text} media={<Placeholder search={services.hero.photo} ratio="5 / 4" />} className={ui.onTone} />
      </div>

      <Section labelledBy="services-list">
        <h2 id="services-list" className="srOnly">What we do</h2>
        <ul className={b.jump} aria-label="Jump to a service">
          {services.items.map(item => (
            <li key={item.id}><a className={b.jumpLink} href={`#${item.id}`}>{item.title}</a></li>
          ))}
        </ul>
        <ul className={b.serviceList} role="list">
          {services.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.id} id={item.id} className={b.service}>
                <div className={b.serviceHead}>
                  <Icon className={b.plateIcon} size={24} strokeWidth={1.75} aria-hidden="true" />
                  <h3 className={b.serviceTitle}>{item.title}</h3>
                </div>
                <p className={b.serviceText}>{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="tinted" labelledBy="partners-title">
        <div className={b.panel}>
          <div className={b.panelCopy}>
            <h2 id="partners-title" className={ui.heading}>{services.partners.title}</h2>
            <p className={ui.lead}>{services.partners.text}</p>
          </div>
          <LinkButton {...bookCall} />
        </div>
      </Section>
    </>
  );
}
