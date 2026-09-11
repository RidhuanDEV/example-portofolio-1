import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid min-h-[280px] card-hover-lift border border-white/10 bg-white/[0.025] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            case {String(index + 1).padStart(2, "0")} / {project.year}
          </p>
          <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-normal text-white">
            {project.title[locale] || project.title.en}
          </h3>
        </div>
        <ArrowUpRight className="text-zinc-500 transition group-hover:text-teal-200" size={20} />
      </div>
      <p className="mt-5 text-sm leading-6 text-zinc-400">
        {project.tagline[locale] || project.tagline.en}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-white/10 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            {dict.caseStudy.role}
          </p>
          <p className="mt-2 text-sm text-zinc-200">
            {project.role ? (project.role[locale] || project.role.en) : "Engineer"}
          </p>
        </div>
        <div className="border border-white/10 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            {dict.caseStudy.signal}
          </p>
          <p className="mt-2 text-sm text-zinc-200">{firstMetric?.value ?? "Measured"}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="border border-white/10 px-2.5 py-1 font-mono text-[11px] text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
