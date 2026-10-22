"use client";

import { memo, useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { GripVertical, Maximize, Minus, Plus, RotateCcw } from "lucide-react";
import { DEFAULT_CAMERA, clampCamera, clampPosition, fitCamera, zoomAt, wheelPanDelta, wheelZoomFactor, type Camera, type Point, type Rect } from "./camera";
import { connectFrame, isInteractive, type FrameHost } from "./frame-bridge";
import { loadLayout, saveLayout } from "./storage";
import type { CanvasItem } from "./registry";
import styles from "./canvas.module.css";

/** Screen height of the name row above each preview; it keeps this size at every zoom. */
const TITLE_PX = 40;
const KEY_PAN = 64;
const KEY_MOVE = 16;

type Connect = (iframe: HTMLIFrameElement, item: CanvasItem, setHeight: (px: number) => void) => () => void;
type DragHandlers = {
  zoom(): number;
  move(id: string, dx: number, dy: number): void;
  commit(id: string): void;
};

export function CanvasShell({ items }: { items: CanvasItem[] }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const zoomTextRef = useRef<HTMLSpanElement>(null);
  const helpId = useId();

  // Gesture and camera values live in refs: moving the camera never rerenders previews.
  const camera = useRef<Camera>(DEFAULT_CAMERA);
  const positions = useRef(new Map<string, Point>(items.map(item => [item.id, { x: item.x, y: item.y }])));
  const heights = useRef(new Map<string, number>());
  const itemEls = useRef(new Map<string, HTMLDivElement>());
  const frames = useRef(new Map<string, HTMLIFrameElement>());
  const pendingMoves = useRef(new Map<string, Point>());
  const frame = useRef(0);
  const animation = useRef(0);
  const saveTimer = useRef(0);
  const space = useRef(false);
  const pan = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const touched = useRef(false); // the person moved the camera, so no automatic fit
  const savedCamera = useRef(false);

  const [placed, setPlaced] = useState<Record<string, Point>>(() => Object.fromEntries(items.map(item => [item.id, { x: item.x, y: item.y }])));
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(0);

  // One transform write per animation frame for the camera and any moved items.
  const flush = useCallback(() => {
    frame.current = 0;
    const c = camera.current;
    const world = worldRef.current;
    if (world) {
      world.style.transform = `translate(${c.x}px, ${c.y}px) scale(${c.z})`;
      world.style.setProperty("--z", String(c.z));
    }
    if (zoomTextRef.current) zoomTextRef.current.textContent = `${Math.round(c.z * 100)}%`;
    for (const [id, p] of pendingMoves.current) {
      const el = itemEls.current.get(id);
      if (el) el.style.transform = `translate(${p.x}px, ${p.y}px)`;
    }
    pendingMoves.current.clear();
  }, []);
  const schedule = useCallback(() => { if (!frame.current) frame.current = requestAnimationFrame(flush); }, [flush]);

  const saveNow = useCallback(() => {
    window.clearTimeout(saveTimer.current);
    saveTimer.current = 0;
    saveLayout({ camera: camera.current, positions: Object.fromEntries(positions.current) });
  }, []);
  const queueSave = useCallback(() => {
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(saveNow, 400);
  }, [saveNow]);

  const stopAnimation = () => { if (animation.current) cancelAnimationFrame(animation.current); animation.current = 0; };

  const setCamera = useCallback((next: Camera, save = true) => {
    camera.current = clampCamera(next);
    schedule();
    if (save) queueSave();
  }, [schedule, queueSave]);

  const animateTo = useCallback((target: Camera) => {
    stopAnimation();
    const to = clampCamera(target);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCamera(to); return; }
    const from = camera.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 280);
      const e = 1 - Math.pow(1 - t, 3);
      // Interpolate the zoom on a log scale so zooming in and out feel the same.
      const z = Math.exp(Math.log(from.z) + (Math.log(to.z) - Math.log(from.z)) * e);
      setCamera({ x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, z }, t === 1);
      animation.current = t < 1 ? requestAnimationFrame(step) : 0;
    };
    animation.current = requestAnimationFrame(step);
  }, [setCamera]);

  const viewport = () => {
    const shell = shellRef.current;
    return { w: shell?.clientWidth ?? window.innerWidth, h: shell?.clientHeight ?? window.innerHeight };
  };
  const itemRect = useCallback((item: CanvasItem): Rect => {
    const p = positions.current.get(item.id) ?? { x: item.x, y: item.y };
    return { x: p.x, y: p.y, w: item.width, h: heights.current.get(item.id) ?? item.height };
  }, []);

  const fitAll = useCallback((animate = true) => {
    const target = fitCamera(items.map(itemRect), viewport(), TITLE_PX);
    if (animate) animateTo(target);
    else setCamera(target);
  }, [items, itemRect, animateTo, setCamera]);

  const zoomBy = useCallback((factor: number) => {
    stopAnimation();
    touched.current = true;
    const v = viewport();
    setCamera(zoomAt(camera.current, { x: v.w / 2, y: v.h / 2 }, factor));
  }, [setCamera]);

  const resetCamera = useCallback(() => { touched.current = true; animateTo(DEFAULT_CAMERA); }, [animateTo]);

  const announce = useCallback((text: string) => {
    window.clearTimeout(noticeTimer.current);
    setNotice(text);
    noticeTimer.current = window.setTimeout(() => setNotice(""), 3200);
  }, []);

  /** Brings a canvas rectangle into view at the current zoom, moving the camera as little as possible. */
  const ensureVisible = useCallback((rect: Rect) => {
    const c = camera.current;
    const v = viewport();
    const margin = 48;
    const left = rect.x * c.z + c.x;
    const top = rect.y * c.z + c.y;
    const right = left + rect.w * c.z;
    const bottom = top + rect.h * c.z;
    let dx = 0;
    let dy = 0;
    if (right - left > v.w - margin * 2 || left < margin) dx = margin - left;
    else if (right > v.w - margin) dx = v.w - margin - right;
    if (bottom - top > v.h - margin * 2 || top < margin + TITLE_PX) dy = margin + TITLE_PX - top;
    else if (bottom > v.h - margin) dy = v.h - margin - bottom;
    if (dx || dy) { touched.current = true; setCamera({ ...c, x: c.x + dx, y: c.y + dy }); }
  }, [setCamera]);

  /** Shows an item at a readable zoom; `offsetY` scrolls the camera to a spot inside it. */
  const revealItem = useCallback((item: CanvasItem, offsetY?: number) => {
    touched.current = true;
    const p = positions.current.get(item.id)!;
    const v = viewport();
    const z = Math.min(1, (v.w - 96) / item.width);
    const x = (v.w - item.width * z) / 2 - p.x * z;
    const y = offsetY === undefined ? 48 + TITLE_PX - p.y * z : v.h * 0.2 - (p.y + offsetY) * z;
    animateTo({ x, y, z });
  }, [animateTo]);

  const followLink = useCallback((url: URL) => {
    const path = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
    const target = items.find(item => item.src === path);
    if (!target) { announce("That page is not on the canvas."); return; }
    const hash = decodeURIComponent(url.hash.slice(1));
    const el = hash ? frames.current.get(target.id)?.contentDocument?.getElementById(hash) : null;
    const offset = el ? el.getBoundingClientRect().top + (el.ownerDocument.defaultView?.scrollY ?? 0) : undefined;
    revealItem(target, offset);
  }, [items, announce, revealItem]);

  // Pans: background drag, middle drag and Space drag share one owner at a time.
  const beginPan = useCallback((x: number, y: number) => { stopAnimation(); touched.current = true; pan.current = { x, y, moved: false }; }, []);
  const movePan = useCallback((x: number, y: number) => {
    const p = pan.current;
    if (!p) return;
    const dx = x - p.x;
    const dy = y - p.y;
    if (Math.abs(dx) + Math.abs(dy) > 2) p.moved = true;
    p.x = x;
    p.y = y;
    const c = camera.current;
    setCamera({ ...c, x: c.x + dx, y: c.y + dy }, false);
  }, [setCamera]);
  const endPan = useCallback(() => {
    const moved = pan.current?.moved ?? false;
    pan.current = null;
    if (moved) queueSave();
    return moved;
  }, [queueSave]);

  const setSpaceHeld = useCallback((held: boolean) => {
    space.current = held;
    if (shellRef.current) shellRef.current.toggleAttribute("data-space", held);
  }, []);

  const connect = useCallback<Connect>((iframe, item, setHeight) => {
    frames.current.set(item.id, iframe);
    const host: FrameHost = {
      zoomAt: (x, y, factor) => { stopAnimation(); touched.current = true; setCamera(zoomAt(camera.current, { x, y }, factor)); },
      panBy: (dx, dy) => { stopAnimation(); touched.current = true; const c = camera.current; setCamera({ ...c, x: c.x + dx, y: c.y + dy }); },
      beginPan, movePan, endPan,
      isSpaceHeld: () => space.current,
      setSpaceHeld,
      followLink,
      blockLink: () => announce("Links that leave the canvas are turned off here."),
      revealRect: rect => {
        const p = positions.current.get(item.id)!;
        ensureVisible({ x: p.x + rect.x, y: p.y + rect.y, w: rect.w, h: rect.h });
      },
      reportHeight: px => {
        heights.current.set(item.id, px);
        setHeight(px);
        // Fit once every page has its real height, unless a saved view or the person already set one.
        if (!touched.current && !savedCamera.current && heights.current.size === items.length) fitAll(false);
      },
    };
    const disconnect = connectFrame(iframe, host);
    return () => { disconnect(); frames.current.delete(item.id); };
  }, [items.length, setCamera, beginPan, movePan, endPan, setSpaceHeld, followLink, announce, ensureVisible, fitAll]);

  const drag = useRef<DragHandlers>({
    zoom: () => camera.current.z,
    move: (id, dx, dy) => {
      const p = positions.current.get(id)!;
      const next = clampPosition({ x: p.x + dx, y: p.y + dy });
      positions.current.set(id, next);
      pendingMoves.current.set(id, next);
      schedule();
    },
    commit: id => {
      const p = positions.current.get(id)!;
      setPlaced(prev => ({ ...prev, [id]: p }));
      queueSave();
    },
  });

  // Saved layout and first camera, after mount so the first render matches the server.
  useEffect(() => {
    const saved = loadLayout(items.map(item => item.id));
    for (const [id, p] of Object.entries(saved.positions)) positions.current.set(id, p);
    setPlaced(Object.fromEntries(positions.current));
    if (saved.camera) {
      savedCamera.current = true;
      camera.current = saved.camera;
      schedule();
    } else {
      fitAll(false);
    }
    setReady(true);
  }, [items, schedule, fitAll]);

  // Host gestures, document styles and teardown.
  useEffect(() => {
    const shell = shellRef.current!;
    const html = document.documentElement;
    const body = document.body;
    const previous = { htmlX: html.style.overscrollBehaviorX, bodyX: body.style.overscrollBehaviorX, htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow };
    // No horizontal history swipe or page scroll while the canvas is open.
    html.style.overscrollBehaviorX = "none";
    body.style.overscrollBehaviorX = "none";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    let owner: { id: number; middle: boolean } | null = null;
    let swallowClick = false;
    const touches = new Map<number, Point>();
    let pinch: { distance: number; mid: Point } | null = null;
    let gestureScale = 1;

    const isBackground = (target: EventTarget | null) => target === shell || target === worldRef.current;
    const spaceArmed = () => space.current && !isInteractive(document.activeElement === shell ? null : document.activeElement);
    const midpoint = () => { const [a, b] = [...touches.values()]; return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };
    const spread = () => { const [a, b] = [...touches.values()]; return Math.hypot(a.x - b.x, a.y - b.y) || 1; };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        if (!isBackground(e.target) && touches.size === 0) return;
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        try { shell.setPointerCapture(e.pointerId); } catch {}
        if (touches.size === 1) { owner = { id: e.pointerId, middle: false }; beginPan(e.clientX, e.clientY); }
        if (touches.size === 2) { endPan(); owner = null; pinch = { distance: spread(), mid: midpoint() }; }
        return;
      }
      const explicit = e.button === 1 || (e.button === 0 && spaceArmed());
      if (!explicit && !(e.button === 0 && isBackground(e.target))) return;
      // Explicit pans take priority over moving items and copying names.
      e.preventDefault();
      if (explicit) e.stopPropagation();
      if (!explicit) shell.focus({ preventScroll: true });
      try { shell.setPointerCapture(e.pointerId); } catch {}
      owner = { id: e.pointerId, middle: e.button === 1 };
      beginPan(e.clientX, e.clientY);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (touches.has(e.pointerId)) {
        touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinch && touches.size === 2) {
          const mid = midpoint();
          const distance = spread();
          const c = zoomAt(camera.current, mid, distance / pinch.distance);
          setCamera({ ...c, x: c.x + mid.x - pinch.mid.x, y: c.y + mid.y - pinch.mid.y }, false);
          pinch = { distance, mid };
          return;
        }
      }
      if (owner && e.pointerId === owner.id) { e.preventDefault(); movePan(e.clientX, e.clientY); }
    };
    const onPointerEnd = (e: PointerEvent) => {
      if (touches.delete(e.pointerId)) {
        if (pinch && touches.size < 2) { pinch = null; queueSave(); }
      }
      if (!owner || e.pointerId !== owner.id) return;
      const moved = endPan();
      swallowClick = moved || owner.middle;
      owner = null;
      try { shell.releasePointerCapture(e.pointerId); } catch {}
    };
    const onMouseDown = (e: MouseEvent) => { if (e.button === 1) e.preventDefault(); };
    const onClick = (e: MouseEvent) => {
      if (!swallowClick) return;
      swallowClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      stopAnimation();
      touched.current = true;
      if (e.ctrlKey || e.metaKey) { setCamera(zoomAt(camera.current, { x: e.clientX, y: e.clientY }, wheelZoomFactor(e))); return; }
      const d = wheelPanDelta(e);
      const c = camera.current;
      setCamera({ ...c, x: c.x - d.x, y: c.y - d.y });
    };
    type GestureEvent = UIEvent & { scale: number; clientX: number; clientY: number };
    const onGestureStart = (e: Event) => { e.preventDefault(); gestureScale = 1; };
    const onGestureChange = (e: Event) => {
      const g = e as GestureEvent;
      e.preventDefault();
      touched.current = true;
      setCamera(zoomAt(camera.current, { x: g.clientX, y: g.clientY }, g.scale / gestureScale));
      gestureScale = g.scale;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat && !isInteractive(document.activeElement === shell ? null : document.activeElement)) {
        setSpaceHeld(true);
        if (document.activeElement === shell || document.activeElement === body) e.preventDefault();
      }
      if (e.target !== shell || e.altKey || e.ctrlKey || e.metaKey) return;
      const step = e.shiftKey ? KEY_PAN * 5 : KEY_PAN;
      const c = camera.current;
      const moves: Record<string, Point> = { ArrowLeft: { x: step, y: 0 }, ArrowRight: { x: -step, y: 0 }, ArrowUp: { x: 0, y: step }, ArrowDown: { x: 0, y: -step } };
      if (moves[e.key]) { e.preventDefault(); stopAnimation(); touched.current = true; setCamera({ ...c, x: c.x + moves[e.key].x, y: c.y + moves[e.key].y }); }
      else if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomBy(1.25); }
      else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomBy(0.8); }
      else if (e.key === "0") { e.preventDefault(); resetCamera(); }
      else if (e.key === "f" || e.key === "F") { e.preventDefault(); touched.current = true; fitAll(); }
    };
    const onKeyUp = (e: KeyboardEvent) => { if (e.code === "Space") setSpaceHeld(false); };
    const clearHeld = () => {
      setSpaceHeld(false);
      if (owner) { endPan(); owner = null; }
      touches.clear();
      pinch = null;
    };
    const onVisibility = () => { if (document.hidden) { clearHeld(); if (saveTimer.current) saveNow(); } };
    const onPageHide = () => { if (saveTimer.current) saveNow(); };
    // Labels and handles live in the canvas; keep the focused one on screen.
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (el === shell || !shell.contains(el) || el.tagName === "IFRAME") return;
      const head = el.closest<HTMLElement>("[data-item]");
      if (!head) return;
      const item = items.find(i => i.id === head.dataset.item);
      if (item) { const r = itemRect(item); ensureVisible({ x: r.x, y: r.y, w: Math.min(r.w, 600), h: 1 }); }
    };

    const active = { passive: false } as const;
    shell.addEventListener("pointerdown", onPointerDown, { capture: true, passive: false });
    shell.addEventListener("pointermove", onPointerMove, active);
    shell.addEventListener("pointerup", onPointerEnd);
    shell.addEventListener("pointercancel", onPointerEnd);
    shell.addEventListener("lostpointercapture", onPointerEnd);
    shell.addEventListener("mousedown", onMouseDown, active);
    shell.addEventListener("click", onClick, true);
    shell.addEventListener("auxclick", onClick, true);
    shell.addEventListener("wheel", onWheel, active);
    shell.addEventListener("gesturestart", onGestureStart, active);
    shell.addEventListener("gesturechange", onGestureChange, active);
    shell.addEventListener("focusin", onFocusIn);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearHeld);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      shell.removeEventListener("pointerdown", onPointerDown, { capture: true });
      shell.removeEventListener("pointermove", onPointerMove);
      shell.removeEventListener("pointerup", onPointerEnd);
      shell.removeEventListener("pointercancel", onPointerEnd);
      shell.removeEventListener("lostpointercapture", onPointerEnd);
      shell.removeEventListener("mousedown", onMouseDown);
      shell.removeEventListener("click", onClick, true);
      shell.removeEventListener("auxclick", onClick, true);
      shell.removeEventListener("wheel", onWheel);
      shell.removeEventListener("gesturestart", onGestureStart);
      shell.removeEventListener("gesturechange", onGestureChange);
      shell.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearHeld);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      if (frame.current) cancelAnimationFrame(frame.current);
      stopAnimation();
      window.clearTimeout(noticeTimer.current);
      if (saveTimer.current) saveNow();
      html.style.overscrollBehaviorX = previous.htmlX;
      body.style.overscrollBehaviorX = previous.bodyX;
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
    };
  }, [items, itemRect, beginPan, movePan, endPan, setCamera, setSpaceHeld, zoomBy, resetCamera, fitAll, queueSave, saveNow, ensureVisible]);

  const registerEl = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) itemEls.current.set(id, el);
    else itemEls.current.delete(id);
  }, []);

  return (
    <div ref={shellRef} className={styles.shell} tabIndex={0} role="application" aria-roledescription="canvas" aria-label="Page canvas" aria-describedby={helpId} data-ready={ready ? "" : undefined}>
      <div ref={worldRef} className={styles.world}>
        {items.map(item => (
          <Item key={item.id} item={item} x={placed[item.id].x} y={placed[item.id].y} drag={drag} connect={connect} registerEl={registerEl} helpId={helpId} />
        ))}
      </div>

      <div className={styles.toolbar} role="toolbar" aria-label="Camera">
        <button type="button" className={styles.tool} onClick={() => zoomBy(0.8)} aria-label="Zoom out"><Minus size={16} strokeWidth={1.75} aria-hidden="true" /></button>
        <span ref={zoomTextRef} className={styles.zoom} aria-live="off">25%</span>
        <button type="button" className={styles.tool} onClick={() => zoomBy(1.25)} aria-label="Zoom in"><Plus size={16} strokeWidth={1.75} aria-hidden="true" /></button>
        <button type="button" className={styles.toolText} onClick={() => { touched.current = true; fitAll(); }}><Maximize size={14} strokeWidth={1.75} aria-hidden="true" />Fit all</button>
        <button type="button" className={styles.toolText} onClick={resetCamera}><RotateCcw size={14} strokeWidth={1.75} aria-hidden="true" />Reset view</button>
      </div>

      <p id={helpId} className={styles.help}>
        Drag empty space to pan. Ctrl or ⌘ + scroll, or pinch, to zoom. Hold Space and drag, or drag with the middle button, to pan over a page.
        Drag the grip beside a name to move a page, or use the arrow keys on it.
      </p>
      <p className={styles.notice} role="status">{notice}</p>
    </div>
  );
}

type ItemProps = {
  item: CanvasItem;
  x: number;
  y: number;
  drag: React.RefObject<DragHandlers>;
  connect: Connect;
  registerEl: (id: string, el: HTMLDivElement | null) => void;
  helpId: string;
};

const Item = memo(function Item({ item, x, y, drag, connect, registerEl, helpId }: ItemProps) {
  const moving = useRef<{ id: number; x: number; y: number } | null>(null);
  const ref = useCallback((el: HTMLDivElement | null) => registerEl(item.id, el), [registerEl, item.id]);

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.focus({ preventScroll: true });
    e.currentTarget.setPointerCapture(e.pointerId);
    moving.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const m = moving.current;
    if (!m || e.pointerId !== m.id) return;
    // Screen movement to canvas coordinates at the current zoom.
    const z = drag.current.zoom();
    drag.current.move(item.id, (e.clientX - m.x) / z, (e.clientY - m.y) / z);
    m.x = e.clientX;
    m.y = e.clientY;
  };
  const onPointerEnd = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!moving.current || e.pointerId !== moving.current.id) return;
    moving.current = null;
    drag.current.commit(item.id);
  };
  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? KEY_MOVE * 10 : KEY_MOVE;
    const moves: Record<string, Point> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.move(item.id, m.x, m.y);
    drag.current.commit(item.id);
  };

  return (
    <div ref={ref} className={styles.item} style={{ transform: `translate(${x}px, ${y}px)`, width: item.width, ["--w" as string]: `${item.width}px` }}>
      <div className={styles.head} data-item={item.id}>
        <button
          type="button"
          className={styles.handle}
          aria-label={`Move ${item.name}`}
          aria-describedby={helpId}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onLostPointerCapture={onPointerEnd}
          onKeyDown={onKeyDown}
        >
          <GripVertical size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <NameButton name={item.name} />
      </div>
      <PreviewFrame item={item} connect={connect} />
    </div>
  );
});

function NameButton({ name }: { name: string }) {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const timer = useRef(0);
  const hintId = useId();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    window.clearTimeout(timer.current);
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(name);
      setState("copied");
      timer.current = window.setTimeout(() => setState("idle"), 1600);
    } catch {
      setState("manual");
    }
  };

  return (
    <span className={styles.nameWrap}>
      <button type="button" className={styles.name} aria-describedby={hintId} onClick={copy}>{name}</button>
      <span id={hintId} role="tooltip" className={styles.hint}>Copy “{name}”</span>
      <span className={styles.copyStatus} aria-live="polite">{state === "copied" ? "Copied" : ""}</span>
      {state === "manual" && (
        <input
          className={styles.manual}
          readOnly
          value={name}
          aria-label="Name to copy"
          autoFocus
          onFocus={e => e.currentTarget.select()}
          onBlur={() => setState("idle")}
        />
      )}
    </span>
  );
}

const PreviewFrame = memo(function PreviewFrame({ item, connect }: { item: CanvasItem; connect: Connect }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(item.height);

  useEffect(() => {
    const iframe = ref.current!;
    let disconnect = () => {};
    const onLoad = () => { disconnect(); disconnect = connect(iframe, item, setHeight); };
    iframe.addEventListener("load", onLoad);
    const doc = iframe.contentDocument;
    if (doc && doc.readyState === "complete" && doc.URL !== "about:blank") onLoad();
    return () => { iframe.removeEventListener("load", onLoad); disconnect(); };
  }, [item, connect]);

  return <iframe ref={ref} className={styles.frame} src={item.src} title={`${item.name} preview`} style={{ height }} />;
});
