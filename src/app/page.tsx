import Link from "next/link";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { TutorCard } from "@/components/TutorCard";
import { copy, getLocale, withLocale } from "@/lib/i18n";
import { getTutors } from "@/lib/supabase";

export default async function Home({ searchParams }: { searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  const tutors = (await getTutors()).slice(0, 2);
  const categories = [
    { label: locale === "fr" ? "Tutorat" : "Tutoring", icon: "cap" as const, href: "/tuteurs?subject=Tutoring" },
    { label: locale === "fr" ? "Photographie" : "Photography", icon: "camera" as const, href: "/tuteurs?subject=Photography" },
    { label: locale === "fr" ? "Ménage" : "Housekeeping", icon: "clean" as const, href: "/tuteurs?subject=Housekeeping" },
    { label: "Web Design", icon: "screen" as const, href: "/tuteurs?subject=Web%20design" },
    { label: locale === "fr" ? "Création de sites" : "Website Creation", icon: "globe" as const, href: "/tuteurs?subject=Website%20creation" },
  ];

  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="shell py-8 sm:py-16">
          <div className="mx-auto max-w-md text-center sm:max-w-3xl">
            <p className="mx-auto mb-4 inline-flex items-center gap-2 text-sm font-medium text-stone-700">
              <Icon name="shield" className="h-4 w-4 text-emerald-700" />
              {locale === "fr" ? "Vérifié. Local. Fiable." : "Verified. Local. Trusted."}
            </p>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-6xl">{t.heroTitle}</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">{t.heroBody}</p>
            <Link href={withLocale("/tuteurs", locale)} className="search-pill mx-auto mt-7">
              <Icon name="search" className="h-5 w-5" />
              <span>{t.searchPlaceholder}</span>
              <span className="search-pill-button"><Icon name="search" className="h-5 w-5" /></span>
            </Link>
            <Link href={withLocale("/tuteurs?neighborhood=Conakry", locale)} className="location-pill mx-auto mt-3">
              <Icon name="map" className="h-4 w-4" />
              <span>Conakry, Guinea</span>
            </Link>
          </div>
        </section>

        <section className="shell pb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">{t.popularCategories}</h2>
            <Link href={withLocale("/tuteurs", locale)} className="text-sm font-semibold text-emerald-800">{t.seeAllShort}</Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link href={withLocale(category.href, locale)} className="category-tile" key={category.label}>
                <Icon name={category.icon} className="h-7 w-7" />
                <span>{category.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="shell pb-12">
          <div className="trust-banner">
            <div className="trust-badge">
              <Icon name="shield" className="h-5 w-5" />
            </div>
            <div>
              <h2>{t.everyProviderVerified}</h2>
              <p>{t.verifiedBlockBody}</p>
            </div>
            <div className="trust-faces" aria-hidden="true">
              <img src="/avatars/mamadou.svg" alt="" />
              <img src="/avatars/aissatou.svg" alt="" />
              <img src="/avatars/fatoumata.svg" alt="" />
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
