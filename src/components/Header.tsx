import Link from "next/link";
import { Suspense } from "react";
import { AppControls } from "@/components/AppControls";
import { BrandLogo } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { copy, type Locale, withLocale } from "@/lib/i18n";

export function Header({ locale = "fr" }: { locale?: Locale }) {
  const t = copy[locale];
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ background: "color-mix(in srgb, var(--background) 86%, transparent)", borderColor: "var(--line)" }}>
      <div className="shell flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-2">
          <button className="icon-button sm:hidden" type="button" aria-label="Menu">
            <Icon name="menu" className="h-5 w-5" />
          </button>
          <BrandLogo locale={locale} />
        </div>
        <nav className="flex items-center gap-2 text-sm text-stone-700">
          <Link className="rounded-full px-3 py-2 hover:bg-white" href={withLocale("/tuteurs", locale)}>{t.navTutors}</Link>
          <button className="icon-button hidden sm:inline-flex" type="button" aria-label="Notifications">
            <Icon name="bell" className="h-5 w-5" />
          </button>
          <Suspense fallback={<div className="h-8 w-24 rounded-full border border-stone-200" aria-hidden="true" />}>
            <AppControls />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
