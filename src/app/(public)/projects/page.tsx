import { ProjectCard } from "@/components/project/ProjectCard";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getPublishedProjects } from "@/lib/data";
import { getTranslations } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <AnimatedSection>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.projects.badge}
        </p>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold text-white">
          {dict.projects.headline}
        </h1>
      </AnimatedSection>
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} locale={locale} />
        ))}
      </div>
    </main>
  );
}
