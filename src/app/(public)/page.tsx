import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, FileText, GraduationCap } from "lucide-react";
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
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
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
              download
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

      {/* Experience & Education Snapshot */}
      <AnimatedSection className="mx-auto max-w-[92vw] lg:max-w-[80vw] pb-16">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
              {dict.home.experienceBadge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              {dict.home.experienceTitle}
            </h2>
          </div>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-teal-100"
          >
            {dict.home.viewFullResume}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="grid gap-3">
            {profile.experiences.slice(0, 3).map((exp, idx) => (
              <div
                key={`${exp.company}-${exp.startDate}-${idx}`}
                className="card-hover-lift border border-white/10 bg-white/[0.025] p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness size={15} className="text-teal-200 shrink-0" />
                    <h3 className="text-base font-semibold text-white">
                      {t(exp.role, locale)}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    {exp.startDate} - {exp.endDate ?? dict.home.present}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-teal-200">{exp.company}</p>
                {exp.highlights[0] ? (
                  <p className="mt-2.5 text-sm leading-6 text-zinc-300">
                    {t(exp.highlights[0], locale)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid gap-3 content-start">
            {(profile.education ?? []).map((edu, idx) => (
              <div
                key={`${edu.institution}-${idx}`}
                className="card-hover-lift border border-white/10 bg-white/[0.025] p-5"
              >
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-teal-200">
                  <GraduationCap size={15} />
                  <span>{edu.period}</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{edu.institution}</h3>
                <p className="mt-1 text-sm text-zinc-300">{t(edu.degree, locale)}</p>
                {edu.gpa ? (
                  <p className="mt-2 inline-block border border-teal-300/35 bg-teal-300/10 px-2.5 py-0.5 font-mono text-xs text-teal-200">
                    {dict.resume.gpaLabel}: {edu.gpa}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
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
