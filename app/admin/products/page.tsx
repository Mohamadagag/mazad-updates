import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProductAdmin } from "@/app/components/product-admin";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/app/lib/admin-session";
import { getProducts } from "@/app/lib/products";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/login?returnTo=%2Fadmin%2Fproducts");
  }

  const products = await getProducts();
  return <ProductAdmin initialProducts={products} />;
}
