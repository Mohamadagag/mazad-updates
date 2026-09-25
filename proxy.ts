import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/app/lib/admin-session";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedPath =
    path === "/admin" ||
    path.startsWith("/admin/") ||
    path === "/mazad" ||
    path.startsWith("/mazad/");

  if (!isProtectedPath) return NextResponse.next();

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (verifyAdminSession(session)) return NextResponse.next();

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("returnTo", path);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/mazad/:path*"],
};
