import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Geist, Geist_Mono } from "next/font/google";
import { DeskShell } from "@/components/shell/desk-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontDisplay = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Signal Desk",
    template: "%s · Signal Desk",
  },
  description:
    "A local-first editorial control room for AI-assisted content — mock data and localStorage only.",
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-signal-appearance="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col text-zinc-200">
        <DeskShell>{children}</DeskShell>
      </body>
    </html>
  );
}
