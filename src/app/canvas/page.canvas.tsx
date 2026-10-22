import type { Metadata } from "next";
import { CanvasShell } from "@/canvas/CanvasShell";
import { canvasItems } from "@/canvas/registry";

export const metadata: Metadata = { title: "Page canvas", robots: { index: false, follow: false } };

// Dev-only workspace. The ".canvas.tsx" extension is only routed by `next dev` or when HALIA_CANVAS=1 (see next.config.ts).
export default function CanvasPage() {
  return <CanvasShell items={canvasItems} />;
}
