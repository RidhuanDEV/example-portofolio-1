import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { blogPayloadSchema } from "@/lib/validation";
import { BlogPost } from "@/models/BlogPost";
import type { BlogPostRecord } from "@/types/domain";

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
    const status = searchParams.get("status") === "draft" ? "draft" : "published";
    const posts = await BlogPost.find({ status })
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean<BlogPostRecord[]>();

    return NextResponse.json({ posts });
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

    const payload = blogPayloadSchema.parse(bodyWithSlug);
    const post = await BlogPost.create(payload);

    revalidateTag("blog", "max");

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
