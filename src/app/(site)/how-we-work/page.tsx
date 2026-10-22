import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Accordion } from "@/components/arc/accordion/accordion";
import { bookCall, fees } from "@/content/site";
import s from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "How we work & fees", description: fees.hero.text };

export default function FeesPage() {
  return (
    <>
      <section className={s.pageHead} aria-labelledby="page-title">
        <h1 id="page-title" className={s.hero}>{fees.hero.title}</h1>
        <p className={s.body}>{fees.hero.text}</p>
      </section>

      <section className={s.section} aria-labelledby="process-title">
        <div className={s.narrow}>
          <div className={s.sectionHead}><h2 id="process-title" className={s.section2}>{fees.process.title}</h2></div>
          <Accordion
            size="lg"
            defaultOpen={0}
            items={fees.process.steps.map((step, index) => ({
              title: `Step ${index + 1}) ${step.title}${step.meta ? ` (${step.meta})` : ""}`,
              content: step.text,
            }))}
          />
        </div>
      </section>

      <section className={s.section} aria-labelledby="fees-title">
        <div className={s.sectionHead}><h2 id="fees-title" className={s.section2}>{fees.plans.title}</h2></div>
        <ul className={`${s.cards} ${s.cards3}`}>
          {fees.plans.items.map(plan => (
            <li key={plan.name} className={s.plan}>
              <h3 className={s.planName}>{plan.name}</h3>
              <div className={s.planRow}>
                <span className={s.priceBlock}>
                  {plan.prefix && <span className={s.label}>{plan.prefix}</span>}
                  <span className={s.price}>{plan.price}</span>
                </span>
                <span className={s.label}>{plan.unit}</span>
              </div>
              <div className={s.planRow}>
                <span className={s.body}>{plan.for}</span>
              </div>
              <ul className={s.checks} aria-label={`${plan.name} includes`}>
                {plan.includes.map(entry => <li key={entry} className={s.check}><Check size={14} strokeWidth={1.75} aria-hidden="true" />{entry}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section} aria-labelledby="included-title">
        <div className={s.twoCol}>
          <div className={s.colLeft}>
            <h2 id="included-title" className={s.section2}>{fees.included.title}</h2>
            <p className={`${s.body} ${s.muted}`}>{fees.included.note}</p>
          </div>
          <ul className={`${s.colRight} ${s.rows}`}>
            {fees.included.items.map(item => (
              <li key={item} className={`${s.row} ${s.rowSimple}`}>
                <Check size={16} strokeWidth={1.75} aria-hidden="true" />
                <p className={s.title}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.section} aria-labelledby="faq-title">
        <div className={s.narrow}>
          <div className={s.sectionHead}><h2 id="faq-title" className={s.section2}>{fees.faq.title}</h2></div>
          <Accordion size="lg" defaultOpen={-1} items={fees.faq.items.map(item => ({ title: item.question, content: item.answer }))} />
        </div>
      </section>

      <section className={s.section} aria-labelledby="cta-title">
        <div className={s.dark}>
          <div className={s.darkCopy}>
            <h2 id="cta-title" className={s.section2}>{fees.cta.title}</h2>
            <p className={s.body}>{fees.cta.text}</p>
          </div>
          <a className={s.btnLight} href={bookCall.href}>{bookCall.label}<ArrowRight size={14} strokeWidth={1.75} aria-hidden="true" /></a>
        </div>
      </section>
    </>
  );
}
