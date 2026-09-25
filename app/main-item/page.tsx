import { connection } from "next/server";
import { MainItemsView } from "@/app/components/main-items-view";
import { getProducts } from "@/app/lib/products";

export default async function MainItemPage() {
  await connection();
  const products = await getProducts();
  return <MainItemsView products={products} />;
}
