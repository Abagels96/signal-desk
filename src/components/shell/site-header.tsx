"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { AppearanceHeaderControls } from "@/components/shell/appearance-header-controls";
import { publicAsset } from "@/lib/base-path";
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
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07080c]/82 pt-[env(safe-area-inset-top)] shadow-[0_12px_48px_-16px_rgba(0,0,0,0.72)] backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow,background-color] duration-300 light:border-zinc-200/80 light:bg-white/80 light:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,200,255,0.35),rgba(167,139,250,0.25),transparent)] opacity-90 light:opacity-70"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)] light:bg-[linear-gradient(90deg,transparent,rgba(24,24,27,0.08),transparent)]" />

      <div className="relative mx-auto flex min-h-[3.75rem] max-w-[1600px] items-center gap-2 px-3 min-[400px]:gap-4 sm:min-h-16 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex min-w-0 max-w-[calc(100%-8.5rem)] shrink items-center gap-2 min-[400px]:max-w-[calc(100%-9.5rem)] min-[400px]:gap-3 sm:max-w-none outline-none transition duration-200 ease-out focus-visible:ring-2 focus-visible:ring-cyan-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--sd-ring-offset)] rounded-xl -m-1 p-1"
          onClick={() => setOpen(false)}
        >
          <Image
            src={publicAsset("/signal-desk-mark.png")}
            alt="Signal Desk"
            width={40}
            height={40}
            priority
            className="size-8 shrink-0 rounded-xl object-cover ring-1 ring-white/[0.1] shadow-[0_0_28px_rgba(110,200,255,0.14)] transition duration-200 group-hover:ring-cyan-400/30 group-hover:shadow-[0_0_36px_rgba(110,200,255,0.22)] sm:size-10"
          />
          <span className="min-w-0 flex flex-col leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-500 transition duration-200 group-hover:text-zinc-400 light:text-zinc-500 min-[400px]:text-[10px] min-[400px]:tracking-[0.35em]">
              Signal Desk
            </span>
            <span className="mt-0.5 truncate font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-zinc-100 transition duration-200 group-hover:text-white light:text-zinc-900 light:group-hover:text-zinc-950 min-[400px]:text-base sm:text-lg">
              Creative control room
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2 min-[400px]:gap-3">
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {APP_ROUTES.map((r) => {
              const active = isActiveRoute(pathname, r.href);
              return (
                <Link
                  key={r.href}
                  href={r.href}
                  className={cn(
                    "relative rounded-2xl px-3 py-2 text-[13px] font-medium transition duration-200 ease-out",
                    active
                      ? "text-zinc-50 light:text-zinc-900"
                      : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200 light:text-zinc-600 light:hover:bg-zinc-900/[0.06] light:hover:text-zinc-900",
                  )}
                >
                  {active ? (
                    <span
                      className="absolute inset-0 rounded-2xl bg-white/[0.08] shadow-[0_0_28px_rgba(110,200,255,0.1)] transition-shadow duration-200 light:bg-zinc-900/[0.06] light:shadow-[0_0_28px_rgba(56,189,248,0.12)]"
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

          <AppearanceHeaderControls />
        </div>

        <button
          type="button"
          className="flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition duration-200 ease-out hover:border-white/[0.14] hover:bg-white/[0.08] hover:text-zinc-100 active:scale-[0.97] lg:hidden light:border-zinc-300/80 light:bg-white/80 light:text-zinc-700 light:shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] light:hover:border-zinc-400 light:hover:bg-white light:hover:text-zinc-900"
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
            className="absolute inset-0 bg-[#030406]/80 backdrop-blur-md light:bg-zinc-900/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-0 flex h-full w-[min(100vw-1rem,20rem)] max-w-[100vw] flex-col border-l border-white/[0.09] bg-[linear-gradient(200deg,rgba(16,18,26,0.98)_0%,rgba(8,9,14,0.99)_45%,rgba(6,7,11,1)_100%)] pb-[env(safe-area-inset-bottom)] pt-[calc(3.75rem+env(safe-area-inset-top))] shadow-[-28px_0_90px_-24px_rgba(0,0,0,0.92)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right motion-safe:duration-300 light:border-zinc-200/90 light:bg-[linear-gradient(200deg,rgba(250,250,250,0.98)_0%,rgba(244,244,245,0.99)_45%,rgba(228,228,231,1)_100%)] light:shadow-[-28px_0_60px_-24px_rgba(0,0,0,0.12)] sm:pt-16"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="pointer-events-none absolute left-0 top-[3.75rem] h-px w-full bg-[linear-gradient(90deg,rgba(110,200,255,0.25),transparent)] opacity-80 sm:top-16" />
            <nav className="flex flex-col gap-1 overflow-y-auto p-4 pt-4" aria-label="Mobile main">
              {APP_ROUTES.map((r) => {
                const active = isActiveRoute(pathname, r.href);
                return (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={cn(
                      "min-h-12 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors touch-manipulation",
                      active
                        ? "bg-white/[0.08] text-zinc-50 shadow-[inset_0_0_0_1px_rgba(110,200,255,0.12)] light:bg-zinc-900/[0.06] light:text-zinc-900 light:shadow-[inset_0_0_0_1px_rgba(56,189,248,0.25)]"
                        : "text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-100 light:text-zinc-600 light:hover:bg-zinc-900/[0.05] light:hover:text-zinc-900",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <span className="block">{r.label}</span>
                    <span className="mt-0.5 block text-[11px] font-normal uppercase tracking-[0.2em] text-zinc-600 light:text-zinc-500">
                      {r.short}
                    </span>
                  </Link>
                );
              })}
            </nav>
            <p className="mt-auto border-t border-white/[0.06] px-5 py-4 text-[11px] leading-relaxed text-zinc-600 light:border-zinc-200/80 light:text-zinc-500">
              Local mock · localStorage — no backend in this build.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
