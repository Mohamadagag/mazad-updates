"use client";

import { useState } from "react";
import { ProductCard } from "@/app/components/product-card";
import type { Product } from "@/app/data/products";

type MainItemsViewProps = {
  products: Product[];
};

export function MainItemsView({ products }: MainItemsViewProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.code.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <main className="bg-[#f7f8fb]">
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-end">
          <div>
        

            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.08] text-[#101316] sm:text-5xl">
              Curated auction lots with fast browsing and clear bidding context.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#59636d]">
              Browse the main collection, inspect item codes and details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
              <p className="text-2xl font-semibold text-[#101316]">
                {filteredProducts.length}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#647079]">
                {search ? "matching items" : "auction lots"}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-10">
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-[#101316]"
          >
            Search items
          </label>

          <input
            id="product-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by item name or code..."
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[#101316] outline-none transition placeholder:text-[#8a949c] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
          />
        </div>

        {/* Products */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
            />
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-lg border border-black/10 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-[#101316]">
              No items found
            </p>
            <p className="mt-2 text-sm text-[#647079]">
              Try searching for a different item name or code.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
