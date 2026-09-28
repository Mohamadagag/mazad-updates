export function canOptimizeProductImage(image: string) {
  if (image.startsWith("/") && !image.startsWith("//")) return true;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return false;

  try {
    const imageUrl = new URL(image);
    const storageUrl = new URL(supabaseUrl);
    return (
      imageUrl.origin === storageUrl.origin &&
      imageUrl.pathname.startsWith("/storage/v1/object/public/")
    );
  } catch {
    return false;
  }
}
