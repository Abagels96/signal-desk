"use client";

import { useEffect } from "react";
import { useSignalStore } from "@/store/use-signal-store";

/** Keeps `data-signal-appearance` on `<html>` in sync with persisted store on every route. */
export function AppearanceSync() {
  const appearance = useSignalStore((s) => s.appearance);

  useEffect(() => {
    document.documentElement.setAttribute("data-signal-appearance", appearance);
  }, [appearance]);

  return null;
}
