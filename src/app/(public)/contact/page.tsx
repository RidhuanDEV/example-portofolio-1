import type { Metadata } from "next";
import { BriefcaseBusiness, Code, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
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
    <main className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
      <section>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.contact.badge}
        </p>
        <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">
          {dict.contact.headline}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
          {dict.contact.subheadline}
        </p>

        <div className="mt-8 grid gap-3.5 text-sm text-zinc-300">
          {profile.email ? (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 hover:text-teal-100"
            >
              <Mail size={17} className="shrink-0 text-teal-200" />
              <span>{profile.email}</span>
            </a>
          ) : null}
          {profile.phone ? (
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 hover:text-teal-100"
            >
              <Phone size={17} className="shrink-0 text-teal-200" />
              <span>{profile.phone}</span>
            </a>
          ) : null}
          <p className="flex items-center gap-3">
            <MapPin size={17} className="shrink-0 text-teal-200" />
            <span>{t(profile.location, locale)}</span>
          </p>
          {profile.socialLinks.github ? (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-teal-100"
            >
              <Code size={17} className="shrink-0 text-teal-200" />
              <span>github.com/RidhuanDEV</span>
            </a>
          ) : null}
          {profile.socialLinks.linkedin ? (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-teal-100"
            >
              <BriefcaseBusiness size={17} className="shrink-0 text-teal-200" />
              <span>LinkedIn Profile</span>
            </a>
          ) : null}
        </div>
      </section>

      <ContactForm
        copy={{
          name: dict.contact.name,
          email: dict.contact.email,
          message: dict.contact.message,
          send: dict.contact.send,
          sending: dict.contact.sending,
          successTitle: dict.contact.successTitle,
          successMessage: dict.contact.successMessage,
          errorMessage: dict.contact.errorMessage,
          sendAnother: dict.contact.sendAnother,
        }}
      />
    </main>
  );
}
