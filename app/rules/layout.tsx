import type { Metadata } from "next";
import type { ReactNode } from "react";

// The rules page itself is a client component (language toggle), so its
// metadata lives here in the route layout.
export const metadata: Metadata = {
  title: "Auction Terms & Conditions",
  description:
    "Auction terms and conditions for Mazad Yaghi (مزاد ياغي): registration, the $100 participation deposit, binding bids, payment, and collection of items. شروط وأحكام المزاد.",
  alternates: {
    canonical: "/rules",
  },
};

export default function RulesLayout({ children }: { children: ReactNode }) {
  return children;
}
