import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { publishAuctionEvent } from "@/app/lib/auction-bus";
import {
  buildOfflineSnapshotProducts,
  getBucketName,
  readOfflineSnapshot,
  removeOfflineData,
  saveOfflineSnapshot,
} from "@/app/lib/offline-snapshot";
import { getAuctionState } from "@/app/lib/products";

async function isAuthorized(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const snapshot = await readOfflineSnapshot();
  return NextResponse.json({
    enabled: snapshot !== null,
    bucket: getBucketName(),
    generatedAt: snapshot?.generatedAt ?? null,
    count: snapshot?.products.length ?? 0,
  });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const [built, auction] = await Promise.all([
      buildOfflineSnapshotProducts(),
      getAuctionState(),
    ]);

    const generatedAt = await saveOfflineSnapshot(built.products, auction);
    publishAuctionEvent({ kind: "catalog" });

    return NextResponse.json({
      success: true,
      enabled: true,
      generatedAt,
      count: built.products.length,
      warnings: built.warnings,
    });
  } catch (error) {
    console.error("Could not build the offline snapshot:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Could not download the catalog from Supabase: ${error.message}`
            : "Could not download the catalog from Supabase.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await removeOfflineData();
    publishAuctionEvent({ kind: "catalog" });
    return NextResponse.json({ success: true, enabled: false });
  } catch (error) {
    console.error("Could not remove the offline snapshot:", error);
    return NextResponse.json({ error: "Could not remove the offline data." }, { status: 500 });
  }
}
