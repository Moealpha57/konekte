import { Header } from "@/components/Header";
import { TutorApplicationForm } from "@/components/TutorApplicationForm";
import { copy, getLocale } from "@/lib/i18n";

export default function ApplyPage({ searchParams }: { searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  return (
    <>
      <Header locale={locale} />
      <main className="shell py-8 sm:py-12">
        <div className="mb-6 max-w-2xl">
          <p className="text-sm font-medium text-emerald-900">{t.applyEyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{t.applyTitle}</h1>
          <p className="mt-3 text-stone-600">{t.applyIntro}</p>
        </div>
        <TutorApplicationForm locale={locale} />
      </main>
    </>
  );
}
