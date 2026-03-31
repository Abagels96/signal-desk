"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { APP_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/cn";

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07080c]/82 shadow-[0_12px_48px_-16px_rgba(0,0,0,0.72)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),rgba(167,139,250,0.25),transparent)] opacity-90"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)]" />

      <div className="relative mx-auto flex h-[3.75rem] max-w-[1600px] items-center gap-4 px-4 sm:h-16 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-none outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-cyan-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080c] rounded-xl -m-1 p-1"
          onClick={() => setOpen(false)}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500 transition duration-200 group-hover:text-zinc-400">
            Signal Desk
          </span>
          <span className="mt-0.5 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-zinc-100 transition duration-200 group-hover:text-white sm:text-lg">
            Creative control room
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          aria-label="Main"
        >
          {APP_ROUTES.map((r) => {
            const active = isActiveRoute(pathname, r.href);
            return (
              <Link
                key={r.href}
                href={r.href}
                className={cn(
                  "relative rounded-2xl px-3 py-2 text-[13px] font-medium transition duration-200 ease-out",
                  active
                    ? "text-zinc-50"
                    : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200",
                )}
              >
                {active ? (
                  <span
                    className="absolute inset-0 rounded-2xl bg-white/[0.08] shadow-[0_0_28px_rgba(110,200,255,0.1)] transition-shadow duration-200"
                    aria-hidden
                  />
                ) : null}
                <span className="relative">{r.label}</span>
                {active ? (
                  <span
                    className="absolute -bottom-0.5 left-1/2 h-0.5 w-[42%] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,#6ee7ff,#a78bfa)] shadow-[0_0_14px_rgba(110,231,255,0.5)] transition-transform duration-200"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.08] hover:text-zinc-100 active:scale-[0.97] lg:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" strokeWidth={2} /> : <Menu className="size-5" strokeWidth={2} />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden" id={panelId}>
          <button
            type="button"
            className="absolute inset-0 bg-[#030406]/80 backdrop-blur-md"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/[0.09] bg-[linear-gradient(200deg,rgba(16,18,26,0.98)_0%,rgba(8,9,14,0.99)_45%,rgba(6,7,11,1)_100%)] pt-[3.75rem] shadow-[-28px_0_90px_-24px_rgba(0,0,0,0.92)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right motion-safe:duration-300 sm:pt-16"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="pointer-events-none absolute left-0 top-[3.75rem] h-px w-full bg-[linear-gradient(90deg,rgba(110,200,255,0.25),transparent)] opacity-80 sm:top-16" />
            <nav className="flex flex-col gap-1 p-4 pt-4" aria-label="Mobile main">
              {APP_ROUTES.map((r) => {
                const active = isActiveRoute(pathname, r.href);
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={cn(
                      "rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors",
                      active
                        ? "bg-white/[0.08] text-zinc-50 shadow-[inset_0_0_0_1px_rgba(110,200,255,0.12)]"
                        : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span className="block">{r.label}</span>
                    <span className="mt-0.5 block text-[11px] font-normal uppercase tracking-[0.2em] text-zinc-600">
                      {r.short}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <p className="mt-auto border-t border-white/[0.06] px-5 py-4 text-[11px] leading-relaxed text-zinc-600">
              Local mock · localStorage — no backend in this build.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
