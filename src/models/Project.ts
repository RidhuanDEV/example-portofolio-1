import mongoose, { type Model, Schema } from "mongoose";
import {
  adrStatuses,
  projectStatuses,
  sectionTypes,
  techCategories,
  type ProjectRecord,
} from "@/types/domain";

const LocalizedStringSchema = new Schema(
  {
    en: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false },
);

const OptionalLocalizedStringSchema = new Schema(
  {
    en: { type: String, default: "" },
    id: { type: String, default: "" },
  },
  { _id: false },
);

const TechAlternativeSchema = new Schema(
  {
    name: { type: String, required: true },
    reasonNotChosen: { type: LocalizedStringSchema, required: true },
  },
  { _id: false },
);

const TechItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: techCategories, required: true },
    version: String,
    rationale: OptionalLocalizedStringSchema,
    alternatives: { type: [TechAlternativeSchema], default: [] },
  },
  { _id: false },
);

const MetricSchema = new Schema(
  {
    label: { type: LocalizedStringSchema, required: true },
    value: { type: String, required: true },
    context: OptionalLocalizedStringSchema,
  },
  { _id: false },
);

const ADRSchema = new Schema(
  {
    number: { type: Number, required: true },
    title: { type: LocalizedStringSchema, required: true },
    status: { type: String, enum: adrStatuses, default: "accepted" },
    context: { type: LocalizedStringSchema, required: true },
    decision: { type: LocalizedStringSchema, required: true },
    consequences: OptionalLocalizedStringSchema,
    alternatives: { type: [LocalizedStringSchema], default: [] },
    date: { type: Date, default: Date.now },
  },
  { _id: true },
);

const SectionSchema = new Schema(
  {
    type: { type: String, enum: sectionTypes, required: true },
    title: { type: LocalizedStringSchema, required: true },
    content: { type: LocalizedStringSchema, required: true },
    order: { type: Number, default: 0 },
    diagram: {
      svgData: String,
      interactive: Boolean,
    },
  },
  { _id: true },
);

const ProjectSchema = new Schema<ProjectRecord>(
  {
    title: { type: LocalizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: LocalizedStringSchema, required: true },
    description: { type: LocalizedStringSchema, required: true },
    status: { type: String, enum: projectStatuses, default: "draft" },
    featured: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 99 },
    coverImage: String,
    demoUrl: String,
    repoUrl: String,
    techStack: { type: [TechItemSchema], default: [] },
    metrics: { type: [MetricSchema], default: [] },
    sections: { type: [SectionSchema], default: [] },
    adrs: { type: [ADRSchema], default: [] },
    tags: { type: [String], default: [] },
    year: Number,
    duration: OptionalLocalizedStringSchema,
    teamSize: { type: Number, default: 1 },
    role: OptionalLocalizedStringSchema,
  },
  { timestamps: true },
);

ProjectSchema.index({ status: 1, featured: -1 });
ProjectSchema.index({ tags: 1 });

let ProjectModel: Model<ProjectRecord>;
try {
  ProjectModel = mongoose.model<ProjectRecord>("Project");
} catch {
  ProjectModel = mongoose.model<ProjectRecord>("Project", ProjectSchema);
}

export const Project = ProjectModel;

