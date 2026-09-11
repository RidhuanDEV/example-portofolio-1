import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectBySlug } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

interface AdminProjectEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProjectEditPage({ params }: AdminProjectEditPageProps) {
  const { id } = await params;
  const project = await getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  const locale = await getServerLocale();

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">edit project</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{t(project.title, locale)}</h1>
      </div>
      <ProjectForm mode="edit" initialData={project} />
    </div>
  );
}
