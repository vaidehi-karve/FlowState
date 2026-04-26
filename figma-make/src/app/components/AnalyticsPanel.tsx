import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  sessionId: string;
};

type LiveEvent = {
  eventType: string;
  element: string;
  page: string;
  timestamp: number;
};

type BetaTask = {
  id: string;
  title: string;
  description: string;
  completeIf: (e: LiveEvent) => boolean;
};

function pickDifferentTaskId(all: string[], current?: string | null) {
  if (all.length === 0) return null;
  if (all.length === 1) return all[0];
  let next = current;
  while (next === current) next = all[Math.floor(Math.random() * all.length)];
  return next;
}

export function AnalyticsPanel({ sessionId }: Props) {
  const [connected, setConnected] = React.useState(false);
  const [events, setEvents] = React.useState<LiveEvent[]>([]);
  const [analysis, setAnalysis] = React.useState<any>(null);
  const [friction, setFriction] = React.useState<any>(null);
  const [aggregated, setAggregated] = React.useState<any>(null);
  const [running, setRunning] = React.useState(false);
  const [taskDone, setTaskDone] = React.useState(false);

  const tasks: BetaTask[] = React.useMemo(
    () => [
      {
        id: "make_tuition_payment",
        title: "Beta task",
        description: "Make a tuition payment (submit the payment).",
        completeIf: (e) => e.eventType === "click" && e.element === "payments_submit",
      },
      {
        id: "enroll_payment_plan",
        title: "Beta task",
        description: "Enroll in a payment plan.",
        completeIf: (e) => e.eventType === "click" && e.element === "payment_plan_enroll",
      },
      {
        id: "upload_document",
        title: "Beta task",
        description: "Upload a required financial aid document.",
        completeIf: (e) => e.eventType === "click" && e.element === "documents_upload_submit",
      },
      {
        id: "search_courses",
        title: "Beta task",
        description: "Search for a Spring course using the course search filters.",
        completeIf: (e) => e.eventType === "click" && e.element === "courses_search",
      },
      {
        id: "register_course",
        title: "Beta task",
        description: "Register for any available course.",
        completeIf: (e) => e.eventType === "click" && e.element.startsWith("courses_action_register_"),
      },
    ],
    []
  );

  const [taskId, setTaskId] = React.useState<string | null>(() =>
    pickDifferentTaskId(tasks.map((t) => t.id), null)
  );

  const betaTask = React.useMemo(() => tasks.find((t) => t.id === taskId) ?? tasks[0], [tasks, taskId]);

  React.useEffect(() => {
    // New session (refresh) -> new random task.
    setTaskId(pickDifferentTaskId(tasks.map((t) => t.id), null));
    setTaskDone(false);
  }, [sessionId, tasks]);

  React.useEffect(() => {
    const es = new EventSource(`/api/session/${sessionId}/stream`);

    es.onopen = () => setConnected(true);
    es.onerror = () => setConnected(false);
    es.onmessage = (msg) => {
      try {
        const data = JSON.parse(msg.data);
        if (data.type === "event" && data.event) {
          const e = data.event;
          setEvents((prev) => [...prev.slice(-199), e]);
          if (!taskDone && betaTask.completeIf(e)) setTaskDone(true);
        }
        if (data.type === "analysis") {
          setAnalysis(data.ai);
          setFriction(data.friction);
          setAggregated(data.aggregated);
        }
      } catch {
        // ignore
      }
    };

    return () => es.close();
  }, [sessionId, betaTask, taskDone]);

  const refreshAggregates = React.useCallback(async () => {
    try {
      const r = await fetch(`/api/session/${sessionId}/analytics`);
      const j = await r.json();
      setAggregated(j.aggregated);
    } catch {
      // ignore
    }
  }, [sessionId]);

  React.useEffect(() => {
    void refreshAggregates();
    const t = window.setInterval(refreshAggregates, 2500);
    return () => window.clearInterval(t);
  }, [refreshAggregates]);

  const runAnalyze = async () => {
    setRunning(true);
    try {
      const r = await fetch(`/api/session/${sessionId}/analyze`, { method: "POST" });
      const j = await r.json();
      setAnalysis(j.ai);
      setFriction(j.friction);
      setAggregated(j.aggregated);
    } finally {
      setRunning(false);
    }
  };

  const frictionScore = friction?.frictionScore ?? null;
  const top = aggregated?.topElements ?? [];
  const navPath: string[] = aggregated?.navPath ?? [];

  return (
    <aside
      data-analytics-panel
      className="fixed right-0 top-0 h-screen w-[340px] sm:w-[360px] lg:w-[400px] xl:w-[420px] max-w-[90vw] border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 z-50"
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium">Analytics + AI Insights</div>
            <div className="text-xs text-muted-foreground">
              Session: <span className="font-mono">{sessionId}</span> •{" "}
              <span className={connected ? "text-green-600" : "text-red-600"}>
                {connected ? "live" : "disconnected"}
              </span>
            </div>
          </div>
          <Button onClick={runAnalyze} disabled={running} data-track="analytics_run_ai">
            {running ? "Analyzing…" : "Run AI Analysis"}
          </Button>
        </div>

        <ScrollArea className="flex-1 min-h-0 overflow-hidden">
          <div className="p-4 space-y-4 overflow-x-hidden">
            <div className="rounded border">
              <div className="px-3 py-2 border-b text-sm font-medium flex items-center justify-between gap-3">
                <span>{betaTask.title}</span>
                <button
                  className="text-xs px-2 py-1 rounded border hover:bg-muted shrink-0"
                  onClick={() => {
                    setTaskId((cur) => pickDifferentTaskId(tasks.map((t) => t.id), cur));
                    setTaskDone(false);
                  }}
                  data-track="beta_task_new"
                >
                  New task
                </button>
              </div>
              <div className="p-3">
                <div className="text-sm">{betaTask.description}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Status:{" "}
                  <span className={taskDone ? "text-green-600" : "text-muted-foreground"}>
                    {taskDone ? "completed" : "in progress"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border p-3">
                <div className="text-xs text-muted-foreground">Friction score</div>
                <div className="text-2xl font-semibold">{frictionScore ?? "—"}</div>
              </div>
              <div className="rounded border p-3">
                <div className="text-xs text-muted-foreground">Nav path</div>
                <div className="text-xs mt-1 break-words overflow-hidden">
                  {navPath.length ? navPath.join(" → ") : "—"}
                </div>
              </div>
            </div>

            <div className="rounded border">
              <div className="px-3 py-2 border-b text-sm font-medium">Top clicked</div>
              <div className="p-3 space-y-1">
                {top.length ? (
                  top.slice(0, 10).map((t: any) => (
                    <div key={t.element} className="flex items-center justify-between gap-3 text-xs">
                      <span className="min-w-0 flex-1 break-words whitespace-normal">{t.element}</span>
                      <span className="font-mono shrink-0">{t.clicks}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">No clicks yet.</div>
                )}
              </div>
            </div>

            <div className="rounded border">
              <div className="px-3 py-2 border-b text-sm font-medium">AI recommendations</div>
              <div className="p-3">
                {analysis?.error ? (
                  <div className="text-xs text-red-600 break-words whitespace-pre-wrap">
                    {analysis.error}
                  </div>
                ) : analysis?.recommendations?.length ? (
                  <div className="space-y-3">
                    {analysis.recommendations.map((r: any, idx: number) => (
                      <div key={idx} className="rounded border p-3">
                        <div className="text-xs text-muted-foreground">{r.priority ?? "P?"}</div>
                        <div className="text-sm font-medium">{r.title}</div>
                        {r.why ? <div className="text-xs mt-1 text-muted-foreground">{r.why}</div> : null}
                        {r.how ? <div className="text-xs mt-1">{r.how}</div> : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Click “Run AI Analysis” to send real session analytics to Gemini.
                  </div>
                )}
              </div>
            </div>

            <div className="rounded border">
              <div className="px-3 py-2 border-b text-sm font-medium">Live event stream</div>
              <div className="p-3 space-y-2">
                {events.length ? (
                  events
                    .slice()
                    .reverse()
                    .slice(0, 120)
                    .map((e, idx) => (
                      <div key={idx} className="text-xs break-words whitespace-normal">
                        <span className="font-mono text-muted-foreground">
                          {new Date(e.timestamp).toLocaleTimeString()}
                        </span>{" "}
                        <span className="font-mono">{e.eventType}</span>{" "}
                        <span className="text-muted-foreground">{e.page}</span>{" "}
                        <span className="break-words whitespace-normal">{e.element}</span>
                      </div>
                    ))
                ) : (
                  <div className="text-xs text-muted-foreground">Interact with the portal to generate events.</div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}

