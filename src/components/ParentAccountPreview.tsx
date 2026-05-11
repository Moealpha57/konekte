"use client";

import { FormEvent, useState } from "react";
import { LANGUAGES, NEIGHBORHOODS, SERVICE_LABELS, SUBJECTS } from "@/lib/types";
import { copy, type Locale } from "@/lib/i18n";
import { SmoothSelect } from "@/components/SmoothSelect";

export function ParentAccountPreview({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState("");
  const services = SUBJECTS.map((value) => ({ value, label: SERVICE_LABELS[locale][value as keyof typeof SERVICE_LABELS.en] }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(t.accountCreated);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6">
      <p className="text-sm font-semibold text-emerald-900">{t.accountEyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{t.accountFormTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">{t.accountFormBody}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input className="input" name="name" placeholder={t.fullName} required />
        <input className="input" name="phone" placeholder={t.whatsapp} required />
        <SmoothSelect name="subject" placeholder={t.serviceNeeded} options={services} required />
        <SmoothSelect name="neighborhood" placeholder={t.neighborhood} options={NEIGHBORHOODS.map((item) => ({ value: item, label: item }))} required />
        <SmoothSelect name="language" placeholder={t.preferredLanguage} options={LANGUAGES.map((item) => ({ value: item, label: item }))} required />
        <input className="input" name="budget" placeholder={t.budgetPlaceholder} />
      </div>
      <button className="btn-primary mt-4" type="submit">{t.createAccountPreview}</button>
      {status && <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-950">{status}</p>}
    </form>
  );
}
