import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface QuizOptionProps {
  label: string;
  option: string;
  selected?: boolean;
  correct?: boolean | null;
  disabled?: boolean;
  onClick?: () => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  label,
  option,
  selected = false,
  correct = null,
  disabled = false,
  onClick,
}) => {
  const showResult = correct !== null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full p-5 rounded-2xl border-3 transition-all duration-300',
        'flex items-center gap-4 text-left font-display',
        'focus:outline-none focus:ring-4 focus:ring-primary/30',
        !showResult && !selected && 'border-border bg-card hover:border-primary hover:shadow-card hover:scale-[1.01]',
        !showResult && selected && 'border-primary bg-primary/10 shadow-card scale-[1.01]',
        showResult && correct && 'border-student-green bg-student-green/10',
        showResult && !correct && selected && 'border-destructive bg-destructive/10',
        showResult && !correct && !selected && 'border-border bg-card opacity-50',
        disabled && 'cursor-not-allowed'
      )}
    >
      {/* Option letter */}
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg',
          'transition-all duration-300',
          !showResult && !selected && 'bg-muted text-muted-foreground',
          !showResult && selected && 'bg-primary text-primary-foreground',
          showResult && correct && 'bg-student-green text-primary-foreground',
          showResult && !correct && selected && 'bg-destructive text-primary-foreground',
          showResult && !correct && !selected && 'bg-muted text-muted-foreground'
        )}
      >
        {showResult && correct ? (
          <Check className="w-6 h-6" />
        ) : showResult && !correct && selected ? (
          <X className="w-6 h-6" />
        ) : (
          label
        )}
      </div>

      {/* Option text */}
      <span className="text-lg text-foreground flex-1">{option}</span>

      {/* Result indicator */}
      {showResult && correct && (
        <span className="text-2xl animate-pop-in">🎉</span>
      )}
    </button>
  );
};

export default QuizOption;
