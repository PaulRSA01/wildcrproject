"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/bookings", label: "Bookings" },
  { href: "/departures", label: "Departures" },
  { href: "/tours", label: "Tours" },
  { href: "/customers", label: "Customers" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-3 pb-1 pt-4">
        <Image
          src="/brand-banner.jpg"
          alt="Wild Costa Rica Eco-Friendly Tours"
          width={2816}
          height={1536}
          priority
          className="w-full rounded-lg border border-slate-200 object-cover"
        />
        <div className="mt-2 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Operations
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-3 py-2">
        {nav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-5 py-4 text-xs text-slate-400">
        Demo data &middot; resets on server restart
      </div>
    </aside>
  );
}
