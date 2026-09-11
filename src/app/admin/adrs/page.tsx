import Link from "next/link";
import { getPublishedProjects } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function AdminAdrsPage() {
  const projects = await getPublishedProjects();
  const locale = await getServerLocale();

  const adrs = projects.flatMap((project) =>
    project.adrs.map((adr) => ({
      ...adr,
      projectTitle: project.title,
      projectSlug: project.slug,
    })),
  );

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">adrs</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Architecture decisions</h1>
      </div>
      <div className="grid gap-3">
        {adrs.map((adr) => (
          <Link key={`${adr.projectSlug}-${adr.number}`} href={`/admin/projects/${adr.projectSlug}`} className="border border-white/10 p-4 hover:border-teal-300/50">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              {t(adr.projectTitle, locale)} / ADR {adr.number} / {adr.status}
            </p>
            <h2 className="mt-3 text-lg font-medium text-white">{t(adr.title, locale)}</h2>
          </Link>
        ))}
        {adrs.length === 0 ? <p className="text-sm text-zinc-400">No ADRs yet.</p> : null}
      </div>
    </div>
  );
}
