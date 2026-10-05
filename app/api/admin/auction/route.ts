import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { publishAuctionEvent } from "@/app/lib/auction-bus";
import {
  applySnapshotAuction,
  readOfflineSnapshot,
} from "@/app/lib/offline-snapshot";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

export async function PATCH(request: NextRequest) {
  if (!verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { current_lot?: unknown; status?: unknown };
  try {
    body = (await request.json()) as { current_lot?: unknown; status?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid auction update." }, { status: 400 });
  }

  const requestedLot =
    body.current_lot === undefined ? undefined : Number(body.current_lot);
  const requestedStatus = body.status;

  if (
    requestedLot !== undefined &&
    (!Number.isInteger(requestedLot) || requestedLot < 1)
  ) {
    return NextResponse.json(
      { error: "Current lot must be a positive whole number." },
      { status: 400 }
    );
  }
  if (
    requestedStatus !== undefined &&
    requestedStatus !== "stopped" &&
    requestedStatus !== "sold"
  ) {
    return NextResponse.json({ error: "Invalid auction status." }, { status: 400 });
  }

  // Try Supabase first so the database stays the master copy while online.
  // A network failure is not fatal: the offline snapshot keeps the live
  // auction running without an internet connection.
  let remoteResult: { current_lot: number; status: string } | null = null;
  let remoteFailed = false;

  try {
    const supabase = getSupabaseAdmin();
    const { data: existingAuction, error: auctionReadError } = await supabase
      .from("auction")
      .select("current_lot, status")
      .eq("id", 1)
      .maybeSingle();

    if (auctionReadError) throw auctionReadError;

    const currentLot = requestedLot ?? existingAuction?.current_lot ?? 1;
    const status = (requestedStatus ?? existingAuction?.status ?? "stopped") as
      | "stopped"
      | "sold";

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("lot", currentLot)
      .maybeSingle();

    if (productError) throw productError;
    if (!product) {
      return NextResponse.json({ error: "That lot does not exist." }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from("auction")
      .upsert(
        {
          id: 1,
          current_lot: currentLot,
          status,
        },
        { onConflict: "id" }
      );

    if (updateError) throw updateError;
    remoteResult = { current_lot: currentLot, status };
  } catch (error) {
    remoteFailed = true;
    console.error("Could not update the auction in Supabase; falling back to the offline snapshot:", error);
  }

  const snapshotRow = await readOfflineSnapshot();

  if (remoteFailed) {
    if (!snapshotRow) {
      return NextResponse.json(
        {
          error:
            "No internet connection and no offline snapshot available. Download the offline auction data in the admin console first.",
        },
        { status: 503 }
      );
    }

    // Fall back to the snapshot values for anything the request omitted.
    const currentLot = requestedLot ?? snapshotRow.auction.current_lot;
    const status = requestedStatus ?? snapshotRow.auction.status;

    if (!snapshotRow.products.some((product) => product.lot === currentLot)) {
      return NextResponse.json({ error: "That lot does not exist." }, { status: 404 });
    }

    await applySnapshotAuction(currentLot, status);
    publishAuctionEvent({ kind: "auction", currentLot, status });

    return NextResponse.json({ current_lot: currentLot, status });
  }

  const currentLot = remoteResult!.current_lot;
  const status = remoteResult!.status;

  if (snapshotRow) {
    await applySnapshotAuction(currentLot, status);
  }

  publishAuctionEvent({ kind: "auction", currentLot, status });

  return NextResponse.json({ current_lot: currentLot, status });
}
