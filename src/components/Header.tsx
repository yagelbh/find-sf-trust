import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import CategoryMegaMenu from './CategoryMegaMenu';
import findsfaeLogo from '@/assets/findsfae-logo.png';

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
            {/* Logo - Clean text logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <span className="text-2xl lg:text-3xl font-black tracking-tight">
                  <span className="text-primary">Finds</span>
                  <span className="text-warning">fae</span>
                </span>
              </Link>
            </div>

            {/* Navigation Links - Clean minimal style */}
            <nav className="hidden lg:flex items-center gap-6 relative">
              <Link 
                to="/top-sellers"
                className="text-sm font-bold text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Best Sellers
              </Link>
              <Link 
                to="/flash-deals"
                className="text-sm font-bold text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Deals
              </Link>
              <Link 
                to="/clearance"
                className="text-sm font-bold text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                Clearance
              </Link>
              <button 
                className="text-sm font-bold text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
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
