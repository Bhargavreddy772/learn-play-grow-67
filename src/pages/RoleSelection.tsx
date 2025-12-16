import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/Mascot';
import { GraduationCap, BookOpenCheck, Settings } from 'lucide-react';

const roles = [
  {
    id: 'student',
    title: 'I\'m a Student! 🎒',
    description: 'Learn, play, and earn stars!',
    icon: GraduationCap,
    path: '/student',
    color: 'student-blue',
    emoji: '📚',
  },
  {
    id: 'teacher',
    title: 'Teacher',
    description: 'Manage courses and track progress',
    icon: BookOpenCheck,
    path: '/teacher',
    color: 'teacher-primary',
    emoji: '👩‍🏫',
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'System management and reports',
    icon: Settings,
    path: '/admin',
    color: 'admin-primary',
    emoji: '⚙️',
  },
];

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-student-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-student-orange/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-student-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Mascot and welcome */}
        <div className="text-center mb-12 animate-fade-in">
          <Mascot mood="excited" size="lg" message="Welcome to LearnPal! 🎉" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-8 mb-4">
            Welcome to <span className="text-primary">LearnPal</span>
          </h1>
          <p className="text-lg text-muted-foreground font-display">
            Choose how you want to continue
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Button
              key={role.id}
              variant="role"
              onClick={() => navigate(role.path)}
              className="animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-5xl mb-4 group-hover:animate-bounce-gentle">
                {role.emoji}
              </span>
              <role.icon className="w-10 h-10 text-primary mb-2" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">
                {role.title}
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                {role.description}
              </p>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 font-display">
          Made with ❤️ for young learners everywhere
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
