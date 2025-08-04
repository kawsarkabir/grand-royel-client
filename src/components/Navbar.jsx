import { useAuth } from '@/hooks/useAuth';
import navLinks from '@/utils/navLinks';
import { useState } from 'react';
import { FaBars, FaHotel, FaXmark } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';
import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LayoutDashboard, LogOut } from 'lucide-react';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = async () => {
    await logout();
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    const names = user.displayName.split(' ');
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : names[0][0];
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <nav className="sticky top-0 z-50">
          <div className="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-1 rounded">
                <Link to="/">
                  <FaHotel className="h-5 w-5 text-primary-foreground" />
                </Link>
              </div>
              <span className="font-bold text-lg">Grand Royal</span>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <ul className="hidden md:flex items-center gap-6">
                {navLinks
                  .filter((item) => !item.private || (item.private && user))
                  .map((item) => (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        onClick={toggleMenu}
                        className={({ isActive }) =>
                          `text-md font-semibold ${
                            isActive
                              ? 'text-primary'
                              : 'text-foreground hover:text-primary'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>

              <ThemeToggle />

              {user ? (
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
                      <LogOut className="h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded" onClick={toggleMenu}>
              {openMenu ? <FaXmark size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition duration-300 ${openMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300`}
            onClick={toggleMenu}
          />

          {/* Sidebar panel */}
          <div
            className={`absolute left-0 top-0 h-[100vh] w-[60vw] max-w-sm bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
              openMenu ? 'translate-x-0' : '-translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 mb-6 p-4 border-b">
              <div className="bg-primary p-1 rounded">
                <Link to="/" onClick={toggleMenu}>
                  <FaHotel className="h-5 w-5 text-primary-foreground" />
                </Link>
              </div>
              <span className="font-bold text-lg">Grand Royal</span>
            </div>

            <ul className="flex flex-col gap-6 px-4">
              {navLinks
                .filter((item) => !item.private || (item.private && user))
                .map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `block text-lg font-semibold py-1 ${
                          isActive ? 'text-primary' : 'text-foreground'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

              {user && (
                <>
                  <DropdownMenuSeparator />
                  <li>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="block text-lg font-semibold py-1 text-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full font-semibold px-4 py-2 rounded-full shadow hover:shadow-none"
                    >
                      Logout
                    </Button>
                  </li>
                </>
              )}

              {!user && (
                <li>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="mt-6 w-full font-semibold px-4 py-2 rounded-full shadow hover:shadow-none">
                      Sign Up
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
