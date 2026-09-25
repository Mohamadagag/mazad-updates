"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/app/data/products";

type ProductCarouselProps = {
  products: Product[];
  initialProductId: string;
};

export function ProductCarousel({
  products,
  initialProductId,
}: ProductCarouselProps) {
  const initialIndex = products.findIndex(
    (product) => product.id === initialProductId,
  );

  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0,
  );

  const product = products[activeIndex];

  const nextProduct = () => {
    setActiveIndex((index) => (index + 1) % products.length);
  };

  const previousProduct = () => {
    setActiveIndex(
      (index) => (index - 1 + products.length) % products.length,
    );
  };

  const visibleNumber = useMemo(
    () => String(activeIndex + 1).padStart(2, "0"),
    [activeIndex],
  );


  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
      <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
        <div className="relative aspect-[4/3] bg-[#eef2f1]">
          <Image
            src={product.image}
            alt={`${product.name} product image`}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col gap-4 border-t border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-[#647079]">Product code</p>
            <p data-testid="carousel-code" className="text-xl font-semibold text-[#101316]">
              {product.code}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="previous-product"
              onClick={previousProduct}
              aria-label="Previous product"
              className="grid h-11 w-11 place-items-center rounded-md border border-black/15 bg-white text-lg font-semibold text-[#101316] transition hover:bg-[#eef2f1]"
            >
              {"<"}
            </button>
            <div
              data-testid="carousel-count"
              className="grid h-11 min-w-20 place-items-center rounded-md bg-[#101316] px-4 text-sm font-semibold text-white"
            >
              {visibleNumber}/{String(products.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              data-testid="next-product"
              onClick={nextProduct}
              aria-label="Next product"
              className="grid h-11 w-11 place-items-center rounded-md border border-black/15 bg-white text-lg font-semibold text-[#101316] transition hover:bg-[#eef2f1]"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        {/* <p className="text-sm font-semibold uppercase text-[#0f766e]">{product.category}</p> */}
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-[#101316]">{product.name}</h1>
        <p className="mt-4 text-base leading-7 text-[#59636d]">{product.description}</p>

        <dl className="mt-6 grid grid-cols-2 gap-3">
          {product.specs.map(([label, value]) => (
            <div key={label} className="rounded-md bg-[#f7f8fb] p-3">
              <dt className="text-xs text-[#76818b]">{label}</dt>
              <dd className="mt-1 text-sm font-semibold text-[#101316]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 border-t border-black/10 pt-5">
          <h2 className="text-sm font-semibold uppercase text-[#647079]">Item details</h2>
          <ul className="mt-3 space-y-3 text-sm leading-6 text-[#59636d]">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-sm"
                  style={{ backgroundColor: product.accent }}
                  aria-hidden="true"
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
