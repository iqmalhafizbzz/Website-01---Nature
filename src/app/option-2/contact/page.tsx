import type { Metadata } from "next";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Placeholder } from "@/components/v2/Placeholder";
import { contact, site } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "Contact (option 2)", description: contact.hero.text };

export default function ContactOptionTwo() {
  return (
    <>
      <section className={s.wrap} aria-labelledby="hero-title">
        <div className={s.titleBlock}>
          <h1 id="hero-title" className={s.display}>{contact.hero.title}</h1>
        </div>
      </section>

      <section className={s.wrap} aria-label="Enquiry and contact details">
        <div className={s.row}>
          <div className={s.rowHead}>
            <h2 className={s.h3}>Send an enquiry</h2>
            <p className={`${s.text} ${s.muted}`}>{contact.hero.text}</p>
          </div>
          <div className={s.rowBody}>
            <div className={s.span2}><EnquiryForm bare /></div>
            <aside className={s.stack} aria-labelledby="other-title">
              <h2 id="other-title" className={s.h4}>{contact.other.title}</h2>
              <div className={s.colTight}>
                <p className={s.meta}>Phone</p>
                <a className={s.link} href={site.phoneHref}>{site.phone}</a>
              </div>
              <div className={s.colTight}>
                <p className={s.meta}>Email</p>
                <a className={s.link} href={`mailto:${site.email}`}>{site.email}</a>
              </div>
              <div className={s.colTight}>
                <p className={s.meta}>Office</p>
                <p className={s.text}>{site.address[0]}<br />{site.address[1]}</p>
              </div>
              <div className={s.colTight}>
                <p className={s.meta}>Hours</p>
                <p className={s.text}>{site.hours}</p>
              </div>
              <p className={`${s.text} ${s.inlineLinks}`}>
                {site.socials.map(social => <a key={social.label} className={s.link} href={social.href}>{social.label}</a>)}
              </p>
              <Placeholder search={contact.other.photo} ratio="4 / 3" />
            </aside>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.rowHead}><h2 className={s.h3}>{contact.next.title}</h2></div>
          <ol className={`${s.rowBody} ${s.track} ${s.track3}`}>
            {contact.next.steps.map((step, index) => (
              <li key={step} className={s.trackStep}>
                <span className={s.trackNo}>Step {index + 1}</span>
                <p className={s.stepText}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className={s.endSpace} aria-hidden="true" />
    </>
  );
}
