import type { Metadata } from "next";
import { site } from "@/content/site";
import s from "@/components/v2/v2.module.css";

export const metadata: Metadata = { title: "Privacy notice (option 2)" };

// Same placeholder text as option 1 until the standard privacy template is pasted in.
const sections = [
  { title: "Who we are", body: `Halia & Co. PLT, ${site.address.join(", ")}. Registration number: ` },
  { title: "What we collect", body: "The details you give us in the enquiry form: your name, email, phone number, business type and message. On this demo site the form sends nothing." },
  { title: "Why we use it", body: "To reply to your enquiry and book a call. We do not sell your details or use them for unrelated marketing." },
  { title: "Your rights", body: "You can ask to see, correct or delete the personal data we hold about you." },
];

export default function PrivacyOptionTwo() {
  return (
    <section className={s.wrap} aria-labelledby="privacy-title">
      <div className={s.titleBlock}>
        <h1 id="privacy-title" className={s.display}>Privacy notice</h1>
        <p className={`${s.lead} ${s.muted}`}>Halia & Co. PLT is a demo business. This page shows where the standard privacy notice goes.</p>
      </div>
      {sections.map(section => (
        <div key={section.title} className={s.row}>
          <h2 className={s.h4}>{section.title}</h2>
          <p className={s.lead}>{section.body}</p>
        </div>
      ))}
      <div className={s.row}>
        <h2 className={s.h4}>Contact</h2>
        <p className={s.lead}>Data Protection Officer, <a className={s.link} href={`mailto:${site.email}`}>{site.email}</a></p>
      </div>
      <div className={s.endSpace} aria-hidden="true" />
    </section>
  );
}
