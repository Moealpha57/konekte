import { Header } from "@/components/Header";
import { AdminPanel } from "@/components/AdminPanel";
import { copy, getLocale } from "@/lib/i18n";

export default function AdminPage({ searchParams }: { searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  return (
    <>
      <Header locale={locale} />
      <main className="shell py-8 sm:py-12">
        <div className="mb-6">
          <p className="text-sm font-medium text-emerald-900">{t.adminOnly}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{t.administration}</h1>
          <p className="mt-3 max-w-2xl text-stone-600">{t.adminIntro}</p>
        </div>
        <AdminPanel locale={locale} />
      </main>
    </>
  );
}
