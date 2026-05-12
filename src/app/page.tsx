import Link from "next/link";
import { Header } from "@/components/Header";
import { TutorCard } from "@/components/TutorCard";
import { copy, getLocale, withLocale } from "@/lib/i18n";
import { getTutors } from "@/lib/supabase";

export default async function Home({ searchParams }: { searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  const tutors = (await getTutors()).slice(0, 2);
  const adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP ?? "224600000000";
  const adminMessage = encodeURIComponent(t.adminWhatsappMessage);

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="shell py-12 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900">{t.heroBadge}</p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-6xl">{t.heroTitle}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">{t.heroBody}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={withLocale("/tuteurs", locale)} className="btn-primary">{t.viewTutors}</Link>
                <a href={`https://wa.me/${adminWhatsapp}?text=${adminMessage}`} className="btn-secondary">{t.talkToMariama}</a>
              </div>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {[t.trustPoint1, t.trustPoint2, t.trustPoint3].map((point) => (
                  <div key={point} className="rounded-2xl border border-stone-200/70 bg-white/55 p-3 text-sm font-medium leading-5 text-stone-700 shadow-sm shadow-stone-200/40">{point}</div>
                ))}
              </div>
            </div>

            <div className="card p-4">
              <div className="rounded-[1.35rem] bg-stone-950 p-4 text-white">
                <p className="text-sm text-stone-300">{t.simpleSearch}</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl bg-white/10 p-4"><span className="text-stone-300">{t.subject}</span><p className="text-xl font-semibold">{locale === "fr" ? "Photographie" : "Photography"}</p></div>
                  <div className="rounded-2xl bg-white/10 p-4"><span className="text-stone-300">{t.neighborhood}</span><p className="text-xl font-semibold">Conakry · Kipé</p></div>
                  <div className="rounded-2xl bg-emerald-400 p-4 text-emerald-950"><span className="font-medium">{t.directContact}</span><p className="text-xl font-semibold">{t.whatsappOneClick}</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="shell pb-16">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="card p-6 sm:p-8">
              <p className="text-sm font-medium text-emerald-900">Konekte</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">{t.trustTitle}</h2>
              <p className="mt-4 text-base leading-7 text-stone-600">{t.trustBody}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Step title={t.stepOneTitle} body={t.stepOneBody} />
              <Step title={t.stepTwoTitle} body={t.stepTwoBody} />
              <Step title={t.stepThreeTitle} body={t.stepThreeBody} />
            </div>
          </div>
        </section>

        <section className="shell pb-16">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="text-sm font-medium text-emerald-900">{t.firstProfiles}</p><h2 className="text-2xl font-semibold tracking-tight">{t.availableTutors}</h2></div>
            <Link href={withLocale("/tuteurs", locale)} className="text-sm font-semibold text-emerald-900">{t.seeAll}</Link>
          </div>
          <div className="grid gap-4">{tutors.map((tutor) => <TutorCard key={tutor.id} tutor={tutor} locale={locale} />)}</div>
        </section>

        <section className="shell pb-16">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="card p-6">
              <p className="text-sm font-medium text-emerald-900">{t.parentCardLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{t.parentCardTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{t.parentCardBody}</p>
              <Link href={withLocale("/compte", locale)} className="btn-secondary mt-5">{t.parentCardCta}</Link>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-emerald-900">{t.providerCardLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{t.providerCardTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{t.providerCardBody}</p>
              <Link href={withLocale("/postuler", locale)} className="btn-secondary mt-5">{t.providerCardCta}</Link>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium text-emerald-900">{t.qualityCardLabel}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{t.qualityCardTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{t.qualityCardBody}</p>
              <Link href={withLocale("/tuteurs", locale)} className="btn-secondary mt-5">{t.qualityCardCta}</Link>
            </div>
          </div>
        </section>

        <section className="shell pb-20">
          <div className="card overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.85fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm font-medium text-emerald-900">{t.roadmapLabel}</p>
                <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-stone-950">{t.roadmapTitle}</h2>
                <p className="mt-4 max-w-2xl leading-7 text-stone-600">{t.roadmapBody}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.roadmapServices.map((service) => <span key={service} className="pill">{service}</span>)}
                </div>
              </div>
              <div className="bg-emerald-950 p-6 text-white sm:p-8">
                <p className="text-sm text-emerald-100">{t.betaTitle}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{t.betaCta}</h3>
                <p className="mt-4 leading-7 text-emerald-50/85">{t.betaBody}</p>
                <Link href={withLocale("/tuteurs", locale)} className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-emerald-950">{t.betaCta}</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function Step({ title, body }: { title: string; body: string }) {
  return (
    <div className="card p-5">
      <p className="text-lg font-semibold tracking-tight text-stone-950">{title}</p>
      <p className="mt-3 text-sm leading-6 text-stone-600">{body}</p>
    </div>
  );
}
