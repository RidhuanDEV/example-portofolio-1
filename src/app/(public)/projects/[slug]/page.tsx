import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/project/CaseStudyLayout";
import { getPublishedProjectBySlug } from "@/lib/data";

import { t } from "@/lib/i18n";
import { getServerLocale } from "@/lib/i18n-server";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const locale = await getServerLocale();

  return {
    title: `${t(project.title, locale)} - Case Study`,
    description: t(project.tagline, locale),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const locale = await getServerLocale();

  return <CaseStudyLayout project={project} locale={locale} />;
}
