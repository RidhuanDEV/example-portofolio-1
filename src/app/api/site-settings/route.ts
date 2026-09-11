import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { siteSettingsPayloadSchema } from "@/lib/validation";
import { SiteSettings } from "@/models/SiteSettings";
import type { SiteSettingsRecord } from "@/types/domain";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean<SiteSettingsRecord | null>();
    return NextResponse.json({ settings });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const payload = siteSettingsPayloadSchema.parse(await request.json());
    const settings = await SiteSettings.findOneAndUpdate({}, payload, {
      new: true,
      runValidators: true,
      upsert: true,
    }).lean<SiteSettingsRecord | null>();

    return NextResponse.json({ settings });
  } catch (error) {
    return toErrorResponse(error);
  }
}
