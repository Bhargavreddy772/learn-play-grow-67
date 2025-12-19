const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Mock data (placeholders) — replace with DB reads later
const subjects = [
  { id: 'math', subject: 'math', title: 'Math', progress: 75, lessonsCompleted: 15, totalLessons: 20 },
  { id: 'english', subject: 'english', title: 'English', progress: 60, lessonsCompleted: 12, totalLessons: 20 },
  { id: 'science', subject: 'science', title: 'Science', progress: 40, lessonsCompleted: 8, totalLessons: 20 },
  { id: 'art', subject: 'art', title: 'Art', progress: 90, lessonsCompleted: 18, totalLessons: 20 },
  { id: 'music', subject: 'music', title: 'Music', progress: 25, lessonsCompleted: 5, totalLessons: 20 },
];

const badges = [
  { type: 'star', label: 'Stars', count: 47, earned: true },
  { type: 'trophy', label: 'Quizzes Won', count: 12, earned: true },
  { type: 'medal', label: 'Perfect Score', count: 5, earned: true },
  { type: 'crown', label: 'Top Learner', earned: false },
];

const leaderboardData = [
  { rank: 1, name: 'Emma Watson', avatar: '👸', points: 2450, streak: 15 },
  { rank: 2, name: 'Noah Smith', avatar: '🧑‍🎓', points: 2280, streak: 12 },
  { rank: 3, name: 'Olivia Brown', avatar: '👧', points: 2150, streak: 10 },
  { rank: 4, name: 'Alex (You)', avatar: '🦸', points: 1890, streak: 7, isCurrentUser: true },
  { rank: 5, name: 'Liam Johnson', avatar: '👦', points: 1750, streak: 8 },
  { rank: 6, name: 'Sophia Davis', avatar: '👩‍🦱', points: 1620, streak: 5 },
  { rank: 7, name: 'Mason Wilson', avatar: '🧒', points: 1480, streak: 6 },
];

const videos = [
  { id: 'v1', title: 'Counting Fun', thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=225&fit=crop', url: 'https://example.com/video/1' },
  { id: 'v2', title: 'Animals Around Us', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=225&fit=crop', url: 'https://example.com/video/2' },
  { id: 'v3', title: 'Science Basics', thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop', url: 'https://example.com/video/3' },
];

const events = [
  { id: 'e1', title: 'Math Contest', date: '2025-12-20', type: 'contest', details: 'Inter-class math contest' },
  { id: 'e2', title: 'Holiday Break', date: '2025-12-24', type: 'holiday', details: 'School closed' },
];

const users = [
  { id: 'u1', name: 'Alex', role: 'student', email: 'alex@example.com' },
  { id: 'u2', name: 'Mrs. Johnson', role: 'teacher', email: 'johnson@example.com' },
];

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET subjects
app.get('/api/subjects', (req, res) => {
  res.json({ data: subjects });
});

// GET leaderboard (optionally limit)
app.get('/api/leaderboard', (req, res) => {
  const limit = parseInt(req.query.limit, 10) || leaderboardData.length;
  res.json({ data: leaderboardData.slice(0, limit) });
});

// GET events (optionally filter by userId)
app.get('/api/events', (req, res) => {
  // placeholder: ignore userId for now
  res.json({ data: events });
});

// GET subjects for a student
app.get('/api/students/:id/subjects', (req, res) => {
  res.json({ data: subjects });
});

// GET badges for a student
app.get('/api/students/:id/badges', (req, res) => {
  res.json({ data: badges });
});

// GET videos for a student
app.get('/api/students/:id/videos', (req, res) => {
  res.json({ data: videos });
});

// GET progress for a student
app.get('/api/students/:id/progress', (req, res) => {
  // build a mock progress response from subjects
  const userProgress = subjects.map((s) => ({
    subjectKey: s.id,
    percent: s.progress,
    lessonsCompleted: s.lessonsCompleted,
    totalLessons: s.totalLessons,
  }));
  res.json({ data: userProgress });
});

// Mock quiz data
const quizzes = [
  {
    id: 'q1',
    title: 'Simple Math Quiz',
    questions: [
      { id: 'q1-1', text: 'What is 7 + 5?', options: ['10', '12', '13', '11'] },
      { id: 'q1-2', text: 'Which animal says "Moo"?', options: ['Dog', 'Cat', 'Cow', 'Sheep'] },
    ],
  },
];

// GET quiz (student view) - do NOT include correct answers
app.get('/api/quizzes/:id', (req, res) => {
  const quiz = quizzes.find((q) => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  // return questions without correct answers (mock doesn't include them)
  res.json({ data: { id: quiz.id, title: quiz.title, questions: quiz.questions } });
});

// POST submit quiz - accepts { answers: [{ questionId, selectedIndex }], userId }
app.post('/api/quizzes/:id/submit', (req, res) => {
  const { answers = [], userId } = req.body || {};
  // Mock scoring: just check against a simple hardcoded answer map for demo
  const answerKey = { 'q1-1': 1, 'q1-2': 2 }; // indexes matching options
  let correctCount = 0;
  answers.forEach((a) => {
    if (answerKey[a.questionId] === a.selectedIndex) correctCount += 1;
  });
  const score = Math.round((correctCount / Object.keys(answerKey).length) * 100);

  const result = {
    id: `res-${Date.now()}`,
    quizId: req.params.id,
    userId: userId || 'anonymous',
    correctCount,
    total: Object.keys(answerKey).length,
    score,
    completedAt: new Date().toISOString(),
  };

  // In a real backend we'd persist the result and update leaderboard/progress
  res.status(201).json({ data: result });
});

// Student dashboard aggregation endpoint
app.get('/api/students/:id/dashboard', (req, res) => {
  const userId = req.params.id;
  // Find user or default to Alex
  const user = users.find((u) => u.id === userId) || users[0];

  const dashboard = {
    user: { id: user.id, name: user.name, role: user.role, email: user.email },
    subjects,
    badges,
    leaderboardTop: leaderboardData.slice(0, 5),
    videos,
    events,
    // additional computed fields
    streak: 7,
    stars: 47,
    dailyChallenge: { completed: 2, total: 3 },
  };

  res.json({ data: dashboard });
});

// Simple fallback for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Mock backend running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET http://localhost:${PORT}/api/students/:id/dashboard`);
  console.log(`  GET http://localhost:${PORT}/api/leaderboard?limit=5`);
  console.log(`  GET http://localhost:${PORT}/api/subjects`);
  console.log(`  GET http://localhost:${PORT}/api/events`);
  console.log(`  GET http://localhost:${PORT}/health`);
  console.log('\nTo run: (from project root)');
  console.log('  npm init -y');
  console.log('  npm install express cors');
  console.log('  node backend/server.js');
});
