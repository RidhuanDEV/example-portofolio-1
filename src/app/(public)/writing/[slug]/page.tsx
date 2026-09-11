import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichTextRenderer } from "@/components/shared/RichTextRenderer";
import { getPublishedBlogPostBySlug } from "@/lib/data";
import { toDateLabel } from "@/lib/utils";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

interface WritingPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const locale = await getServerLocale();

  return {
    title: t(post.title, locale),
    description: t(post.excerpt, locale),
  };
}

export default async function WritingPostPage({ params }: WritingPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {toDateLabel(post.publishedAt)} / {post.readTimeMin} {dict.writing.readTimeLabel}
        </p>
        <h1 className="mt-5 text-5xl font-semibold text-white">{t(post.title, locale)}</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">{t(post.excerpt, locale)}</p>
        <div className="mt-10 border-t border-white/10 pt-8">
          <RichTextRenderer html={t(post.content, locale)} />
        </div>
      </div>
    </main>
  );
}
