import Link from "next/link";
import { type Locale, withLocale } from "@/lib/i18n";

export function BrandLogo({ locale = "fr", className = "" }: { locale?: Locale; className?: string }) {
  return (
    <Link href={withLocale("/", locale)} className={`brand-logo ${className}`} aria-label="Konekte home">
      <span className="brand-logo-mark" aria-hidden="true">
        <span />
      </span>
      <span>Konekte</span>
    </Link>
  );
}
