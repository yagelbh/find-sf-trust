import { useState, useEffect } from 'react';
import { Search, User, MessageCircle, Heart, ShoppingCart, ChevronDown, Globe, MapPin } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  onAuthClick: () => void;
  onMessagesClick: () => void;
  onCountryClick: () => void;
  cartCount: number;
  currentCountry: { name: string; flag: string; currency: string };
}

const Header = ({ onAuthClick, onMessagesClick, onCountryClick, cartCount, currentCountry }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const categories = [
    "Best-Selling Items",
    "5-Star Rated",
    "New In",
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Beauty",
    "Sports",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-display font-bold">
                <span className="text-primary">Find</span>
                <span className="text-secondary">Safe</span>
              </h1>
            </div>

            {/* Categories */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.slice(0, 4).map((cat, index) => (
                <button
                  key={index}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
                >
                  {cat}
                  {index === 3 && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
              <button className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FindSafe"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-4 pr-12 rounded-full border-2 border-muted bg-muted focus:border-primary focus:bg-card outline-none transition-all"
                />
                <button className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <div className="hidden md:flex flex-col items-start text-sm">
                  <span className="text-xs text-muted-foreground">Sign in / Register</span>
                  <span className="font-medium">Orders & Account</span>
                </div>
              </button>

              <button
                onClick={onMessagesClick}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden md:inline text-sm font-medium">Messages</span>
              </button>

              <button
                onClick={onCountryClick}
                className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden md:inline text-sm">{currentCountry.flag} {currentCountry.currency}</span>
              </button>

              <button className="relative flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors">
                <Heart className="w-5 h-5" />
              </button>

              <button className="relative flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
