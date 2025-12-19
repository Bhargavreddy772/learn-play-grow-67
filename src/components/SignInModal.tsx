import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  GraduationCap, 
  Users, 
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'student' | 'parent' | 'instructor' | null;

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  {
    id: 'student' as const,
    label: 'Student',
    icon: GraduationCap,
    color: 'from-student-blue to-student-purple',
    bgColor: 'bg-student-blue/10',
    route: '/student'
  },
  {
    id: 'parent' as const,
    label: 'Parent',
    icon: Users,
    color: 'from-student-green to-emerald-600',
    bgColor: 'bg-student-green/10',
    route: '/parent'
  },
  {
    id: 'instructor' as const,
    label: 'Instructor',
    icon: BookOpen,
    color: 'from-student-orange to-amber-600',
    bgColor: 'bg-student-orange/10',
    route: '/teacher'
  },
];

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));

    const role = roles.find(r => r.id === selectedRole);
    toast({
      title: `Welcome back!`,
      description: `You've successfully signed in as ${role?.label}.`,
    });
    
    setIsLoading(false);
    onClose();
    navigate(role?.route || '/');
  };

  const handleClose = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            {selectedRole ? (
              <div className="flex items-center justify-center gap-2">
                <button 
                  onClick={handleBack}
                  className="absolute left-4 p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                Sign in as {roles.find(r => r.id === selectedRole)?.label}
              </div>
            ) : (
              'Choose your role'
            )}
          </DialogTitle>
        </DialogHeader>

        {!selectedRole ? (
          // Role Selection
          <div className="grid gap-3 py-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 border-transparent ${role.bgColor} hover:border-primary/20 transition-all group`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{role.label}</p>
                  <p className="text-sm text-muted-foreground">
                    Sign in to your {role.label.toLowerCase()} account
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // Login Form
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className={`w-full bg-gradient-to-r ${roles.find(r => r.id === selectedRole)?.color} text-white font-semibold`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have credentials?{' '}
              <span className="text-primary">Contact your administrator</span>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
