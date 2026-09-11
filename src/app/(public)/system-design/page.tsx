import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/project/ArchitectureDiagram";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getTranslations } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);
  return {
    title: dict.systemDesign.badge,
    description: dict.systemDesign.headline,
  };
}

export default async function SystemDesignPage() {
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <AnimatedSection>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.systemDesign.badge}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold text-white">
          {dict.systemDesign.headline}
        </h1>
      </AnimatedSection>
      <ArchitectureDiagram title={dict.systemDesign.diagramTitle} />
      <div className="grid gap-4 md:grid-cols-2">
        {dict.systemDesign.principles.map((principle, index) => (
          <div key={principle} className="card-hover-lift border border-white/10 bg-white/[0.025] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              principle {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-4 text-xl leading-8 text-white">{principle}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
