import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export-friendly: every route is prerendered at build time (SSG).
  reactStrictMode: true,
  images: { unoptimized: true },
  
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
