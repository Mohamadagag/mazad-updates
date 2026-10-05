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
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
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
      </body>
    </html>
  );
}
