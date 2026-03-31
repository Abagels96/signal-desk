"use client";

import { usePathname } from "next/navigation";
import { ShellLayout } from "@/components/shell/shell-layout";

type DeskShellProps = {
  children: React.ReactNode;
};

export function DeskShell({ children }: DeskShellProps) {
  const pathname = usePathname();
  const variant = pathname === "/" ? "hero" : "default";
  return <ShellLayout variant={variant}>{children}</ShellLayout>;
}
