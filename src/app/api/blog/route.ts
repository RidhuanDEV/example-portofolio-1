import { NextResponse, type NextRequest } from "next/server";
import slugify from "slugify";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { blogPayloadSchema } from "@/lib/validation";
import { BlogPost } from "@/models/BlogPost";
import type { BlogPostRecord } from "@/types/domain";

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
    const payload = blogPayloadSchema.parse(bodyWithSlug);
    const post = await BlogPost.create(payload);

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
