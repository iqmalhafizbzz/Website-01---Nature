import type { Metadata } from "next";
import { Check } from "lucide-react";
import { HeroSection } from "@/components/arc/blocks/hero-section/hero-section";
import { FaqSection } from "@/components/arc/blocks/faq-section/faq-section";
import { CtaSection } from "@/components/arc/blocks/cta-section/cta-section";
import { Section, SectionHead, ui } from "@/components/site/Section";
import { bookCall, fees } from "@/content/site";
import b from "@/components/site/blocks.module.css";

export const metadata: Metadata = { title: "How we work & fees", description: fees.hero.text };

export default function FeesPage() {
  return (
    <>
      <div className={ui.wash}>
        <HeroSection variant="minimal" title={fees.hero.title} description={fees.hero.text} className={ui.onTone} />
      </div>

      <Section labelledBy="process-title">
        <SectionHead id="process-title" title={fees.process.title} />
        <ol className={b.process}>
          {fees.process.steps.map(step => (
            <li key={step.title} className={b.processCard}>
              <span className={b.stepNumber} aria-hidden="true" />
              <h3 className={b.processTitle}>
                {step.title}
                {step.meta && <span className={b.processMeta}> ({step.meta})</span>}
              </h3>
              <p className={b.processText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="tinted" labelledBy="fees-title">
        <SectionHead id="fees-title" title={fees.plans.title} />
        <ul className={b.plans} role="list">
          {fees.plans.items.map(plan => (
            <li key={plan.name} className={b.plan}>
              <div className={b.planHead}>
                <h3 className={b.planName}>{plan.name}</h3>
                <p className={b.planFor}>{plan.for}</p>
              </div>
              <p className={b.price}>
                {plan.prefix && <span className={b.pricePrefix}>{plan.prefix}</span>}
                <span className={b.priceRow}>
                  <span className={b.priceValue}>{plan.price}</span>
                  <span className={b.priceUnit}>{plan.unit}</span>
                </span>
              </p>
              <ul className={b.checks} aria-label={`${plan.name} includes`}>
                {plan.includes.map(entry => (
                  <li key={entry} className={b.check}><Check size={16} strokeWidth={1.75} aria-hidden="true" />{entry}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="included-title">
        <div className={b.included}>
          <div className={b.panelCopy}>
            <h2 id="included-title" className={ui.heading}>{fees.included.title}</h2>
            <p className={ui.body}>{fees.included.note}</p>
          </div>
          <ul className={b.includedList}>
            {fees.included.items.map(item => (
              <li key={item} className={b.check}><Check size={18} strokeWidth={1.75} aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <div className={ui.tinted}>
        <FaqSection variant="accordion" title={fees.faq.title} items={fees.faq.items} description="" contact={null} className={ui.onTone} />
      </div>

      <CtaSection variant="centered" title={fees.cta.title} description={fees.cta.text} primaryAction={bookCall} secondaryAction={null} note="" faces={[]} />
    </>
  );
}
