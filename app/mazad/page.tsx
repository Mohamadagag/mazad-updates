import { connection } from "next/server";
import { AuctionConsole } from "@/app/components/auction-console";
import { loadCatalog } from "@/app/lib/offline-snapshot";

export default async function MazadPage() {
  await connection();
  const { products, auction } = await loadCatalog();
  return (
    <AuctionConsole
      products={products}
      initialCurrentLot={auction.current_lot}
    />
  );
}
