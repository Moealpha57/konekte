import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Tutor } from "@/lib/types";
import { SERVICE_LABELS } from "@/lib/types";
import { localizeTutor } from "@/lib/localized";
import { copy, type Locale, withLocale } from "@/lib/i18n";

export function TutorCard({ tutor, locale = "fr" }: { tutor: Tutor; locale?: Locale }) {
  const t = copy[locale];
  const provider = localizeTutor(tutor, locale);
  const labelService = (item: string) => SERVICE_LABELS[locale][item as keyof typeof SERVICE_LABELS.en] ?? item;
  const ratingLine = `★ ${provider.rating_average?.toFixed(1) ?? "—"} · ${provider.rating_count ?? 0} ${t.reviews}`;
  return (
    <Link href={withLocale(`/tuteurs/${provider.id}`, locale)} className="card block overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-emerald-50 sm:h-32 sm:w-32">
          {provider.photo_url ? <img src={provider.photo_url} alt={provider.name} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-emerald-100" />}
          {provider.verified && (
            <span className="absolute bottom-2 left-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-700 text-white">
              <Icon name="shield" className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight">{provider.name}</h2>
                {provider.verified && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-900">{t.verified}</span>}
              </div>
              {provider.school_affiliation && <p className="text-sm text-stone-500">{provider.school_affiliation}</p>}
              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-emerald-900">
                <Icon name="star" className="h-4 w-4 fill-current text-amber-500" />
                {ratingLine.replace("★ ", "")}
              </p>
            </div>
            <span aria-hidden="true" className="hidden rounded-full border p-2 text-stone-500 sm:inline-flex" style={{ borderColor: "var(--line)" }}>
              <Icon name="heart" className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-stone-600">{provider.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {provider.subjects.slice(0, 3).map((item) => <span className="pill" key={item}>{labelService(item)}</span>)}
          </div>
          <p className="mt-4 inline-flex rounded-full bg-emerald-950 px-3 py-1 text-sm font-semibold text-white">{new Intl.NumberFormat("fr-GN").format(provider.hourly_rate_gnf)} {t.perHour}</p>
        </div>
      </div>
    </Link>
  );
}
