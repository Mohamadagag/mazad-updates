import "server-only";

import type { Product } from "@/app/data/products";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

export type CatalogProduct = Product & { lot: number };
export type AuctionState = { current_lot: number; status: string };

export type ProductRow = {
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

export async function getAuctionState(): Promise<AuctionState> {
  const { data, error } = await getSupabaseAdmin()
    .from("auction")
    .select("current_lot, status")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(`Could not load auction state: ${error.message}`);

  return {
    current_lot: data?.current_lot ?? 1,
    status: data?.status ?? "stopped",
  };
}

export function specsWithLot(specs: unknown, lot: number): Array<[string, string]> {
  const otherSpecs = Array.isArray(specs)
    ? specs.filter(
        (spec) =>
          Array.isArray(spec) &&
          typeof spec[0] === "string" &&
          typeof spec[1] === "string" &&
          spec[0].trim().toLowerCase() !== "lot"
      )
    : [];
  return [["Lot", String(lot)], ...otherSpecs];
}

// Renumbers the given rows consecutively starting at lot 1, keeps each row's
// Lot specification in sync, saves the rows, and returns them with their new
// lot values so callers can mirror the change (for example into the offline
// snapshot).
export async function rewriteLotOrder(rows: ProductRow[]): Promise<ProductRow[]> {
  if (rows.length === 0) return [];

  const updatedAt = new Date().toISOString();
  const orderedRows = [...rows]
    .sort((a, b) => a.lot - b.lot)
    .map((row, index) => ({
      ...row,
      lot: index + 1,
      specs: specsWithLot(row.specs, index + 1),
      updated_at: updatedAt,
    }));

  const { error } = await getSupabaseAdmin()
    .from("products")
    .upsert(orderedRows, { onConflict: "id" });

  if (error) throw error;
  return orderedRows;
}
