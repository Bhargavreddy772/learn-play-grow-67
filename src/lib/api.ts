const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function safeGet(path: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API fetch failed', path, err);
    return null;
  }
}

export async function getStudentDashboard(userId = 'u1') {
  return (await safeGet(`/api/students/${userId}/dashboard`)) || null;
}

export async function getSubjects(userId = 'u1') {
  const dashboard = await getStudentDashboard(userId);
  return dashboard?.data?.subjects ?? (await safeGet('/api/subjects'))?.data ?? null;
}

export async function getBadges(userId = 'u1') {
  const dashboard = await getStudentDashboard(userId);
  return dashboard?.data?.badges ?? null;
}

export async function getVideos(userId = 'u1') {
  const res = await safeGet(`/api/students/${userId}/videos`);
  return res?.data ?? null;
}

export async function getEvents(userId?: string) {
  if (userId) {
    const res = await safeGet(`/api/events?userId=${userId}`);
    return res?.data ?? null;
  }
  const res = await safeGet('/api/events');
  return res?.data ?? null;
}

export async function getLeaderboard(limit = 10) {
  const res = await safeGet(`/api/leaderboard?limit=${limit}`);
  return res?.data ?? null;
}

export async function getQuiz(id: string) {
  const res = await safeGet(`/api/quizzes/${id}`);
  return res?.data ?? null;
}

export async function submitQuiz(id: string, body: any) {
  try {
    const res = await fetch(`${API_BASE}/api/quizzes/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('submitQuiz failed', err);
    return null;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export default { getStudentDashboard, getSubjects, getBadges, getVideos, getEvents, getLeaderboard, getQuiz, submitQuiz };
