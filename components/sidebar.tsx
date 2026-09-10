"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/site/logo";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/departures", label: "Departures" },
  { href: "/admin/tours", label: "Tours" },
  { href: "/admin/customers", label: "Customers" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="px-4 pb-2 pt-5">
        <Logo className="text-jungle-700" />
        <div className="mt-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Operations
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-3 py-2">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
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
      <div className="mt-auto space-y-2 px-5 py-4 text-xs text-slate-400">
        <Link href="/" className="block text-slate-500 hover:text-slate-800">
          ← Public site
        </Link>
        <p>Demo data · resets on server restart</p>
      </div>
    </aside>
  );
}
