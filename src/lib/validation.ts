import { z } from "zod";
import {
  adrStatuses,
  blogStatuses,
  projectStatuses,
  sectionTypes,
  skillCategories,
  techCategories,
} from "@/types/domain";

const optionalUrl = z
  .union([z.url(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value));

// Localized String Schema
export const localizedStringSchema = z.object({
  en: z.string().min(1, "English field is required"),
  id: z.string().min(1, "Indonesian field is required"),
});

// Optional Localized String Schema (for fields that can be empty or optional)
export const optionalLocalizedStringSchema = z.object({
  en: z.string().default(""),
  id: z.string().default(""),
}).optional();

export const metricSchema = z.object({
  label: localizedStringSchema,
  value: z.string().min(1),
  context: optionalLocalizedStringSchema,
});

export const projectPayloadSchema = z.object({
  title: localizedStringSchema,
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  tagline: localizedStringSchema,
  description: localizedStringSchema,
  status: z.enum(projectStatuses),
  featured: z.boolean(),
  featuredOrder: z.number().int().min(0).default(99),
  coverImage: optionalUrl,
  demoUrl: optionalUrl,
  repoUrl: optionalUrl,
  tags: z.array(z.string().min(1)),
  year: z.number().int().min(2015).max(2035).optional(),
  duration: optionalLocalizedStringSchema,
  teamSize: z.number().int().min(1).max(100).default(1),
  role: optionalLocalizedStringSchema,
  techStack: z
    .array(
      z.object({
        name: z.string().min(1),
        category: z.enum(techCategories),
        version: z.string().optional(),
        rationale: optionalLocalizedStringSchema,
        alternatives: z
          .array(
            z.object({
              name: z.string().min(1),
              reasonNotChosen: localizedStringSchema,
            }),
          )
          .default([]),
      }),
    )
    .default([]),
  metrics: z.array(metricSchema).default([]),
  sections: z
    .array(
      z.object({
        type: z.enum(sectionTypes),
        title: localizedStringSchema,
        content: localizedStringSchema,
        order: z.number().int().min(0),
        diagram: z
          .object({
            svgData: z.string().optional(),
            interactive: z.boolean().optional(),
          })
          .optional(),
      }),
    )
    .default([]),
  adrs: z
    .array(
      z.object({
        number: z.number().int().min(1),
        title: localizedStringSchema,
        status: z.enum(adrStatuses),
        context: localizedStringSchema,
        decision: localizedStringSchema,
        consequences: optionalLocalizedStringSchema,
        alternatives: z.array(localizedStringSchema).default([]),
        date: z.coerce.date().optional(),
      }),
    )
    .default([]),
});

export type ProjectPayload = z.infer<typeof projectPayloadSchema>;

export const blogPayloadSchema = z.object({
  title: localizedStringSchema,
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: localizedStringSchema,
  content: localizedStringSchema,
  coverImage: optionalUrl,
  tags: z.array(z.string().min(1)),
  status: z.enum(blogStatuses),
  readTimeMin: z.number().int().min(1).max(120),
  publishedAt: z.coerce.date().nullable().optional(),
});

export type BlogPayload = z.infer<typeof blogPayloadSchema>;

export const profilePayloadSchema = z.object({
  name: z.string().min(1),
  title: localizedStringSchema,
  bio: localizedStringSchema,
  philosophy: optionalLocalizedStringSchema,
  avatar: optionalUrl,
  location: optionalLocalizedStringSchema,
  email: z.email().optional(),
  resumeUrl: z.string().optional(),
  socialLinks: z.object({
    github: optionalUrl,
    linkedin: optionalUrl,
    twitter: optionalUrl,
    website: optionalUrl,
  }),
  currentFocus: z.array(localizedStringSchema).default([]),
  skills: z
    .array(
      z.object({
        name: z.string().min(1),
        category: z.enum(skillCategories),
        level: z.number().int().min(1).max(5),
        yearsExp: z.number().min(0).optional(),
      }),
    )
    .default([]),
  experiences: z
    .array(
      z.object({
        company: z.string().min(1),
        role: localizedStringSchema,
        startDate: z.string().min(4),
        endDate: z.string().nullable().optional(),
        highlights: z.array(localizedStringSchema).default([]),
        techUsed: z.array(z.string()).default([]),
      }),
    )
    .default([]),
});

export type ProfilePayload = z.infer<typeof profilePayloadSchema>;

export const siteSettingsPayloadSchema = z.object({
  siteTitle: localizedStringSchema,
  siteDescription: optionalLocalizedStringSchema,
  ogImage: optionalUrl,
  analyticsId: z.string().optional(),
  maintenanceMode: z.boolean(),
  heroHeadline: optionalLocalizedStringSchema,
  heroSubheadline: optionalLocalizedStringSchema,
  ctaText: z.object({
    primary: localizedStringSchema,
    secondary: localizedStringSchema,
  }),
  featuredMetrics: z.array(metricSchema).default([]),
});

export type SiteSettingsPayload = z.infer<typeof siteSettingsPayloadSchema>;

export const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(10).max(4000),
});
