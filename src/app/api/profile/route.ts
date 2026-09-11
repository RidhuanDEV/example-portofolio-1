import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { profilePayloadSchema } from "@/lib/validation";
import { Profile } from "@/models/Profile";
import type { ProfileRecord } from "@/types/domain";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const profile = await Profile.findOne().lean<ProfileRecord | null>();
    return NextResponse.json({ profile });
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
    const payload = profilePayloadSchema.parse(await request.json());
    const profile = await Profile.findOneAndUpdate({}, payload, {
      new: true,
      runValidators: true,
      upsert: true,
    }).lean<ProfileRecord | null>();

    return NextResponse.json({ profile });
  } catch (error) {
    return toErrorResponse(error);
  }
}
