import { asset } from '@/assets/assets';
import { useAuth } from '@/hooks/useAuth';
import navLinks from '@/utils/navLinks';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useAuth();
  const logoutRef = useRef(null);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleLogout = async () => {
    await logout();
    setShowLogout(false);
  };

  // Close logout dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Desktop Navbar */}
        <nav className="sticky top-0 z-50">
          <div className="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={asset.Logo} alt="logo" className="w-10" />
              <h1 className="text-black dark:text-white text-xl font-semibold">
                Hotelio
              </h1>
            </Link>

            <ul className="hidden md:flex items-center gap-6">
              {navLinks
                .filter((item) => !item.private || (item.private && user))
                .map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `text-lg font-semibold ${
                          isActive
                            ? 'text-[#52b788]'
                            : 'text-black dark:text-white'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
            </ul>

            <div
              className="hidden md:flex items-center gap-4 relative"
              ref={logoutRef}
            >
              {user ? (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <img
                        src={user.photoURL || '/default-user.png'}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full object-cover border-2 border-green-500 cursor-pointer"
                        onClick={() => setShowLogout((prev) => !prev)}
                      />
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-gray-900 text-white p-2 rounded-md text-sm"
                    >
                      {user.displayName || 'User'}
                    </TooltipContent>
                  </Tooltip>

                  {showLogout && (
                    <div className="absolute top-full mt-2 right-0   bg-white px-3 py-2 rounded shadow   transition w-40">
                      <h1 className="font-bold text-muted-foreground">
                        {user.displayName}
                      </h1>
                      <Button
                        onClick={handleLogout}
                        className="mt-2"
                        size={'sm'}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                  </div>
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
          className={`fixed inset-0 bg-black/30 z-70 transition-transform duration-300 ${
            openMenu ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
          onClick={toggleMenu}
        >
          <div
            className="w-[60vw] h-full bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img src={asset.Logo} alt="logo" className="w-14" />
              <h1 className="text-xl font-bold">Hotelio</h1>
            </Link>

            <ul className="flex flex-col gap-6">
              {navLinks
                .filter((item) => !item.private || (item.private && user))
                .map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      onClick={toggleMenu}
                      className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? 'text-[#52b788]' : ''}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              {!user && (
                <li>
                  <Link to="/signup">
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
