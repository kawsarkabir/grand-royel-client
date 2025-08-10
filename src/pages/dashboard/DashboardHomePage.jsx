import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import {
  FaCalendarAlt,
  FaHotel,
  FaMoneyBillWave,
  FaUsers,
} from 'react-icons/fa';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import axiosInstance from '@/lib/axiosInstance';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [stats, setStats] = useState({
    totalRooms: 0,
    totalUsers: 0,
    revenue: 0, // placeholder for later
    bookings: 0, // placeholder for later
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      const fetchStats = async () => {
        try {
          const response = await axiosInstance.get('/stats');
          if (response.data.success) {
            setStats((prev) => ({
              ...prev,
              totalRooms: response.data.data.totalRooms,
              totalUsers: response.data.data.totalUsers,
            }));
          }
        } catch {
          // error ignored intentionally
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.displayName || 'Guest'}!
          </h1>
          <p className="text-muted-foreground">
            Here&rsquo;s what&rsquo;s happening with your bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Link to="">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <p>show your bookings</p>
              </CardContent>
            </Card>
          </Link>
          <Link to="">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <p>show your profile</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    );
  }

  // Admin view with dynamic stats
  if (loading) {
    return <LoadingSpinner />;
  }

  const statItems = [
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: <FaHotel className="h-6 w-6" />,
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers className="h-6 w-6" />,
    },
    {
      title: 'Revenue',
      value: stats.revenue,
      icon: <FaMoneyBillWave className="h-6 w-6" />,
    }, // placeholder
    {
      title: 'Bookings',
      value: stats.bookings,
      icon: <FaCalendarAlt className="h-6 w-6" />,
    }, // placeholder
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your hotel management system.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statItems.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
