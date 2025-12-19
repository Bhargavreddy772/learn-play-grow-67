import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Mascot } from '@/components/Mascot';
import { 
  GraduationCap, BookOpen, Users, Award, Star, Play, 
  CheckCircle, ArrowRight, Sparkles, Rocket, Heart,
  Shield, Clock, Zap, Globe, Trophy, TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const courses = [
  { 
    id: 'math', 
    title: 'Mathematics', 
    description: 'Fun with numbers, shapes & puzzles',
    icon: '🔢',
    color: 'from-student-blue to-student-cyan',
    students: '2.5K+',
    lessons: 45,
    rating: 4.9
  },
  { 
    id: 'english', 
    title: 'English', 
    description: 'Reading, writing & storytelling',
    icon: '📚',
    color: 'from-student-orange to-student-yellow',
    students: '3.2K+',
    lessons: 52,
    rating: 4.8
  },
  { 
    id: 'science', 
    title: 'Science', 
    description: 'Discover the world around you',
    icon: '🔬',
    color: 'from-student-green to-student-cyan',
    students: '1.8K+',
    lessons: 38,
    rating: 4.9
  },
  { 
    id: 'art', 
    title: 'Art & Creativity', 
    description: 'Express yourself through colors',
    icon: '🎨',
    color: 'from-student-pink to-student-purple',
    students: '1.5K+',
    lessons: 30,
    rating: 4.7
  },
];

const features = [
  { 
    icon: Shield, 
    title: 'Safe Learning', 
    description: 'Child-safe environment with parental controls',
    color: 'text-student-green'
  },
  { 
    icon: Zap, 
    title: 'Interactive Lessons', 
    description: 'Engaging quizzes, games, and activities',
    color: 'text-student-yellow'
  },
  { 
    icon: Trophy, 
    title: 'Rewards System', 
    description: 'Earn badges, stars, and certificates',
    color: 'text-student-orange'
  },
  { 
    icon: TrendingUp, 
    title: 'Progress Tracking', 
    description: 'Visual progress for students and parents',
    color: 'text-student-blue'
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Parent',
    avatar: '👩',
    text: 'My daughter loves learning on LearnPal! The mascot keeps her motivated.',
    rating: 5
  },
  {
    name: 'James T.',
    role: 'Teacher',
    avatar: '👨‍🏫',
    text: 'Best platform for young learners. Easy to create courses and track progress.',
    rating: 5
  },
  {
    name: 'Emily R.',
    role: 'Parent',
    avatar: '👩‍🦰',
    text: 'Safe, fun, and educational. My kids ask to do their lessons every day!',
    rating: 5
  },
];

const stats = [
  { value: '10K+', label: 'Happy Students', icon: Users },
  { value: '500+', label: 'Interactive Lessons', icon: BookOpen },
  { value: '50+', label: 'Expert Teachers', icon: GraduationCap },
  { value: '4.9', label: 'Average Rating', icon: Star },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-student-blue/20 to-student-cyan/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-student-orange/15 to-student-pink/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-student-green/15 to-student-yellow/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-student-blue/10 to-student-purple/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-student-yellow" />
                <span className="text-sm font-semibold text-foreground">#1 Learning Platform for Kids</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight">
                Make Learning 
                <span className="relative inline-block mx-2">
                  <span className="bg-gradient-to-r from-student-blue via-student-purple to-student-orange bg-clip-text text-transparent">
                    Fun & Easy
                  </span>
                </span>
                for Your Child
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                India's most loved learning platform for primary school students. 
                Interactive lessons, friendly mascots, and rewards that make education exciting!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-student-blue to-student-purple hover:opacity-90 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
                  onClick={() => navigate('/role-selection')}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-bold text-lg px-8 py-6 rounded-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['👦', '👧', '🧒', '👶'].map((avatar, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-lg">
                      {avatar}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-student-yellow fill-student-yellow" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Loved by 10,000+ students</p>
                </div>
              </div>
            </div>

            {/* Right Content - Mascot */}
            <div className="relative flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 text-4xl animate-float">📚</div>
                <div className="absolute -top-4 -right-12 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>✨</div>
                <div className="absolute -bottom-4 -left-12 text-4xl animate-float" style={{ animationDelay: '1s' }}>🎯</div>
                <div className="absolute bottom-8 -right-8 text-4xl animate-float" style={{ animationDelay: '1.5s' }}>🏆</div>
                
                <div className="bg-gradient-to-br from-student-blue/10 via-student-purple/10 to-student-orange/10 rounded-[3rem] p-8 border border-primary/10">
                  <Mascot mood="excited" size="xl" message="Let's learn together! 🚀" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gradient-to-r from-student-blue via-student-purple to-student-orange">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-2 opacity-80" />
                <div className="text-3xl md:text-4xl font-black">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
              Why Parents & Teachers Love LearnPal
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed with care for young minds, our platform makes learning a joyful adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="bg-card rounded-2xl p-6 border border-border hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={cn('w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our engaging curriculum designed for primary school students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, i) => (
              <div 
                key={course.id}
                className="group bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => navigate('/role-selection')}
              >
                <div className={cn('h-32 bg-gradient-to-br flex items-center justify-center', course.color)}>
                  <span className="text-6xl group-hover:scale-110 transition-transform">{course.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{course.students} students</span>
                    <span className="flex items-center gap-1 text-student-yellow font-semibold">
                      <Star className="w-4 h-4 fill-student-yellow" />
                      {course.rating}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-student-blue font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Learning <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              variant="outline"
              className="font-bold"
              onClick={() => navigate('/role-selection')}
            >
              View All Courses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
              What Parents & Teachers Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div 
                key={i}
                className="bg-card rounded-2xl p-6 border border-border animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-student-yellow fill-student-yellow" />
                  ))}
                </div>
                <p className="text-foreground mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-student-blue via-student-purple to-student-orange">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="font-display text-3xl md:text-5xl font-black mb-6">
            Ready to Start the Learning Adventure?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy students and parents. Start your free trial today!
          </p>
          <Button
            size="lg"
            className="bg-white text-student-purple hover:bg-white/90 font-bold text-lg px-10 py-6 rounded-xl shadow-xl"
            onClick={() => navigate('/role-selection')}
          >
            Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-student-blue to-student-purple flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="font-display text-xl font-black">LearnPal</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making learning fun and accessible for every child.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Courses</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Refund Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <p className="text-sm text-muted-foreground mb-4">
                contact@learnpal.edu
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 LearnPal. Made with <Heart className="w-4 h-4 inline text-student-pink" /> for young learners</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Home;
