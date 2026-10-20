import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export-friendly: every route is prerendered at build time (SSG).
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: { viewTransition: true },

  outputFileTracingRoot: path.join(__dirname),
  env: { BUILD_DATE: new Date().toISOString().slice(0, 10) },
};

export default nextConfig;