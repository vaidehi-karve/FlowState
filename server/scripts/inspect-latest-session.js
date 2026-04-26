import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";

const dbPath = fileURLToPath(new URL("../data/analytics.sqlite", import.meta.url));
const db = new Database(dbPath);

const sessions = db
  .prepare(
    `select sessionId,
            count(*) as events,
            sum(case when eventType='click' then 1 else 0 end) as clicks,
            sum(case when eventType='nav' then 1 else 0 end) as nav,
            sum(case when eventType='scroll' then 1 else 0 end) as scroll,
            max(timestamp) as lastTs
     from events
     group by sessionId
     order by lastTs desc
     limit 5`
  )
  .all();

console.log("Recent sessions:", sessions);

const latest = sessions[0];
if (!latest) process.exit(0);

const topElements = db
  .prepare(
    `select element, count(*) as n
     from events
     where sessionId = ? and eventType = 'click'
     group by element
     order by n desc
     limit 20`
  )
  .all(latest.sessionId);

console.log("\nTop click elements for latest session:", latest.sessionId);
console.log(topElements);

