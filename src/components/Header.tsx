import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Sparkles, Flame, Award, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo - Compact square format */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-deal rounded-lg shadow-md group-hover:shadow-lg transition-all flex items-center justify-center overflow-hidden">
                  <span className="text-xs font-black text-primary-foreground leading-none text-center">
                    <span className="block">FINDS</span>
                    <span className="text-yellow-300">FAE</span>
                  </span>
                  <Sparkles className="absolute top-0.5 right-0.5 w-2 h-2 text-yellow-300" />
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-2 relative">
              <Link 
                to="/top-sellers"
                className="px-3 py-2 text-sm font-semibold bg-warning/20 text-warning hover:bg-warning/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                Best Sellers
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
                className="px-3 py-2 text-sm font-semibold bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Tag className="w-4 h-4" />
                Value Finds
              </Link>
              {/* Simplified Categories button */}
              <button 
                className="px-3 py-2 text-sm font-medium text-secondary-foreground hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </nav>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search millions of products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-border bg-card focus:border-primary focus:bg-card outline-none transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Sign in / Register - White/neutral style */}
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-3 py-2 text-secondary-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <div className="hidden sm:flex flex-col items-start text-xs leading-tight">
                  <span className="font-semibold">Sign in / Register</span>
                  <span className="text-[10px] opacity-70">Orders & Account</span>
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
