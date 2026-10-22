// Connects one page preview (a same-origin frame) to the canvas host without touching the page's DOM:
// listeners only. Canvas gestures that start inside the page (Ctrl/Cmd + wheel, pinch, two-finger pan,
// Space + drag, middle drag) are forwarded to the host; everything else stays native to the page.
import { wheelPanDelta, wheelZoomFactor, type Rect } from "./camera";

export type FrameHost = {
  zoomAt(clientX: number, clientY: number, factor: number): void;
  panBy(dx: number, dy: number): void;
  beginPan(screenX: number, screenY: number): void;
  movePan(screenX: number, screenY: number): void;
  /** Ends a pan; true when it moved, so the click that follows is swallowed. */
  endPan(): boolean;
  isSpaceHeld(): boolean;
  setSpaceHeld(held: boolean): void;
  /** A same-origin link inside the page was activated. */
  followLink(url: URL): void;
  /** A link that would leave the canvas (another site, mailto:, tel:) was activated. */
  blockLink(): void;
  /** Keyboard focus moved inside the page; rect is in page pixels. */
  revealRect(rect: Rect): void;
  reportHeight(px: number): void;
};

const INTERACTIVE = 'input, textarea, select, button, a[href], summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="checkbox"], [role="radio"], [role="switch"], [role="tab"], [role="option"], [role="combobox"], [role="slider"], [role="menuitem"], [role="textbox"]';

/** True when focus is on a control or editable region, where Space must keep its own meaning. */
export function isInteractive(el: Element | null) {
  return !!el && el.nodeType === 1 && el.matches(INTERACTIVE);
}

/** Bottom of the page content, ignoring the body's viewport-height minimum and positioned overlays. */
function contentHeight(doc: Document, win: Window) {
  let bottom = 0;
  for (const el of Array.from(doc.body.children)) {
    if (el.tagName === "SCRIPT") continue;
    const style = win.getComputedStyle(el);
    if (style.display === "none" || style.position === "absolute" || style.position === "fixed") continue;
    const rect = el.getBoundingClientRect();
    if (!rect.height) continue;
    bottom = Math.max(bottom, rect.bottom + win.scrollY + parseFloat(style.marginBottom || "0"));
  }
  return Math.ceil(bottom);
}

/** Whether a nested scroll area under the pointer can still scroll in the wheel's direction. */
function canScroll(target: EventTarget | null, dx: number, dy: number, doc: Document, win: Window) {
  let el = target && (target as Node).nodeType === 1 ? (target as Element) : null;
  for (; el && el !== doc.body && el !== doc.documentElement; el = el.parentElement) {
    const style = win.getComputedStyle(el);
    if (dy && /auto|scroll|overlay/.test(style.overflowY) && el.scrollHeight > el.clientHeight) {
      if (dy < 0 ? el.scrollTop > 0 : el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true;
    }
    if (dx && /auto|scroll|overlay/.test(style.overflowX) && el.scrollWidth > el.clientWidth) {
      if (dx < 0 ? el.scrollLeft > 0 : el.scrollLeft + el.clientWidth < el.scrollWidth - 1) return true;
    }
  }
  return false;
}

export function connectFrame(iframe: HTMLIFrameElement, host: FrameHost): () => void {
  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;
  if (!win || !doc || !doc.body) return () => {};

  // Page pixels to host screen pixels, through the canvas transform.
  const toHost = (clientX: number, clientY: number) => {
    const rect = iframe.getBoundingClientRect();
    const scale = rect.width / iframe.offsetWidth || 1;
    return { x: rect.left + (iframe.clientLeft + clientX) * scale, y: rect.top + (iframe.clientTop + clientY) * scale };
  };

  let pan: { id: number; target: Element; middle: boolean } | null = null;
  let swallowClick = false;
  let gestureScale = 1;

  const onWheel = (e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const p = toHost(e.clientX, e.clientY);
      host.zoomAt(p.x, p.y, wheelZoomFactor(e));
      return;
    }
    const d = wheelPanDelta(e);
    if (canScroll(e.target, d.x, d.y, doc, win)) return;
    e.preventDefault();
    host.panBy(-d.x, -d.y);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space" && !e.repeat && !isInteractive(doc.activeElement)) host.setSpaceHeld(true);
  };
  const onKeyUp = (e: KeyboardEvent) => { if (e.code === "Space") host.setSpaceHeld(false); };
  const onBlur = () => host.setSpaceHeld(false);

  const onPointerDown = (e: PointerEvent) => {
    const middle = e.button === 1;
    const spacePan = e.button === 0 && host.isSpaceHeld() && !isInteractive(doc.activeElement);
    if (!middle && !spacePan) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const target = e.target as Element;
    try { target.setPointerCapture(e.pointerId); } catch {}
    pan = { id: e.pointerId, target, middle };
    host.beginPan(e.screenX, e.screenY);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!pan || e.pointerId !== pan.id) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    host.movePan(e.screenX, e.screenY);
  };
  const endPan = (e: Event) => {
    const pointerId = (e as PointerEvent).pointerId;
    if (!pan || pointerId !== pan.id) return;
    e.stopImmediatePropagation();
    try { pan.target.releasePointerCapture(pointerId); } catch {}
    const moved = host.endPan();
    // Nothing activates after a pan; a middle press never opens links in new tabs from here.
    swallowClick = moved || pan.middle;
    pan = null;
  };
  // Middle-button autoscroll starts on mousedown.
  const onMouseDown = (e: MouseEvent) => { if (e.button === 1) e.preventDefault(); };

  const onClick = (e: MouseEvent) => {
    if (swallowClick) {
      swallowClick = false;
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    if (e.type !== "click") return;
    const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    // Navigation belongs to the canvas host: page links reveal their target, others are turned off.
    e.preventDefault();
    e.stopImmediatePropagation();
    const url = new URL(link.href, doc.baseURI);
    if (url.origin === win.location.origin) host.followLink(url);
    else host.blockLink();
  };

  const onFocusIn = (e: FocusEvent) => {
    const el = e.target as Element;
    if (!el || el === doc.body || el.nodeType !== 1) return;
    const r = el.getBoundingClientRect();
    host.revealRect({ x: r.left + win.scrollX, y: r.top + win.scrollY, w: r.width, h: r.height });
  };

  // Safari reports trackpad pinch as gesture events rather than ctrl + wheel.
  type GestureEvent = UIEvent & { scale: number; clientX: number; clientY: number };
  const onGestureStart = (e: Event) => { e.preventDefault(); gestureScale = 1; };
  const onGestureChange = (e: Event) => {
    const g = e as GestureEvent;
    e.preventDefault();
    const p = toHost(g.clientX, g.clientY);
    host.zoomAt(p.x, p.y, g.scale / gestureScale);
    gestureScale = g.scale;
  };

  let measureFrame = 0;
  let lastHeight = 0;
  const measure = () => {
    measureFrame = 0;
    const height = contentHeight(doc, win);
    if (height > 0 && height !== lastHeight) {
      lastHeight = height;
      host.reportHeight(height);
    }
  };
  const scheduleMeasure = () => { if (!measureFrame) measureFrame = win.requestAnimationFrame(measure); };
  // The page's own ResizeObserver, so it watches elements of that document.
  const observer = new (win as Window & typeof globalThis).ResizeObserver(scheduleMeasure);
  for (const el of Array.from(doc.body.children)) if (el.tagName !== "SCRIPT") observer.observe(el);
  scheduleMeasure();

  const capture = { capture: true } as const;
  const active = { capture: true, passive: false } as const;
  win.addEventListener("wheel", onWheel, active);
  win.addEventListener("keydown", onKeyDown, capture);
  win.addEventListener("keyup", onKeyUp, capture);
  win.addEventListener("blur", onBlur);
  win.addEventListener("pointerdown", onPointerDown, active);
  win.addEventListener("pointermove", onPointerMove, active);
  win.addEventListener("pointerup", endPan, capture);
  win.addEventListener("pointercancel", endPan, capture);
  win.addEventListener("lostpointercapture", endPan, capture);
  win.addEventListener("mousedown", onMouseDown, active);
  win.addEventListener("click", onClick, active);
  win.addEventListener("auxclick", onClick, active);
  win.addEventListener("focusin", onFocusIn, capture);
  win.addEventListener("gesturestart", onGestureStart, active);
  win.addEventListener("gesturechange", onGestureChange, active);

  return () => {
    if (pan) {
      try { pan.target.releasePointerCapture(pan.id); } catch {}
      host.endPan();
      pan = null;
    }
    observer.disconnect();
    if (measureFrame) win.cancelAnimationFrame(measureFrame);
    win.removeEventListener("wheel", onWheel, active);
    win.removeEventListener("keydown", onKeyDown, capture);
    win.removeEventListener("keyup", onKeyUp, capture);
    win.removeEventListener("blur", onBlur);
    win.removeEventListener("pointerdown", onPointerDown, active);
    win.removeEventListener("pointermove", onPointerMove, active);
    win.removeEventListener("pointerup", endPan, capture);
    win.removeEventListener("pointercancel", endPan, capture);
    win.removeEventListener("lostpointercapture", endPan, capture);
    win.removeEventListener("mousedown", onMouseDown, active);
    win.removeEventListener("click", onClick, active);
    win.removeEventListener("auxclick", onClick, active);
    win.removeEventListener("focusin", onFocusIn, capture);
    win.removeEventListener("gesturestart", onGestureStart, active);
    win.removeEventListener("gesturechange", onGestureChange, active);
  };
}
