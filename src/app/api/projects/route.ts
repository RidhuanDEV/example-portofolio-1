import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { projectPayloadSchema } from "@/lib/validation";
import { Project } from "@/models/Project";
import type { ProjectRecord } from "@/types/domain";

function extractSlugSource(rawBody: unknown): string {
  if (typeof rawBody !== "object" || rawBody === null || !("title" in rawBody)) {
    return "";
  }
  const rawTitle = rawBody.title;
  if (typeof rawTitle === "string") {
    return rawTitle;
  }
  if (typeof rawTitle === "object" && rawTitle !== null) {
    if ("en" in rawTitle && typeof rawTitle.en === "string" && rawTitle.en.trim()) {
      return rawTitle.en;
    }
    if ("id" in rawTitle && typeof rawTitle.id === "string" && rawTitle.id.trim()) {
      return rawTitle.id;
    }
  }
  return "";
}

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
    const rawBody: unknown = await request.json();
    const hasExplicitSlug =
      typeof rawBody === "object" &&
      rawBody !== null &&
      "slug" in rawBody &&
      typeof rawBody.slug === "string" &&
      rawBody.slug.trim().length > 0;

    const bodyWithSlug =
      typeof rawBody === "object" && rawBody !== null && !hasExplicitSlug
        ? {
            ...rawBody,
            slug: slugify(extractSlugSource(rawBody), { lower: true, strict: true }),
          }
        : rawBody;

    const payload = projectPayloadSchema.parse(bodyWithSlug);
    const project = await Project.create(payload);

    revalidateTag("projects", "max");
    revalidateTag("home", "max");

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
