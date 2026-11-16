"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { ProjectCategory, ProjectRecord } from "@/types/domain";
import { projectCategories } from "@/types/domain";

interface ProjectExplorerProps {
  projects: ProjectRecord[];
  locale: Locale;
  dict: Dictionary;
}

const techFilterGroups = [
  { label: "TypeScript", match: ["typescript", "next", "react"] },
  { label: "Go", match: ["go", "gin", "mqtt"] },
  { label: "Python", match: ["python", "fastapi", "cuda"] },
  { label: "React / Next.js", match: ["react", "next"] },
  { label: "Vue / NestJS", match: ["vue", "nest"] },
  { label: "Rust / Tauri", match: ["rust", "tauri"] },
  { label: "PostgreSQL / MySQL", match: ["postgres", "mysql", "prisma", "sequelize"] },
  { label: "Playwright / QA", match: ["playwright", "vitest", "pytest", "qa"] },
] as const;

export function ProjectExplorer({ projects, locale, dict }: ProjectExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [query, setQuery] = useState<string>("");

  const availableCategories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category).filter((c): c is ProjectCategory => Boolean(c)));
    return projectCategories.filter((cat) => present.has(cat));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const activeTechGroup = techFilterGroups.find((g) => g.label === selectedTech);

    return projects.filter((project) => {
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      if (activeTechGroup) {
        const haystack = [
          ...project.tags,
          ...project.techStack.map((item) => item.name),
        ]
          .join(" ")
          .toLowerCase();

        const hasMatch = activeTechGroup.match.some((kw) => haystack.includes(kw));
        if (!hasMatch) {
          return false;
        }
      }

      if (normalizedQuery) {
        const searchTarget = [
          project.title.en,
          project.title.id,
          project.tagline.en,
          project.tagline.id,
          project.description.en,
          project.description.id,
          ...project.tags,
          ...project.techStack.map((t) => t.name),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchTarget.includes(normalizedQuery)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, query, selectedCategory, selectedTech]);

  const hasActiveFilter = selectedCategory !== "all" || selectedTech !== "all" || query.trim().length > 0;

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedTech("all");
    setQuery("");
  }

  return (
    <div className="mt-8 grid gap-6">
      <div className="grid gap-4 border border-white/10 bg-white/[0.02] p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dict.projects.searchPlaceholder}
              aria-label={dict.projects.searchPlaceholder}
              className="w-full border border-white/10 bg-[#0c0e11] py-2 pl-9 pr-3 text-sm text-white outline-none focus:border-teal-300/50"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400">
              {dict.projects.showingCount} {filteredProjects.length} {dict.projects.ofCount} {projects.length}
            </span>
            {hasActiveFilter ? (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-xs text-zinc-200 hover:border-teal-300/50"
              >
                <RotateCcw size={13} />
                {dict.projects.clearFilters}
              </button>
            ) : null}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Domain filter">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            aria-pressed={selectedCategory === "all"}
            className={`border px-3 py-1.5 font-mono text-xs transition ${
              selectedCategory === "all"
                ? "border-teal-300/60 bg-teal-300/15 text-teal-200"
                : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200"
            }`}
          >
            {dict.projects.allCategories}
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
              className={`border px-3 py-1.5 font-mono text-xs transition ${
                selectedCategory === category
                  ? "border-teal-300/60 bg-teal-300/15 text-teal-200"
                  : "border-white/10 text-zinc-400 hover:border-white/25 hover:text-zinc-200"
              }`}
            >
              {dict.projects.categories[category]}
            </button>
          ))}
        </div>

        {/* Tech Stack Filter Chips */}
        <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-3" role="group" aria-label="Technology filter">
          <button
            type="button"
            onClick={() => setSelectedTech("all")}
            aria-pressed={selectedTech === "all"}
            className={`border px-2.5 py-1 font-mono text-[11px] transition ${
              selectedTech === "all"
                ? "border-teal-300/50 bg-teal-300/10 text-teal-200"
                : "border-white/10 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {dict.projects.allTech}
          </button>
          {techFilterGroups.map((group) => (
            <button
              key={group.label}
              type="button"
              onClick={() => setSelectedTech(selectedTech === group.label ? "all" : group.label)}
              aria-pressed={selectedTech === group.label}
              className={`border px-2.5 py-1 font-mono text-[11px] transition ${
                selectedTech === group.label
                  ? "border-teal-300/50 bg-teal-300/10 text-teal-200"
                  : "border-white/10 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          title={dict.projects.noResults}
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 bg-teal-200 px-4 py-2 text-sm font-medium text-zinc-950 btn-hover-lift"
            >
              <RotateCcw size={15} />
              {dict.projects.clearFilters}
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
