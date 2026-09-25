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

type ProductRow = Omit<ProductInput, "details" | "specs"> & {
  id: string;
  lot: number;
  details: unknown;
  specs: unknown;
  created_at: string | null;
  updated_at: string | null;
};

function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
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
    code: typeof body.code === "string" ? body.code.trim() || null : null,
    current_bid: currentBid,
    image: typeof body.image === "string" ? body.image.trim() || null : null,
    accent: typeof body.accent === "string" ? body.accent.trim() || null : null,
    description:
      typeof body.description === "string" ? body.description.trim() || null : null,
    details,
    specs,
  };
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = null;
  }

  const input = parseProductInput(body);
  const requestedLot =
    body && typeof body === "object"
      ? Number((body as Record<string, unknown>).lot)
      : Number.NaN;

  if (!input || !Number.isInteger(requestedLot) || requestedLot < 1) {
    return NextResponse.json(
      { error: "Enter a name, a valid bid, and a positive whole-number lot." },
      { status: 400 }
    );
  }

  try {
    const { id } = await context.params;
    const supabase = getSupabaseAdmin();
    const { data, error: readError } = await supabase
      .from("products")
      .select("*")
      .order("lot", { ascending: true });

    if (readError) throw readError;
    const rows = (data ?? []) as ProductRow[];
    const currentIndex = rows.findIndex((row) => row.id === id);
    if (currentIndex < 0) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }
    if (requestedLot > rows.length) {
      return NextResponse.json(
        { error: `Lot number must be between 1 and ${rows.length}.` },
        { status: 400 }
      );
    }

    if (requestedLot === rows[currentIndex].lot) {
      const { data: updated, error: updateError } = await supabase
        .from("products")
        .update({
          ...input,
          specs: specsWithLot(input.specs, requestedLot),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*")
        .single();

      if (updateError) throw updateError;
      return NextResponse.json(mapProductRow(updated as never));
    }

    const [editedProduct] = rows.splice(currentIndex, 1);
    rows.splice(requestedLot - 1, 0, editedProduct);

    const updatedAt = new Date().toISOString();
    const updates = rows.map((row, index) => {
      const lot = index + 1;
      const isEditedProduct = row.id === id;
      return {
        ...row,
        ...(isEditedProduct ? input : {}),
        lot,
        specs: specsWithLot(isEditedProduct ? input.specs : row.specs, lot),
        updated_at: updatedAt,
      };
    });

    const { error: updateError } = await supabase
      .from("products")
      .upsert(updates, { onConflict: "id" });

    if (updateError) throw updateError;
    const updatedProduct = updates.find((row) => row.id === id);
    return NextResponse.json(mapProductRow(updatedProduct as never));
  } catch (error) {
    console.error("Could not update product:", error);
    return NextResponse.json({ error: "Could not update product." }, { status: 500 });
  }
}

async function rewriteLotOrder(rows: ProductRow[]) {
  if (rows.length === 0) return;

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
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const supabase = getSupabaseAdmin();
    const { data: deleted, error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select("id");

    if (deleteError) throw deleteError;
    if (!deleted?.length) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    const { data: remaining, error: listError } = await supabase
      .from("products")
      .select("*")
      .order("lot", { ascending: true });
    if (listError) throw listError;

    await rewriteLotOrder((remaining ?? []) as ProductRow[]);

    const { data: auction, error: auctionReadError } = await supabase
      .from("auction")
      .select("current_lot")
      .eq("id", 1)
      .maybeSingle();
    if (auctionReadError) throw auctionReadError;

    if (auction) {
      const lastLot = remaining?.length ?? 0;
      const currentLot = lastLot === 0 ? 1 : Math.min(auction.current_lot, lastLot);
      if (currentLot !== auction.current_lot) {
        const { error: auctionUpdateError } = await supabase
          .from("auction")
          .update({ current_lot: currentLot })
          .eq("id", 1);
        if (auctionUpdateError) throw auctionUpdateError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not delete product:", error);
    return NextResponse.json({ error: "Could not delete product." }, { status: 500 });
  }
}
