import type { Metadata } from "next";
import { Section, ui } from "@/components/site/Section";
import { site } from "@/content/site";
import p from "./privacy.module.css";

export const metadata: Metadata = { title: "Privacy notice" };

// Placeholder structure until the standard Primaxoft privacy template is pasted in.
// Registered company number is left blank on purpose (demo business).
export default function PrivacyPage() {
  return (
    <Section labelledBy="privacy-title">
      <article className={p.article}>
        <h1 id="privacy-title" className={ui.heading}>Privacy notice</h1>
        <p className={ui.lead}>Halia & Co. PLT is a demo business. This page shows where the standard privacy notice goes.</p>

        <h2>Who we are</h2>
        <p>Halia & Co. PLT, {site.address.join(", ")}. Registration number: </p>

        <h2>What we collect</h2>
        <p>The details you give us in the enquiry form: your name, email, phone number, business type and message. On this demo site the form sends nothing.</p>

        <h2>Why we use it</h2>
        <p>To reply to your enquiry and book a call. We do not sell your details or use them for unrelated marketing.</p>

        <h2>Your rights</h2>
        <p>You can ask to see, correct or delete the personal data we hold about you.</p>

        <h2>Contact</h2>
        <p>Data Protection Officer, <a href={`mailto:${site.email}`}>{site.email}</a></p>
      </article>
    </Section>
  );
}
