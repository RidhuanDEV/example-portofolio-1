import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

export async function getServerLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const localeVal = cookieStore.get("locale")?.value;
    if (localeVal === "id" || localeVal === "en") {
      return localeVal;
    }
  } catch {
    // Safe fallback for builds/static generation context
  }
  return "en";
}
