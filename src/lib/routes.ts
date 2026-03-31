export type AppRoute = {
  href: string;
  label: string;
  short: string;
};

export const APP_ROUTES: AppRoute[] = [
  { href: "/", label: "Dashboard", short: "Dsh" },
  { href: "/generate", label: "Generate", short: "Gen" },
  { href: "/templates", label: "Templates", short: "Tpl" },
  { href: "/drafts", label: "Drafts", short: "Drf" },
  { href: "/productivity", label: "Productivity", short: "Prd" },
  { href: "/insights", label: "Insights", short: "Ins" },
  { href: "/settings", label: "Settings", short: "Set" },
];
