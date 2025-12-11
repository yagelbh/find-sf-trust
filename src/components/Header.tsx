import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Sparkles, Flame, Award, Tag, LayoutGrid } from 'lucide-react';
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
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo with faerie element */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="relative flex items-center bg-gradient-to-r from-primary via-deal to-warning px-3 py-1.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
                    <svg className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-6 text-primary/60" viewBox="0 0 20 30" fill="currentColor">
                      <path d="M18 15C18 15 15 5 8 2C8 2 12 10 10 15C8 20 8 28 8 28C8 28 15 25 18 15Z" />
                    </svg>
                    
                    <span className="text-lg font-black text-primary-foreground tracking-tight">
                      FINDS
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 mx-0.5" />
                    <span className="text-lg font-black text-yellow-300 tracking-tight">
                      FAE
                    </span>
                    
                    <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-6 text-warning/60 scale-x-[-1]" viewBox="0 0 20 30" fill="currentColor">
                      <path d="M18 15C18 15 15 5 8 2C8 2 12 10 10 15C8 20 8 28 8 28C8 28 15 25 18 15Z" />
                    </svg>
                  </div>
                  
                  <span className="absolute -top-1 -right-3 text-yellow-400 text-[10px] animate-pulse">✦</span>
                  <span className="absolute -bottom-0.5 -left-2 text-primary text-[8px] animate-pulse delay-300">✦</span>
                </div>
              </Link>
            </div>

            {/* Navigation Links with Background Colors and Icons */}
            <nav className="hidden lg:flex items-center gap-2 relative">
              <Link 
                to="/top-sellers"
                className="px-3 py-2 text-sm font-semibold bg-warning/20 text-warning hover:bg-warning/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                Top Sellers
              </Link>
              <Link 
                to="/flash-deals"
                className="px-3 py-2 text-sm font-semibold bg-deal/20 text-deal hover:bg-deal/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Flame className="w-4 h-4" />
                Flash Deals
              </Link>
              <Link 
                to="/clearance"
                className="px-3 py-2 text-sm font-semibold bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Tag className="w-4 h-4" />
                Clearance
              </Link>
              <button 
                className="px-3 py-2 text-sm font-medium text-secondary-foreground hover:text-primary transition-colors flex items-center gap-1.5 bg-muted rounded-lg"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <LayoutGrid className="w-4 h-4" />
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search millions of products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-border bg-card focus:border-primary focus:bg-card outline-none transition-all text-sm"
                />
                <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Sign in / Register - Same background style */}
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <User className="w-4 h-4" />
                <div className="hidden sm:flex flex-col items-start text-xs leading-tight">
                  <span className="font-semibold">Sign in / Register</span>
                  <span className="text-[10px] opacity-80">Orders & Account</span>
                </div>
              </button>

              <Link 
                to="/wishlist"
                className="relative flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-secondary-foreground/70" />
              </Link>

              <Link 
                to="/cart"
                className="relative flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-secondary-foreground/70" />
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

      {/* Category Mega Menu */}
      <CategoryMegaMenu 
        isOpen={isCategoryMenuOpen} 
        onClose={() => setIsCategoryMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;