"use client";

import { FormEvent, useState } from "react";
import { LANGUAGES, NEIGHBORHOODS, SERVICE_LABELS, SUBJECTS } from "@/lib/types";
import { copy, type Locale } from "@/lib/i18n";

export function TutorApplicationForm({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState("");
  const serviceOptions = SUBJECTS.map((value) => ({ value, label: SERVICE_LABELS[locale][value as keyof typeof SERVICE_LABELS.en] }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(t.applicationStatus);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="card p-5 sm:p-6">
      <p className="text-sm font-semibold text-emerald-900">{t.applyFormLabel}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight">{t.applyFormTitle}</h2>
      <p className="mt-3 text-sm leading-6 text-stone-600">{t.applyFormBody}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input className="input" name="name" placeholder={t.fullName} required />
        <input className="input" name="phone" placeholder={t.whatsapp} required />
        <input className="input" name="school" placeholder={t.experiencePlaceholder} />
        <input className="input" name="rate" placeholder={t.ratePlaceholder} />
      </div>
      <div className="mt-4 grid gap-4">
        <CheckGroup name="subjects" label={t.subjects} options={serviceOptions} />
        <CheckGroup name="neighborhoods" label={t.neighborhoods} options={NEIGHBORHOODS.map((value) => ({ value, label: value }))} />
        <CheckGroup name="languages" label={t.languages} options={LANGUAGES.map((value) => ({ value, label: value }))} />
      </div>
      <textarea className="input mt-4 min-h-24" name="bio" placeholder={t.bioPlaceholder} />
      <button className="btn-primary mt-4" type="submit">{t.submitApplication}</button>
      {status && <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-950">{status}</p>}
    </form>
  );
}

function CheckGroup({ name, label, options }: { name: string; label: string; options: { value: string; label: string }[] }) {
  return <div><p className="label mb-2">{label}</p><div className="flex flex-wrap gap-2">{options.map((option) => <label key={option.value} className="pill cursor-pointer gap-2"><input type="checkbox" name={name} value={option.value} className="accent-emerald-900" /> {option.label}</label>)}</div></div>;
}
