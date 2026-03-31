import { AppearanceSync } from "@/components/shell/appearance-sync";
import { SiteHeader } from "@/components/shell/site-header";
import { cn } from "@/lib/cn";

type ShellLayoutProps = {
  children: React.ReactNode;
  /** Extra top breathing room on the home canvas */
  variant?: "default" | "hero";
};

export function ShellLayout({ children, variant = "default" }: ShellLayoutProps) {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-[#07080c] text-zinc-200">
      {/* Layered depth + ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.58]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 88% 58% at 14% -2%, rgba(56,120,200,0.17), transparent 54%), radial-gradient(ellipse 72% 48% at 94% 4%, rgba(140,90,200,0.14), transparent 50%), radial-gradient(ellipse 58% 42% at 48% 102%, rgba(30,80,140,0.11), transparent 58%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.038)_0%,transparent_24%,transparent_76%,rgba(0,0,0,0.52)_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_130%_85%_at_50%_-22%,rgba(110,200,255,0.045),transparent_52%)]" />
      <div className="sd-grain" aria-hidden />

      <AppearanceSync />
      <SiteHeader />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1600px] flex-1 px-4 pb-16 pt-7 sm:px-6 sm:pb-20 sm:pt-8 lg:px-10 lg:pb-24",
          variant === "hero" ? "pt-9 lg:pt-14" : "lg:pt-10",
        )}
      >
        <main className="min-w-0 motion-safe:transition-[opacity] motion-safe:duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
