import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/app/data/products";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      href={`/item/${product.id}`}
      className="group flex min-h-[430px] flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
    >
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-md bg-[#eef2f1]">
        <Image
          src={product.image}
          alt={`${product.name} product image`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain transition duration-500 group-hover:scale-105"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-[#647079]">
              {product.code}
            </p>

            <h2 className="mt-1 text-lg font-semibold leading-6 text-[#101316]">
              {product.name}
            </h2>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-[#59636d]">
          {product.description}
        </p>

        {/* <div className="mt-auto grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-sm">
          <div>
            <p className="text-xs text-[#76818b]">Current bid</p>
            <p className="font-semibold text-[#101316]">
              {product.currentBid}
            </p>
          </div>
        </div> */}
      </div>
    </Link>
  );
}
