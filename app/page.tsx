import type { Metadata } from "next";
import { connection } from "next/server";
import { MainItemsView } from "@/app/components/main-items-view";
import { loadCatalog } from "@/app/lib/offline-snapshot";

export async function generateMetadata(): Promise<Metadata> {
  let image: string | undefined;
  try {
    const { products } = await loadCatalog();
    image = products.find((product) => product.image)?.image;
  } catch {
    // Metadata still renders without a preview image when the catalog is down.
  }

  return {
    alternates: { canonical: "/" },
    openGraph: image ? { images: [image] } : undefined,
    twitter: image ? { images: [image] } : undefined,
  };
}

export default async function Home() {
  await connection();
  const { products } = await loadCatalog();
  return <MainItemsView products={products} />;
}
