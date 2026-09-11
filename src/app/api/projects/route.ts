import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { projectPayloadSchema } from "@/lib/validation";
import { Project } from "@/models/Project";
import type { ProjectRecord } from "@/types/domain";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const tag = searchParams.get("tag");
    const status = searchParams.get("status") ?? "published";
    const filter: Partial<Pick<ProjectRecord, "status" | "featured">> & { tags?: string } = {
      status: status === "draft" || status === "archived" ? status : "published",
    };

    if (featured === "true") {
      filter.featured = true;
    }
    if (tag) {
      filter.tags = tag;
    }

    const projects = await Project.find(filter)
      .sort({ featuredOrder: 1, createdAt: -1 })
      .lean<ProjectRecord[]>();

    return NextResponse.json({ projects });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const rawBody = await request.json();
    const bodyWithSlug =
      typeof rawBody === "object" &&
      rawBody !== null &&
      "title" in rawBody &&
      !("slug" in rawBody)
        ? {
            ...rawBody,
            slug: slugify(String(rawBody.title), { lower: true, strict: true }),
          }
        : rawBody;
    const payload = projectPayloadSchema.parse(bodyWithSlug);
    const project = await Project.create(payload);

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
