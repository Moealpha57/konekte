"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { copy, getLocale, type Locale } from "@/lib/i18n";

export function ThemeBootScript() {
  const code = `(function(){try{var s=localStorage.getItem('konekte-theme')||'system';var d=s==='dark'||(s==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('theme-dark',d);document.documentElement.classList.toggle('theme-light',!d);document.documentElement.dataset.theme=s;}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export function AppControls() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const t = copy[locale];
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("konekte-theme");
    if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function changeLocale(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextLocale === "fr") params.delete("lang"); else params.set("lang", "en");
    const query = params.toString();
    setOpen(false);
    router.push(`${pathname}${query ? `?${query}` : ""}`);
  }

  function changeTheme() {
    const nextTheme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    const isDark = nextTheme === "dark" || (nextTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(nextTheme);
    window.localStorage.setItem("konekte-theme", nextTheme);
    document.documentElement.classList.toggle("theme-dark", isDark);
    document.documentElement.classList.toggle("theme-light", !isDark);
    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label={theme === "dark" ? "Use system theme" : theme === "light" ? "Use dark theme" : "Use light theme"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/20"
        style={{ background: "var(--surface-strong)", borderColor: "var(--line)", color: "var(--foreground)" }}
        onClick={changeTheme}
      >
        {theme === "dark" ? "☾" : theme === "light" ? "☀" : "◐"}
      </button>
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={t.languageLabel}
          className="inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-800/20 sm:text-sm"
          style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{locale === "fr" ? "FR" : "EN"}</span>
          <span className={`text-[10px] transition ${open ? "rotate-180" : ""}`}>⌄</span>
        </button>
        {open && (
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-2xl border p-1 shadow-xl backdrop-blur"
            style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}
          >
            {(["fr", "en"] as Locale[]).map((item) => (
              <button
                key={item}
                role="menuitem"
                type="button"
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-emerald-50 ${locale === item ? "font-semibold text-emerald-900" : "text-stone-600"}`}
                onClick={() => changeLocale(item)}
              >
                <span>{item === "fr" ? t.localeFrench : t.localeEnglish}</span>
                {locale === item && <span>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
