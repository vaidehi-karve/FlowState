export type TrackedEvent = {
  sessionId: string;
  userId: string;
  eventType: "click" | "scroll" | "nav" | "load" | "section_time" | "hover";
  element: string;
  page: string;
  timestamp: number;
  // extra fields allowed (server stores full JSON)
  [k: string]: unknown;
};

