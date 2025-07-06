import { Button } from '@/components/ui/button';
import { Hotel } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export function Header() {
  // Simulate authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // In a real app, you'd check for a JWT token or Firebase auth state here
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // In a real app, you'd clear the token and sign out from Firebase
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
    // Redirect to home or login page
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Hotel className="h-6 w-6" />
          <span>Hotelio</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            href="/rooms"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Rooms
          </Link>
          {isLoggedIn && (
            <Link
              href="/my-bookings"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              My Bookings
            </Link>
          )}
          {isLoggedIn ? (
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
