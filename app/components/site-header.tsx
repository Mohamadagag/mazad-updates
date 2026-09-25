import Link from "next/link";

const navItems = [
  { href: "/", label: "Auction List" },
  { href: "/rules", label: "Auction Rules" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f8fb]/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-2 sm:px-6 lg:px-8">
        <Link href="/" className="font-semibold text-[#101316]">
          Yaghi Store Auctions
        </Link>
        <nav className="flex items-center gap-1 rounded-lg border border-black/10 bg-white p-1 shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1 md:py-2 text-sm font-medium text-[#48515a] transition hover:bg-[#eef2f1] hover:text-[#101316] sm:px-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
