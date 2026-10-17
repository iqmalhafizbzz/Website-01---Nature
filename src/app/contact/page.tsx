import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { HeroSection } from "@/components/arc/blocks/hero-section/hero-section";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Placeholder } from "@/components/site/Placeholder";
import { Section, ui } from "@/components/site/Section";
import { contact, site } from "@/content/site";
import b from "@/components/site/blocks.module.css";

export const metadata: Metadata = { title: "Contact", description: contact.hero.text };

export default function ContactPage() {
  return (
    <>
      <div className={ui.wash}>
        <HeroSection variant="minimal" title={contact.hero.title} description={contact.hero.text} className={ui.onTone} />
      </div>

      <Section labelledBy="form-title">
        <div className={b.contactGrid}>
          <div>
            <h2 id="form-title" className="srOnly">Send an enquiry</h2>
            <EnquiryForm />
          </div>

          <aside className={b.contactAside} aria-labelledby="other-title">
            <h2 id="other-title" className={b.serviceTitle}>{contact.other.title}</h2>
            <ul className={b.details}>
              <li className={b.detail}>
                <Phone size={16} strokeWidth={1.75} aria-hidden="true" />
                <div><p className={b.detailLabel}>Phone</p><p className={b.detailValue}><a href={site.phoneHref}>{site.phone}</a></p></div>
              </li>
              <li className={b.detail}>
                <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                <div><p className={b.detailLabel}>Email</p><p className={b.detailValue}><a href={`mailto:${site.email}`}>{site.email}</a></p></div>
              </li>
              <li className={b.detail}>
                <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
                <div><p className={b.detailLabel}>Office</p><p className={b.detailValue}>{site.address[0]}<br />{site.address[1]}</p></div>
              </li>
              <li className={b.detail}>
                <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
                <div><p className={b.detailLabel}>Hours</p><p className={b.detailValue}>{site.hours}</p></div>
              </li>
            </ul>
            <div className={b.socialRow}>
              {site.socials.map(social => <a key={social.label} href={social.href}>{social.label}</a>)}
            </div>
            <Placeholder search={contact.other.photo} ratio="4 / 3" />
          </aside>
        </div>
      </Section>

      <Section tone="tinted" labelledBy="next-title">
        <div className={b.stepsSplit}>
          <div className={b.stepsHead}>
            <h2 id="next-title" className={ui.heading}>{contact.next.title}</h2>
          </div>
          <ol className={b.steps}>
            {contact.next.steps.map(step => (
              <li key={step} className={b.step}>
                <span className={b.stepNumber} aria-hidden="true" />
                <p className={b.stepText}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
