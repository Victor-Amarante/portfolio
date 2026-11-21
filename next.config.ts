import type { NextConfig } from "next";

// GitHub Pages serves this repo as a project site at /portfolio. Override with
// BASE_PATH="" for a root deploy (custom domain) or a local static preview.
const basePath = process.env.BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
