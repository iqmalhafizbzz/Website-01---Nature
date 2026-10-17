"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/arc/input/input";
import { Textarea } from "@/components/arc/textarea/textarea";
import { Select } from "@/components/arc/select/select";
import { RadioGroup } from "@/components/arc/radio-group/radio-group";
import { Button } from "@/components/arc/button/button";
import { contact } from "@/content/site";
import styles from "./form.module.css";

type Fields = { name: string; email: string; phone: string; business: string; need: string; message: string };
const empty: Fields = { name: "", email: "", phone: "", business: "", need: "", message: "" };

function validate(fields: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!fields.name.trim()) errors.name = "Enter your name";
  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = "Enter an email like name@company.com";
  return errors;
}

/** Enquiry form. This is a demo: nothing is sent, the visitor sees a confirmation in place. */
export function EnquiryForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const errors = submitted ? validate(fields) : {};
  const set = (key: keyof Fields) => (value: string) => setFields(current => ({ ...current, [key]: value }));

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(validate(fields)).length > 0) return;
    setSending(true);
    window.setTimeout(() => { setSending(false); setSent(true); }, 600);
  }

  if (sent) {
    return (
      <div className={styles.done} role="status">
        <CheckCircle2 size={28} strokeWidth={1.75} aria-hidden="true" />
        <p className={styles.doneText}>{contact.form.thanks}</p>
        <Button variant="secondary" onClick={() => { setFields(empty); setSubmitted(false); setSent(false); }}>Write another message</Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className={styles.row}>
        <Input label="Name" name="name" autoComplete="name" value={fields.name} onChange={e => set("name")(e.target.value)} error={errors.name} required />
        <Input label="Email" name="email" type="email" autoComplete="email" value={fields.email} onChange={e => set("email")(e.target.value)} error={errors.email} required />
      </div>
      <Input label="Phone" name="phone" type="tel" autoComplete="tel" description="Optional" value={fields.phone} onChange={e => set("phone")(e.target.value)} />
      <RadioGroup label="Business type" name="business" value={fields.business} onValueChange={set("business")} options={contact.form.businessTypes.map(value => ({ value, label: value }))} />
      <Select label="What you need help with" name="need" placeholder="Choose one" value={fields.need} onValueChange={set("need")} options={contact.form.needs.map(value => ({ value, label: value }))} />
      <Textarea label="Message" name="message" rows={5} value={fields.message} onChange={e => set("message")(e.target.value)} />
      <div className={styles.actions}>
        <Button type="submit" size="lg" loading={sending}>{contact.form.submit}</Button>
      </div>
    </form>
  );
}
