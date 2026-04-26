function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function getOrCreateUserId() {
  const key = "campus_portal_user_id";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const id = randomId("user");
  localStorage.setItem(key, id);
  return id;
}

// New session on every full page load/refresh.
export function newSessionId() {
  return randomId("sess");
}

