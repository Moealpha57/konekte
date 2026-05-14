import Link from "next/link";
import { brand } from "@/lib/brand";
import { type Locale, withLocale } from "@/lib/i18n";

export type BrandMarkVariant = "clean-k" | "wordmark" | "connected-k";

export function BrandLogo({ locale = "fr", className = "", variant = "connected-k" }: { locale?: Locale; className?: string; variant?: BrandMarkVariant }) {
  return (
    <Link href={withLocale("/", locale)} className={`brand-logo ${className}`} aria-label={`${brand.name} home`}>
      <span className={`brand-logo-mark brand-logo-mark-${variant}`} aria-hidden="true">
        <span />
      </span>
      <span>{brand.name}</span>
    </Link>
  );
}

export function BrandMarkOptions() {
  return (
    <div className="flex flex-wrap gap-3" aria-label={`${brand.name} brand mark options`}>
      <BrandSample variant="clean-k" label="Clean K" />
      <BrandSample variant="wordmark" label="Wordmark" />
      <BrandSample variant="connected-k" label="Connected K" />
    </div>
  );
}

function BrandSample({ variant, label }: { variant: BrandMarkVariant; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm" style={{ borderColor: "var(--line)", background: "var(--surface-strong)" }}>
      <span className={`brand-logo-mark brand-logo-mark-${variant}`} aria-hidden="true"><span /></span>
      <span>{label}</span>
    </div>
  );
}
