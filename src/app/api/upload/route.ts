import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin, toErrorResponse } from "@/lib/api";

const allowedTypes: readonly string[] = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function hasCloudinaryConfig(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const unauthorized = await requireAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    if (!hasCloudinaryConfig()) {
      return NextResponse.json(
        { error: "Cloudinary environment variables are not configured." },
        { status: 501 },
      );
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 5MB." }, { status: 413 });
    }
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type." }, { status: 415 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    const result: UploadApiResponse = await cloudinary.uploader.upload(base64, {
      folder: "portfolio",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    return toErrorResponse(error);
  }
}
