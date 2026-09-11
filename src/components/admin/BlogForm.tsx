"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Save } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { blogPayloadSchema } from "@/lib/validation";
import { splitCsv } from "@/lib/utils";
import type { BlogPostRecord, BlogStatus } from "@/types/domain";
import { blogStatuses } from "@/types/domain";

function isBlogStatus(val: string): val is BlogStatus {
  return blogStatuses.some((status) => status === val);
}

interface BlogFormProps {
  initialData?: BlogPostRecord;
  mode: "create" | "edit";
}

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");

  // Localized states
  const [titleEn, setTitleEn] = useState(initialData?.title?.en ?? "");
  const [titleId, setTitleId] = useState(initialData?.title?.id ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [excerptEn, setExcerptEn] = useState(initialData?.excerpt?.en ?? "");
  const [excerptId, setExcerptId] = useState(initialData?.excerpt?.id ?? "");
  const [contentEn, setContentEn] = useState(initialData?.content?.en ?? "<p></p>");
  const [contentId, setContentId] = useState(initialData?.content?.id ?? "<p></p>");

  // Non-localized states
  const [status, setStatus] = useState<BlogStatus>(initialData?.status ?? "draft");
  const [readTimeMin, setReadTimeMin] = useState(String(initialData?.readTimeMin ?? 5));
  const [tags, setTags] = useState(initialData?.tags.join(", ") ?? "");

  const endpoint = useMemo(() => {
    return mode === "create" ? "/api/blog" : `/api/blog/${initialData?.slug ?? ""}`;
  }, [initialData?.slug, mode]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = blogPayloadSchema.parse({
        title: { en: titleEn, id: titleId },
        slug,
        excerpt: { en: excerptEn, id: excerptId },
        content: { en: contentEn, id: contentId },
        status,
        readTimeMin: Number(readTimeMin),
        publishedAt: status === "published" ? new Date() : null,
        tags: splitCsv(tags),
      });

      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }
      router.push("/admin/blog");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save post");
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
          English Content
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
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-zinc-300">
            Title (English)
            <input value={titleEn} onChange={(event) => setTitleEn(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Excerpt (English)
            <textarea value={excerptEn} onChange={(event) => setExcerptEn(event.target.value)} rows={3} className="admin-input" />
          </label>
          <div className="grid gap-2 text-sm text-zinc-300">
            Content (English)
            <RichTextEditor value={contentEn} onChange={setContentEn} placeholder="Write the article in English..." />
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-zinc-300">
            Title (Indonesian)
            <input value={titleId} onChange={(event) => setTitleId(event.target.value)} className="admin-input" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">
            Excerpt (Indonesian)
            <textarea value={excerptId} onChange={(event) => setExcerptId(event.target.value)} rows={3} className="admin-input" />
          </label>
          <div className="grid gap-2 text-sm text-zinc-300">
            Content (Indonesian)
            <RichTextEditor value={contentId} onChange={setContentId} placeholder="Tulis artikel dalam Bahasa Indonesia..." />
          </div>
        </div>
      )}

      {/* Global Fields */}
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
              if (isBlogStatus(val)) setStatus(val);
            }}
            className="admin-input"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm text-zinc-300">
          Read time (minutes)
          <input value={readTimeMin} onChange={(event) => setReadTimeMin(event.target.value)} className="admin-input" />
        </label>
        <label className="grid gap-2 text-sm text-zinc-300">
          Tags (comma separated)
          <input value={tags} onChange={(event) => setTags(event.target.value)} className="admin-input" />
        </label>
      </div>

      <button disabled={saving} className="inline-flex w-fit items-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 disabled:opacity-50 mt-2">
        <Save size={16} />
        {saving ? "Saving..." : "Save article"}
      </button>
    </form>
  );
}
