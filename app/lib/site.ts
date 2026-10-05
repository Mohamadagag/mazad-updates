// Shared SEO/site configuration used by metadata, sitemap, and robots files.
export const siteName = "Mazad Yaghi";
export const siteNameArabic = "مزاد ياغي";
export const siteTitle = `${siteName} (${siteNameArabic}) — Live Online Auctions`;
export const siteDescription =
  "Live online auctions by Mazad Yaghi (مزاد ياغي). Browse curated auction lots with item details and specifications, follow the live auction screen, and read the auction terms and conditions.";

// Public base URL of the deployment. Set NEXT_PUBLIC_SITE_URL when moving to a
// custom domain so canonical URLs, Open Graph tags, and the sitemap follow it.
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://mazad-yaghi.vercel.app";
  return raw.trim().replace(/\/+$/, "");
}
