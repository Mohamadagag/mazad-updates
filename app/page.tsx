import type { Metadata } from "next";
import { connection } from "next/server";
import { MainItemsView } from "@/app/components/main-items-view";
import { loadCatalog } from "@/app/lib/offline-snapshot";
import { getSiteUrl, siteName, siteNameArabic } from "@/app/lib/site";

// Default social preview used when the catalog has no product image (or is
// unavailable) so link previews never render without a branded image.
const defaultSocialImage = "/og-default.png";

export async function generateMetadata(): Promise<Metadata> {
  let image: string | undefined;
  try {
    const { products } = await loadCatalog();
    image = products.find((product) => product.image)?.image;
  } catch {
    // Metadata still renders without a preview image when the catalog is down.
  }

  const socialImage = image ?? defaultSocialImage;

  return {
    alternates: { canonical: "/" },
    openGraph: { images: [socialImage] },
    twitter: { images: [socialImage] },
  };
}

// ItemList of the first lots so Google connects the brand with the auction
// catalog and can show richer results for it.
function buildItemListJsonLd(
  products: Awaited<ReturnType<typeof loadCatalog>>["products"]
) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Auction lots at ${siteName} (${siteNameArabic})`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${product.name} — Lot ${product.lot}`,
      url: `${siteUrl}/item/${encodeURIComponent(product.id)}`,
    })),
  };
}

export default async function Home() {
  await connection();
  const { products } = await loadCatalog();
  return (
    <>
      <MainItemsView products={products} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildItemListJsonLd(products)),
        }}
      />
    </>
  );
}
