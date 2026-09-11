import { NextResponse, type NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { blogPayloadSchema } from "@/lib/validation";
import { BlogPost } from "@/models/BlogPost";
import type { BlogPostRecord } from "@/types/domain";

interface BlogRouteContext {
  params: Promise<{ id: string }>;
}

function blogLookup(id: string): { _id: string } | { slug: string } {
  return isValidObjectId(id) ? { _id: id } : { slug: id };
}

export async function GET(_request: NextRequest, context: BlogRouteContext): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await context.params;
    const post = await BlogPost.findOne(blogLookup(id)).lean<BlogPostRecord | null>();

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(request: NextRequest, context: BlogRouteContext): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const payload = blogPayloadSchema.parse(await request.json());
    const post = await BlogPost.findOneAndUpdate(blogLookup(id), payload, {
      new: true,
      runValidators: true,
    }).lean<BlogPostRecord | null>();

    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: BlogRouteContext,
): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const deleted = await BlogPost.findOneAndDelete(blogLookup(id)).lean<BlogPostRecord | null>();

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
