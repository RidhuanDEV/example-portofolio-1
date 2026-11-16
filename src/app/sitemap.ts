import type { MetadataRoute } from "next";
import { getPublishedBlogPosts, getPublishedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ridhuan-rangga.vercel.app").replace(
    /\/$/,
    "",
  );

  const [projects, posts] = await Promise.all([
    getPublishedProjects(),
    getPublishedBlogPosts(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/system-design`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/writing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : now,
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: post.updatedAt
      ? new Date(post.updatedAt)
      : post.publishedAt
        ? new Date(post.publishedAt)
        : now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
