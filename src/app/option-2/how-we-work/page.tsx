import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Accordion } from "@/components/arc/accordion/accordion";
import { v2 } from "@/components/v2/links";
import { bookCall, fees } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "How we work & fees (option 2)", description: fees.hero.text };

export default function FeesOptionTwo() {
  return (
    <>
      <section className={s.wrap} aria-labelledby="hero-title">
        <div className={`${s.hero} ${s.heroPlain}`}>
          <h1 id="hero-title" className={s.display}>{fees.hero.title}</h1>
          <p className={s.lead}>{fees.hero.text}</p>
        </div>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="process-title">
        <div className={s.centerHead}><h2 id="process-title" className={s.h2}>{fees.process.title}</h2></div>
        <ol className={`${s.track} ${s.track4}`}>
          {fees.process.steps.map((step, index) => (
            <li key={step.title} className={s.trackStep}>
              <span className={s.trackNo}>Step {index + 1}{step.meta ? `, ${step.meta}` : ""}</span>
              <h3 className={s.stepText}>{step.title}</h3>
              <p className={`${s.text} ${s.muted}`}>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="fees-title">
        <div className={s.centerHead}><h2 id="fees-title" className={s.h2}>{fees.plans.title}</h2></div>
        <ul className={s.cols3}>
          {fees.plans.items.map(plan => (
            <li key={plan.name} className={s.plan}>
              <div className={s.colTight}>
                <h3 className={s.h4}>{plan.name}</h3>
                <p className={`${s.text} ${s.muted}`}>{plan.for}</p>
              </div>
              <div className={s.colTight}>
                {plan.prefix && <span className={s.meta}>{plan.prefix}</span>}
                <p className={s.price}><span className={s.priceValue}>{plan.price}</span><span className={s.text}>{plan.unit}</span></p>
              </div>
              <ul className={s.miniChecks} aria-label={`${plan.name} includes`}>
                {plan.includes.map(entry => <li key={entry}><Check size={14} strokeWidth={1.75} aria-hidden="true" />{entry}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="included-title">
        <div className={s.split}>
          <div className={s.stack}>
            <h2 id="included-title" className={s.tag}>{fees.included.title}</h2>
            <ul className={`${s.checks} ${s.checksSm}`}>
              {fees.included.items.map(item => <li key={item} className={s.checkLine}><Check strokeWidth={1.5} aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
          </div>
          <p className={`${s.lead} ${s.notePad}`}>{fees.included.note}</p>
        </div>
      </section>

      <section className={`${s.wrap} ${s.section} ${s.wrapRule}`} aria-labelledby="faq-title">
        <div className={s.split}>
          <h2 id="faq-title" className={s.h2}>{fees.faq.title}</h2>
          <Accordion size="lg" defaultOpen={-1} items={fees.faq.items.map(item => ({ title: item.question, content: item.answer }))} />
        </div>
      </section>

      <section className={`${s.wrap} ${s.sectionTight}`} aria-labelledby="cta-title">
        <div className={`${s.hero} ${s.ctaBlock}`}>
          <h2 id="cta-title" className={s.display}>{fees.cta.title}</h2>
          <p className={s.lead}>{fees.cta.text}</p>
          <div className={s.heroActions}><a className={`${s.pill} ${s.pillLg}`} href={v2(bookCall.href)}>{bookCall.label}</a></div>
        </div>
      </section>
    </>
  );
}
