"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/app/lib/products";
import { canOptimizeProductImage } from "@/app/lib/product-image";
import { supabase } from "@/app/lib/supabase";

type AuctionConsoleProps = {
  products: CatalogProduct[];
  initialCurrentLot: number;
  initialAuctionStatus: string;
};

export function AuctionConsole({
  products,
  initialCurrentLot,
  initialAuctionStatus,
}: AuctionConsoleProps) {
  const [liveProducts, setLiveProducts] = useState(products);
  const initialIndex = Math.max(
    0,
    products.findIndex((product) => product.lot === initialCurrentLot)
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showSoldPopup, setShowSoldPopup] = useState(initialAuctionStatus === "sold");

  useEffect(() => {
    const channel = supabase
      .channel("mazad-live-product-bids")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "products" },
        (payload) => {
          const updated = payload.new as {
            id?: string;
            lot?: number;
            current_bid?: number | string;
            name?: string;
            image?: string | null;
          };

          if (typeof updated.id !== "string") return;

          setLiveProducts((currentProducts) => {
            const index = currentProducts.findIndex((product) => product.id === updated.id);
            if (index < 0) return currentProducts;

            const existing = currentProducts[index];
            const product = {
              ...existing,
              lot: typeof updated.lot === "number" ? updated.lot : existing.lot,
              currentBid:
                updated.current_bid == null
                  ? existing.currentBid
                  : String(updated.current_bid),
              name: updated.name ?? existing.name,
              image: updated.image ?? existing.image,
            };
            const next = [...currentProducts];
            next[index] = product;

            return product.lot === existing.lot
              ? next
              : next.sort((a, b) => a.lot - b.lot);
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "auction", filter: "id=eq.1" },
        (payload) => {
          const updated = payload.new as { current_lot?: number; status?: string };
          if (typeof updated.current_lot !== "number" || !Number.isInteger(updated.current_lot)) return;
          setCurrentIndex(Math.max(0, updated.current_lot - 1));
          setShowSoldPopup(updated.status === "sold");
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
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
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] lg:px-8 lg:py-14">
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

          {/* <div className="border-t border-black/10 p-5">
            <h1 className="text-3xl font-semibold leading-tight text-[#101316]">
              {product.name}
            </h1>
          </div> */}
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
