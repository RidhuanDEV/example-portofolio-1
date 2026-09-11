import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/BlogForm";
import { getPublishedBlogPostBySlug } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

interface AdminBlogEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminBlogEditPage({ params }: AdminBlogEditPageProps) {
  const { id } = await params;
  const post = await getPublishedBlogPostBySlug(id);

  if (!post) {
    notFound();
  }

  const locale = await getServerLocale();

  return (
    <div className="grid gap-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">edit article</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{t(post.title, locale)}</h1>
      </div>
      <BlogForm mode="edit" initialData={post} />
    </div>
  );
}
