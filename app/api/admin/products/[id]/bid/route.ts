import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { publishAuctionEvent } from "@/app/lib/auction-bus";
import { setSnapshotProductBid } from "@/app/lib/offline-snapshot";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let currentBid: number;
  try {
    const body = (await request.json()) as { current_bid?: unknown };
    currentBid = Number(body.current_bid);
  } catch {
    return NextResponse.json({ error: "Enter a valid bid." }, { status: 400 });
  }

  if (!Number.isFinite(currentBid) || currentBid < 0) {
    return NextResponse.json({ error: "Bid must be a non-negative number." }, { status: 400 });
  }

  const { id } = await context.params;
  const updatedAt = new Date().toISOString();

  // Try Supabase first so the database stays the master copy while online.
  // A network failure is not fatal: the offline snapshot keeps the live
  // auction running without an internet connection.
  let remoteRow: { id: string; lot: number; current_bid: string } | null = null;
  let remoteFailed = false;

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .update({ current_bid: currentBid, updated_at: updatedAt })
      .eq("id", id)
      .select("id, lot, current_bid")
      .maybeSingle();

    if (error) throw error;

    remoteRow = data
      ? {
          id: data.id,
          lot: data.lot,
          current_bid: String(data.current_bid),
        }
      : null;
  } catch (error) {
    remoteFailed = true;
    console.error("Could not update the bid in Supabase; falling back to the offline snapshot:", error);
  }

  // Mirror the change into the offline snapshot and push it to the /mazad
  // display over server-sent events.
  const snapshotRow = await setSnapshotProductBid(id, String(currentBid));

  if (remoteFailed && !snapshotRow) {
    return NextResponse.json(
      {
        error:
          "No internet connection and no offline snapshot available. Download the offline auction data in the admin console first.",
      },
      { status: 503 }
    );
  }

  if (!remoteFailed && !remoteRow) {
    // Supabase is reachable but the product does not exist there.
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const lot = snapshotRow?.lot ?? remoteRow!.lot;
  const savedBid = snapshotRow?.currentBid ?? remoteRow!.current_bid;

  publishAuctionEvent({ kind: "bid", id, lot, currentBid: savedBid, at: Date.now() });

  return NextResponse.json({ id, lot, current_bid: savedBid });
}
