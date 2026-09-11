import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { getProfile } from "@/lib/data";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);
  return {
    title: dict.contact.badge,
    description: dict.contact.headline,
  };
}

export default async function ContactPage() {
  const profile = await getProfile();
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr]">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.contact.badge}
        </p>
        <h1 className="mt-5 text-5xl font-semibold text-white">
          {dict.contact.headline}
        </h1>
        <div className="mt-8 grid gap-3 text-sm text-zinc-300">
          <a
            href={`mailto:${profile.email ?? ""}`}
            className="flex items-center gap-3 hover:text-teal-100"
          >
            <Mail size={17} />
            {profile.email}
          </a>
          <p className="flex items-center gap-3">
            <MapPin size={17} />
            {t(profile.location, locale)}
          </p>
        </div>
      </section>
      <form className="grid gap-4 card-hover-lift border border-white/10 bg-white/[0.025] p-5">
        <label className="grid gap-2 text-sm text-zinc-300">
          {dict.contact.name}
          <input
            name="name"
            className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          {dict.contact.email}
          <input
            type="email"
            name="email"
            className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
          />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          {dict.contact.message}
          <textarea
            name="message"
            rows={7}
            className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
          />
        </label>
        <button type="submit" className="bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 btn-hover-lift">
          {dict.contact.send}
        </button>
      </form>
    </main>
  );
}
