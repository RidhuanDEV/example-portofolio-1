"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, Settings, ToggleLeft, ToggleRight, LayoutTemplate, MousePointerClick, BarChart3 } from "lucide-react";
import { siteSettingsPayloadSchema } from "@/lib/validation";
import type { SiteSettingsRecord, Metric } from "@/types/domain";
import { MetricsEditor } from "@/components/admin/ProjectSubForms";
import { z } from "zod";

const errorResponseSchema = z.object({
  error: z.string().optional(),
});

interface SiteSettingsFormProps {
  initialData: SiteSettingsRecord;
}

export function SiteSettingsForm({ initialData }: SiteSettingsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");
  const [activeTab, setActiveTab] = useState<"global" | "hero" | "cta" | "metrics">("global");

  // Localized general settings states
  const [siteTitleEn, setSiteTitleEn] = useState(initialData.siteTitle?.en ?? "");
  const [siteTitleId, setSiteTitleId] = useState(initialData.siteTitle?.id ?? "");
  const [siteDescEn, setSiteDescEn] = useState(initialData.siteDescription?.en ?? "");
  const [siteDescId, setSiteDescId] = useState(initialData.siteDescription?.id ?? "");

  // Localized hero states
  const [heroHeadlineEn, setHeroHeadlineEn] = useState(initialData.heroHeadline?.en ?? "");
  const [heroHeadlineId, setHeroHeadlineId] = useState(initialData.heroHeadline?.id ?? "");
  const [heroSubheadlineEn, setHeroSubheadlineEn] = useState(initialData.heroSubheadline?.en ?? "");
  const [heroSubheadlineId, setHeroSubheadlineId] = useState(initialData.heroSubheadline?.id ?? "");

  // Localized CTA states
  const [ctaPrimaryEn, setCtaPrimaryEn] = useState(initialData.ctaText?.primary?.en ?? "");
  const [ctaPrimaryId, setCtaPrimaryId] = useState(initialData.ctaText?.primary?.id ?? "");
  const [ctaSecondaryEn, setCtaSecondaryEn] = useState(initialData.ctaText?.secondary?.en ?? "");
  const [ctaSecondaryId, setCtaSecondaryId] = useState(initialData.ctaText?.secondary?.id ?? "");

  // Global settings states
  const [ogImage, setOgImage] = useState(initialData.ogImage ?? "");
  const [analyticsId, setAnalyticsId] = useState(initialData.analyticsId ?? "");
  const [maintenanceMode, setMaintenanceMode] = useState(initialData.maintenanceMode ?? false);

  // Metrics state
  const [featuredMetrics, setFeaturedMetrics] = useState<Metric[]>(initialData.featuredMetrics ?? []);

  const tabs = [
    { id: "global", label: "Global Settings", icon: Settings },
    { id: "hero", label: "Hero Copywriting", icon: LayoutTemplate },
    { id: "cta", label: "Call To Action", icon: MousePointerClick },
    { id: "metrics", label: "Hero Metrics", icon: BarChart3 },
  ] as const;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = siteSettingsPayloadSchema.parse({
        siteTitle: { en: siteTitleEn, id: siteTitleId },
        siteDescription: siteDescEn || siteDescId ? { en: siteDescEn, id: siteDescId } : undefined,
        ogImage: ogImage || undefined,
        analyticsId: analyticsId || undefined,
        maintenanceMode,
        heroHeadline: heroHeadlineEn || heroHeadlineId ? { en: heroHeadlineEn, id: heroHeadlineId } : undefined,
        heroSubheadline: heroSubheadlineEn || heroSubheadlineId ? { en: heroSubheadlineEn, id: heroSubheadlineId } : undefined,
        ctaText: {
          primary: { en: ctaPrimaryEn, id: ctaPrimaryId },
          secondary: { en: ctaSecondaryEn, id: ctaSecondaryId },
        },
        featuredMetrics,
      });

      const response = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const json = await response.json();
        const parsed = errorResponseSchema.safeParse(json);
        const errMsg = parsed.success && parsed.data.error ? parsed.data.error : "Save failed";
        throw new Error(errMsg);
      }

      setSuccess("Site settings saved successfully");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save site settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {error ? <p className="border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-100 font-mono">{error}</p> : null}
      {success ? <p className="border border-teal-400/30 bg-teal-400/10 p-3 text-sm text-teal-100 font-mono">{success}</p> : null}

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
          English Context
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

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Navigation Sidebar inside form */}
        <div className="flex flex-col gap-1 border-r border-zinc-800 pr-4 lg:col-span-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-left text-xs font-mono uppercase tracking-wider transition border ${
                  isActive
                    ? "border-teal-200/20 bg-teal-400/5 text-teal-200 font-bold"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="lg:col-span-3">
          {/* 1. Global Settings */}
          {activeTab === "global" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">Global Configurations</h3>
              
              <div className="flex items-center justify-between border border-zinc-800 bg-zinc-900/10 p-4 mt-2">
                <div className="grid gap-0.5">
                  <span className="text-xs font-bold text-zinc-200">Maintenance Mode</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Locks public portal access if enabled</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className="text-teal-200 hover:text-teal-100 transition cursor-pointer"
                >
                  {maintenanceMode ? <ToggleRight size={38} /> : <ToggleLeft size={38} className="text-zinc-600" />}
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-2">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Site Name/Title (English)
                  <input
                    value={siteTitleEn}
                    onChange={(e) => setSiteTitleEn(e.target.value)}
                    className="admin-input font-medium"
                    placeholder="e.g. John Doe - Senior Backend Engineer"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Site Name/Title (Indonesian)
                  <input
                    value={siteTitleId}
                    onChange={(e) => setSiteTitleId(e.target.value)}
                    className="admin-input font-medium"
                    placeholder="e.g. John Doe - Rekayasa Backend Senior"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  OpenGraph Cover Image URL
                  <input
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="admin-input font-mono"
                    placeholder="e.g. /images/og-image.jpg"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Google Analytics ID
                  <input
                    value={analyticsId}
                    onChange={(e) => setAnalyticsId(e.target.value)}
                    className="admin-input font-mono"
                    placeholder="e.g. G-XXXXXXX"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-2">
                  SEO Site Description (English)
                  <textarea
                    value={siteDescEn}
                    onChange={(e) => setSiteDescEn(e.target.value)}
                    rows={3}
                    className="admin-input"
                    placeholder="SEO description in English..."
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-2">
                  SEO Site Description (Indonesian)
                  <textarea
                    value={siteDescId}
                    onChange={(e) => setSiteDescId(e.target.value)}
                    rows={3}
                    className="admin-input"
                    placeholder="Deskripsi SEO dalam Bahasa Indonesia..."
                  />
                </label>
              </div>
            </div>
          )}

          {/* 2. Hero Copywriting */}
          {activeTab === "hero" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">Hero Section Copywriting</h3>
              {lang === "en" ? (
                <div className="grid gap-4">
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Hero Headline (English)
                    <input
                      value={heroHeadlineEn}
                      onChange={(e) => setHeroHeadlineEn(e.target.value)}
                      className="admin-input text-sm font-medium"
                      placeholder="e.g. I build systems that scale, docs that teach."
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Hero Subheadline (English)
                    <textarea
                      value={heroSubheadlineEn}
                      onChange={(e) => setHeroSubheadlineEn(e.target.value)}
                      rows={4}
                      className="admin-input leading-relaxed"
                      placeholder="Brief details about your role and expertise in English..."
                    />
                  </label>
                </div>
              ) : (
                <div className="grid gap-4">
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Hero Headline (Indonesian)
                    <input
                      value={heroHeadlineId}
                      onChange={(e) => setHeroHeadlineId(e.target.value)}
                      className="admin-input text-sm font-medium"
                      placeholder="e.g. Saya membangun sistem yang berskala, dokumentasi yang mengedukasi."
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Hero Subheadline (Indonesian)
                    <textarea
                      value={heroSubheadlineId}
                      onChange={(e) => setHeroSubheadlineId(e.target.value)}
                      rows={4}
                      className="admin-input leading-relaxed"
                      placeholder="Detail singkat tentang peran dan keahlian Anda dalam Bahasa Indonesia..."
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* 3. Call To Action (CTA) */}
          {activeTab === "cta" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">Call To Action Button Labels</h3>
              
              <div className="grid gap-4 md:grid-cols-2 mt-2">
                <div className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
                  <span className="text-xs font-mono font-bold text-teal-200 uppercase tracking-wider">Primary Button Action</span>
                  <label className="grid gap-1.5 text-xs text-zinc-300 mt-1">
                    Label (English)
                    <input
                      value={ctaPrimaryEn}
                      onChange={(e) => setCtaPrimaryEn(e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Read Case Studies"
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Label (Indonesian)
                    <input
                      value={ctaPrimaryId}
                      onChange={(e) => setCtaPrimaryId(e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Baca Studi Kasus"
                    />
                  </label>
                </div>

                <div className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
                  <span className="text-xs font-mono font-bold text-teal-200 uppercase tracking-wider">Secondary Button Action</span>
                  <label className="grid gap-1.5 text-xs text-zinc-300 mt-1">
                    Label (English)
                    <input
                      value={ctaSecondaryEn}
                      onChange={(e) => setCtaSecondaryEn(e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Download Resume"
                    />
                  </label>
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Label (Indonesian)
                    <input
                      value={ctaSecondaryId}
                      onChange={(e) => setCtaSecondaryId(e.target.value)}
                      className="admin-input text-xs"
                      placeholder="e.g. Unduh Resume"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 4. Featured Hero Metrics */}
          {activeTab === "metrics" && (
            <div className="grid gap-4">
              <MetricsEditor value={featuredMetrics} onChange={setFeaturedMetrics} />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-end border-t border-zinc-800 pt-4 mt-4">
        <button
          disabled={saving}
          type="submit"
          className="inline-flex items-center gap-2 bg-teal-200 px-5 py-2.5 text-sm font-medium text-zinc-950 disabled:opacity-50 cursor-pointer transition hover:bg-teal-300 font-mono uppercase tracking-wider"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Site Settings"}
        </button>
      </div>
    </form>
  );
}
