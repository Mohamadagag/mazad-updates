import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

function getProductImagePath(image: string | null, bucket: string) {
  if (!image) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;

  try {
    const configuredUrl = new URL(supabaseUrl);
    const imageUrl = new URL(image);
    if (imageUrl.origin !== configuredUrl.origin) return null;

    const decodedPath = decodeURIComponent(imageUrl.pathname);
    const bucketPrefix = `/storage/v1/object/public/${bucket}/`;
    if (!decodedPath.startsWith(bucketPrefix)) return null;

    const objectPath = decodedPath.slice(bucketPrefix.length);
    if (
      !objectPath ||
      objectPath.split("/").some((segment) => !segment || segment === "." || segment === "..")
    ) {
      return null;
    }

    return objectPath;
  } catch {
    return null;
  }
}

export async function removeProductImages(
  supabase: SupabaseClient,
  images: Array<string | null>
) {
  const bucket = process.env.SUPABASE_PRODUCT_BUCKET || "mazad-bucket";
  const paths = [...new Set(images.map((image) => getProductImagePath(image, bucket)).filter(
    (path): path is string => path !== null
  ))];

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
}
