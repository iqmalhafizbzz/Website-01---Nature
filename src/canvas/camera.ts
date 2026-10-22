// Camera and placement math. Screen = world * z + (x, y).

export type Camera = { x: number; y: number; z: number };
export type Point = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };

export const ZOOM_MIN = 0.02;
export const ZOOM_MAX = 2;
export const COORD_LIMIT = 1_000_000;
export const POSITION_LIMIT = 200_000;
export const DEFAULT_CAMERA: Camera = { x: 64, y: 96, z: 0.25 };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function clampCamera(camera: Camera): Camera {
  return {
    x: clamp(camera.x, -COORD_LIMIT, COORD_LIMIT),
    y: clamp(camera.y, -COORD_LIMIT, COORD_LIMIT),
    z: clamp(camera.z, ZOOM_MIN, ZOOM_MAX),
  };
}

export const clampPosition = (point: Point): Point => ({
  x: clamp(point.x, -POSITION_LIMIT, POSITION_LIMIT),
  y: clamp(point.y, -POSITION_LIMIT, POSITION_LIMIT),
});

export const isFiniteNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

/** Zooms by `factor` keeping the world point under the screen point fixed. */
export function zoomAt(camera: Camera, screen: Point, factor: number): Camera {
  const z = clamp(camera.z * factor, ZOOM_MIN, ZOOM_MAX);
  const worldX = (screen.x - camera.x) / camera.z;
  const worldY = (screen.y - camera.y) / camera.z;
  return clampCamera({ x: screen.x - worldX * z, y: screen.y - worldY * z, z });
}

/** Wheel delta to a zoom factor; trackpad pinch arrives as small ctrl+wheel deltas. */
export function wheelZoomFactor(event: WheelEvent) {
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1;
  return Math.exp(-clamp(event.deltaY * unit, -240, 240) * 0.0022);
}

export function wheelPanDelta(event: WheelEvent): Point {
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1;
  // Shift + vertical wheel pans sideways on mice that have no horizontal wheel.
  if (event.shiftKey && event.deltaX === 0) return { x: event.deltaY * unit, y: 0 };
  return { x: event.deltaX * unit, y: event.deltaY * unit };
}

/** A camera that shows `bounds` inside a viewport, with titles drawn at a fixed screen height above each item. */
export function fitCamera(rects: Rect[], viewport: { w: number; h: number }, titlePx: number, padding = 48): Camera {
  if (!rects.length) return DEFAULT_CAMERA;
  let z = 0.25;
  // Titles keep their screen size, so their world height depends on the zoom; two passes settle it.
  for (let pass = 0; pass < 3; pass++) {
    const b = union(rects.map(r => ({ ...r, y: r.y - titlePx / z, h: r.h + titlePx / z })));
    z = clamp(Math.min((viewport.w - padding * 2) / b.w, (viewport.h - padding * 2) / b.h), ZOOM_MIN, 1);
  }
  const b = union(rects.map(r => ({ ...r, y: r.y - titlePx / z, h: r.h + titlePx / z })));
  return clampCamera({ x: (viewport.w - b.w * z) / 2 - b.x * z, y: (viewport.h - b.h * z) / 2 - b.y * z, z });
}

export function union(rects: Rect[]): Rect {
  const x = Math.min(...rects.map(r => r.x));
  const y = Math.min(...rects.map(r => r.y));
  const right = Math.max(...rects.map(r => r.x + r.w));
  const bottom = Math.max(...rects.map(r => r.y + r.h));
  return { x, y, w: right - x, h: bottom - y };
}
