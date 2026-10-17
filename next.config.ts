import type { NextConfig } from "next";

// Static export for Cloudflare Pages (accounting-demo.primaxoft.com).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
