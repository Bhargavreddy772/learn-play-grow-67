import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  ClipboardList, 
  TrendingUp,
  Plus,
  MoreHorizontal,
  CheckCircle,
  Clock
} from 'lucide-react';

const courses = [
  { id: 1, title: 'Mathematics Grade 3', students: 28, progress: 65, status: 'active' },
  { id: 2, title: 'English Reading', students: 32, progress: 45, status: 'active' },
  { id: 3, title: 'Science Basics', students: 25, progress: 80, status: 'active' },
  { id: 4, title: 'Art & Craft', students: 30, progress: 30, status: 'draft' },
];

const recentActivity = [
  { id: 1, student: 'Alex Chen', action: 'completed Math Quiz #5', time: '2 min ago', score: '95%' },
  { id: 2, student: 'Emma Wilson', action: 'started English Lesson', time: '10 min ago' },
  { id: 3, student: 'James Brown', action: 'earned Perfect Score badge', time: '1 hour ago' },
  { id: 4, student: 'Sofia Garcia', action: 'completed Science Unit 3', time: '2 hours ago', score: '88%' },
];

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background professional-text">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">Teacher Dashboard</h1>
            </div>
            
            <Button variant="teacher" size="default">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Good morning, Mrs. Johnson 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your students today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={115}
            subtitle="Across all courses"
            icon={Users}
            trend={{ value: 12, positive: true }}
            variant="teacher"
          />
          <StatCard
            title="Active Courses"
            value={4}
            subtitle="2 in progress"
            icon={BookOpen}
            variant="teacher"
          />
          <StatCard
            title="Quizzes Created"
            value={24}
            subtitle="This semester"
            icon={ClipboardList}
            variant="teacher"
          />
          <StatCard
            title="Avg. Performance"
            value="78%"
            subtitle="Class average"
            icon={TrendingUp}
            trend={{ value: 5, positive: true }}
            variant="teacher"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">My Courses</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {course.students} students enrolled
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'active'
                            ? 'bg-student-green/10 text-student-green'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {course.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Course Progress</span>
                      <span className="font-medium text-foreground">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teacher-primary rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            </div>
            
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-teacher-secondary rounded-full flex items-center justify-center">
                      {activity.score ? (
                        <CheckCircle className="w-4 h-4 text-student-green" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.student}</span>{' '}
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        {activity.score && (
                          <span className="text-xs font-medium text-student-green">
                            {activity.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
