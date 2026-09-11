import { BlogPost } from "@/models/BlogPost";
import { Profile } from "@/models/Profile";
import { Project } from "@/models/Project";
import { SiteSettings } from "@/models/SiteSettings";
import {
  seedBlogPosts,
  seedProfile,
  seedProjects,
  seedSettings,
} from "@/data/seed-data";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import type {
  BlogPostRecord,
  HomeData,
  ProfileRecord,
  ProjectRecord,
  SiteSettingsRecord,
} from "@/types/domain";

function byFeaturedOrder(a: ProjectRecord, b: ProjectRecord): number {
  return a.featuredOrder - b.featuredOrder;
}

export async function getHomeData(): Promise<HomeData> {
  const fallback: HomeData = {
    profile: seedProfile,
    settings: seedSettings,
    featuredProjects: seedProjects
      .filter((project) => project.status === "published" && project.featured)
      .sort(byFeaturedOrder)
      .slice(0, 3),
  };

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    const [profile, settings, featuredProjects] = await Promise.all([
      Profile.findOne().lean<ProfileRecord | null>(),
      SiteSettings.findOne().lean<SiteSettingsRecord | null>(),
      Project.find({ status: "published", featured: true })
        .sort({ featuredOrder: 1 })
        .limit(3)
        .lean<ProjectRecord[]>(),
    ]);

    return {
      profile: profile ?? seedProfile,
      settings: settings ?? seedSettings,
      featuredProjects,
    };
  } catch (error) {
    console.warn("MongoDB connection failed in getHomeData, falling back to seed data:", error);
    return fallback;
  }
}

export async function getPublishedProjects(): Promise<ProjectRecord[]> {
  const fallback: ProjectRecord[] = seedProjects
    .filter((project) => project.status === "published")
    .sort(byFeaturedOrder);

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await Project.find({ status: "published" })
      .sort({ featuredOrder: 1, createdAt: -1 })
      .lean<ProjectRecord[]>();
  } catch (error) {
    console.warn("MongoDB connection failed in getPublishedProjects, falling back to seed data:", error);
    return fallback;
  }
}

export async function getAllProjects(): Promise<ProjectRecord[]> {
  const fallback: ProjectRecord[] = [...seedProjects].sort(byFeaturedOrder);

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await Project.find()
      .sort({ featuredOrder: 1, createdAt: -1 })
      .lean<ProjectRecord[]>();
  } catch (error) {
    console.warn("MongoDB connection failed in getAllProjects, falling back to seed data:", error);
    return fallback;
  }
}

export async function getPublishedProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const fallback: ProjectRecord | null =
    seedProjects.find((project) => project.slug === slug && project.status === "published") ?? null;

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await Project.findOne({ slug, status: "published" }).lean<ProjectRecord | null>();
  } catch (error) {
    console.warn(`MongoDB connection failed in getPublishedProjectBySlug(${slug}), falling back to seed data:`, error);
    return fallback;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  const fallback: ProjectRecord | null =
    seedProjects.find((project) => project.slug === slug) ?? null;

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await Project.findOne({ slug }).lean<ProjectRecord | null>();
  } catch (error) {
    console.warn(`MongoDB connection failed in getProjectBySlug(${slug}), falling back to seed data:`, error);
    return fallback;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPostRecord[]> {
  const fallback: BlogPostRecord[] = seedBlogPosts
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      const left = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const right = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return right - left;
    });

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await BlogPost.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean<BlogPostRecord[]>();
  } catch (error) {
    console.warn("MongoDB connection failed in getPublishedBlogPosts, falling back to seed data:", error);
    return fallback;
  }
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  const fallback: BlogPostRecord | null =
    seedBlogPosts.find((post) => post.slug === slug && post.status === "published") ?? null;

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return await BlogPost.findOne({ slug, status: "published" }).lean<BlogPostRecord | null>();
  } catch (error) {
    console.warn(`MongoDB connection failed in getPublishedBlogPostBySlug(${slug}), falling back to seed data:`, error);
    return fallback;
  }
}

export async function getProfile(): Promise<ProfileRecord> {
  const fallback: ProfileRecord = seedProfile;

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return (await Profile.findOne().lean<ProfileRecord | null>()) ?? fallback;
  } catch (error) {
    console.warn("MongoDB connection failed in getProfile, falling back to seed data:", error);
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettingsRecord> {
  const fallback: SiteSettingsRecord = seedSettings;

  if (!hasMongoUri()) {
    return fallback;
  }

  try {
    await connectDB();
    return (await SiteSettings.findOne().lean<SiteSettingsRecord | null>()) ?? fallback;
  } catch (error) {
    console.warn("MongoDB connection failed in getSiteSettings, falling back to seed data:", error);
    return fallback;
  }
}
