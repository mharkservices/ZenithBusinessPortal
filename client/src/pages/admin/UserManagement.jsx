import { useState, useEffect } from 'react';
import { Plus, Users, UserCheck, UserX, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/admin/StatCard';
import { UserDirectory } from '@/components/admin/UserDirectory';
import api from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/auth/users/stats');
        setStats(response.data);
      } catch (error) {
        toast({
          title: "Error fetching stats",
          description: "Could not load user statistics.",
          variant: "destructive",
        });
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  const userStats = stats ? [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      description: 'All registered users',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      iconBgColor: 'bg-blue-100',
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      description: 'Currently active',
      icon: <UserCheck className="h-5 w-5 text-green-500" />,
      iconBgColor: 'bg-green-100',
    },
    {
      title: 'Pending Users',
      value: stats.pendingUsers,
      description: 'Awaiting approval',
      icon: <UserX className="h-5 w-5 text-yellow-500" />,
      iconBgColor: 'bg-yellow-100',
    },
    {
      title: 'Admins',
      value: stats.adminUsers,
      description: 'Admin accounts',
      icon: <Shield className="h-5 w-5 text-indigo-500" />,
      iconBgColor: 'bg-indigo-100',
    },
  ] : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        {/* <Button>
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))
        ) : (
          userStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.description}
              icon={stat.icon}
              iconBgColor={stat.iconBgColor}
            />
          ))
        )}
      </div>

      <UserDirectory />
    </div>
  );
};

export default UserManagement; 