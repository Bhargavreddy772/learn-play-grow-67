import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mascot } from '@/components/Mascot';
import { SubjectCard } from '@/components/SubjectCard';
import { ProgressBadge } from '@/components/ProgressBadge';
import { Leaderboard } from '@/components/Leaderboard';
import { EventsCalendar } from '@/components/EventsCalendar';
import { VideoLearning } from '@/components/VideoLearning';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Flame, Home, Calendar, Play } from 'lucide-react';

const subjects = [
  { id: 'math', subject: 'math' as const, title: 'Math', progress: 75, lessonsCompleted: 15, totalLessons: 20 },
  { id: 'english', subject: 'english' as const, title: 'English', progress: 60, lessonsCompleted: 12, totalLessons: 20 },
  { id: 'science', subject: 'science' as const, title: 'Science', progress: 40, lessonsCompleted: 8, totalLessons: 20 },
  { id: 'art', subject: 'art' as const, title: 'Art', progress: 90, lessonsCompleted: 18, totalLessons: 20 },
  { id: 'music', subject: 'music' as const, title: 'Music', progress: 25, lessonsCompleted: 5, totalLessons: 20 },
];

const badges = [
  { type: 'star' as const, label: 'Stars', count: 47, earned: true },
  { type: 'trophy' as const, label: 'Quizzes Won', count: 12, earned: true },
  { type: 'medal' as const, label: 'Perfect Score', count: 5, earned: true },
  { type: 'crown' as const, label: 'Top Learner', earned: false },
];

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [mascotMessage, setMascotMessage] = useState("Let's learn something fun today!");
  const [activeTab, setActiveTab] = useState<'subjects' | 'videos' | 'calendar'>('subjects');

  const handleSubjectClick = (subjectId: string) => {
    setMascotMessage(`Great choice! Let's explore ${subjectId}! 🚀`);
    setTimeout(() => {
      navigate(`/student/quiz`);
import api from '@/lib/api';
    }, 500);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [badges, setBadges] = useState<any[]>([]);
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/role-selection')}
                className="font-display"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Roles
              </Button>
  React.useEffect(() => {
    (async () => {
      try {
        const dash = await api.getStudentDashboard('u1');
        if (dash?.data) {
          setSubjects(dash.data.subjects || []);
          setBadges(dash.data.badges || []);
        } else {
          const s = await api.getSubjects('u1');
          const b = await api.getBadges('u1');
          setSubjects(s || []);
          setBadges(b || []);
        }
      } catch (err) {
        console.warn('Failed to load dashboard data', err);
      }
    })();
  }, []);
            </div>
            
            <div className="flex items-center gap-4">
              {/* Streak indicator */}
              <div className="flex items-center gap-2 bg-student-orange/10 px-4 py-2 rounded-full">
                <Flame className="w-5 h-5 text-student-orange animate-pulse" />
                <span className="font-display font-bold text-student-orange">7 Day Streak!</span>
              </div>
              
              {/* Stars count */}
              <div className="flex items-center gap-2 bg-student-yellow/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-student-yellow fill-student-yellow" />
                <span className="font-display font-bold text-student-yellow">47</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
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

        {/* Main content grid with leaderboard */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left content - subjects and achievements */}
          <div className="lg:col-span-2 space-y-12">
            {/* Progress badges */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Trophy className="w-7 h-7 text-student-orange" />
                My Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {badges.map((badge, index) => (
                  <div
                    key={badge.type}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProgressBadge {...badge} />
                  </div>
                ))}
              </div>
            </section>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'subjects', label: 'My Subjects', icon: '📖' },
                { id: 'videos', label: 'Video Lessons', icon: '🎬' },
                { id: 'calendar', label: 'Calendar', icon: '📅' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'student' : 'student-outline'}
                  size="lg"
                  className="font-display"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Content based on active tab */}
            {activeTab === 'subjects' && (
              <section>
                <div className="grid md:grid-cols-2 gap-6">
                  {subjects.map((subject, index) => (
                    <div
                      key={subject.id}
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

            {activeTab === 'videos' && (
              <section className="animate-fade-in">
                <VideoLearning />
              </section>
            )}

            {activeTab === 'calendar' && (
              <section className="animate-fade-in">
                <EventsCalendar />
              </section>
            )}

            {/* Daily challenge */}
            <section>
              <div className="bg-gradient-to-r from-student-purple to-student-pink rounded-3xl p-8 text-primary-foreground">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="text-6xl animate-bounce-gentle">🎯</div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Daily Challenge!
                    </h3>
                    <p className="text-primary-foreground/80 font-display mb-4">
                      Complete 3 lessons today to earn a special badge!
                    </p>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <div className="flex">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-primary-foreground/50 ${
                              i <= 2 ? 'bg-primary-foreground/30' : ''
                            } -ml-2 first:ml-0`}
                          />
                        ))}
                      </div>
                      <span className="font-display font-bold">2/3 Complete</span>
                    </div>
                  </div>
                  <Button
                    variant="student"
                    size="student-lg"
                    className="bg-primary-foreground text-student-purple hover:bg-primary-foreground/90"
                    onClick={() => navigate('/student/quiz')}
                  >
                    Start Lesson! 🚀
                  </Button>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar - Leaderboard */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Leaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
