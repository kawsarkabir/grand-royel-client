import { Hotel } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 mx-auto">
        <div className="flex items-center gap-2">
          <Hotel className="h-6 w-6" />
          <span className="font-semibold">Hotelio</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 text-sm md:gap-6">
          <Link
            href="#"
            className="text-muted-foreground hover:underline underline-offset-4"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline underline-offset-4"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
        </nav>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          &copy; {new Date().getFullYear()} Hotelio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
