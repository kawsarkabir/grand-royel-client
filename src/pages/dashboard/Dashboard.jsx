import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHotel,
  FaUsers,
  FaBed,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import MyBookingsPage from '../MyBookings/MyBookings';
import RoomManagement from './admin/RoomManagement';
import UserManagement from './admin/UserManagement';
import Profile from './Profile';
import DashboardHomePage from './DashboardHomePage';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    const names = user.displayName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
  };

  const isAdmin = user?.role === 'admin';

  const renderSidebarMenu = () => (
    <ul className="space-y-2">
      {/* Dashboard (common) */}
      <li>
        <Button
          onClick={() => setActiveTab('dashboard')}
          variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${
            activeTab === 'dashboard'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-white hover:text-primary'
          }`}
        >
          <FaChartLine className="mr-2" /> Dashboard
        </Button>
      </li>

      {/* Admin management options */}
      {isAdmin && (
        <>
          <li>
            <Button
              onClick={() => setActiveTab('rooms')}
              variant={activeTab === 'rooms' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${
                activeTab === 'rooms'
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-white hover:text-primary'
              }`}
            >
              <FaBed className="mr-2" /> Room Management
            </Button>
          </li>
          <li>
            <Button
              onClick={() => setActiveTab('users')}
              variant={activeTab === 'users' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${
                activeTab === 'users'
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-white hover:text-primary'
              }`}
            >
              <FaUsers className="mr-2" /> User Management
            </Button>
          </li>
        </>
      )}

      {/* My Bookings - only for users */}
      {!isAdmin && (
        <li>
          <Button
            onClick={() => setActiveTab('bookings')}
            variant={activeTab === 'bookings' ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              activeTab === 'bookings'
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-white hover:text-primary'
            }`}
          >
            <FaUsers className="mr-2" /> My Bookings
          </Button>
        </li>
      )}

      {/* My Profile - common */}
      <li>
        <Button
          onClick={() => setActiveTab('profile')}
          variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
          className={`w-full justify-start ${
            activeTab === 'profile'
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-white hover:text-primary'
          }`}
        >
          <FaUserCircle className="mr-2" /> My Profile
        </Button>
      </li>
    </ul>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHomePage />;
      case 'rooms':
        return isAdmin ? <RoomManagement /> : null;
      case 'users':
        return isAdmin ? <UserManagement /> : null;
      case 'bookings':
        return !isAdmin ? <MyBookingsPage /> : null;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="hidden md:flex md:flex-col w-64 bg-primary text-white h-full fixed"
      >
        <div className="p-4 border-b border-primary-700">
          <h2 className="text-xl font-bold flex items-center">
            <FaHotel className="mr-2" /> Grand Royel
          </h2>
        </div>
        <nav className="p-4 flex-1">{renderSidebarMenu()}</nav>
        <div className="p-4 border-t border-primary-700 space-y-2">
          <Link to="/">
            <Button
              variant={'ghost'}
              className="w-full justify-start hover:bg-white hover:text-primary"
            >
              <FaHome className="mr-2" /> Go Back
            </Button>
          </Link>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start hover:bg-white hover:text-primary"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full border-2 border-primary hover:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.photoURL || undefined}
                      alt={user.displayName || 'User'}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.role || 'user'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/dashboard"
                    className="w-full cursor-pointer flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4">
          <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('dashboard')}
            className={`flex-col h-auto py-2 ${
              activeTab === 'dashboard' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <FaChartLine className="mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>

          {isAdmin && (
            <>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('rooms')}
                className={`flex-col h-auto py-2 ${
                  activeTab === 'rooms' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                <FaBed className="mb-1" />
                <span className="text-xs">Rooms</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveTab('users')}
                className={`flex-col h-auto py-2 ${
                  activeTab === 'users' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                <FaUsers className="mb-1" />
                <span className="text-xs">Users</span>
              </Button>
            </>
          )}

          {!isAdmin && (
            <Button
              variant="ghost"
              onClick={() => setActiveTab('bookings')}
              className={`flex-col h-auto py-2 ${
                activeTab === 'bookings' ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <FaUsers className="mb-1" />
              <span className="text-xs">Bookings</span>
            </Button>
          )}

          {/* Profile */}
          <Button
            variant="ghost"
            onClick={() => setActiveTab('profile')}
            className={`flex-col h-auto py-2 ${
              activeTab === 'profile' ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <FaUserCircle className="mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
