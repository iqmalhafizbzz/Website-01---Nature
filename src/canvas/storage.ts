// Saved layout: camera and item positions only, keyed by registry ID. Never content, names or form input.
import { clampCamera, clampPosition, isFiniteNumber, type Camera, type Point } from "./camera";

const KEY = "halia-demo:page-canvas";
const VERSION = 1;
const MAX_BYTES = 16_384;

export type SavedLayout = { camera: Camera | null; positions: Record<string, Point> };

const empty = (): SavedLayout => ({ camera: null, positions: {} });

export function loadLayout(ids: readonly string[]): SavedLayout {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw || raw.length > MAX_BYTES) return empty();
    const doc: unknown = JSON.parse(raw);
    if (!doc || typeof doc !== "object" || (doc as { v?: unknown }).v !== VERSION) return empty();
    const { camera, positions } = doc as { camera?: Record<string, unknown>; positions?: Record<string, Record<string, unknown>> };
    const layout = empty();
    if (camera && isFiniteNumber(camera.x) && isFiniteNumber(camera.y) && isFiniteNumber(camera.z) && camera.z > 0) {
      layout.camera = clampCamera({ x: camera.x, y: camera.y, z: camera.z });
    }
    if (positions && typeof positions === "object") {
      // Only current registry IDs; stale or unknown entries are ignored.
      for (const id of ids) {
        const p = positions[id];
        if (p && isFiniteNumber(p.x) && isFiniteNumber(p.y)) layout.positions[id] = clampPosition({ x: p.x, y: p.y });
      }
    }
    return layout;
  } catch {
    return empty();
  }
}

export function saveLayout(layout: SavedLayout) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v: VERSION, camera: layout.camera, positions: layout.positions }));
  } catch {
    // Storage full or unavailable: the canvas keeps working without saving.
  }
}
