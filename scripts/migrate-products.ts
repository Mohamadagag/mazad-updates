import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { products } from "../app/data/products";

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseKey) {
    throw new Error("Missing SUPABASE_SECRET_KEY");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  function getLot(product: (typeof products)[number]) {
    const lot = product.specs.find(
      ([key]) => key.toLowerCase() === "lot"
    )?.[1];

    if (!lot) {
      throw new Error(`No Lot found for product: ${product.id}`);
    }

    const lotNumber = Number(lot);

    if (!Number.isInteger(lotNumber)) {
      throw new Error(
        `Invalid Lot "${lot}" for product: ${product.id}`
      );
    }

    return lotNumber;
  }

  const rows = products.map((product) => ({
    id: product.id,
    lot: getLot(product),
    name: product.name,
    code: product.code,
    current_bid: Number(product.currentBid) || 0,
    image: product.image,
    accent: product.accent,
    description: product.description,
    details: product.details,
    specs: product.specs,
  }));

  console.log(`Found ${rows.length} products in products.ts.`);
  console.log("Starting migration...");

  const { data, error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "id" })
    .select("id, lot, name, current_bid");

  if (error) {
    console.error("Migration failed:");
    console.error(error);
    process.exit(1);
  }

  console.log(`Successfully migrated ${data.length} products.`);
  console.table(data);

  const { error: auctionError } = await supabase
    .from("auction")
    .upsert(
      {
        id: 1,
        current_lot: rows[0]?.lot ?? 1,
        status: "stopped",
      },
      { onConflict: "id" }
    );

  if (auctionError) {
    console.error(
      "Products were migrated, but the auction state could not be initialized:"
    );
    console.error(auctionError);
    process.exit(1);
  }

  console.log(
    `Auction initialized at Lot ${rows[0]?.lot ?? 1}.`
  );

  console.log("Migration complete.");
}

main().catch((error) => {
  console.error("Unexpected migration error:");
  console.error(error);
  process.exit(1);
});