import { Header } from "@/components/Header";
import { CustomerRequestForm } from "@/components/CustomerRequestForm";
import { Icon } from "@/components/Icon";
import { copy, getLocale } from "@/lib/i18n";

export default function AccountPage({ searchParams }: { searchParams: { lang?: string } }) {
  const locale = getLocale(searchParams.lang);
  const t = copy[locale];
  return (
    <>
      <Header locale={locale} />
      <main className="shell max-w-2xl py-8 sm:py-12">
        <div className="mb-6">
          <div className="mb-8 flex items-center justify-between">
            <span className="icon-button" aria-hidden="true">←</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full text-emerald-700">
              <Icon name="shield" className="h-6 w-6" />
            </span>
          </div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">{locale === "fr" ? "Dites ce qu’il vous faut. On vous trouve un match." : "Tell us what you need. We'll match you."}</h1>
          <p className="mt-4 max-w-lg text-stone-600">{t.accountIntro}</p>
        </div>
        <CustomerRequestForm locale={locale} />
      </main>
    </>
  );
}
