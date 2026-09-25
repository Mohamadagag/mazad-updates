import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/app/components/site-header";
import "./globals.css";
import DeveloperConsole from "./components/DeveloperConsole";

export const metadata: Metadata = {
  title: "Mazad Yagi",
  description: "A modern auction experience for curated item lots.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#f7f8fb] text-[#101316]">
        <DeveloperConsole />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
