import { connection } from "next/server";
import { AuctionConsole } from "@/app/components/auction-console";
import { getProducts } from "@/app/lib/products";

export default async function MazadPage() {
  await connection();
  const products = await getProducts();
  return <AuctionConsole products={products} />;
}
