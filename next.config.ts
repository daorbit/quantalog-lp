import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export-friendly: every route is prerendered at build time (SSG).
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
