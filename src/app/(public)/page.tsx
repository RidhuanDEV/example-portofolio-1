import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { MetricsBar } from "@/components/home/MetricsBar";
import { SystemMapIllustration } from "@/components/home/SystemMapIllustration";
import { ProjectCard } from "@/components/project/ProjectCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getHomeData } from "@/lib/data";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, settings, featuredProjects } = await getHomeData();
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main>
      <section className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <AnimatedSection className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-teal-200">
            {t(profile.title, locale)} / {t(profile.location, locale)}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-normal text-white sm:text-7xl">
            {t(settings.heroHeadline, locale)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            {t(settings.heroSubheadline, locale)}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 btn-hover-lift"
            >
              {t(settings.ctaText.primary, locale)}
              <ArrowRight size={16} />
            </Link>
            <a
              href={profile.resumeUrl ?? "/resume.pdf"}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 btn-hover-lift"
            >
              <FileText size={16} />
              {t(settings.ctaText.secondary, locale)}
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.12}>
          <SystemMapIllustration />
        </AnimatedSection>
      </section>
      <MetricsBar metrics={settings.featuredMetrics} locale={locale} />
      <AnimatedSection className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
              {dict.home.flagshipEvidence}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {dict.home.caseStudiesTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-teal-100"
          >
            {dict.home.viewAll}
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} locale={locale} />
          ))}
        </div>
      </AnimatedSection>
      <AnimatedSection className="mx-auto grid max-w-[92vw] lg:max-w-[80vw] gap-6 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card-hover-lift border border-white/10 bg-white/[0.025] p-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            {dict.home.philosophy}
          </p>
          <p className="mt-4 text-2xl leading-9 text-white">{t(profile.philosophy, locale)}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {profile.currentFocus.map((focus) => (
            <div key={focus.en} className="card-hover-lift border border-white/10 bg-white/[0.025] p-5">
              <p className="text-sm leading-6 text-zinc-300">{t(focus, locale)}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
