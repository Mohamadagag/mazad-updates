import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/app/components/site-header";
import {
  siteDescription,
  siteName,
  siteNameArabic,
  siteTitle,
  getSiteUrl,
} from "@/app/lib/site";
import "./globals.css";
import DeveloperConsole from "./components/DeveloperConsole";

const siteUrl = getSiteUrl();

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: siteNameArabic,
  url: siteUrl,
  description: siteDescription,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: siteNameArabic,
  url: siteUrl,
  description: siteDescription,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: "/",
    locale: "en_US",
    alternateLocale: "ar",
    images: ["/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "_oRHtA2a9T4s0xqWdo8M4GmH-sq8zpar7yGvqEzAXOs",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f7f8fb] text-[#101316]">
        <DeveloperConsole />
        <SiteHeader />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
