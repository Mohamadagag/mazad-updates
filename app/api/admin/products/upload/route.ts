import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

const imageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};
const maxImageSize = 8 * 1024 * 1024;

function hasPublishableCredential() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key) return false;
  if (
    key === process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    key.startsWith("sb_publishable_")
  ) {
    return true;
  }

  try {
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString());
    return payload.role === "anon";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }

  if (!file || typeof file === "string" || !(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }

  const extension = imageExtensions[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Use a JPG, PNG, WEBP, or GIF image." },
      { status: 400 }
    );
  }

  if (file.size <= 0 || file.size > maxImageSize) {
    return NextResponse.json(
      { error: "Image files must be smaller than 8 MB." },
      { status: 400 }
    );
  }

  if (hasPublishableCredential()) {
    return NextResponse.json(
      {
        error:
          "SUPABASE_SECRET_KEY is set to the public publishable/anon key. Set it to this project’s server-side secret key (or legacy service_role key) to upload to Storage.",
      },
      { status: 500 }
    );
  }

  const bucket = process.env.SUPABASE_PRODUCT_BUCKET || "mazad-bucket";
  const objectPath = `items/${randomUUID()}.${extension}`;

  try {
    const supabase = getSupabaseAdmin();
    const { data: bucketInfo, error: bucketError } = await supabase.storage.getBucket(bucket);
    if (bucketError?.statusCode === "404") {
      return NextResponse.json(
        {
          error: `Storage bucket “${bucket}” was not found in the Supabase project configured for this app. Check the project URL or create the bucket in that project.`,
        },
        { status: 404 }
      );
    }
    if (bucketError) throw bucketError;
    if (!bucketInfo.public) {
      return NextResponse.json(
        { error: `The “${bucket}” Storage bucket must be public so auction images can be viewed.` },
        { status: 400 }
      );
    }

    const storage = supabase.storage.from(bucket);
    const { error } = await storage.upload(objectPath, file, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });

    if (error) throw error;

    const { data } = storage.getPublicUrl(objectPath);
    return NextResponse.json({ url: data.publicUrl, path: objectPath });
  } catch (error) {
    console.error("Could not upload product image:", error);
    return NextResponse.json(
      {
        error: `Image upload failed: ${error instanceof Error ? error.message : "Supabase Storage request failed."}`,
      },
      { status: 500 }
    );
  }
}
