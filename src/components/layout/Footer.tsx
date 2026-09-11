import Link from "next/link";
import { getTranslations } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export async function Footer() {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <footer className="border-t border-white/10 bg-[#08090b]">
      <div className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] gap-8 py-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
            {dict.footer.platform}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
            {dict.footer.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400 md:justify-end">
          <Link href="/projects" className="hover:text-white">
            {dict.nav.projects}
          </Link>
          <Link href="/writing" className="hover:text-white">
            {dict.nav.writing}
          </Link>
          <Link href="/admin" className="hover:text-white">
            {dict.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
