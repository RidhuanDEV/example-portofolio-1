import { Code, ExternalLink } from "lucide-react";
import { ArchitectureDiagram } from "@/components/project/ArchitectureDiagram";
import { RichTextRenderer } from "@/components/shared/RichTextRenderer";
import type { ProjectRecord } from "@/types/domain";
import { t, type Locale, getTranslations } from "@/lib/i18n";

interface CaseStudyLayoutProps {
  project: ProjectRecord;
  locale: Locale;
}

export function CaseStudyLayout({ project, locale }: CaseStudyLayoutProps) {
  const sortedSections = [...project.sections].sort((a, b) => a.order - b.order);
  const dict = getTranslations(locale);

  return (
    <article className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <header className="grid gap-10 lg:grid-cols-[1.45fr_0.75fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
            {dict.caseStudy.badge} / {project.year}
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-6xl">
            {t(project.title, locale)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{t(project.tagline, locale)}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-zinc-200 btn-hover-lift"
              >
                <Code size={16} />
                {dict.caseStudy.repository}
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm text-zinc-200 btn-hover-lift"
              >
                <ExternalLink size={16} />
                {dict.caseStudy.demo}
              </a>
            ) : null}
          </div>
        </div>
        <aside className="grid gap-3 card-hover-lift border border-white/10 bg-white/[0.025] p-5">
          {[
            [dict.caseStudy.role, project.role ? t(project.role, locale) : "Engineer"],
            [dict.caseStudy.duration, project.duration ? t(project.duration, locale) : "Project"],
            [dict.caseStudy.team, `${project.teamSize} ${dict.caseStudy.people}`],
            [dict.caseStudy.stack, project.techStack.map((tech) => tech.name).join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">{value}</p>
            </div>
          ))}
        </aside>
      </header>
      <section className="mt-12 grid gap-3 md:grid-cols-4">
        {project.metrics.map((metric) => (
          <div key={`${metric.label.en}-${metric.value}`} className="card-hover-lift border border-white/10 bg-white/[0.025] p-4">
            <p className="text-2xl font-semibold text-white">{metric.value}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {t(metric.label, locale)}
            </p>
            {metric.context ? <p className="mt-3 text-xs leading-5 text-zinc-400">{t(metric.context, locale)}</p> : null}
          </div>
        ))}
      </section>
      <div className="mt-14 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <div className="sticky top-24 card-hover-lift border border-white/10 bg-white/[0.025] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              {dict.caseStudy.dossier}
            </p>
            <div className="mt-4 grid gap-3">
              {sortedSections.map((section) => (
                <a key={section.title.en} href={`#${section.type}`} className="text-sm text-zinc-400 hover:text-white">
                  {t(section.title, locale)}
                </a>
              ))}
            </div>
          </div>
        </nav>
        <div className="grid gap-10">
          {sortedSections.map((section) => (
            <section id={section.type} key={`${section.type}-${section.order}`} className="scroll-mt-24 border-t border-white/10 pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200">
                {section.type}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{t(section.title, locale)}</h2>
              {section.diagram?.interactive ? <ArchitectureDiagram title={t(section.title, locale)} /> : null}
              <div className="mt-5">
                <RichTextRenderer html={t(section.content, locale)} />
              </div>
            </section>
          ))}
          {project.adrs.length > 0 ? (
            <section className="border-t border-white/10 pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200">
                {dict.caseStudy.architectureDecisions}
              </p>
              <div className="mt-5 grid gap-4">
                {project.adrs.map((adr) => (
                  <div key={adr.number} className="card-hover-lift border border-white/10 bg-white/[0.025] p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                      ADR {adr.number} / {adr.status}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{t(adr.title, locale)}</h3>
                    <p className="mt-4 text-sm leading-6 text-zinc-300">{t(adr.context, locale)}</p>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{t(adr.decision, locale)}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
