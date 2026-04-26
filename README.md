## Campus Portal Demo App (Analytics + Gemini UX Insights)

This repo contains:
- **Frontend**: `figma-make/` (Vite + React single-page campus portal UI + live analytics dashboard)
- **Backend**: `server/` (Node + Express + SQLite event store + friction scoring + Gemini AI insights)

### Prereqs
- Node.js (you have Node 22 already)
- A Google Gemini API key

### Setup

Create your server env file:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set `GEMINI_API_KEY`.

Install deps:

```bash
cd server && npm i
cd ../figma-make && npm i
```

### Run (two terminals)

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd figma-make
npm run dev
```

Open the Vite URL. The right-side panel shows live events, aggregates, friction score, and (when you click **Run AI Analysis**) real Gemini-generated UX recommendations based on the session’s tracked events.

