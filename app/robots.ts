import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/app/lib/site";

// Only the public catalog pages are crawlable. The auction display, admin
// console, login, and API routes are session-protected and stay out of search.
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/mazad", "/mazad/", "/login", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
