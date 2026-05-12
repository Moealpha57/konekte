"use client";

import { FormEvent, ReactNode, useState } from "react";
import { LANGUAGES, NEIGHBORHOODS, SERVICE_LABELS, SUBJECTS } from "@/lib/types";
import { Icon } from "@/components/Icon";
import { copy, type Locale } from "@/lib/i18n";
import { SmoothSelect } from "@/components/SmoothSelect";

export function CustomerRequestForm({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState("");
  const services = SUBJECTS.map((value) => ({ value, label: SERVICE_LABELS[locale][value as keyof typeof SERVICE_LABELS.en] }));

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(t.accountCreated);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="card overflow-visible">
        <RequestRow icon="cap" label={t.subject}>
          <SmoothSelect name="subject" placeholder={t.serviceNeeded} options={services} required />
        </RequestRow>
        <RequestRow icon="map" label={t.neighborhood}>
          <SmoothSelect name="neighborhood" placeholder={t.neighborhood} options={NEIGHBORHOODS.map((item) => ({ value: item, label: item }))} required />
        </RequestRow>
        <RequestRow icon="globe" label={t.preferredLanguage}>
          <SmoothSelect name="language" placeholder={t.preferredLanguage} options={LANGUAGES.map((item) => ({ value: item, label: item }))} required />
        </RequestRow>
      </div>

      <div className="card p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="input" name="name" placeholder={t.fullName} required />
          <input className="input" name="phone" placeholder={t.whatsapp} required />
          <input className="input sm:col-span-2" name="budget" placeholder={t.budgetPlaceholder} />
          <textarea className="input min-h-32 resize-none sm:col-span-2" name="details" placeholder={locale === "fr" ? "Décrivez votre besoin..." : "Describe your request..."} />
        </div>
      </div>

      <button className="btn-primary min-h-14 text-base" type="submit">
        <Icon name="star" className="mr-2 h-5 w-5" />
        {locale === "fr" ? "Obtenir un match" : "Get Matched"}
      </button>
      {status && <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-950">{status}</p>}
    </form>
  );
}

function RequestRow({ icon, label, children }: { icon: "cap" | "map" | "globe"; label: string; children: ReactNode }) {
  return (
    <div className="grid gap-3 border-b p-4 last:border-b-0 sm:grid-cols-[2.5rem_10rem_1fr] sm:items-center" style={{ borderColor: "var(--line)" }}>
      <span className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-900 sm:inline-flex">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="text-sm font-semibold text-stone-700">{label}</p>
      {children}
    </div>
  );
}
