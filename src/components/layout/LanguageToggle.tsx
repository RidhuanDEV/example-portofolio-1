"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface LanguageToggleProps {
  currentLocale: Locale;
}

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const router = useRouter();

  function toggleLanguage(nextLocale: Locale) {
    if (nextLocale === currentLocale) return;
    document.cookie = `locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div
      className="lang-toggle flex items-center gap-1 border p-1 font-mono text-xs"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-3)",
      }}
    >
      <button
        onClick={() => toggleLanguage("en")}
        className="lang-btn px-2 py-1 transition"
        data-active={currentLocale === "en" ? "true" : "false"}
        aria-pressed={currentLocale === "en"}
      >
        EN
      </button>
      <span className="lang-sep" aria-hidden="true">|</span>
      <button
        onClick={() => toggleLanguage("id")}
        className="lang-btn px-2 py-1 transition"
        data-active={currentLocale === "id" ? "true" : "false"}
        aria-pressed={currentLocale === "id"}
      >
        ID
      </button>
    </div>
  );
}
