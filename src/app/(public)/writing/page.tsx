import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getPublishedBlogPosts } from "@/lib/data";
import { toDateLabel } from "@/lib/utils";
import { getTranslations, t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const posts = await getPublishedBlogPosts();
  const locale = await getServerLocale();
  const dict = getTranslations(locale);

  return (
    <main className="mx-auto max-w-[92vw] lg:max-w-[80vw] py-16">
      <AnimatedSection>
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-teal-200">
          {dict.writing.badge}
        </p>
        <h1 className="mt-5 text-5xl font-semibold text-white">
          {dict.writing.headline}
        </h1>
      </AnimatedSection>
      <div className="mt-10 grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group grid card-hover-lift border border-white/10 bg-white/[0.025] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {toDateLabel(post.publishedAt)} / {post.readTimeMin} {dict.writing.readTimeLabel}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">{t(post.title, locale)}</h2>
              </div>
              <ArrowRight
                className="text-zinc-500 transition group-hover:text-teal-200"
                size={18}
              />
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
              {t(post.excerpt, locale)}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
