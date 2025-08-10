import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import {
  FaHotel,
  FaUsers,
  FaBed,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ThemeContext } from '@/context/ThemeContext';
import { use } from 'react';

export default function DashboardLayout() {
  const { theme } = use(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    const names = user.displayName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
  };

  // Helper to check if current path matches
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div
        className={cn(
          'hidden md:flex md:flex-col w-64 h-full fixed border-r',
          theme === 'dark' ? 'border-border' : 'border-secondary',
        )}
      >
        <div
          className={cn(
            'p-4 border-b',
            theme === 'dark' ? 'border-border' : 'border-secondary',
          )}
        >
          <h2 className="text-xl font-bold flex items-center">
            <FaHotel className="mr-2" /> Grand Royel
          </h2>
        </div>

        <nav className="p-4 flex-1 space-y-1">
          <Link to="/dashboard">
            <Button
              variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
              className="w-full justify-start px-3 py-2"
            >
              <LayoutDashboard className="mr-3 h-4 w-4" /> Dashboard
            </Button>
          </Link>

          {isAdmin && (
            <>
              <Link to="/dashboard/rooms">
                <Button
                  variant={isActive('/dashboard/rooms') ? 'secondary' : 'ghost'}
                  className="w-full justify-start px-3 py-2"
                >
                  <FaBed className="mr-3 h-4 w-4" /> Room Management
                </Button>
              </Link>
              <Link to="/dashboard/users">
                <Button
                  variant={isActive('/dashboard/users') ? 'secondary' : 'ghost'}
                  className="w-full justify-start px-3 py-2"
                >
                  <FaUsers className="mr-3 h-4 w-4" /> User Management
                </Button>
              </Link>
            </>
          )}

          {!isAdmin && (
            <Link to="/dashboard/bookings">
              <Button
                variant={
                  isActive('/dashboard/bookings') ? 'secondary' : 'ghost'
                }
                className="w-full justify-start px-3 py-2"
              >
                <FaCalendarAlt className="mr-3 h-4 w-4" /> My Bookings
              </Button>
            </Link>
          )}

          <Link to="/dashboard/profile">
            <Button
              variant={isActive('/dashboard/profile') ? 'secondary' : 'ghost'}
              className="w-full justify-start px-3 py-2"
            >
              <FaUserCircle className="mr-3 h-4 w-4" /> My Profile
            </Button>
          </Link>
        </nav>

        <div
          className={cn(
            'p-4 border-t',
            theme === 'dark' ? 'border-border' : 'border-secondary',
          )}
        >
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <FaHome className="mr-2" /> Go Back
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start mt-2"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 overflow-auto">
        {/* Top bar */}
        <header
          className={cn(
            'bg-background shadow-sm p-4 flex justify-between items-center sticky top-0 z-10 border-b',
            theme === 'dark' ? 'border-border' : 'border-secondary',
          )}
        >
          <h1 className="text-xl font-semibold capitalize">Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL || undefined} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuLabel>
                {user?.displayName || 'User'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Render children */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
