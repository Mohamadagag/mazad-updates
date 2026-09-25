import "server-only";

import type { Product } from "@/app/data/products";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

export type CatalogProduct = Product & { lot: number };

type ProductRow = {
  id: string;
  lot: number;
  name: string;
  code: string | null;
  current_bid: number | string;
  image: string | null;
  accent: string | null;
  description: string | null;
  details: unknown;
  specs: unknown;
};

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function productSpecs(value: unknown, lot: number): Array<[string, string]> {
  const specs = Array.isArray(value)
    ? value.flatMap((item): Array<[string, string]> => {
        if (
          !Array.isArray(item) ||
          typeof item[0] !== "string" ||
          typeof item[1] !== "string" ||
          item[0].trim().toLowerCase() === "lot"
        ) {
          return [];
        }

        return [[item[0], item[1]]];
      })
    : [];

  return [["Lot", String(lot)], ...specs];
}

export function mapProductRow(row: ProductRow): CatalogProduct {
  return {
    id: row.id,
    lot: row.lot,
    name: row.name,
    code: row.code ?? "",
    currentBid: String(row.current_bid ?? 0),
    image: row.image ?? "",
    accent: row.accent ?? "#0f766e",
    description: row.description ?? "",
    details: stringList(row.details),
    specs: productSpecs(row.specs, row.lot),
  };
}

export async function getProducts() {
  const { data, error } = await getSupabaseAdmin()
    .from("products")
    .select("id, lot, name, code, current_bid, image, accent, description, details, specs")
    .order("lot", { ascending: true });

  if (error) throw new Error(`Could not load products: ${error.message}`);

  return (data as ProductRow[]).map(mapProductRow);
}
