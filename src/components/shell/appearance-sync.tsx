"use client";

import { useEffect } from "react";
import { useSignalStore } from "@/store/use-signal-store";
import type { AppearanceMode } from "@/store/use-signal-store";

function resolveAppearance(mode: AppearanceMode): "light" | "dark" {
  if (mode === "system") {
    if (typeof window === "undefined") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return mode;
}

/** Sets `data-signal-appearance` on `<html>` to resolved `light` | `dark` (including system → OS). */
export function AppearanceSync() {
  const appearance = useSignalStore((s) => s.appearance);

  useEffect(() => {
    const apply = () => {
      const resolved = resolveAppearance(appearance);
      document.documentElement.setAttribute(
        "data-signal-appearance",
        resolved,
      );
      document.documentElement.style.colorScheme =
        resolved === "light" ? "light" : "dark";
    };

    apply();

    if (appearance !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [appearance]);

  return null;
}
