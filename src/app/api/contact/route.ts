import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { contactPayloadSchema } from "@/lib/validation";
import { ContactMessage } from "@/models/ContactMessage";
import type { ContactMessageRecord } from "@/types/domain";

export async function GET(): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    if (!hasMongoUri()) {
      return NextResponse.json({ messages: [] });
    }
    await connectDB();
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean<ContactMessageRecord[]>();
    return NextResponse.json({ messages });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = contactPayloadSchema.parse(await request.json());
    let persisted = false;

    if (hasMongoUri()) {
      try {
        await connectDB();
        await ContactMessage.create({
          ...payload,
          status: "unread",
        });
        persisted = true;
      } catch (dbErr) {
        console.warn("Unable to persist contact message to MongoDB:", dbErr);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        persisted,
        message: "Message received.",
        contact: payload,
      },
      { status: 201 },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
