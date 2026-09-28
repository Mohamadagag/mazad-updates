import { connection } from "next/server";
import { AuctionConsole } from "@/app/components/auction-console";
import { getAuctionState, getProducts } from "@/app/lib/products";

export default async function MazadPage() {
  await connection();
  const [products, auction] = await Promise.all([getProducts(), getAuctionState()]);
  return (
    <AuctionConsole
      products={products}
      initialCurrentLot={auction.current_lot}
      initialAuctionStatus={auction.status}
    />
  );
}
