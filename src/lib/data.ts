import { unstable_cache } from "next/cache";
import { BlogPost } from "@/models/BlogPost";
import { ContactMessage } from "@/models/ContactMessage";
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
import { serializeRecord } from "@/lib/serialize";
import type {
  BlogPostRecord,
  ContactMessageRecord,
  HomeData,
  ProfileRecord,
  ProjectRecord,
  SiteSettingsRecord,
} from "@/types/domain";

function byFeaturedOrder(a: ProjectRecord, b: ProjectRecord): number {
  return a.featuredOrder - b.featuredOrder;
}

const getCachedHomeDataFromDb = unstable_cache(
  async (): Promise<HomeData> => {
    await connectDB();
    const [profile, settings, featuredProjects] = await Promise.all([
      Profile.findOne().lean<ProfileRecord | null>(),
      SiteSettings.findOne().lean<SiteSettingsRecord | null>(),
      Project.find({ status: "published", featured: true })
        .sort({ featuredOrder: 1 })
        .limit(3)
        .lean<ProjectRecord[]>(),
    ]);

    return serializeRecord({
      profile: profile ?? seedProfile,
      settings: settings ?? seedSettings,
      featuredProjects,
    });
  },
  ["home-data"],
  { tags: ["home", "profile", "settings", "projects"], revalidate: 3600 },
);

const getCachedPublishedProjectsFromDb = unstable_cache(
  async (): Promise<ProjectRecord[]> => {
    await connectDB();
    const projects = await Project.find({ status: "published" })
      .sort({ featuredOrder: 1, createdAt: -1 })
      .lean<ProjectRecord[]>();
    return serializeRecord(projects);
  },
  ["published-projects"],
  { tags: ["projects"], revalidate: 3600 },
);

const getCachedPublishedProjectBySlugFromDb = unstable_cache(
  async (slug: string): Promise<ProjectRecord | null> => {
    await connectDB();
    const project = await Project.findOne({ slug, status: "published" }).lean<ProjectRecord | null>();
    return project ? serializeRecord(project) : null;
  },
  ["published-project-by-slug"],
  { tags: ["projects"], revalidate: 3600 },
);

const getCachedPublishedBlogPostsFromDb = unstable_cache(
  async (): Promise<BlogPostRecord[]> => {
    await connectDB();
    const posts = await BlogPost.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .lean<BlogPostRecord[]>();
    return serializeRecord(posts);
  },
  ["published-blog-posts"],
  { tags: ["blog"], revalidate: 3600 },
);

const getCachedPublishedBlogPostBySlugFromDb = unstable_cache(
  async (slug: string): Promise<BlogPostRecord | null> => {
    await connectDB();
    const post = await BlogPost.findOne({ slug, status: "published" }).lean<BlogPostRecord | null>();
    return post ? serializeRecord(post) : null;
  },
  ["published-blog-post-by-slug"],
  { tags: ["blog"], revalidate: 3600 },
);

const getCachedProfileFromDb = unstable_cache(
  async (): Promise<ProfileRecord> => {
    await connectDB();
    const profile = await Profile.findOne().lean<ProfileRecord | null>();
    return serializeRecord(profile ?? seedProfile);
  },
  ["profile-data"],
  { tags: ["profile", "home"], revalidate: 3600 },
);

const getCachedSiteSettingsFromDb = unstable_cache(
  async (): Promise<SiteSettingsRecord> => {
    await connectDB();
    const settings = await SiteSettings.findOne().lean<SiteSettingsRecord | null>();
    return serializeRecord(settings ?? seedSettings);
  },
  ["site-settings-data"],
  { tags: ["settings", "home"], revalidate: 3600 },
);

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
    return await getCachedHomeDataFromDb();
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
    return await getCachedPublishedProjectsFromDb();
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
    return await getCachedPublishedProjectBySlugFromDb(slug);
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
    return await getCachedPublishedBlogPostsFromDb();
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
    return await getCachedPublishedBlogPostBySlugFromDb(slug);
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
    return await getCachedProfileFromDb();
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
    return await getCachedSiteSettingsFromDb();
  } catch (error) {
    console.warn("MongoDB connection failed in getSiteSettings, falling back to seed data:", error);
    return fallback;
  }
}

export async function getContactMessages(): Promise<ContactMessageRecord[]> {
  if (!hasMongoUri()) {
    return [];
  }

  try {
    await connectDB();
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean<ContactMessageRecord[]>();
    return serializeRecord(messages);
  } catch (error) {
    console.warn("MongoDB connection failed in getContactMessages:", error);
    return [];
  }
}
