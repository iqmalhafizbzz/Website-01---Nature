import type { Metadata } from "next";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Placeholder } from "@/components/site/Placeholder";
import { contact, site } from "@/content/site";
import s from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "Contact", description: contact.hero.text };

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="page-title">
        <div className={s.split}>
          <div className={s.splitLeft}>
            <div className={s.heroCopy}>
              <h1 id="page-title" className={s.hero}>{contact.hero.title}</h1>
              <p className={s.body}>{contact.hero.text}</p>
            </div>
            <div className={s.heroCopy}>
              <h2 className={s.title}>{contact.other.title}</h2>
              <dl className={s.details}>
                <div><dt>Phone</dt><dd><a className={s.link} href={site.phoneHref}>{site.phone}</a></dd></div>
                <div><dt>Email</dt><dd><a className={s.link} href={`mailto:${site.email}`}>{site.email}</a></dd></div>
                <div><dt>Office</dt><dd>{site.address[0]}<br />{site.address[1]}</dd></div>
                <div><dt>Hours</dt><dd>{site.hours}</dd></div>
                <div><dt>Social</dt><dd>{site.socials.map((social, i) => <span key={social.label}>{i > 0 && " · "}<a className={s.link} href={social.href}>{social.label}</a></span>)}</dd></div>
              </dl>
              <Placeholder search={contact.other.photo} ratio="16 / 9" />
            </div>
          </div>
          <div className={s.splitRight}>
            <div className={s.featureCard}>
              <h2 className={s.title}>Send an enquiry</h2>
              <EnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <section className={s.section} aria-labelledby="next-title">
        <div className={s.narrow}>
          <div className={s.sectionHead}><h2 id="next-title" className={s.section2}>{contact.next.title}</h2></div>
          <ol className={s.rows}>
            {contact.next.steps.map((step, index) => (
              <li key={step} className={`${s.row} ${s.rowSimple}`}>
                <span className={s.rowIndex}>Step {index + 1}</span>
                <p className={s.title}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
