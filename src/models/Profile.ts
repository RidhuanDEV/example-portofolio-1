import mongoose, { type Model, Schema } from "mongoose";
import { skillCategories, type ProfileRecord } from "@/types/domain";

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

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: skillCategories, required: true },
    level: { type: Number, min: 1, max: 5, required: true },
    yearsExp: Number,
  },
  { _id: false },
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: LocalizedStringSchema, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    highlights: { type: [LocalizedStringSchema], default: [] },
    techUsed: { type: [String], default: [] },
  },
  { _id: true },
);

const ProfileSchema = new Schema<ProfileRecord>(
  {
    name: { type: String, required: true },
    title: { type: LocalizedStringSchema, required: true },
    bio: { type: LocalizedStringSchema, required: true },
    philosophy: OptionalLocalizedStringSchema,
    avatar: String,
    location: OptionalLocalizedStringSchema,
    email: String,
    resumeUrl: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      website: String,
    },
    skills: { type: [SkillSchema], default: [] },
    experiences: { type: [ExperienceSchema], default: [] },
    currentFocus: { type: [LocalizedStringSchema], default: [] },
  },
  { timestamps: true },
);

let ProfileModel: Model<ProfileRecord>;
try {
  ProfileModel = mongoose.model<ProfileRecord>("Profile");
} catch {
  ProfileModel = mongoose.model<ProfileRecord>("Profile", ProfileSchema);
}

export const Profile = ProfileModel;

