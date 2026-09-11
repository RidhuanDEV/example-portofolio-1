import mongoose, { type Model, Schema } from "mongoose";
import type { SiteSettingsRecord } from "@/types/domain";

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

const MetricSchema = new Schema(
  {
    label: { type: LocalizedStringSchema, required: true },
    value: { type: String, required: true },
    context: OptionalLocalizedStringSchema,
  },
  { _id: false },
);

const SiteSettingsSchema = new Schema<SiteSettingsRecord>(
  {
    siteTitle: { type: LocalizedStringSchema, required: true },
    siteDescription: OptionalLocalizedStringSchema,
    ogImage: String,
    analyticsId: String,
    maintenanceMode: { type: Boolean, default: false },
    heroHeadline: OptionalLocalizedStringSchema,
    heroSubheadline: OptionalLocalizedStringSchema,
    ctaText: {
      primary: { type: LocalizedStringSchema, required: true },
      secondary: { type: LocalizedStringSchema, required: true },
    },
    featuredMetrics: { type: [MetricSchema], default: [] },
  },
  { timestamps: true },
);

let SiteSettingsModel: Model<SiteSettingsRecord>;
try {
  SiteSettingsModel = mongoose.model<SiteSettingsRecord>("SiteSettings");
} catch {
  SiteSettingsModel = mongoose.model<SiteSettingsRecord>("SiteSettings", SiteSettingsSchema);
}

export const SiteSettings = SiteSettingsModel;

