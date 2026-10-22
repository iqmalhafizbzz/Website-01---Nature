import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Static export for Cloudflare Pages (accounting-demo.primaxoft.com).
// The page canvas (src/app/canvas/page.canvas.tsx) is routed in development, or in a build run with HALIA_CANVAS=1.
export default function config(phase: string): NextConfig {
  const withCanvas = phase === PHASE_DEVELOPMENT_SERVER || process.env.HALIA_CANVAS === "1";
  return {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    pageExtensions: withCanvas ? ["canvas.tsx", "tsx", "ts"] : ["tsx", "ts"],
  };
}
