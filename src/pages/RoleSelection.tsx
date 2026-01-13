import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mascot } from "@/components/Mascot";
import {
  GraduationCap,
  BookOpenCheck,
  Sparkles,
  Star,
  Rocket,
  Heart,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: "student",
    title: "I'm a Student!",
    subtitle: "Age 5-10",
    description: "Learn, play, and earn stars with fun lessons!",
    icon: GraduationCap,
    path: "/signup?role=student",
    gradient: "from-student-blue via-student-cyan to-student-green",
    shadowClass: "shadow-glow-blue",
    emoji: "🎒",
    features: ["Fun Quizzes", "Earn Badges", "Track Progress"],
  },
  {
    id: "parent",
    title: "Parent Portal",
    subtitle: "Guardians",
    description: "Monitor your child's learning journey and progress",
    icon: Users,
    path: "/signup?role=parent",
    gradient: "from-student-cyan via-student-green to-student-blue",
    shadowClass: "shadow-glow-cyan",
    emoji: "👨‍👩‍👧",
    features: ["Progress Tracking", "Notifications", "Teacher Contact"],
  },
  {
    id: "teacher",
    title: "Instructor Portal",
    subtitle: "Educators",
    description: "Create courses, track progress, and inspire students",
    icon: BookOpenCheck,
    path: "/signup?role=teacher",
    gradient: "from-student-orange via-student-pink to-student-purple",
    shadowClass: "shadow-glow-orange",
    emoji: "👩‍🏫",
    features: ["Course Builder", "Analytics", "Student Reports"],
  },
];

const floatingElements = [
  { emoji: "📚", className: "top-[15%] left-[10%] animate-float", delay: "0s" },
  {
    emoji: "✏️",
    className: "top-[20%] right-[15%] animate-float",
    delay: "0.5s",
  },
  {
    emoji: "🎨",
    className: "bottom-[25%] left-[8%] animate-float",
    delay: "1s",
  },
  {
    emoji: "🔬",
    className: "bottom-[20%] right-[10%] animate-float",
    delay: "1.5s",
  },
  {
    emoji: "🌟",
    className: "top-[40%] left-[5%] animate-sparkle",
    delay: "0.3s",
  },
  {
    emoji: "🎯",
    className: "top-[35%] right-[8%] animate-bounce-gentle",
    delay: "0.7s",
  },
];

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-student-blue/30 to-student-cyan/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-student-orange/25 to-student-pink/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-student-green/25 to-student-yellow/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-student-purple/10 via-transparent to-student-blue/10 rounded-full blur-3xl" />

        {/* Floating decorative elements */}
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className={cn("absolute text-4xl opacity-60", el.className)}
            style={{ animationDelay: el.delay }}
          >
            {el.emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-student-blue/10 via-student-purple/10 to-student-orange/10 px-6 py-2 rounded-full border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-student-yellow" />
            <span className="text-sm font-medium text-foreground">
              Learning Made Fun & Easy
            </span>
            <Sparkles className="w-4 h-4 text-student-yellow" />
          </div>
        </header>

        {/* Hero section with mascot */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <Mascot mood="excited" size="xl" />
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tight">
              Welcome to{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-student-blue via-student-purple to-student-orange bg-clip-text text-transparent">
                  LearnPal
                </span>
                <Rocket className="absolute -top-2 -right-8 w-8 h-8 text-student-orange animate-bounce-gentle" />
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-display max-w-2xl mx-auto">
              Your friendly companion for learning adventures!
              <Heart className="inline w-5 h-5 text-student-pink mx-1 animate-pulse" />
            </p>
          </div>

          {/* Role selection cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-5xl mb-12">
            {roles.map((role, index) => (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-1 transition-all duration-500",
                  "hover:scale-[1.03] active:scale-[0.98]",
                  "animate-slide-up",
                  "focus:outline-none focus:ring-4 focus:ring-primary/30"
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient border */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-70 group-hover:opacity-100 transition-opacity duration-300",
                    role.gradient
                  )}
                />

                {/* Card content */}
                <div className="relative bg-card rounded-[22px] p-6 lg:p-8 h-full flex flex-col">
                  {/* Emoji with background glow */}
                  <div className="relative mb-4">
                    <div
                      className={cn(
                        "absolute inset-0 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity",
                        `bg-gradient-to-r ${role.gradient}`
                      )}
                    />
                    <span className="relative text-6xl block text-center group-hover:animate-bounce-gentle">
                      {role.emoji}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4",
                      "bg-gradient-to-br",
                      role.gradient
                    )}
                  >
                    <role.icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Text content */}
                  <div className="text-center flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {role.subtitle}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-foreground mt-1 mb-2">
                      {role.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {role.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {role.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Hover arrow */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Get Started</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { value: "10K+", label: "Happy Students", icon: Star },
              { value: "500+", label: "Fun Lessons", icon: BookOpenCheck },
              { value: "50+", label: "Expert Teachers", icon: GraduationCap },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-student-yellow" />
                  <span className="font-display text-3xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center py-6 animate-fade-in"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-sm text-muted-foreground font-display">
            Made with{" "}
            <Heart className="inline w-4 h-4 text-student-pink animate-pulse" />{" "}
            for young learners everywhere
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2024 LearnPal • Safe • Fun • Educational
          </p>
        </footer>
      </div>
    </div>
  );
};

export default RoleSelection;
