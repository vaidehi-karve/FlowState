function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function safeParseJson(s) {
  if (!s) return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export function aggregateSession(events) {
  const clicksByElement = {};
  const hoversByElement = {};
  const navPath = [];
  const pageDurationsMs = {};
  const scrollMaxByPage = {};
  const parsed = events.map((e) => ({ ...e, payload: safeParseJson(e.payloadJson) }));

  for (const e of parsed) {
    if (e.eventType === "click") {
      clicksByElement[e.element] = (clicksByElement[e.element] ?? 0) + 1;
    }
    if (e.eventType === "hover") {
      hoversByElement[e.element] = (hoversByElement[e.element] ?? 0) + 1;
    }
    if (e.eventType === "nav") {
      navPath.push(e.page);
    }
    if (e.eventType === "scroll") {
      const depth = typeof e.payload?.scrollDepth === "number" ? e.payload.scrollDepth : null;
      if (depth != null) {
        scrollMaxByPage[e.page] = Math.max(scrollMaxByPage[e.page] ?? 0, depth);
      }
    }
    if (e.eventType === "section_time") {
      const sectionId = e.payload?.sectionId;
      const durationMs = e.payload?.durationMs;
      if (typeof sectionId === "string" && typeof durationMs === "number") {
        const key = `${e.page}::${sectionId}`;
        pageDurationsMs[key] = (pageDurationsMs[key] ?? 0) + durationMs;
      }
    }
  }

  // Backtracking: count pattern A->B->A in navPath
  let backtracks = 0;
  for (let i = 2; i < navPath.length; i++) {
    if (navPath[i] === navPath[i - 2] && navPath[i] !== navPath[i - 1]) backtracks++;
  }

  return {
    totalEvents: events.length,
    clicksByElement,
    hoversByElement,
    topElements: Object.entries(clicksByElement)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([element, clicks]) => ({ element, clicks })),
    topHovered: Object.entries(hoversByElement)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([element, hovers]) => ({ element, hovers })),
    navPath,
    backtracks,
    pageSectionTimeMs: pageDurationsMs,
    scrollMaxByPage,
  };
}

export function computeFriction(events, aggregated) {
  if (events.length === 0) {
    return {
      frictionScore: 1,
      highFriction: false,
      issues: ["No interaction events received yet."],
      behaviorSummary: { reason: "empty_session" },
    };
  }

  const clicks = events.filter((e) => e.eventType === "click");
  const loads = events.filter((e) => e.eventType === "load");

  const firstTs = events[0].timestamp;
  const lastTs = events[events.length - 1].timestamp;
  const sessionDurationMs = Math.max(0, lastTs - firstTs);

  const firstAction = events.find((e) => e.eventType === "click" || e.eventType === "nav");
  const timeToActionMs = firstAction ? Math.max(0, firstAction.timestamp - firstTs) : sessionDurationMs;

  // Repeated clicks: any element with >= 3 clicks counts as a repetition problem.
  const repeatedElements = Object.entries(aggregated.clicksByElement).filter(([, n]) => n >= 3);
  const repeatedClicksScore = repeatedElements.length > 0 ? 2 : 0;

  // Idle time: count gaps > 20s between consecutive events.
  let idleGaps = 0;
  for (let i = 1; i < events.length; i++) {
    const gap = events[i].timestamp - events[i - 1].timestamp;
    if (gap >= 20_000) idleGaps++;
  }
  const idleScore = idleGaps > 0 ? 2 : 0;

  // Backtracking: any backtrack indicates confusion.
  const backtrackScore = aggregated.backtracks > 0 ? 1 : 0;

  // Low engagement: very few clicks over a meaningful duration.
  const lowEngagement = clicks.length < 4 && sessionDurationMs > 20_000;
  const lowEngagementScore = lowEngagement ? 1 : 0;

  // Time-to-action delay: if > 10s to do anything, count as friction.
  const timeToActionScore = timeToActionMs > 10_000 ? 2 : 0;

  let frictionScore = repeatedClicksScore + idleScore + backtrackScore + lowEngagementScore + timeToActionScore;
  frictionScore = clamp(frictionScore, 0, 10);

  const issues = [];
  if (repeatedClicksScore) {
    const top = repeatedElements
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([el, n]) => `${el} (${n} clicks)`);
    issues.push(`Repeated clicks detected on: ${top.join(", ")}`);
  }
  if (idleScore) issues.push(`Long idle gaps detected (${idleGaps} gap(s) ≥ 20s).`);
  if (backtrackScore) issues.push(`Navigation backtracking detected (${aggregated.backtracks} time(s)).`);
  if (lowEngagementScore) issues.push("Low engagement: few clicks over the session duration.");
  if (timeToActionScore) issues.push(`Slow first action: ${Math.round(timeToActionMs / 1000)}s to first click/nav.`);
  if (issues.length === 0) issues.push("No major friction patterns detected.");

  return {
    frictionScore,
    highFriction: frictionScore >= 4,
    issues,
    behaviorSummary: {
      sessionDurationMs,
      timeToActionMs,
      totalClicks: clicks.length,
      totalLoads: loads.length,
      idleGaps,
      backtracks: aggregated.backtracks,
      repeatedElements: repeatedElements.map(([element, clicks]) => ({ element, clicks })),
    },
  };
}
