import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ProductAdmin } from "@/app/components/product-admin";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/app/lib/admin-session";
import { loadCatalog } from "@/app/lib/offline-snapshot";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    redirect("/login?returnTo=%2Fadmin%2Fproducts");
  }

  const { products, auction } = await loadCatalog();
  return (
    <ProductAdmin
      initialProducts={products}
      initialCurrentLot={auction.current_lot}
      initialAuctionStatus={auction.status}
    />
  );
}
