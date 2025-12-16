import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/Mascot';
import { QuizOption } from '@/components/QuizOption';
import { Confetti } from '@/components/Confetti';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const questions = [
  {
    id: 1,
    question: 'What is 7 + 5?',
    options: ['10', '12', '13', '11'],
    correct: 1,
    emoji: '🔢',
  },
  {
    id: 2,
    question: 'Which animal says "Moo"?',
    options: ['Dog', 'Cat', 'Cow', 'Sheep'],
    correct: 2,
    emoji: '🐄',
  },
  {
    id: 3,
    question: 'What color is the sky?',
    options: ['Green', 'Blue', 'Red', 'Yellow'],
    correct: 1,
    emoji: '🌤️',
  },
];

const StudentQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    setShowResult(true);
    if (isCorrect) {
      setScore(score + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      setShowConfetti(true);
    }
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Confetti active={showConfetti} />
        <div className="text-center max-w-md animate-scale-in">
          <Mascot mood="celebrating" size="xl" />
          <h1 className="font-display text-4xl font-bold text-foreground mt-8 mb-4">
            Amazing Job! 🎉
          </h1>
          <p className="text-xl text-muted-foreground font-display mb-8">
            You got {score} out of {questions.length} correct!
          </p>
          
          {/* Stars earned */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-12 h-12 transition-all duration-500',
                  i < Math.ceil((score / questions.length) * 3)
                    ? 'fill-student-yellow text-student-yellow animate-sparkle'
                    : 'text-muted-foreground/30'
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Certificate preview */}
          <div className="bg-gradient-to-br from-student-yellow/20 to-student-orange/20 border-2 border-student-yellow rounded-3xl p-8 mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Certificate of Achievement
            </h2>
            <p className="text-muted-foreground font-display">
              Awarded to <strong>Alex</strong> for completing the Math Quiz!
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/student')}
              className="font-display"
            >
              Back to Dashboard
            </Button>
            <Button
              variant="student-green"
              size="student-lg"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowResult(false);
                setScore(0);
                setQuizComplete(false);
              }}
            >
              Try Again! 🔄
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Confetti active={showConfetti} duration={1500} />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/student')}
              className="font-display"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-4">
              <span className="font-display font-bold text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-8 h-2 rounded-full transition-all duration-300',
                      i < currentQuestion
                        ? 'bg-student-green'
                        : i === currentQuestion
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <Mascot
            mood={showResult ? (isCorrect ? 'celebrating' : 'thinking') : 'happy'}
            size="md"
            message={
              showResult
                ? isCorrect
                  ? 'Woohoo! You got it right! 🌟'
                  : "Oops! That's okay, keep trying! 💪"
                : 'You can do it!'
            }
          />
        </div>

        {/* Question */}
        <div className="text-center mb-8 animate-fade-in">
          <span className="text-6xl mb-4 block">{question.emoji}</span>
          <h2 className="font-display text-3xl font-bold text-foreground">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <QuizOption
              key={index}
              label={String.fromCharCode(65 + index)}
              option={option}
              selected={selectedAnswer === index}
              correct={showResult ? index === question.correct : null}
              disabled={showResult}
              onClick={() => handleSelectAnswer(index)}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          {!showResult ? (
            <Button
              variant="student"
              size="student-xl"
              disabled={selectedAnswer === null}
              onClick={handleCheckAnswer}
            >
              Check Answer! ✨
            </Button>
          ) : (
            <Button
              variant="student-green"
              size="student-xl"
              onClick={handleNextQuestion}
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-6 h-6 ml-2" />
                </>
              ) : (
                'See My Results! 🏆'
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentQuiz;
