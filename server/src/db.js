import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dataDir = path.resolve(process.cwd(), "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, "analytics.sqlite");
export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sessionId TEXT NOT NULL,
    userId TEXT NOT NULL,
    eventType TEXT NOT NULL,
    element TEXT NOT NULL,
    page TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    payloadJson TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_events_session_ts ON events(sessionId, timestamp);
  CREATE INDEX IF NOT EXISTS idx_events_session_type ON events(sessionId, eventType);
`);

export function insertEvent(evt, payloadJson) {
  const stmt = db.prepare(
    `INSERT INTO events (sessionId, userId, eventType, element, page, timestamp, payloadJson)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  stmt.run(
    evt.sessionId,
    evt.userId,
    evt.eventType,
    evt.element,
    evt.page,
    evt.timestamp,
    payloadJson ?? null
  );
}

export function getSessionEvents(sessionId) {
  return db
    .prepare(
      `SELECT id, sessionId, userId, eventType, element, page, timestamp, payloadJson
       FROM events
       WHERE sessionId = ?
       ORDER BY timestamp ASC`
    )
    .all(sessionId);
}
