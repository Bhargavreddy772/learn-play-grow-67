import React from 'react';
import { cn } from '@/lib/utils';
import { Star, BookOpen, Calculator, FlaskConical, Palette, Music } from 'lucide-react';

interface SubjectCardProps {
  subject: 'math' | 'english' | 'science' | 'art' | 'music';
  title: string;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  onClick?: () => void;
  className?: string;
}

const subjectConfig = {
  math: {
    icon: Calculator,
    gradient: 'gradient-math',
    emoji: '🔢',
  },
  english: {
    icon: BookOpen,
    gradient: 'gradient-english',
    emoji: '📚',
  },
  science: {
    icon: FlaskConical,
    gradient: 'gradient-science',
    emoji: '🔬',
  },
  art: {
    icon: Palette,
    gradient: 'gradient-art',
    emoji: '🎨',
  },
  music: {
    icon: Music,
    gradient: 'gradient-music',
    emoji: '🎵',
  },
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  title,
  progress,
  lessonsCompleted,
  totalLessons,
  onClick,
  className,
}) => {
  const config = subjectConfig[subject];
  const Icon = config.icon;
  const starsEarned = Math.floor(progress / 20);

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-3xl p-6 text-left transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-card active:scale-[0.98]',
        'focus:outline-none focus:ring-4 focus:ring-primary/30',
        config.gradient,
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <Icon className="w-full h-full text-primary-foreground" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Emoji and title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl animate-bounce-gentle">{config.emoji}</span>
          <h3 className="font-display text-2xl font-bold text-primary-foreground">
            {title}
          </h3>
        </div>

        {/* Stars earned */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-6 h-6 transition-all duration-300',
                i < starsEarned
                  ? 'fill-student-yellow text-student-yellow animate-sparkle'
                  : 'text-primary-foreground/40'
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-2">
          <div className="h-3 bg-primary-foreground/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-foreground rounded-full transition-all duration-500 animate-progress"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lessons count */}
        <p className="font-display text-sm text-primary-foreground/80">
          {lessonsCompleted} of {totalLessons} lessons complete! 🎯
        </p>
      </div>
    </button>
  );
};

export default SubjectCard;
