import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
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

  try {
    const { id } = await context.params;
    const { data, error } = await getSupabaseAdmin()
      .from("products")
      .update({ current_bid: currentBid, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id, lot, current_bid")
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Product not found." }, { status: 404 });

    return NextResponse.json({
      id: data.id,
      lot: data.lot,
      current_bid: String(data.current_bid),
    });
  } catch (error) {
    console.error("Could not update live bid:", error);
    return NextResponse.json({ error: "Could not update the bid." }, { status: 500 });
  }
}
