import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";
import { mapProductRow } from "@/app/lib/products";

type ProductInput = {
  name: string;
  code: string | null;
  current_bid: number;
  image: string | null;
  accent: string | null;
  description: string | null;
  details: string[];
  specs: Array<[string, string]>;
};

type ProductRow = ProductInput & {
  id: string;
  lot: number;
  created_at: string | null;
  updated_at: string | null;
};

type StoredProductRow = ProductRow & {
  details: unknown;
  specs: unknown;
};

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

function nullableText(value: unknown) {
  if (typeof value !== "string") return null;
  return value.trim() || null;
}

function parseProductInput(value: unknown): ProductInput | null {
  if (!value || typeof value !== "object") return null;

  const body = value as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const currentBid = Number(body.current_bid);
  if (!name || !Number.isFinite(currentBid) || currentBid < 0) return null;

  const details = Array.isArray(body.details)
    ? body.details
        .filter((detail): detail is string => typeof detail === "string")
        .map((detail) => detail.trim())
        .filter(Boolean)
    : [];
  const specs = Array.isArray(body.specs)
    ? body.specs.flatMap((spec): Array<[string, string]> => {
        if (
          !Array.isArray(spec) ||
          typeof spec[0] !== "string" ||
          typeof spec[1] !== "string"
        ) {
          return [];
        }

        const label = spec[0].trim();
        const specValue = spec[1].trim();
        return label && specValue && label.toLowerCase() !== "lot"
          ? [[label, specValue]]
          : [];
      })
    : [];

  return {
    name,
    code: nullableText(body.code),
    current_bid: currentBid,
    image: nullableText(body.image),
    accent: nullableText(body.accent),
    description: nullableText(body.description),
    details,
    specs,
  };
}

function slugify(value: string) {
  return (
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "product"
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .select("*")
      .order("lot", { ascending: true });

    if (error) throw error;

    return NextResponse.json((data ?? []).map((row) => mapProductRow(row as never)));
  } catch (error) {
    console.error("Could not load admin products:", error);
    return NextResponse.json({ error: "Could not load products." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let input: ProductInput | null;
  try {
    input = parseProductInput(await request.json());
  } catch {
    input = null;
  }

  if (!input) {
    return NextResponse.json({ error: "Enter a name and a valid non-negative bid." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: existing, error: listError } = await supabase
      .from("products")
      .select("lot")
      .order("lot", { ascending: true });

    if (listError) throw listError;

    const lot = Math.max(0, ...(existing ?? []).map((product) => product.lot)) + 1;
    const id = `${slugify(input.name)}-${randomUUID().slice(0, 8)}`;
    const { data, error } = await supabase
      .from("products")
      .insert({
        ...input,
        id,
        lot,
        accent: input.accent ?? "#0f766e",
        specs: [["Lot", String(lot)], ...input.specs],
      })
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json(mapProductRow(data as never), { status: 201 });
  } catch (error) {
    console.error("Could not add product:", error);
    return NextResponse.json({ error: "Could not add product." }, { status: 500 });
  }
}

function specsWithLot(specs: unknown, lot: number) {
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

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let orderedIds: unknown;
  try {
    orderedIds = (await request.json()).orderedIds;
  } catch {
    return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  }

  if (
    !Array.isArray(orderedIds) ||
    !orderedIds.every((id) => typeof id === "string") ||
    new Set(orderedIds).size !== orderedIds.length
  ) {
    return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;

    const rows = (data ?? []) as StoredProductRow[];
    if (
      rows.length !== orderedIds.length ||
      !rows.every((row) => orderedIds.includes(row.id))
    ) {
      return NextResponse.json(
        { error: "The product list changed. Refresh and try again." },
        { status: 409 }
      );
    }

    const rowsById = new Map(rows.map((row) => [row.id, row]));
    const updatedAt = new Date().toISOString();
    const updates = (orderedIds as string[]).map((id, index) => {
      const row = rowsById.get(id)!;
      const lot = index + 1;
      return {
        ...row,
        lot,
        specs: specsWithLot(row.specs, lot),
        updated_at: updatedAt,
      };
    });

    const { error: updateError } = await supabase
      .from("products")
      .upsert(updates, { onConflict: "id" });

    if (updateError) throw updateError;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not reorder products:", error);
    return NextResponse.json({ error: "Could not save the new order." }, { status: 500 });
  }
}

export type { ProductRow };
