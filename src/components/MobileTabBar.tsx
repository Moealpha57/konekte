"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { copy, getLocale, withLocale } from "@/lib/i18n";

export function MobileTabBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const t = copy[locale];

  const items = [
    { href: "/", label: t.tabHome, icon: "home" as const },
    { href: "/tuteurs", label: t.tabServices, icon: "search" as const },
    { href: "/compte", label: t.tabRequest, icon: "plus" as const, primary: true },
    { href: "/postuler", label: t.tabApply, icon: "briefcase" as const },
  ];

  return (
    <nav className="mobile-tabbar sm:hidden" aria-label="Primary">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={withLocale(item.href, locale)}
            className={`mobile-tabbar-item ${active ? "is-active" : ""} ${item.primary ? "is-primary" : ""}`}
          >
            <span className="mobile-tabbar-icon">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
