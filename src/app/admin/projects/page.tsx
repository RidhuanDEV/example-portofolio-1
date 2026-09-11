import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProjects } from "@/lib/data";
import { getServerLocale } from "@/lib/i18n-server";
import { ProjectsTable } from "@/components/admin/ProjectsTable";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();
  const locale = await getServerLocale();

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-400">Control Panel</p>
          <h1 className="mt-2 text-3xl font-semibold text-white tracking-tight">Case Studies</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 px-4 py-2.5 text-sm font-medium transition duration-150 cursor-pointer"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      <ProjectsTable projects={projects} locale={locale} />
    </div>
  );
}
