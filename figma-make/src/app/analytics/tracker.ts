import type { TrackedEvent } from "./types";

export function nowTs() {
  return Date.now();
}

function pickPageLabel(pathname: string) {
  if (pathname === "/") return "home";
  return pathname.replace(/^\//, "");
}

function elementLabelFromTarget(target: EventTarget | null) {
  const el = target instanceof Element ? target : null;
  if (!el) return "unknown";

  // Don't let the analytics dashboard contaminate portal analytics.
  if (el.closest("[data-analytics-panel]")) return "analytics_panel";

  const tracked = el.closest("[data-track]") as HTMLElement | null;
  if (tracked?.dataset?.track) return tracked.dataset.track;

  const a = el.closest("a,button,[role='button']") as HTMLElement | null;
  const base = a ?? el;

  const text = (base.textContent || "").trim().slice(0, 60);
  const id = base.id ? `#${base.id}` : "";
  const cls = base.classList?.length ? `.${Array.from(base.classList).slice(0, 2).join(".")}` : "";
  const tag = base.tagName.toLowerCase();

  return text ? `${tag}${id}${cls}:${text}` : `${tag}${id}${cls}`;
}

async function postEvent(evt: TrackedEvent) {
  // Best-effort: never block UX on analytics.
  try {
    await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evt),
      keepalive: true,
    });
  } catch {
    // ignore
  }
}

export function startTracker(opts: { sessionId: string; userId: string; getPathname: () => string }) {
  const { sessionId, userId, getPathname } = opts;

  const send = (partial: Omit<TrackedEvent, "sessionId" | "userId" | "timestamp" | "page"> & { page?: string }) => {
    const pathname = getPathname();
    const evt: TrackedEvent = {
      sessionId,
      userId,
      timestamp: nowTs(),
      page: partial.page ?? pickPageLabel(pathname),
      ...partial,
    } as TrackedEvent;
    void postEvent(evt);
  };

  // load
  send({ eventType: "load", element: "window" });

  // click tracking (capture phase to catch early)
  const onClick = (e: MouseEvent) => {
    const targetEl = e.target instanceof Element ? e.target : null;
    if (targetEl?.closest("[data-analytics-panel]")) return;
    send({
      eventType: "click",
      element: elementLabelFromTarget(e.target),
      x: e.clientX,
      y: e.clientY,
    });
  };
  window.addEventListener("click", onClick, { capture: true });

  // hover dwell tracking (counts "hover" if user stays >= threshold)
  const HOVER_THRESHOLD_MS = 800;
  let hoverTimer = 0 as unknown as number;
  let hoverStart = 0;
  let hoverElement = "";

  const clearHover = () => {
    if (hoverTimer) window.clearTimeout(hoverTimer);
    hoverTimer = 0 as unknown as number;
    hoverStart = 0;
    hoverElement = "";
  };

  const onMouseOver = (e: MouseEvent) => {
    const targetEl = e.target instanceof Element ? e.target : null;
    if (!targetEl) return;
    if (targetEl.closest("[data-analytics-panel]")) return;

    const elLabel = elementLabelFromTarget(targetEl);
    if (!elLabel || elLabel === hoverElement) return;

    clearHover();
    hoverElement = elLabel;
    hoverStart = nowTs();
    hoverTimer = window.setTimeout(() => {
      // fire only if still hovering the same element after threshold
      send({
        eventType: "hover",
        element: hoverElement,
        hoverDurationMs: HOVER_THRESHOLD_MS,
      });
      // keep start time so mouseout can send a longer duration if desired
    }, HOVER_THRESHOLD_MS);
  };

  const onMouseOut = (e: MouseEvent) => {
    const targetEl = e.target instanceof Element ? e.target : null;
    if (!targetEl) return;
    if (!hoverStart || !hoverElement) return;

    const durationMs = nowTs() - hoverStart;
    // If they hovered long enough, emit a final duration event.
    if (durationMs >= HOVER_THRESHOLD_MS) {
      send({
        eventType: "hover",
        element: hoverElement,
        hoverDurationMs: durationMs,
      });
    }
    clearHover();
  };

  window.addEventListener("mouseover", onMouseOver, { capture: true });
  window.addEventListener("mouseout", onMouseOut, { capture: true });

  // scroll depth (throttled)
  let lastScrollAt = 0;
  const onScroll = () => {
    const t = nowTs();
    if (t - lastScrollAt < 700) return;
    lastScrollAt = t;

    const doc = document.documentElement;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    const depth = Math.round((window.scrollY / maxScroll) * 100);
    send({ eventType: "scroll", element: "window", scrollDepth: depth });
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // section time (intersection-based)
  const sectionEnterTs = new Map<string, number>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const sectionId = (entry.target as HTMLElement).dataset.sectionId;
        if (!sectionId) continue;
        const key = `${pickPageLabel(getPathname())}::${sectionId}`;

        if (entry.isIntersecting) {
          sectionEnterTs.set(key, nowTs());
        } else {
          const start = sectionEnterTs.get(key);
          if (start) {
            const durationMs = nowTs() - start;
            sectionEnterTs.delete(key);
            send({
              eventType: "section_time",
              element: "section",
              sectionId,
              durationMs,
            });
          }
        }
      }
    },
    { threshold: 0.35 }
  );

  const observeAll = () => {
    document.querySelectorAll<HTMLElement>("[data-section-id]").forEach((el) => observer.observe(el));
  };
  observeAll();

  // navigation event helper (called by hook on route change)
  const trackNav = (toPathname: string) => {
    send({ eventType: "nav", element: "route", page: pickPageLabel(toPathname), to: toPathname });
    // re-scan sections after navigation renders
    setTimeout(observeAll, 50);
  };

  const stop = () => {
    window.removeEventListener("click", onClick, true);
    window.removeEventListener("mouseover", onMouseOver, true);
    window.removeEventListener("mouseout", onMouseOut, true);
    window.removeEventListener("scroll", onScroll);
    observer.disconnect();
  };

  return { send, trackNav, stop };
}

