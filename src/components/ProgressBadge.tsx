import React from 'react';
import { cn } from '@/lib/utils';
import { Trophy, Star, Award, Medal, Crown } from 'lucide-react';

interface ProgressBadgeProps {
  type: 'star' | 'trophy' | 'medal' | 'crown' | 'award';
  label: string;
  earned?: boolean;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const badgeConfig = {
  star: { icon: Star, color: 'text-student-yellow', bg: 'bg-student-yellow/20' },
  trophy: { icon: Trophy, color: 'text-student-orange', bg: 'bg-student-orange/20' },
  medal: { icon: Medal, color: 'text-student-blue', bg: 'bg-student-blue/20' },
  crown: { icon: Crown, color: 'text-student-purple', bg: 'bg-student-purple/20' },
  award: { icon: Award, color: 'text-student-green', bg: 'bg-student-green/20' },
};

export const ProgressBadge: React.FC<ProgressBadgeProps> = ({
  type,
  label,
  earned = true,
  count,
  size = 'md',
  className,
}) => {
  const config = badgeConfig[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2',
        !earned && 'opacity-40 grayscale',
        className
      )}
    >
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center',
          config.bg,
          sizeClasses[size],
          earned && 'animate-pop-in'
        )}
      >
        <Icon
          className={cn(
            iconSizes[size],
            config.color,
            earned && 'animate-sparkle'
          )}
        />
        {count !== undefined && earned && (
          <span
            className={cn(
              'absolute -top-1 -right-1 bg-student-orange text-primary-foreground',
              'rounded-full w-7 h-7 flex items-center justify-center',
              'font-display font-bold text-sm shadow-soft'
            )}
          >
            {count}
          </span>
        )}
      </div>
      <span className="font-display text-sm text-foreground font-medium text-center">
        {label}
      </span>
    </div>
  );
};

export default ProgressBadge;
