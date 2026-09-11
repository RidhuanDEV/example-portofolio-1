"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, ChevronRight, User, GraduationCap, Briefcase, Focus, Network, Globe } from "lucide-react";
import { profilePayloadSchema } from "@/lib/validation";
import { splitCsv } from "@/lib/utils";
import type { ProfileRecord, LocalizedString, Skill, Experience, SkillCategory } from "@/types/domain";
import { skillCategories } from "@/types/domain";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { z } from "zod";

const errorResponseSchema = z.object({
  error: z.string().optional(),
});

function isSkillCategory(val: string): val is SkillCategory {
  return skillCategories.some((cat) => cat === val);
}

interface ProfileFormProps {
  initialData: ProfileRecord;
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<"en" | "id">("en");
  const [activeTab, setActiveTab] = useState<"basic" | "dossier" | "skills" | "experience" | "focus" | "social">("basic");

  // Basic Info States
  const [name, setName] = useState(initialData.name ?? "");
  const [avatar, setAvatar] = useState(initialData.avatar ?? "");
  const [email, setEmail] = useState(initialData.email ?? "");
  const [resumeUrl, setResumeUrl] = useState(initialData.resumeUrl ?? "");
  const [locationEn, setLocationEn] = useState(initialData.location?.en ?? "");
  const [locationId, setLocationId] = useState(initialData.location?.id ?? "");

  // Localized Dossier States
  const [titleEn, setTitleEn] = useState(initialData.title?.en ?? "");
  const [titleId, setTitleId] = useState(initialData.title?.id ?? "");
  const [bioEn, setBioEn] = useState(initialData.bio?.en ?? "");
  const [bioId, setBioId] = useState(initialData.bio?.id ?? "");
  const [philosophyEn, setPhilosophyEn] = useState(initialData.philosophy?.en ?? "");
  const [philosophyId, setPhilosophyId] = useState(initialData.philosophy?.id ?? "");

  // Social Links States
  const [github, setGithub] = useState(initialData.socialLinks?.github ?? "");
  const [linkedin, setLinkedin] = useState(initialData.socialLinks?.linkedin ?? "");
  const [twitter, setTwitter] = useState(initialData.socialLinks?.twitter ?? "");
  const [website, setWebsite] = useState(initialData.socialLinks?.website ?? "");

  // Dynamic Array States
  const [skills, setSkills] = useState<Skill[]>(initialData.skills ?? []);
  const [experiences, setExperiences] = useState<Experience[]>(initialData.experiences ?? []);
  const [currentFocus, setCurrentFocus] = useState<LocalizedString[]>(initialData.currentFocus ?? []);

  const tabs = [
    { id: "basic", label: "General Info", icon: User },
    { id: "dossier", label: "Dossier & Bio", icon: Globe },
    { id: "skills", label: "Skills Directory", icon: GraduationCap },
    { id: "experience", label: "Experience Roadmap", icon: Briefcase },
    { id: "focus", label: "Active Focus", icon: Focus },
    { id: "social", label: "Social Networks", icon: Network },
  ] as const;

  // Skill editor helpers
  const addSkill = () => {
    setSkills([...skills, { name: "", category: "language", level: 3, yearsExp: 1 }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, updated: Partial<Skill>) => {
    setSkills(
      skills.map((s, i) => (i === index ? { ...s, ...updated } : s))
    );
  };

  const moveSkill = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= skills.length) return;
    const next = [...skills];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setSkills(next);
  };

  // Experience editor helpers
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: { en: "", id: "" },
        startDate: "",
        endDate: "",
        highlights: [{ en: "", id: "" }],
        techUsed: [],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, updated: Partial<Experience>) => {
    setExperiences(
      experiences.map((exp, i) => {
        if (i === index) {
          const nextExp = { ...exp, ...updated };
          if (updated.role) {
            nextExp.role = { ...exp.role, ...updated.role };
          }
          return nextExp;
        }
        return exp;
      })
    );
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;
    const next = [...experiences];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setExperiences(next);
  };

  // Experience highlight helpers
  const addHighlight = (expIndex: number) => {
    setExperiences(
      experiences.map((exp, i) => {
        if (i === expIndex) {
          return {
            ...exp,
            highlights: [...exp.highlights, { en: "", id: "" }],
          };
        }
        return exp;
      })
    );
  };

  const removeHighlight = (expIndex: number, hlIndex: number) => {
    setExperiences(
      experiences.map((exp, i) => {
        if (i === expIndex) {
          return {
            ...exp,
            highlights: exp.highlights.filter((_, j) => j !== hlIndex),
          };
        }
        return exp;
      })
    );
  };

  const updateHighlight = (expIndex: number, hlIndex: number, updated: Partial<LocalizedString>) => {
    setExperiences(
      experiences.map((exp, i) => {
        if (i === expIndex) {
          return {
            ...exp,
            highlights: exp.highlights.map((hl, j) =>
              j === hlIndex ? { ...hl, ...updated } : hl
            ),
          };
        }
        return exp;
      })
    );
  };

  const moveHighlight = (expIndex: number, hlIndex: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? hlIndex - 1 : hlIndex + 1;
    setExperiences(
      experiences.map((exp, i) => {
        if (i === expIndex) {
          if (targetIndex < 0 || targetIndex >= exp.highlights.length) return exp;
          const nextHls = [...exp.highlights];
          const temp = nextHls[hlIndex];
          nextHls[hlIndex] = nextHls[targetIndex];
          nextHls[targetIndex] = temp;
          return { ...exp, highlights: nextHls };
        }
        return exp;
      })
    );
  };

  // Focus helpers
  const addFocus = () => {
    setCurrentFocus([...currentFocus, { en: "", id: "" }]);
  };

  const removeFocus = (index: number) => {
    setCurrentFocus(currentFocus.filter((_, i) => i !== index));
  };

  const updateFocus = (index: number, updated: Partial<LocalizedString>) => {
    setCurrentFocus(
      currentFocus.map((f, i) => (i === index ? { ...f, ...updated } : f))
    );
  };

  const moveFocus = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentFocus.length) return;
    const next = [...currentFocus];
    const temp = next[index];
    next[index] = next[targetIndex];
    next[targetIndex] = temp;
    setCurrentFocus(next);
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = profilePayloadSchema.parse({
        name,
        avatar: avatar || undefined,
        email: email || undefined,
        resumeUrl: resumeUrl || undefined,
        location: locationEn || locationId ? { en: locationEn, id: locationId } : undefined,
        title: { en: titleEn, id: titleId },
        bio: { en: bioEn, id: bioId },
        philosophy: philosophyEn || philosophyId ? { en: philosophyEn, id: philosophyId } : undefined,
        socialLinks: {
          github: github || undefined,
          linkedin: linkedin || undefined,
          twitter: twitter || undefined,
          website: website || undefined,
        },
        skills,
        experiences: experiences.map((exp) => ({
          ...exp,
          endDate: exp.endDate || null,
        })),
        currentFocus,
      });

      const response = await fetch("/api/profile", {
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

      setSuccess("Profile settings saved successfully");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save profile");
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
                className={`flex items-center justify-between px-3 py-2 text-left text-xs font-mono uppercase tracking-wider transition border ${
                  isActive
                    ? "border-teal-200/20 bg-teal-400/5 text-teal-200 font-bold"
                    : "border-transparent text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon size={14} />
                  {tab.label}
                </span>
                {isActive && <ChevronRight size={12} />}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="lg:col-span-3">
          {/* 1. Basic Info */}
          {activeTab === "basic" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">General Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Full Name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. John Doe"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Email Address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. contact@domain.com"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Avatar Image URL
                  <input
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. /images/avatar.jpg"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Resume/CV Document URL
                  <input
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. /files/resume.pdf"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Location (English)
                  <input
                    value={locationEn}
                    onChange={(e) => setLocationEn(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Jakarta, Indonesia"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Location (Indonesian)
                  <input
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Jakarta, Indonesia"
                  />
                </label>
              </div>
            </div>
          )}

          {/* 2. Dossier & Bio */}
          {activeTab === "dossier" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">Dossier & Bio</h3>
              
              {lang === "en" ? (
                <div className="grid gap-4">
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Professional Title (English)
                    <input
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="admin-input"
                      placeholder="e.g. Senior Backend Engineer"
                    />
                  </label>
                  <div className="grid gap-1.5 text-xs text-zinc-300">
                    Professional Biography (English)
                    <RichTextEditor
                      value={bioEn}
                      onChange={setBioEn}
                      placeholder="Draft professional bio in English..."
                    />
                  </div>
                  <div className="grid gap-1.5 text-xs text-zinc-300">
                    Engineering Philosophy (English) - Optional
                    <RichTextEditor
                      value={philosophyEn}
                      onChange={setPhilosophyEn}
                      placeholder="Draft engineering philosophy in English..."
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  <label className="grid gap-1.5 text-xs text-zinc-300">
                    Professional Title (Indonesian)
                    <input
                      value={titleId}
                      onChange={(e) => setTitleId(e.target.value)}
                      className="admin-input"
                      placeholder="e.g. Rekayasa Backend Senior"
                    />
                  </label>
                  <div className="grid gap-1.5 text-xs text-zinc-300">
                    Professional Biography (Indonesian)
                    <RichTextEditor
                      value={bioId}
                      onChange={setBioId}
                      placeholder="Tulis biografi profesional dalam Bahasa Indonesia..."
                    />
                  </div>
                  <div className="grid gap-1.5 text-xs text-zinc-300">
                    Engineering Philosophy (Indonesian) - Optional
                    <RichTextEditor
                      value={philosophyId}
                      onChange={setPhilosophyId}
                      placeholder="Tulis filosofi rekayasa dalam Bahasa Indonesia..."
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Skills Directory */}
          {activeTab === "skills" && (
            <div className="grid gap-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Skills Directory</h3>
                <button
                  type="button"
                  onClick={addSkill}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer font-mono"
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>

              {skills.length === 0 ? (
                <p className="text-zinc-500 text-xs italic">No skills added yet.</p>
              ) : (
                <div className="grid gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400 font-mono">Skill #{index + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveSkill(index, "up")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={index === skills.length - 1}
                            onClick={() => moveSkill(index, "down")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-4">
                        <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-1">
                          Category
                          <select
                            value={skill.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (isSkillCategory(val)) {
                                updateSkill(index, { category: val });
                              }
                            }}
                            className="admin-input py-1 text-xs"
                          >
                            {skillCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-1">
                          Skill Name
                          <input
                            value={skill.name}
                            onChange={(e) => updateSkill(index, { name: e.target.value })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Go, Kubernetes, TypeScript"
                          />
                        </label>
                        <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-1">
                          Level (1-5)
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={skill.level}
                            onChange={(e) => updateSkill(index, { level: Number(e.target.value) })}
                            className="admin-input py-1 text-xs"
                          />
                        </label>
                        <label className="grid gap-1.5 text-xs text-zinc-300 md:col-span-1">
                          Years of Experience
                          <input
                            type="number"
                            min={0}
                            value={skill.yearsExp ?? 0}
                            onChange={(e) => updateSkill(index, { yearsExp: Number(e.target.value) })}
                            className="admin-input py-1 text-xs"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Experience Roadmap */}
          {activeTab === "experience" && (
            <div className="grid gap-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Experience Roadmap</h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer font-mono"
                >
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              {experiences.length === 0 ? (
                <p className="text-zinc-500 text-xs italic">No professional experiences listed yet.</p>
              ) : (
                <div className="grid gap-5">
                  {experiences.map((exp, index) => (
                    <div key={index} className="grid gap-3 border border-zinc-800/80 p-4 bg-zinc-900/10">
                      <div className="flex justify-between items-center border-b border-zinc-800/50 pb-2">
                        <span className="text-xs text-zinc-400 font-mono font-semibold">Position #{index + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveExperience(index, "up")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={index === experiences.length - 1}
                            onClick={() => moveExperience(index, "down")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExperience(index)}
                            className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Company Name
                          <input
                            value={exp.company}
                            onChange={(e) => updateExperience(index, { company: e.target.value })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Google, TechCorp"
                          />
                        </label>
                        <div className="grid gap-3 md:grid-cols-2">
                          <label className="grid gap-1.5 text-xs text-zinc-300">
                            Start Date
                            <input
                              value={exp.startDate}
                              onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                              className="admin-input py-1 text-xs"
                              placeholder="e.g. 2021-06 or June 2021"
                            />
                          </label>
                          <label className="grid gap-1.5 text-xs text-zinc-300">
                            End Date (Empty for Present)
                            <input
                              value={exp.endDate ?? ""}
                              onChange={(e) => updateExperience(index, { endDate: e.target.value || null })}
                              className="admin-input py-1 text-xs"
                              placeholder="e.g. 2023-08 or Present"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Role/Title (English)
                          <input
                            value={exp.role.en}
                            onChange={(e) => updateExperience(index, { role: { en: e.target.value, id: exp.role.id } })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Lead Engineer"
                          />
                        </label>
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Role/Title (Indonesian)
                          <input
                            value={exp.role.id}
                            onChange={(e) => updateExperience(index, { role: { en: exp.role.en, id: e.target.value } })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Rekayasa Utama"
                          />
                        </label>
                      </div>

                      <div className="grid gap-2">
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Technologies Used (comma separated)
                          <input
                            value={exp.techUsed.join(", ")}
                            onChange={(e) => updateExperience(index, { techUsed: splitCsv(e.target.value) })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Docker, Redis, Go, AWS"
                          />
                        </label>
                      </div>

                      {/* Nested experience Highlights */}
                      <div className="grid gap-2 border border-zinc-800/60 p-3 bg-zinc-950/20 mt-2">
                        <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
                          <span className="text-[11px] font-mono uppercase text-teal-200/70">Key Highlights / Accomplishments</span>
                          <button
                            type="button"
                            onClick={() => addHighlight(index)}
                            className="flex items-center gap-1 text-[10px] px-2 py-1 border border-teal-200/20 text-teal-200 hover:border-teal-200 transition cursor-pointer font-mono"
                          >
                            <Plus size={10} /> Add Highlight
                          </button>
                        </div>

                        {exp.highlights.length === 0 ? (
                          <p className="text-zinc-500 text-[11px] italic">No highlights added yet.</p>
                        ) : (
                          <div className="grid gap-2">
                            {exp.highlights.map((hl, hlIndex) => (
                              <div key={hlIndex} className="grid gap-2 border border-zinc-900/80 p-2.5 bg-zinc-900/10">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] text-zinc-500 font-mono">Highlight #{hlIndex + 1}</span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={hlIndex === 0}
                                      onClick={() => moveHighlight(index, hlIndex, "up")}
                                      className="p-0.5 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                                    >
                                      <ArrowUp size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={hlIndex === exp.highlights.length - 1}
                                      onClick={() => moveHighlight(index, hlIndex, "down")}
                                      className="p-0.5 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                                    >
                                      <ArrowDown size={12} />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => removeHighlight(index, hlIndex)}
                                      className="p-0.5 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>
                                <div className="grid gap-2 md:grid-cols-2">
                                  <input
                                    value={hl.en}
                                    onChange={(e) => updateHighlight(index, hlIndex, { en: e.target.value })}
                                    className="admin-input py-1 text-[11px]"
                                    placeholder="Draft highlight in English"
                                  />
                                  <input
                                    value={hl.id}
                                    onChange={(e) => updateHighlight(index, hlIndex, { id: e.target.value })}
                                    className="admin-input py-1 text-[11px]"
                                    placeholder="Draft highlight in Indonesian"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Active Focus */}
          {activeTab === "focus" && (
            <div className="grid gap-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-teal-200">Active Technical Focus Areas</h3>
                <button
                  type="button"
                  onClick={addFocus}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-teal-200/30 text-teal-200 bg-teal-400/5 hover:border-teal-200 transition cursor-pointer font-mono"
                >
                  <Plus size={14} /> Add Focus Area
                </button>
              </div>

              {currentFocus.length === 0 ? (
                <p className="text-zinc-500 text-xs italic">No focus items added yet.</p>
              ) : (
                <div className="grid gap-3">
                  {currentFocus.map((focus, index) => (
                    <div key={index} className="grid gap-3 border border-zinc-800/80 p-3 bg-zinc-900/10">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400 font-mono">Focus Item #{index + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => moveFocus(index, "up")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={index === currentFocus.length - 1}
                            onClick={() => moveFocus(index, "down")}
                            className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFocus(index)}
                            className="p-1 text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Focus Area (English)
                          <input
                            value={focus.en}
                            onChange={(e) => updateFocus(index, { en: e.target.value })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Distributed Consensus Systems"
                          />
                        </label>
                        <label className="grid gap-1.5 text-xs text-zinc-300">
                          Focus Area (Indonesian)
                          <input
                            value={focus.id}
                            onChange={(e) => updateFocus(index, { id: e.target.value })}
                            className="admin-input py-1 text-xs"
                            placeholder="e.g. Sistem Konsensus Terdistribusi"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 6. Social Networks */}
          {activeTab === "social" && (
            <div className="grid gap-4">
              <h3 className="border-b border-zinc-800 pb-2 text-sm font-semibold tracking-wider uppercase text-teal-200">Social Networks</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  GitHub Profile URL
                  <input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="admin-input"
                    placeholder="https://github.com/yourusername"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  LinkedIn Profile URL
                  <input
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="admin-input"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Twitter/X Profile URL
                  <input
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="admin-input"
                    placeholder="https://twitter.com/yourusername"
                  />
                </label>
                <label className="grid gap-1.5 text-xs text-zinc-300">
                  Personal / Portfolio Website URL
                  <input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="admin-input"
                    placeholder="https://yourwebsite.com"
                  />
                </label>
              </div>
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
          {saving ? "Saving..." : "Save Profile Settings"}
        </button>
      </div>
    </form>
  );
}
