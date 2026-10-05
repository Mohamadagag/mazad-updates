import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { publishAuctionEvent } from "@/app/lib/auction-bus";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";
import { syncSnapshotProductRows } from "@/app/lib/offline-snapshot";
import { rewriteLotOrder, type ProductRow } from "@/app/lib/products";
import { removeProductImages } from "@/app/lib/product-image-storage";

// Deletes several products at once with their uploaded images, renumbers the
// remaining lots, and keeps the offline snapshot in sync.
export async function DELETE(request: NextRequest) {
  if (!verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let uniqueIds: string[];
  try {
    const body = (await request.json()) as { ids?: unknown };
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((id): id is string => typeof id === "string")
      : [];
    uniqueIds = [...new Set(ids)];
  } catch {
    uniqueIds = [];
  }

  if (uniqueIds.length === 0) {
    return NextResponse.json(
      { error: "Select at least one product to delete." },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: products, error: readError } = await supabase
      .from("products")
      .select("image")
      .in("id", uniqueIds);

    if (readError) throw readError;
    await removeProductImages(supabase, (products ?? []).map((product) => product.image));

    const { data: deleted, error: deleteError } = await supabase
      .from("products")
      .delete()
      .in("id", uniqueIds)
      .select("id");

    if (deleteError) throw deleteError;
    if (!deleted?.length) {
      return NextResponse.json({ error: "No matching products were found." }, { status: 404 });
    }

    const { data: remaining, error: listError } = await supabase
      .from("products")
      .select("*")
      .order("lot", { ascending: true });
    if (listError) throw listError;

    const orderedRows = await rewriteLotOrder((remaining ?? []) as ProductRow[]);

    const { data: auction, error: auctionReadError } = await supabase
      .from("auction")
      .select("current_lot")
      .eq("id", 1)
      .maybeSingle();
    if (auctionReadError) throw auctionReadError;

    if (auction) {
      const lastLot = orderedRows.length;
      const currentLot = lastLot === 0 ? 1 : Math.min(auction.current_lot, lastLot);
      if (currentLot !== auction.current_lot) {
        const { error: auctionUpdateError } = await supabase
          .from("auction")
          .update({ current_lot: currentLot })
          .eq("id", 1);
        if (auctionUpdateError) throw auctionUpdateError;
      }
    }

    await syncSnapshotProductRows(orderedRows, { clampCurrentLot: true });
    publishAuctionEvent({ kind: "catalog" });

    return NextResponse.json({ success: true, deleted: deleted.length });
  } catch (error) {
    console.error("Could not delete the selected products:", error);
    return NextResponse.json(
      { error: "Could not delete the selected products." },
      { status: 500 }
    );
  }
}
