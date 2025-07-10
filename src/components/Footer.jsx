import { FaSwimmingPool } from 'react-icons/fa';
import { FaCar, FaHotel, FaWifi } from 'react-icons/fa6';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-primary-glow p-2 rounded-lg">
                <FaHotel className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">Grand Royal</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Experience luxury and comfort in the heart of the city.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/rooms" className="hover:text-primary transition-colors">Rooms</Link></li>
              <li><Link to="/signin" className="hover:text-primary transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><FaWifi className="h-3 w-3" /> Free Wi-Fi</li>
              <li className="flex items-center gap-2"><FaSwimmingPool className="h-3 w-3" /> Swimming Pool</li>
              <li className="flex items-center gap-2"><FaCar className="h-3 w-3" /> Valet Parking</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Luxury Boulevard</li>
              <li>Downtown, NY 10001</li>
              <li>+1 (555) 123-4567</li>
              <li>info@grandroyalhotel.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Grand Royal Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
