import type { Types } from "mongoose";

export interface LocalizedString {
  en: string;
  id: string;
}

export const projectStatuses = ["draft", "published", "archived"] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const blogStatuses = ["draft", "published"] as const;
export type BlogStatus = (typeof blogStatuses)[number];

export const techCategories = [
  "frontend",
  "backend",
  "database",
  "infra",
  "testing",
  "other",
] as const;
export type TechCategory = (typeof techCategories)[number];

export const sectionTypes = [
  "problem",
  "architecture",
  "tech-stack",
  "backend-design",
  "database-design",
  "caching",
  "performance",
  "tradeoffs",
  "failure-modes",
  "observability",
  "results",
  "lessons",
] as const;
export type SectionType = (typeof sectionTypes)[number];

export const adrStatuses = [
  "proposed",
  "accepted",
  "deprecated",
  "superseded",
] as const;
export type AdrStatus = (typeof adrStatuses)[number];

export const skillCategories = [
  "language",
  "framework",
  "database",
  "cloud",
  "tool",
  "concept",
] as const;
export type SkillCategory = (typeof skillCategories)[number];

export interface TechAlternative {
  name: string;
  reasonNotChosen: LocalizedString;
}

export interface TechItem {
  name: string;
  category: TechCategory;
  version?: string;
  rationale?: LocalizedString;
  alternatives: TechAlternative[];
}

export interface Metric {
  label: LocalizedString;
  value: string;
  context?: LocalizedString;
}

export interface DiagramData {
  svgData?: string;
  interactive?: boolean;
}

export interface CaseStudySection {
  id?: string;
  type: SectionType;
  title: LocalizedString;
  content: LocalizedString;
  order: number;
  diagram?: DiagramData;
}

export interface ADR {
  id?: string;
  number: number;
  title: LocalizedString;
  status: AdrStatus;
  context: LocalizedString;
  decision: LocalizedString;
  consequences?: LocalizedString;
  alternatives: LocalizedString[];
  date?: Date | string;
}

export interface ProjectRecord {
  _id?: Types.ObjectId | string;
  title: LocalizedString;
  slug: string;
  tagline: LocalizedString;
  description: LocalizedString;
  status: ProjectStatus;
  featured: boolean;
  featuredOrder: number;
  coverImage?: string;
  demoUrl?: string;
  repoUrl?: string;
  techStack: TechItem[];
  metrics: Metric[];
  sections: CaseStudySection[];
  adrs: ADR[];
  tags: string[];
  year?: number;
  duration?: LocalizedString;
  teamSize: number;
  role?: LocalizedString;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BlogPostRecord {
  _id?: Types.ObjectId | string;
  title: LocalizedString;
  slug: string;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImage?: string;
  tags: string[];
  status: BlogStatus;
  readTimeMin: number;
  publishedAt?: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number;
  yearsExp?: number;
}

export interface Experience {
  id?: string;
  company: string;
  role: LocalizedString;
  startDate: string;
  endDate?: string | null;
  highlights: LocalizedString[];
  techUsed: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface ProfileRecord {
  _id?: Types.ObjectId | string;
  name: string;
  title: LocalizedString;
  bio: LocalizedString;
  philosophy?: LocalizedString;
  avatar?: string;
  location?: LocalizedString;
  email?: string;
  resumeUrl?: string;
  socialLinks: SocialLinks;
  skills: Skill[];
  experiences: Experience[];
  currentFocus: LocalizedString[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface SiteSettingsRecord {
  _id?: Types.ObjectId | string;
  siteTitle: LocalizedString;
  siteDescription?: LocalizedString;
  ogImage?: string;
  analyticsId?: string;
  maintenanceMode: boolean;
  heroHeadline?: LocalizedString;
  heroSubheadline?: LocalizedString;
  ctaText: {
    primary: LocalizedString;
    secondary: LocalizedString;
  };
  featuredMetrics: Metric[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type ProjectSummary = Pick<
  ProjectRecord,
  | "title"
  | "slug"
  | "tagline"
  | "description"
  | "status"
  | "featured"
  | "featuredOrder"
  | "coverImage"
  | "metrics"
  | "tags"
  | "year"
  | "duration"
  | "teamSize"
  | "role"
>;

export interface HomeData {
  profile: ProfileRecord;
  settings: SiteSettingsRecord;
  featuredProjects: ProjectSummary[];
}

