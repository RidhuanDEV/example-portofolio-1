import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { ProjectSummary } from "@/types/domain";
import { getTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface ProjectCardProps {
  project: ProjectSummary;
  index?: number;
  locale: Locale;
}

export function ProjectCard({ project, index = 0, locale }: ProjectCardProps) {
  const firstMetric = project.metrics[0];
  const dict = getTranslations(locale);

  const categoryLabel = project.category
    ? dict.projects.categories[project.category]
    : undefined;

  const displayStack =
    project.techStack.length > 0
      ? project.techStack.slice(0, 4).map((tech) => tech.name)
      : project.tags.slice(0, 4);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col justify-between min-h-[290px] card-hover-lift border border-white/10 bg-white/[0.025] p-5"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                case {String(index + 1).padStart(2, "0")} / {project.year}
              </p>
              {categoryLabel ? (
                <span className="border border-teal-300/35 bg-teal-300/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal-200">
                  {categoryLabel}
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-normal text-white sm:text-2xl">
              {project.title[locale] || project.title.en}
            </h3>
          </div>
          <ArrowUpRight className="shrink-0 text-zinc-500 transition group-hover:text-teal-200" size={20} />
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          {project.tagline[locale] || project.tagline.en}
        </p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-white/10 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {dict.caseStudy.role}
            </p>
            <p className="mt-1.5 text-sm text-zinc-200">
              {project.role ? (project.role[locale] || project.role.en) : "Engineer"}
            </p>
          </div>
          <div className="border border-white/10 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              {dict.caseStudy.signal}
            </p>
            <p className="mt-1.5 text-sm font-medium text-teal-200">
              {firstMetric?.value ?? "Measured"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {displayStack.map((item) => (
              <span
                key={item}
                className="border border-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>

          {(project.repoUrl || project.demoUrl) ? (
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              {project.repoUrl ? (
                <span className="inline-flex items-center gap-1">
                  <Code2 size={12} />
                  {dict.projects.sourceCode}
                </span>
              ) : null}
              {project.demoUrl ? (
                <span className="inline-flex items-center gap-1 text-teal-200">
                  <ExternalLink size={12} />
                  {dict.projects.liveDemo}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
