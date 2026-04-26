import express from "express";
import cors from "cors";
import { insertEvent, getSessionEvents } from "./db.js";
import { aggregateSession, computeFriction } from "./analytics.js";
import { getUxInsightsFromGemini } from "./gemini.js";
import { loadEnv } from "./env.js";

loadEnv();

const app = express();
app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: "1mb" }));

// Simple in-memory SSE subscribers keyed by sessionId
const streams = new Map(); // sessionId -> Set(res)

function broadcast(sessionId, data) {
  const subs = streams.get(sessionId);
  if (!subs) return;
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of subs) res.write(msg);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/event", (req, res) => {
  const evt = req.body;
  const valid =
    isNonEmptyString(evt?.sessionId) &&
    isNonEmptyString(evt?.userId) &&
    isNonEmptyString(evt?.eventType) &&
    isNonEmptyString(evt?.element) &&
    isNonEmptyString(evt?.page) &&
    Number.isFinite(evt?.timestamp);

  if (!valid) {
    return res.status(400).json({ error: "Invalid event payload." });
  }

  const payloadJson = JSON.stringify(evt);
  insertEvent(evt, payloadJson);
  broadcast(evt.sessionId, { type: "event", event: evt });
  res.json({ ok: true });
});

app.get("/api/session/:id/analytics", (req, res) => {
  const sessionId = req.params.id;
  const events = getSessionEvents(sessionId).map((e) => ({
    ...e,
    // Flatten for client convenience
    ...(e.payloadJson ? JSON.parse(e.payloadJson) : {}),
  }));
  const aggregated = aggregateSession(events);
  res.json({ sessionId, aggregated });
});

app.post("/api/session/:id/analyze", async (req, res) => {
  const sessionId = req.params.id;
  const events = getSessionEvents(sessionId).map((e) => ({
    ...e,
    ...(e.payloadJson ? JSON.parse(e.payloadJson) : {}),
  }));
  const aggregated = aggregateSession(events);
  const friction = computeFriction(events, aggregated);

  const recentEvents = events.slice(-40).map((e) => ({
    eventType: e.eventType,
    element: e.element,
    page: e.page,
    timestamp: e.timestamp,
  }));

  let ai;
  try {
    ai = await getUxInsightsFromGemini({ friction, aggregated, recentEvents });
  } catch (err) {
    ai = {
      provider: "gemini",
      error: `Gemini request failed: ${err instanceof Error ? err.message : String(err)}`,
      recommendations: [],
      rawText: "",
    };
  }

  const payload = { sessionId, friction, aggregated, ai };
  broadcast(sessionId, { type: "analysis", ...payload });
  res.json(payload);
});

app.get("/api/session/:id/stream", (req, res) => {
  const sessionId = req.params.id;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  res.write(`data: ${JSON.stringify({ type: "hello", sessionId })}\n\n`);

  if (!streams.has(sessionId)) streams.set(sessionId, new Set());
  streams.get(sessionId).add(res);

  req.on("close", () => {
    streams.get(sessionId)?.delete(res);
  });
});

const port = Number(process.env.PORT || 4010);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

