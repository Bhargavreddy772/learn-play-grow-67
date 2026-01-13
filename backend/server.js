const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ------------------ MongoDB Connection ------------------
const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("learn_play_grow");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
}
connectDB();

// ------------------ JWT Middleware ------------------
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // Bearer TOKEN
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, role, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid or expired" });
  }
}

// ========================================================
// ===================== AUTH ROUTES =======================
// ========================================================

// ✅ SIGNUP
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const allowedRoles = ["student", "teacher", "parent", "admin"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashed,
      role,
      createdAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    const token = jwt.sign(
      { userId: result.insertedId, role: role, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: result.insertedId,
        name,
        email,
        role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ PROFILE (to test token)
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await db
      .collection("users")
      .findOne({ _id: userId }, { projection: { password: 0 } });
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ========================================================
// ===================== MOCK DATA =========================
// ========================================================

// Mock data (placeholders) — replace with DB reads later
const subjects = [
  {
    id: "math",
    subject: "math",
    title: "Math",
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
  },
  {
    id: "english",
    subject: "english",
    title: "English",
    progress: 60,
    lessonsCompleted: 12,
    totalLessons: 20,
  },
  {
    id: "science",
    subject: "science",
    title: "Science",
    progress: 40,
    lessonsCompleted: 8,
    totalLessons: 20,
  },
  {
    id: "art",
    subject: "art",
    title: "Art",
    progress: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
  },
  {
    id: "music",
    subject: "music",
    title: "Music",
    progress: 25,
    lessonsCompleted: 5,
    totalLessons: 20,
  },
];

const badges = [
  { type: "star", label: "Stars", count: 47, earned: true },
  { type: "trophy", label: "Quizzes Won", count: 12, earned: true },
  { type: "medal", label: "Perfect Score", count: 5, earned: true },
  { type: "crown", label: "Top Learner", earned: false },
];

const leaderboardData = [
  { rank: 1, name: "Emma Watson", avatar: "👸", points: 2450, streak: 15 },
  { rank: 2, name: "Noah Smith", avatar: "🧑‍🎓", points: 2280, streak: 12 },
  { rank: 3, name: "Olivia Brown", avatar: "👧", points: 2150, streak: 10 },
  {
    rank: 4,
    name: "Alex (You)",
    avatar: "🦸",
    points: 1890,
    streak: 7,
    isCurrentUser: true,
  },
  { rank: 5, name: "Liam Johnson", avatar: "👦", points: 1750, streak: 8 },
  { rank: 6, name: "Sophia Davis", avatar: "👩‍🦱", points: 1620, streak: 5 },
  { rank: 7, name: "Mason Wilson", avatar: "🧒", points: 1480, streak: 6 },
];

const videos = [
  {
    id: "v1",
    title: "Counting Fun",
    thumbnail:
      "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=225&fit=crop",
    url: "https://example.com/video/1",
  },
  {
    id: "v2",
    title: "Animals Around Us",
    thumbnail:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=225&fit=crop",
    url: "https://example.com/video/2",
  },
  {
    id: "v3",
    title: "Science Basics",
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=225&fit=crop",
    url: "https://example.com/video/3",
  },
];

const events = [
  {
    id: "e1",
    title: "Math Contest",
    date: "2025-12-20",
    type: "contest",
    details: "Inter-class math contest",
  },
  {
    id: "e2",
    title: "Holiday Break",
    date: "2025-12-24",
    type: "holiday",
    details: "School closed",
  },
];

// ------------------ Health ------------------
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ------------------ Existing APIs ------------------
app.get("/api/subjects", (req, res) => {
  res.json({ data: subjects });
});

app.get("/api/leaderboard", (req, res) => {
  const limit = parseInt(req.query.limit, 10) || leaderboardData.length;
  res.json({ data: leaderboardData.slice(0, limit) });
});

app.get("/api/events", (req, res) => {
  res.json({ data: events });
});

app.get("/api/students/:id/subjects", (req, res) => {
  res.json({ data: subjects });
});

app.get("/api/students/:id/badges", (req, res) => {
  res.json({ data: badges });
});

app.get("/api/students/:id/videos", (req, res) => {
  res.json({ data: videos });
});

app.get("/api/students/:id/progress", (req, res) => {
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
    id: "q1",
    title: "Simple Math Quiz",
    questions: [
      { id: "q1-1", text: "What is 7 + 5?", options: ["10", "12", "13", "11"] },
      {
        id: "q1-2",
        text: 'Which animal says "Moo"?',
        options: ["Dog", "Cat", "Cow", "Sheep"],
      },
    ],
  },
];

app.get("/api/quizzes/:id", (req, res) => {
  const quiz = quizzes.find((q) => q.id === req.params.id);
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json({
    data: { id: quiz.id, title: quiz.title, questions: quiz.questions },
  });
});

app.post("/api/quizzes/:id/submit", (req, res) => {
  const { answers = [], userId } = req.body || {};
  const answerKey = { "q1-1": 1, "q1-2": 2 };
  let correctCount = 0;

  answers.forEach((a) => {
    if (answerKey[a.questionId] === a.selectedIndex) correctCount += 1;
  });

  const score = Math.round(
    (correctCount / Object.keys(answerKey).length) * 100
  );

  const result = {
    id: `res-${Date.now()}`,
    quizId: req.params.id,
    userId: userId || "anonymous",
    correctCount,
    total: Object.keys(answerKey).length,
    score,
    completedAt: new Date().toISOString(),
  };

  res.status(201).json({ data: result });
});

// ✅ Student dashboard aggregation endpoint
// ✅ If you want it protected → add authMiddleware here
app.get("/api/students/:id/dashboard", (req, res) => {
  const dashboard = {
    user: {
      id: req.params.id,
      name: "Alex",
      role: "student",
      email: "alex@example.com",
    },
    subjects,
    badges,
    leaderboardTop: leaderboardData.slice(0, 5),
    videos,
    events,
    streak: 7,
    stars: 47,
    dailyChallenge: { completed: 2, total: 3 },
  };

  res.json({ data: dashboard });
});

// ------------------ 404 fallback ------------------
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ------------------ Listen ------------------
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log("Auth Endpoints:");
  console.log(`  POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`  POST http://localhost:${PORT}/api/auth/login`);
  console.log(`  GET  http://localhost:${PORT}/api/auth/me (protected)`);
});
