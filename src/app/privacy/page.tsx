import type { Metadata } from "next";
import { site } from "@/content/site";
import s from "@/components/site/site.module.css";

export const metadata: Metadata = { title: "Privacy notice" };

// Placeholder structure until the standard privacy template is pasted in.
// The registration number is left blank on purpose (demo business).
const sections = [
  { title: "Who we are", body: `Halia & Co. PLT, ${site.address.join(", ")}. Registration number: ` },
  { title: "What we collect", body: "The details you give us in the enquiry form: your name, email, phone number, business type and message. On this demo site the form sends nothing." },
  { title: "Why we use it", body: "To reply to your enquiry and book a call. We do not sell your details or use them for unrelated marketing." },
  { title: "Your rights", body: "You can ask to see, correct or delete the personal data we hold about you." },
];

export default function PrivacyPage() {
  return (
    <>
      <section className={s.pageHead} aria-labelledby="page-title">
        <h1 id="page-title" className={s.hero}>Privacy notice</h1>
        <p className={`${s.body} ${s.muted}`}>Halia & Co. PLT is a demo business. This page shows where the standard privacy notice goes.</p>
      </section>
      <section className={s.section} aria-label="Notice">
        <div className={s.narrow}>
          <ol className={s.rows}>
            {sections.map((section, index) => (
              <li key={section.title} className={s.row}>
                <span className={s.rowIndex}>0{index + 1}</span>
                <h2 className={s.title}>{section.title}</h2>
                <p className={s.body}>{section.body}</p>
              </li>
            ))}
            <li className={s.row}>
              <span className={s.rowIndex}>0{sections.length + 1}</span>
              <h2 className={s.title}>Contact</h2>
              <p className={s.body}>Data Protection Officer, <a className={s.link} href={`mailto:${site.email}`}>{site.email}</a></p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
