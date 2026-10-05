import type { MetadataRoute } from "next";
import { loadCatalog } from "@/app/lib/offline-snapshot";
import { getSiteUrl } from "@/app/lib/site";

// Regenerated on request so the sitemap always reflects the current catalog.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/rules`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const { products } = await loadCatalog();
    for (const product of products) {
      entries.push({
        url: `${base}/item/${encodeURIComponent(product.id)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        ...(product.image
          ? { images: [new URL(product.image, base).toString()] }
          : {}),
      });
    }
  } catch {
    // Catalog unavailable (for example no database and no snapshot): the
    // static pages above are still listed.
  }

  return entries;
}
