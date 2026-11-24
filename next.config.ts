import type { NextConfig } from "next";

// Deploy at the root of the custom domain (victoramarante.dev).
// Override BASE_PATH for deployments under a subdirectory.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
