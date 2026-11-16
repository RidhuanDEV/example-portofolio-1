import mongoose, { type Model, Schema } from "mongoose";
import type { ContactMessageRecord } from "@/types/domain";

const ContactMessageSchema = new Schema<ContactMessageRecord>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
  },
  { timestamps: true },
);

ContactMessageSchema.index({ createdAt: -1 });

let ContactMessageModel: Model<ContactMessageRecord>;
try {
  ContactMessageModel = mongoose.model<ContactMessageRecord>("ContactMessage");
} catch {
  ContactMessageModel = mongoose.model<ContactMessageRecord>("ContactMessage", ContactMessageSchema);
}

export const ContactMessage = ContactMessageModel;
