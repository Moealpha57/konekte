import { LANGUAGES, NEIGHBORHOODS, SERVICE_LABELS, SUBJECTS } from "@/lib/types";
import { copy, type Locale } from "@/lib/i18n";
import { SmoothSelect } from "@/components/SmoothSelect";

export function FilterBar({ searchParams, locale = "fr" }: { searchParams: { subject?: string; neighborhood?: string; language?: string; lang?: string }, locale?: Locale }) {
  const t = copy[locale];
  const serviceOptions = SUBJECTS.map((value) => ({ value, label: SERVICE_LABELS[locale][value as keyof typeof SERVICE_LABELS.en] }));
  return (
    <form className="card grid gap-3 p-4 sm:grid-cols-4" action="/tuteurs">
      {locale === "en" ? <input type="hidden" name="lang" value="en" /> : null}
      <Select name="subject" label={t.subject} allLabel={t.all} value={searchParams.subject} options={serviceOptions} />
      <Select name="neighborhood" label={t.neighborhood} allLabel={t.all} value={searchParams.neighborhood} options={NEIGHBORHOODS.map((value) => ({ value, label: value }))} />
      <Select name="language" label={t.languageLabel} allLabel={t.all} value={searchParams.language} options={LANGUAGES.map((value) => ({ value, label: value }))} />
      <div className="flex items-end gap-2">
        <button className="btn-primary w-full" type="submit">{t.filter}</button>
      </div>
    </form>
  );
}

function Select({ name, label, value, options, allLabel }: { name: string; label: string; value?: string; options: { value: string; label: string }[]; allLabel: string }) {
  return <SmoothSelect name={name} label={label} value={value ?? ""} placeholder={allLabel} options={options} />;
}
