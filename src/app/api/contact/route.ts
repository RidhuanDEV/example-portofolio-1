import { NextResponse, type NextRequest } from "next/server";
import { toErrorResponse } from "@/lib/api";
import { contactPayloadSchema } from "@/lib/validation";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const payload = contactPayloadSchema.parse(await request.json());

    return NextResponse.json({
      ok: true,
      message:
        "Message accepted. Wire this endpoint to email, Slack, or a CRM when production delivery is configured.",
      contact: payload,
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
