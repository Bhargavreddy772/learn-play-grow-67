import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/StatCard';
import { 
  ArrowLeft, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Activity,
  UserPlus,
  Settings,
  Download,
  Shield,
  AlertCircle
} from 'lucide-react';

const systemStats = [
  { label: 'Active Sessions', value: 342, trend: '+12%' },
  { label: 'Server Uptime', value: '99.9%', trend: 'Healthy' },
  { label: 'Storage Used', value: '45.2 GB', trend: '67%' },
  { label: 'API Calls Today', value: '12.4K', trend: '+8%' },
];

const recentUsers = [
  { id: 1, name: 'Sarah Miller', role: 'Teacher', email: 'sarah.m@school.edu', status: 'active' },
  { id: 2, name: 'John Davis', role: 'Student', email: 'john.d@school.edu', status: 'active' },
  { id: 3, name: 'Emily Brown', role: 'Teacher', email: 'emily.b@school.edu', status: 'pending' },
  { id: 4, name: 'Michael Lee', role: 'Admin', email: 'michael.l@school.edu', status: 'active' },
];

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background professional-text">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="admin" size="default">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            System Overview
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage your learning management system.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value="1,247"
            subtitle="Active learners"
            icon={GraduationCap}
            trend={{ value: 8, positive: true }}
            variant="admin"
          />
          <StatCard
            title="Total Teachers"
            value={48}
            subtitle="Across departments"
            icon={Users}
            variant="admin"
          />
          <StatCard
            title="Active Courses"
            value={156}
            subtitle="Published courses"
            icon={BookOpen}
            variant="admin"
          />
          <StatCard
            title="System Health"
            value="98%"
            subtitle="All systems operational"
            icon={Activity}
            trend={{ value: 2, positive: true }}
            variant="admin"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Management */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">User Management</h3>
              <Button variant="admin" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>
            
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-admin-secondary">
                  <tr>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Name</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Role</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Email</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-admin-secondary rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-admin-primary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Admin' 
                            ? 'bg-admin-primary/10 text-admin-primary'
                            : user.role === 'Teacher'
                            ? 'bg-teacher-primary/10 text-teacher-primary'
                            : 'bg-student-blue/10 text-student-blue'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-student-green/10 text-student-green'
                            : 'bg-student-orange/10 text-student-orange'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Status */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">System Status</h3>
            </div>
            
            <div className="space-y-4">
              {/* System stats cards */}
              {systemStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-soft transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <span className={`text-xs font-medium ${
                      stat.trend.includes('+') || stat.trend === 'Healthy'
                        ? 'text-student-green'
                        : 'text-muted-foreground'
                    }`}>
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
              ))}

              {/* Security alert */}
              <div className="bg-student-green/5 border border-student-green/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-student-green mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Security Status</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      All systems secure. Last scan: 2 hours ago.
                    </p>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="bg-student-orange/5 border border-student-orange/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-student-orange mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Pending Approvals</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      3 new teacher accounts awaiting approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
