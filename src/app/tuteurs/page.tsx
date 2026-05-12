import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { TutorCard } from "@/components/TutorCard";
import { copy, getLocale } from "@/lib/i18n";
import { getTutors } from "@/lib/supabase";

export default async function TutorsPage({ searchParams }: { searchParams: { subject?: string; neighborhood?: string; language?: string; lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  const tutors = await getTutors(searchParams);
  return (
    <>
      <Header locale={locale} />
      <main className="shell py-8 sm:py-12">
        <div className="mb-6">
          <p className="text-sm font-medium text-emerald-900">{t.search}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{t.tutorsInConakry}</h1>
          <p className="mt-3 max-w-2xl text-stone-600">{t.tutorsIntro}</p>
        </div>
        <FilterBar searchParams={searchParams} locale={locale} />
        <div className="relative z-0 mt-6 grid gap-4">
          {tutors.length ? tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} locale={locale} />) : <div className="card p-8 text-center text-stone-600">{t.noTutors}</div>}
        </div>
      </main>
    </>
  );
}
