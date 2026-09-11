import type { LocalizedString } from "@/types/domain";
import en from "@/data/locales/en.json";
import id from "@/data/locales/id.json";

export type Locale = "en" | "id";
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  id,
};

export function getTranslations(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

export function t(localized: LocalizedString | undefined | null, locale: Locale): string {
  if (!localized) return "";
  const val = localized[locale];
  if (val !== undefined && val !== null && val.trim() !== "") {
    return val;
  }
  return localized.en || localized.id || "";
}
