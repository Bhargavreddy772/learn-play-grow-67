import React from 'react';
import { cn } from '@/lib/utils';

interface MascotProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  className?: string;
  animate?: boolean;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  message,
  className,
  animate = true,
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const moodEmojis = {
    happy: '😊',
    excited: '🤩',
    thinking: '🤔',
    celebrating: '🎉',
  };

  return (
    <div className={cn('relative inline-flex flex-col items-center', className)}>
      {message && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card border-2 border-border rounded-2xl px-4 py-2 shadow-card whitespace-nowrap animate-fade-in">
          <p className="font-display text-sm text-foreground font-medium">{message}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-b-2 border-r-2 border-border rotate-45" />
        </div>
      )}
      <div
        className={cn(
          sizeClasses[size],
          'relative flex items-center justify-center',
          animate && mood === 'happy' && 'animate-float',
          animate && mood === 'excited' && 'animate-wiggle',
          animate && mood === 'celebrating' && 'animate-celebrate',
          animate && mood === 'thinking' && 'animate-bounce-gentle'
        )}
      >
        {/* Owl mascot body */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Body */}
          <ellipse cx="50" cy="60" rx="35" ry="32" fill="#5DADE2" />
          {/* Belly */}
          <ellipse cx="50" cy="65" rx="22" ry="20" fill="#AED6F1" />
          {/* Left wing */}
          <ellipse cx="22" cy="55" rx="12" ry="20" fill="#3498DB" />
          {/* Right wing */}
          <ellipse cx="78" cy="55" rx="12" ry="20" fill="#3498DB" />
          {/* Head */}
          <circle cx="50" cy="35" r="28" fill="#5DADE2" />
          {/* Left ear tuft */}
          <polygon points="28,15 35,30 22,28" fill="#3498DB" />
          {/* Right ear tuft */}
          <polygon points="72,15 65,30 78,28" fill="#3498DB" />
          {/* Left eye white */}
          <circle cx="38" cy="35" r="12" fill="white" />
          {/* Right eye white */}
          <circle cx="62" cy="35" r="12" fill="white" />
          {/* Left pupil */}
          <circle 
            cx={mood === 'thinking' ? '36' : '40'} 
            cy={mood === 'excited' ? '33' : '35'} 
            r="6" 
            fill="#2C3E50" 
          />
          {/* Right pupil */}
          <circle 
            cx={mood === 'thinking' ? '60' : '64'} 
            cy={mood === 'excited' ? '33' : '35'} 
            r="6" 
            fill="#2C3E50" 
          />
          {/* Eye sparkles */}
          <circle cx="42" cy="32" r="2" fill="white" />
          <circle cx="66" cy="32" r="2" fill="white" />
          {/* Beak */}
          <polygon points="50,42 44,50 56,50" fill="#F39C12" />
          {/* Smile */}
          {(mood === 'happy' || mood === 'excited' || mood === 'celebrating') && (
            <path
              d="M 40 55 Q 50 62 60 55"
              stroke="#2C3E50"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}
          {/* Feet */}
          <ellipse cx="40" cy="90" rx="8" ry="4" fill="#F39C12" />
          <ellipse cx="60" cy="90" rx="8" ry="4" fill="#F39C12" />
        </svg>
        
        {/* Celebration stars for celebrating mood */}
        {mood === 'celebrating' && (
          <>
            <span className="absolute -top-2 -left-2 text-2xl animate-sparkle">⭐</span>
            <span className="absolute -top-4 right-0 text-xl animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</span>
            <span className="absolute top-0 -right-4 text-2xl animate-sparkle" style={{ animationDelay: '0.6s' }}>🌟</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Mascot;
