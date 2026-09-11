import Link from "next/link";
import { Plus } from "lucide-react";
import { getPublishedBlogPosts } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getPublishedBlogPosts();
  const locale = await getServerLocale();

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">writing</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Articles</h1>
        </div>
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950">
          <Plus size={16} />
          New
        </Link>
      </div>
      <div className="grid gap-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/admin/blog/${post.slug}`} className="grid border border-white/10 p-4 hover:border-teal-300/50">
            <span className="text-lg font-medium text-white">{t(post.title, locale)}</span>
            <span className="mt-2 text-sm text-zinc-400">{t(post.excerpt, locale)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
