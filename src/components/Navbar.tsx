import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, X, GraduationCap, BookOpen, Users, Award, 
  ChevronDown, LogIn, UserPlus 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignInModal } from '@/components/SignInModal';

const navLinks = [
  { 
    label: 'Courses', 
    href: '#courses',
    icon: BookOpen,
    dropdown: [
      { label: 'Mathematics', href: '#' },
      { label: 'English', href: '#' },
      { label: 'Science', href: '#' },
      { label: 'Art & Music', href: '#' },
    ]
  },
  { label: 'About Us', href: '#about', icon: Users },
  { label: 'Achievements', href: '#achievements', icon: Award },
  { label: 'Contact', href: '#contact', icon: GraduationCap },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-student-blue via-student-purple to-student-orange flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <span className="font-display text-xl md:text-2xl font-black bg-gradient-to-r from-student-blue via-student-purple to-student-orange bg-clip-text text-transparent">
              LearnPal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all font-medium',
                    link.dropdown && 'cursor-pointer'
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      activeDropdown === link.label && 'rotate-180'
                    )} />
                  )}
                </a>
                
                {/* Dropdown */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in">
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="font-semibold"
              onClick={() => setShowSignIn(true)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-student-blue to-student-purple hover:opacity-90 text-white font-semibold shadow-lg"
              onClick={() => setShowSignIn(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Get Started Free
            </Button>
          </div>
          
          <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => { setIsOpen(false); setShowSignIn(true); }}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button
                  className="w-full justify-center bg-gradient-to-r from-student-blue to-student-purple text-white"
                  onClick={() => { setIsOpen(false); setShowSignIn(true); }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
