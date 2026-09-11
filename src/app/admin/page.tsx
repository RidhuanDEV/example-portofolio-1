import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getHomeData, getPublishedBlogPosts, getPublishedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [home, projects, posts] = await Promise.all([
    getHomeData(),
    getPublishedProjects(),
    getPublishedBlogPosts(),
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Portfolio control plane</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Projects", String(projects.length)],
          ["Articles", String(posts.length)],
          ["Featured", String(home.featuredProjects.length)],
          ["Skills", String(home.profile.skills.length)],
        ].map(([label, value]) => (
          <div key={label} className="border border-white/10 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AdminAction href="/admin/projects/new" title="Create case study" />
        <AdminAction href="/admin/blog/new" title="Write article" />
      </div>
    </div>
  );
}

function AdminAction({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="group flex items-center justify-between border border-white/10 p-5 text-zinc-200 hover:border-teal-300/50">
      {title}
      <ArrowRight size={17} className="text-zinc-500 group-hover:text-teal-200" />
    </Link>
  );
}
