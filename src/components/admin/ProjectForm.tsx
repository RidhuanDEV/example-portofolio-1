"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Save } from "lucide-react";
import { projectPayloadSchema } from "@/lib/validation";
import { splitCsv } from "@/lib/utils";
import type { ADR, CaseStudySection, Metric, ProjectRecord, ProjectStatus, TechItem } from "@/types/domain";
import { projectStatuses } from "@/types/domain";
import { MetricsEditor, TechStackEditor, SectionsEditor, AdrsEditor } from "@/components/admin/ProjectSubForms";
import { z } from "zod";

const errorResponseSchema = z.object({
  error: z.string().optional(),
});

function isProjectStatus(val: string): val is ProjectStatus {
  return projectStatuses.some((status) => status === val);
}

interface ProjectFormProps {
  initialData?: ProjectRecord;
  mode: "create" | "edit";
}

export function ProjectForm({ initialData, mode }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");

  // Localized states
  const [titleEn, setTitleEn] = useState(initialData?.title?.en ?? "");
  const [titleId, setTitleId] = useState(initialData?.title?.id ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [taglineEn, setTaglineEn] = useState(initialData?.tagline?.en ?? "");
  const [taglineId, setTaglineId] = useState(initialData?.tagline?.id ?? "");
  const [descriptionEn, setDescriptionEn] = useState(initialData?.description?.en ?? "");
  const [descriptionId, setDescriptionId] = useState(initialData?.description?.id ?? "");
  
  const [durationEn, setDurationEn] = useState(initialData?.duration?.en ?? "");
  const [durationId, setDurationId] = useState(initialData?.duration?.id ?? "");
  const [roleEn, setRoleEn] = useState(initialData?.role?.en ?? "");
  const [roleId, setRoleId] = useState(initialData?.role?.id ?? "");

  // Non-localized states
  const [status, setStatus] = useState<ProjectStatus>(initialData?.status ?? "draft");
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [featuredOrder, setFeaturedOrder] = useState(String(initialData?.featuredOrder ?? 99));
  const [year, setYear] = useState(String(initialData?.year ?? new Date().getFullYear()));
  const [teamSize, setTeamSize] = useState(String(initialData?.teamSize ?? 1));
  const [repoUrl, setRepoUrl] = useState(initialData?.repoUrl ?? "");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl ?? "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") ?? "");

  // Structured states for complex sub-forms
  const [metrics, setMetrics] = useState<Metric[]>(initialData?.metrics ?? []);
  const [techStack, setTechStack] = useState<TechItem[]>(initialData?.techStack ?? []);
  const [sections, setSections] = useState<CaseStudySection[]>(initialData?.sections ?? []);
  const [adrs, setAdrs] = useState<ADR[]>(initialData?.adrs ?? []);

  const endpoint = useMemo(() => {
    return mode === "create" ? "/api/projects" : `/api/projects/${initialData?.slug ?? ""}`;
  }, [initialData?.slug, mode]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = projectPayloadSchema.parse({
        title: { en: titleEn, id: titleId },
        slug,
        tagline: { en: taglineEn, id: taglineId },
        description: { en: descriptionEn, id: descriptionId },
        status,
        featured,
        featuredOrder: Number(featuredOrder),
        repoUrl,
        demoUrl,
        tags: splitCsv(tags),
        year: Number(year),
        duration: durationEn || durationId ? { en: durationEn, id: durationId } : undefined,
        role: roleEn || roleId ? { en: roleEn, id: roleId } : undefined,
        teamSize: Number(teamSize),
        metrics,
        techStack,
        sections,
        adrs,
      });

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const json = await response.json();
        const parsed = errorResponseSchema.safeParse(json);
        const errMsg = parsed.success && parsed.data.error ? parsed.data.error : "Save failed";
        throw new Error(errMsg);
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save project");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {error ? <p className="border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100">{error}</p> : null}

      {/* Language Switcher Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-3">
        <button
          type="button"
          onClick={() => setLang("en")}
          className={`px-4 py-2 text-sm font-medium transition ${
            lang === "en"
              ? "border-b-2 border-teal-200 text-teal-200 bg-teal-400/5"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          English Metadata
        </button>
        <button
          type="button"
          onClick={() => setLang("id")}
          className={`px-4 py-2 text-sm font-medium transition ${
            lang === "id"
              ? "border-b-2 border-teal-200 text-teal-200 bg-teal-400/5"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          Bahasa Indonesia
        </button>
      </div>

      {/* Localized Fields */}
      {lang === "en" ? (
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Title (English)
            <input value={titleEn} onChange={(event) => setTitleEn(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Tagline (English)
            <input value={taglineEn} onChange={(event) => setTaglineEn(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Description (English)
            <textarea value={descriptionEn} onChange={(event) => setDescriptionEn(event.target.value)} rows={4} className="admin-input" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-zinc-300">
              Duration (English)
              <input value={durationEn} onChange={(event) => setDurationEn(event.target.value)} className="admin-input" />
            </label>
            <label className="grid gap-2 text-sm text-zinc-300">
              Role (English)
              <input value={roleEn} onChange={(event) => setRoleEn(event.target.value)} className="admin-input" />
            </label>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">
            Title (Indonesian)
            <input value={titleId} onChange={(event) => setTitleId(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Tagline (Indonesian)
            <input value={taglineId} onChange={(event) => setTaglineId(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Description (Indonesian)
            <textarea value={descriptionId} onChange={(event) => setDescriptionId(event.target.value)} rows={4} className="admin-input" />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm text-zinc-300">
              Duration (Indonesian)
              <input value={durationId} onChange={(event) => setDurationId(event.target.value)} className="admin-input" />
            </label>
            <label className="grid gap-2 text-sm text-zinc-300">
              Role (Indonesian)
              <input value={roleId} onChange={(event) => setRoleId(event.target.value)} className="admin-input" />
            </label>
          </div>
        </div>
      )}

      {/* Global Meta Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Slug
          <input value={slug} onChange={(event) => setSlug(event.target.value)} className="admin-input font-mono" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Status
          <select
            value={status}
            onChange={(event) => {
              const val = event.target.value;
              if (isProjectStatus(val)) setStatus(val);
            }}
            className="admin-input"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Repo URL
          <input value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Demo URL
          <input value={demoUrl} onChange={(event) => setDemoUrl(event.target.value)} className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Year
          <input value={year} onChange={(event) => setYear(event.target.value)} className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Team size
          <input value={teamSize} onChange={(event) => setTeamSize(event.target.value)} className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Featured order
          <input value={featuredOrder} onChange={(event) => setFeaturedOrder(event.target.value)} className="admin-input" />
        </label>
        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="h-4 w-4 accent-teal-200" />
          Feature on homepage
        </label>
        <label className="grid gap-2 text-sm text-zinc-300 md:col-span-2">
          Tags (comma separated)
          <input value={tags} onChange={(event) => setTags(event.target.value)} className="admin-input" />
        </label>
      </div>

      <MetricsEditor value={metrics} onChange={setMetrics} />
      <TechStackEditor value={techStack} onChange={setTechStack} />
      <SectionsEditor value={sections} onChange={setSections} />
      <AdrsEditor value={adrs} onChange={setAdrs} />

      <button disabled={saving} className="inline-flex w-fit items-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 disabled:opacity-50 mt-2 cursor-pointer">
        <Save size={16} />
        {saving ? "Saving..." : "Save project"}
      </button>
    </form>
  );
}
