import { NextResponse, type NextRequest } from "next/server";
import { isValidObjectId } from "mongoose";
import { requireAdmin, toErrorResponse } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { projectPayloadSchema } from "@/lib/validation";
import { Project } from "@/models/Project";
import type { ProjectRecord } from "@/types/domain";

interface ProjectRouteContext {
  params: Promise<{ id: string }>;
}

function projectLookup(id: string): { _id: string } | { slug: string } {
  return isValidObjectId(id) ? { _id: id } : { slug: id };
}

export async function GET(
  _request: NextRequest,
  context: ProjectRouteContext,
): Promise<NextResponse> {
  try {
    await connectDB();
    const { id } = await context.params;
    const project = await Project.findOne(projectLookup(id)).lean<ProjectRecord | null>();

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function PUT(
  request: NextRequest,
  context: ProjectRouteContext,
): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const payload = projectPayloadSchema.parse(await request.json());
    const project = await Project.findOneAndUpdate(projectLookup(id), payload, {
      new: true,
      runValidators: true,
    }).lean<ProjectRecord | null>();

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  context: ProjectRouteContext,
): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    await connectDB();
    const { id } = await context.params;
    const deleted = await Project.findOneAndDelete(projectLookup(id)).lean<ProjectRecord | null>();

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
