import type { Metadata } from "next";
import { cache } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCarousel } from "@/app/components/product-carousel";
import { loadCatalog } from "@/app/lib/offline-snapshot";
import { siteDescription, siteName } from "@/app/lib/site";

type ItemPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// One catalog load per request is shared between generateMetadata and the page.
const loadCatalogPerRequest = cache(loadCatalog);

export async function generateMetadata({
  params,
}: ItemPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { products } = await loadCatalogPerRequest();
    const product = products.find((entry) => entry.id === id);
    if (!product) return { title: "Item not found", robots: { index: false } };

    const title = `${product.name} — Lot ${product.lot}`;
    const description =
      product.description ||
      (product.code
        ? `Product code ${product.code}. ${siteDescription}`
        : `Auction lot ${product.lot} at ${siteName}. ${siteDescription}`);

    return {
      title,
      description,
      alternates: { canonical: `/item/${product.id}` },
      openGraph: {
        title,
        description,
        url: `/item/${product.id}`,
        images: product.image ? [product.image] : undefined,
      },
      twitter: {
        title,
        description,
        images: product.image ? [product.image] : undefined,
      },
    };
  } catch {
    return { title: "Auction item", robots: { index: false } };
  }
}

export default async function ItemPage({ params }: ItemPageProps) {
  await connection();
  const { id } = await params;
  const { products } = await loadCatalogPerRequest();

  const product = products.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#f7f8fb]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#0f766e]">
              Item page
            </p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight text-[#101316]">
              {product.name}
            </h1>

            <p className="mt-2 text-sm text-[#647079]">
              {product.code}
            </p>
          </div>

          <Link
            href="/"
            className="text-sm font-medium text-[#0f766e] hover:underline"
          >
            Back to items
          </Link>
        </div>

        <ProductCarousel
          products={products}
          initialProductId={product.id}
        />
      </section>
    </main>
  );
}
