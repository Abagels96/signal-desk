"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/cn";

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5" aria-label="Primary">
      {APP_ROUTES.map((r) => {
        const active =
          r.href === "/"
            ? pathname === "/"
            : pathname === r.href || pathname.startsWith(`${r.href}/`);
        return (
          <Link
            key={r.href}
            href={r.href}
            className={cn(
              "group relative rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors",
              active
                ? "bg-white/[0.06] text-zinc-50"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200",
            )}
          >
            <span className="relative z-10 flex flex-col gap-0.5 leading-tight">
              <span>{r.label}</span>
              <span className="text-[10px] font-normal uppercase tracking-[0.18em] text-zinc-600 group-hover:text-zinc-500">
                {r.short}
              </span>
            </span>
            {active ? (
              <span
                className="pointer-events-none absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[linear-gradient(180deg,#6ee7ff,#a78bfa)] shadow-[0_0_12px_rgba(110,231,255,0.5)]"
                aria-hidden
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
