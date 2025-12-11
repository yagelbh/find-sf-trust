import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
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
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo - Unique eye-catching design */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-lg opacity-40 group-hover:opacity-60 transition-opacity rounded-lg" />
                  {/* Logo container */}
                  <div className="relative bg-gradient-to-br from-primary via-primary to-accent px-3 py-1.5 rounded-lg shadow-md border border-primary/20">
                    <span className="text-lg md:text-xl font-display font-black text-primary-foreground tracking-tight">
                      Find
                    </span>
                    <span className="text-lg md:text-xl font-display font-black text-warning tracking-tight">
                      sfae
                    </span>
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full animate-pulse" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              <Link 
                to="/flash-deals"
                className="px-3 py-2 text-sm font-semibold text-deal hover:bg-deal/10 rounded-lg transition-colors flex items-center gap-1"
              >
                <span className="animate-pulse">⚡</span>
                Time-limited
              </Link>
              <Link 
                to="/clearance"
                className="px-3 py-2 text-sm font-semibold text-warning hover:bg-warning/10 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>🔥</span>
                Clearance
              </Link>
              <button 
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 bg-muted rounded-lg"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                Categories
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
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-muted bg-muted focus:border-primary focus:bg-card outline-none transition-all text-sm"
                />
                <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <div className="hidden xl:flex flex-col items-start text-xs">
                  <span className="text-[10px] text-muted-foreground">Sign in</span>
                  <span className="font-medium">Account</span>
                </div>
              </button>

              <button
                onClick={onCountryClick}
                className="flex items-center gap-1 px-2 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden md:inline text-xs">{currentCountry.flag}</span>
              </button>

              <Link 
                to="/wishlist"
                className="relative flex items-center gap-2 px-2 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5" />
              </Link>

              <Link 
                to="/cart"
                className="relative flex items-center gap-2 px-2 py-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-deal text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
