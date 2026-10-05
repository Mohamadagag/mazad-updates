"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CatalogProduct } from "@/app/lib/products";
import { canOptimizeProductImage } from "@/app/lib/product-image";

type AuctionConsoleProps = {
  products: CatalogProduct[];
  initialCurrentLot: number;
};

export function AuctionConsole({ products, initialCurrentLot }: AuctionConsoleProps) {
  const [liveProducts, setLiveProducts] = useState(products);
  const initialIndex = Math.max(
    0,
    products.findIndex((product) => product.lot === initialCurrentLot)
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  // The SOLD popup is shown only in response to a live "auction" event — that
  // is, when the admin clicks SOLD — never on page load, even if the last lot
  // was left in the sold state.
  const [showSoldPopup, setShowSoldPopup] = useState(false);
  // Newest bid timestamp per product, used to drop out-of-order SSE events so
  // a slower older request can never overwrite a newer amount on the display.
  const lastBidAtRef = useRef(new Map<string, number>());

  useEffect(() => {
    const source = new EventSource("/api/auction/stream");

    source.onmessage = (message) => {
      let event: unknown;
      try {
        event = JSON.parse(message.data);
      } catch {
        return;
      }

      if (
        event &&
        typeof event === "object" &&
        "kind" in event &&
        event.kind === "bid" &&
        "id" in event &&
        typeof event.id === "string"
      ) {
        const updated = event as {
          id: string;
          lot?: number;
          currentBid?: string;
          at?: number;
        };

        const at = typeof updated.at === "number" ? updated.at : 0;
        const lastAt = lastBidAtRef.current.get(updated.id) ?? 0;
        if (at && at <= lastAt) return;
        if (at) lastBidAtRef.current.set(updated.id, at);

        setLiveProducts((currentProducts) => {
          const index = currentProducts.findIndex((product) => product.id === updated.id);
          if (index < 0) return currentProducts;

          const existing = currentProducts[index];
          const product = {
            ...existing,
            lot: typeof updated.lot === "number" ? updated.lot : existing.lot,
            currentBid:
              updated.currentBid == null ? existing.currentBid : String(updated.currentBid),
          };
          const next = [...currentProducts];
          next[index] = product;

          return product.lot === existing.lot
            ? next
            : next.sort((a, b) => a.lot - b.lot);
        });
      }

      if (event && typeof event === "object" && "kind" in event && event.kind === "auction") {
        const updated = event as { currentLot?: number; status?: string };
        if (typeof updated.currentLot !== "number" || !Number.isInteger(updated.currentLot)) return;
        setCurrentIndex(Math.max(0, updated.currentLot - 1));
        setShowSoldPopup(updated.status === "sold");
      }
    };

    return () => {
      source.close();
    };
  }, []);

  useEffect(() => {
    if (!showSoldPopup) return;

    const timeout = window.setTimeout(() => setShowSoldPopup(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [showSoldPopup]);

  if (liveProducts.length === 0) {
    return (
      <main className="grid min-h-[60vh] place-items-center bg-[#f7f8fb] px-4">
        <p className="rounded-lg border border-black/10 bg-white p-8 text-center text-[#59636d]">
          There are no products in this auction yet.
        </p>
      </main>
    );
  }

  const product = liveProducts[currentIndex];

  return (
    <main className="bg-[#f7f8fb]">
      <section className="mx-auto grid w-full max-w-[90rem] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="relative aspect-[4/3] bg-[#eef2f1]">
            {product.image ? (
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                fill
                unoptimized={!canOptimizeProductImage(product.image)}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
                preload
              />
            ) : (
              <div className="grid h-full place-items-center text-sm text-[#76818b]">
                No product image
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="mb-1 flex items-center rounded-md bg-[#f7f8fb] p-4">
                <p className="mr-4 text-3xl sm:text-5xl">Lot</p>
                <p className="text-3xl font-semibold text-[#101316] sm:text-5xl">
                  {product.lot}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#f7f8fb] p-4">
                <p className="text-2xl sm:text-4xl">Product Name</p>
                <p className="break-all text-right text-xl font-semibold text-[#101316] sm:text-3xl">
                  {product.name || "—"}
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
          </div>
        </div>
      )}
    </main>
  );
}
