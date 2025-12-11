import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Globe } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import findsafeLogo from '@/assets/findsfae-logo.png';
import CategoryMegaMenu from './CategoryMegaMenu';

interface HeaderProps {
  onAuthClick: () => void;
  onCountryClick: () => void;
  currentCountry: { name: string; flag: string; currency: string };
}

const Header = ({ onAuthClick, onCountryClick, currentCountry }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());

  const navItems = [
    "Top Picks",
    "Highly Rated",
    "Fresh Arrivals",
    "Today's Deals",
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
            {/* Logo - Much bigger and prominent */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center gap-3">
                <img src={findsafeLogo} alt="Findsfae" className="h-14 w-auto" />
                <span className="text-2xl font-display font-bold text-primary hidden sm:block">Findsfae</span>
              </a>
            </div>

            {/* Categories */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
              <button 
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 bg-muted rounded-lg"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                All Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <CategoryMegaMenu 
                isOpen={isCategoryMenuOpen} 
                onClose={() => setIsCategoryMenuOpen(false)} 
              />
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Findsfae"
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
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
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
