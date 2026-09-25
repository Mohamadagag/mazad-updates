"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/app/data/products";
import { AuctionTimer } from "@/app/components/auction-timer";

type AuctionConsoleProps = {
  products: Product[];
};

export function AuctionConsole({ products }: AuctionConsoleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSold, setIsSold] = useState(false);
  const [showSoldPopup, setShowSoldPopup] = useState(false);

  if (products.length === 0) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#f7f8fb] px-4">
        <p className="rounded-lg border border-black/10 bg-white p-8 text-center text-[#59636d]">
          There are no products in this auction yet.
        </p>
      </main>
    );
  }

  const product = products[currentIndex];

  const handleSold = () => {
    setIsSold(true);
    setShowSoldPopup(true);
  };

  const goToNextItem = () => {
    if (!isSold || currentIndex >= products.length - 1) return;
    setCurrentIndex((index) => index + 1);
    setIsSold(false);
    setShowSoldPopup(false);
  };

  return (
    <main className="bg-[#f7f8fb]">
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="relative aspect-[4/3] bg-[#eef2f1]">
            {product.image ? (
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
                priority
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-[#76818b]">
                No product image
              </div>
            )}
          </div>

          <div className="border-t border-black/10 p-5">
            <h1 className="text-3xl font-semibold leading-tight text-[#101316]">
              {product.name}
            </h1>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="mb-1 flex items-center rounded-md bg-[#f7f8fb] p-4">
                <p className="mr-4 text-3xl sm:text-5xl">Lot</p>
                <p className="text-3xl font-semibold text-[#101316] sm:text-5xl">
                  {currentIndex + 1}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#f7f8fb] p-4">
                <p className="text-2xl sm:text-4xl">Current Bid</p>
                <p className="text-3xl font-semibold text-[#101316] sm:text-5xl">
                  ${product.currentBid}
                </p>
              </div>
            </div>
          </section>

          <AuctionTimer key={product.id} onSold={handleSold} />

          <button
            type="button"
            onClick={goToNextItem}
            disabled={!isSold || currentIndex === products.length - 1}
            className="min-h-16 w-full cursor-pointer rounded-md bg-[#101316] px-4 text-2xl font-semibold text-white transition hover:bg-[#263039] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {currentIndex === products.length - 1 ? "Last Item" : "Next Item"}
          </button>
        </div>
      </section>

      {showSoldPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sold-title"
            className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-2xl"
          >
            <p id="sold-title" className="text-5xl font-black tracking-wide text-[#101316]">
              SOLD
            </p>
            <p className="mt-3 text-4xl font-semibold text-[#59636d]">
              ${product.currentBid}
            </p>
            <button
              type="button"
              onClick={() => setShowSoldPopup(false)}
              className="mt-6 min-h-12 w-full cursor-pointer rounded-md bg-[#101316] px-4 text-sm font-semibold text-white hover:bg-[#263039]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
