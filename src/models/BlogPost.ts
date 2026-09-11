import mongoose, { type Model, Schema } from "mongoose";
import { blogStatuses, type BlogPostRecord } from "@/types/domain";

const LocalizedStringSchema = new Schema(
  {
    en: { type: String, required: true },
    id: { type: String, required: true },
  },
  { _id: false },
);

const BlogPostSchema = new Schema<BlogPostRecord>(
  {
    title: { type: LocalizedStringSchema, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: LocalizedStringSchema, required: true },
    content: { type: LocalizedStringSchema, required: true },
    coverImage: String,
    tags: { type: [String], default: [] },
    status: { type: String, enum: blogStatuses, default: "draft" },
    readTimeMin: { type: Number, default: 5 },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });

let BlogPostModel: Model<BlogPostRecord>;
try {
  BlogPostModel = mongoose.model<BlogPostRecord>("BlogPost");
} catch {
  BlogPostModel = mongoose.model<BlogPostRecord>("BlogPost", BlogPostSchema);
}

export const BlogPost = BlogPostModel;

