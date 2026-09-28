import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/app/lib/admin-session";
import { getSupabaseAdmin } from "@/app/lib/supabase-admin";

const pageSize = 1000;

function getCapacityBytes() {
  const capacityMb = Number(process.env.SUPABASE_PRODUCT_BUCKET_CAPACITY_MB);
  return Number.isFinite(capacityMb) && capacityMb > 0
    ? Math.floor(capacityMb * 1024 * 1024)
    : null;
}

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const bucket = process.env.SUPABASE_PRODUCT_BUCKET || "mazad-bucket";

  try {
    const storage = getSupabaseAdmin().storage.from(bucket);
    let usedBytes = 0;

    async function countObjects(path: string): Promise<void> {
      let offset = 0;

      while (true) {
        const { data, error } = await storage.list(path, { limit: pageSize, offset });
        if (error) throw error;

        const folders: string[] = [];
        for (const entry of data ?? []) {
          if (entry.id === null) {
            folders.push(path ? `${path}/${entry.name}` : entry.name);
            continue;
          }

          const size = Number(entry.metadata?.size);
          if (Number.isFinite(size) && size > 0) usedBytes += size;
        }

        for (const folder of folders) await countObjects(folder);

        if (!data || data.length < pageSize) break;
        offset += pageSize;
      }
    }

    await countObjects("");

    const capacityBytes = getCapacityBytes();
    return NextResponse.json(
      {
        bucket,
        usedBytes,
        capacityBytes,
        remainingBytes: capacityBytes === null ? null : Math.max(capacityBytes - usedBytes, 0),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Could not read product image storage usage:", error);
    return NextResponse.json(
      { error: "Could not read image storage usage. Check the bucket and server credentials." },
      { status: 500 }
    );
  }
}
