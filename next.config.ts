import type { NextConfig } from "next";

/** Set to `/signal-desk` when building for GitHub Pages (see CI workflow). Leave unset for local dev at `/`. */
const basePath = process.env.BASE_PATH?.trim() || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
