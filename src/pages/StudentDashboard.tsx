import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "@/components/Mascot";
import { SubjectCard } from "@/components/SubjectCard";
import { ProgressBadge } from "@/components/ProgressBadge";
import { Leaderboard } from "@/components/Leaderboard";
import { EventsCalendar } from "@/components/EventsCalendar";
import { VideoLearning } from "@/components/VideoLearning";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Home } from "lucide-react";
import { apiGet } from "@/lib/api";
import { logout } from "@/lib/authStore";

// fallback static data (safe backup)
const defaultSubjects = [
  {
    id: "math",
    subject: "math" as const,
    title: "Math",
    progress: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
  },
  {
    id: "english",
    subject: "english" as const,
    title: "English",
    progress: 60,
    lessonsCompleted: 12,
    totalLessons: 20,
  },
  {
    id: "science",
    subject: "science" as const,
    title: "Science",
    progress: 40,
    lessonsCompleted: 8,
    totalLessons: 20,
  },
  {
    id: "art",
    subject: "art" as const,
    title: "Art",
    progress: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
  },
  {
    id: "music",
    subject: "music" as const,
    title: "Music",
    progress: 25,
    lessonsCompleted: 5,
    totalLessons: 20,
  },
];

const defaultBadges = [
  { type: "star" as const, label: "Stars", count: 47, earned: true },
  { type: "trophy" as const, label: "Quizzes Won", count: 12, earned: true },
  { type: "medal" as const, label: "Perfect Score", count: 5, earned: true },
  { type: "crown" as const, label: "Top Learner", earned: false },
];

type Subject = {
  id: string;
  subject: "math" | "english" | "science" | "art" | "music";
  title: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
};

type Badge = {
  type: "star" | "trophy" | "medal" | "crown";
  label: string;
  count?: number;
  earned: boolean;
};

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [mascotMessage, setMascotMessage] = useState(
    "Let's learn something fun today!"
  );
  const [activeTab, setActiveTab] = useState<
    "subjects" | "videos" | "calendar"
  >("subjects");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ backend returns: { data: dashboard }
        const res = await apiGet<{
          data: {
            subjects: Subject[];
            badges: Badge[];
          };
        }>("/api/students/u1/dashboard");

        setSubjects(res.data.subjects ?? defaultSubjects);
        setBadges(res.data.badges ?? defaultBadges);
      } catch (err: any) {
        console.warn("Failed to load dashboard data", err);
        setError("Failed to load dashboard data");
        setSubjects(defaultSubjects);
        setBadges(defaultBadges);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSubjectClick = (subjectId: string) => {
    setMascotMessage(`Great choice! Let's explore ${subjectId}! 🚀`);
    setTimeout(() => {
      navigate(`/student/quiz`);
    }, 500);
  };

  if (loading) {
    return <div className="p-6 font-display text-lg">Loading dashboard...</div>;
  }

  return (
    <div>
      {/* header buttons */}
      <div className="flex gap-2 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="font-display"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/role-selection")}
          className="font-display"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Roles
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700 font-display">
            {error} (Showing sample data)
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 animate-fade-in">
          <Mascot mood="happy" size="lg" message={mascotMessage} />
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Hi, Alex! 👋
            </h1>
            <p className="text-lg text-muted-foreground font-display">
              You're doing amazing! Keep up the great work!
            </p>
          </div>
        </div>

        {/* Achievements */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-7 h-7 text-student-orange" />
            My Achievements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <div
                key={badge.type || index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProgressBadge {...badge} />
              </div>
            ))}
          </div>
        </section>

        {/* Subjects */}
        {activeTab === "subjects" && (
          <section className="mt-8">
            <div className="grid md:grid-cols-2 gap-6">
              {subjects.map((subject, index) => (
                <div
                  key={subject.id || index}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SubjectCard
                    {...subject}
                    onClick={() => handleSubjectClick(subject.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* videos */}
        {activeTab === "videos" && <VideoLearning />}

        {/* calendar */}
        {activeTab === "calendar" && <EventsCalendar />}

        {/* sidebar */}
        <div className="mt-10">
          <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
