import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ReviewAndSafety } from "@/components/ReviewAndSafety";
import { copy, getLocale, withLocale } from "@/lib/i18n";
import { SERVICE_LABELS } from "@/lib/types";
import { localizeTutor } from "@/lib/localized";
import { getReviews, getTutor } from "@/lib/supabase";

export default async function TutorProfile({ params, searchParams }: { params: { id: string }; searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  const rawTutor = await getTutor(params.id);
  if (!rawTutor) notFound();
  const tutor = localizeTutor(rawTutor, locale);
  const reviews = await getReviews(tutor.id);
  const labelService = (item: string) => SERVICE_LABELS[locale][item as keyof typeof SERVICE_LABELS.en] ?? item;

  const message = encodeURIComponent(t.profileWhatsappMessage(tutor.name));
  const whatsappHref = `https://wa.me/${tutor.whatsapp.replace(/\D/g, "")}?text=${message}`;

  return (
    <>
      <Header locale={locale} />
      <main className="shell py-8 sm:py-12">
        <Link href={withLocale("/tuteurs", locale)} className="text-sm font-semibold text-emerald-900">{t.backToTutors}</Link>
        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="card overflow-hidden">
            <div className="aspect-[4/5] bg-emerald-50">
              {tutor.photo_url ? <img src={tutor.photo_url} alt={tutor.name} className="h-full w-full object-cover" /> : null}
            </div>
          </div>
          <div className="card p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-900">{t.tutorProfile}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{tutor.name}</h1>
            {tutor.school_affiliation && <p className="mt-2 text-lg text-stone-600">{tutor.school_affiliation}</p>}
            <div className="mt-6 rounded-3xl bg-emerald-950 p-5 text-white">
              <p className="text-sm text-emerald-100">{t.hourlyRate}</p>
              <p className="mt-1 text-3xl font-semibold">{new Intl.NumberFormat("fr-GN").format(tutor.hourly_rate_gnf)} GNF</p>
            </div>
            <p className="mt-6 text-lg leading-8 text-stone-700">{tutor.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tutor.verified && <span className="pill">{t.profileVerified}</span>}
              <span className="pill">★ {tutor.rating_average?.toFixed(1) ?? "—"} · {tutor.rating_count ?? reviews.length} {t.reviews}</span>
              {tutor.response_badge && <span className="pill">{tutor.response_badge}</span>}
            </div>
            <Info title={t.subjects} items={tutor.subjects.map(labelService)} />
            <Info title={t.neighborhoods} items={tutor.neighborhoods} />
            <Info title={t.languages} items={tutor.languages} />
            <a href={whatsappHref} className="btn-primary mt-8 w-full sm:w-auto">{t.contactWhatsapp}</a>
          </div>
        </section>
        <ReviewAndSafety tutor={tutor} reviews={reviews} locale={locale} />
      </main>
    </>
  );
}

function Info({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-sm font-semibold text-stone-950">{title}</h2>
      <div className="mt-2 flex flex-wrap gap-2">{items.map((item) => <span className="pill" key={item}>{item}</span>)}</div>
    </div>
  );
}
