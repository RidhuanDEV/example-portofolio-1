import type { Metadata } from "next";
import Link from "next/link";
import { Download, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PrintResumeButton } from "@/components/resume/PrintResumeButton";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getProfile, getPublishedProjects } from "@/lib/data";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";
import type { Skill, SkillCategory } from "@/types/domain";
import { skillCategories } from "@/types/domain";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return {
    title: `${profile.name} - ${dict.resume.badge}`,
    description: t(profile.bio, locale),
  };
}

function formatMonth(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 2) return dateStr;
  const year = parts[0];
  const monthIdx = Number(parts[1]) - 1;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthName = months[monthIdx];
  return monthName ? `${monthName} ${year}` : dateStr;
}

export default async function ResumePage() {
  const [profile, projects, locale] = await Promise.all([
    getProfile(),
    getPublishedProjects(),
    getServerLocale(),
  ]);
  const dict = getTranslations(locale);

  const groupedSkills: Array<{ category: SkillCategory; items: Skill[] }> = skillCategories
    .map((category) => ({
      category,
      items: profile.skills.filter((skill) => skill.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[72vw] py-14 print:max-w-none print:py-0">
      <AnimatedSection className="print:opacity-100 print:transform-none">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-8 print:border-black/20 print:pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200 print:hidden">
              {dict.resume.badge}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl print:mt-0 print:text-3xl print:text-black">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-zinc-300 print:text-base print:text-black">
              {t(profile.title, locale)}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-zinc-400 print:text-black">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} className="print:hidden" />
                  {t(profile.location, locale)}
                </span>
              ) : null}
              {profile.phone ? (
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 hover:text-teal-200 print:text-black"
                >
                  <Phone size={13} className="print:hidden" />
                  {profile.phone}
                </a>
              ) : null}
              {profile.email ? (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-teal-200 print:text-black"
                >
                  <Mail size={13} className="print:hidden" />
                  {profile.email}
                </a>
              ) : null}
              {profile.socialLinks.github ? (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-teal-200 print:text-black"
                >
                  github.com/RidhuanDEV
                  <ExternalLink size={11} className="print:hidden" />
                </a>
              ) : null}
              {profile.socialLinks.linkedin ? (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-teal-200 print:text-black"
                >
                  LinkedIn
                  <ExternalLink size={11} className="print:hidden" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <a
              href={profile.resumeUrl ?? "/resume.pdf"}
              download
              className="inline-flex items-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 btn-hover-lift"
            >
              <Download size={16} />
              {dict.resume.downloadPdf}
            </a>
            <PrintResumeButton label={dict.resume.printResume} />
          </div>
        </div>
      </AnimatedSection>

      {/* Summary */}
      <section className="mt-8 border-b border-white/10 pb-7 print:mt-4 print:border-black/20 print:pb-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200 print:text-black print:font-bold">
          {dict.resume.summary}
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-300 print:text-xs print:leading-5 print:text-black">
          {t(profile.bio, locale)}
        </p>
      </section>

      {/* Technical Skills */}
      <section className="mt-8 border-b border-white/10 pb-7 print:mt-4 print:border-black/20 print:pb-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200 print:text-black print:font-bold">
          {dict.resume.skills}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 print:grid-cols-1 print:gap-1.5">
          {groupedSkills.map((group) => (
            <div
              key={group.category}
              className="border border-white/10 bg-white/[0.02] p-4 print:border-0 print:p-0"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 print:inline print:font-bold print:text-black">
                {dict.resume.skillCategories[group.category]}
                <span className="hidden print:inline">: </span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5 print:mt-0 print:inline">
                {group.items.map((skill, idx) => (
                  <span
                    key={skill.name}
                    className="border border-white/10 px-2 py-0.5 font-mono text-xs text-zinc-200 print:border-0 print:p-0 print:font-sans print:text-xs print:text-black"
                  >
                    {skill.name}
                    {idx < group.items.length - 1 ? (
                      <span className="hidden print:inline">, </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mt-8 border-b border-white/10 pb-7 print:mt-4 print:border-black/20 print:pb-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200 print:text-black print:font-bold">
          {dict.resume.experience}
        </h2>
        <div className="mt-5 grid gap-6 print:mt-3 print:gap-3">
          {profile.experiences.map((exp, idx) => (
            <article
              key={`${exp.company}-${exp.startDate}-${idx}`}
              className="border border-white/10 bg-white/[0.02] p-5 print:border-0 print:p-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-white print:text-sm print:text-black">
                    {t(exp.role, locale)}
                  </h3>
                  <p className="text-sm text-teal-200 print:text-xs print:font-medium print:text-black">
                    {exp.company}
                  </p>
                </div>
                <p className="font-mono text-xs text-zinc-400 print:text-black">
                  {formatMonth(exp.startDate)} -{" "}
                  {exp.endDate ? formatMonth(exp.endDate) : dict.resume.present}
                </p>
              </div>
              <ul className="mt-3 grid gap-2 pl-4 text-sm leading-6 text-zinc-300 list-disc print:mt-1.5 print:gap-1 print:text-xs print:leading-5 print:text-black">
                {exp.highlights.map((hl, hlIdx) => (
                  <li key={hlIdx}>{t(hl, locale)}</li>
                ))}
              </ul>
              {exp.techUsed.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5 print:hidden">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Selected Engineering Projects */}
      <section className="mt-8 border-b border-white/10 pb-7 print:mt-4 print:border-black/20 print:pb-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200 print:text-black print:font-bold">
          {dict.resume.selectedProjects}
        </h2>
        <div className="mt-5 grid gap-4 print:mt-3 print:gap-2.5">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.slug}
              className="border border-white/10 bg-white/[0.02] p-4 print:border-0 print:p-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-base font-semibold text-white hover:text-teal-200 print:text-sm print:text-black"
                >
                  {t(project.title, locale)}
                </Link>
                <span className="font-mono text-xs text-zinc-500 print:text-black">
                  {project.year}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-300 print:mt-1 print:text-xs print:leading-5 print:text-black">
                {t(project.tagline, locale)}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-3 font-mono text-xs text-zinc-400 print:hidden">
                {project.metrics.slice(0, 3).map((m) => (
                  <span key={m.value}>
                    <strong className="text-teal-200">{m.value}</strong> {t(m.label, locale)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      {profile.education && profile.education.length > 0 ? (
        <section className="mt-8 print:mt-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-teal-200 print:text-black print:font-bold">
            {dict.resume.education}
          </h2>
          <div className="mt-5 grid gap-4 print:mt-3 print:gap-2">
            {profile.education.map((edu, idx) => (
              <div
                key={`${edu.institution}-${idx}`}
                className="border border-white/10 bg-white/[0.02] p-5 print:border-0 print:p-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white print:text-sm print:text-black">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-zinc-300 print:text-xs print:text-black">
                      {t(edu.degree, locale)}
                      {edu.gpa ? ` | ${dict.resume.gpaLabel}: ${edu.gpa}` : ""}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-zinc-400 print:text-black">{edu.period}</p>
                </div>
                {edu.highlights.length > 0 ? (
                  <ul className="mt-2.5 list-disc pl-4 text-sm text-zinc-400 print:mt-1 print:text-xs print:text-black">
                    {edu.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx}>{t(hl, locale)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
