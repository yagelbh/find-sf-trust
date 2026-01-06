import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X, Home, Flame, Tag, Grid3X3 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import CategoryMegaMenu from './CategoryMegaMenu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface HeaderProps {
  onAuthClick: () => void;
  onCountryClick: () => void;
  currentCountry: { name: string; flag: string; currency: string };
}

const Header = ({ onAuthClick, onCountryClick, currentCountry }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false);
    }
  };

  const mobileNavLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/top-sellers', label: 'Best Sellers', icon: Flame },
    { to: '/flash-deals', label: '2026 Deals', icon: Tag },
    { to: '/clearance', label: 'Clearance', icon: Tag },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 lg:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-secondary-foreground" />
            </button>

            {/* Logo - Clean text logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight">
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
                className="text-sm font-bold text-secondary-foreground/80 hover:text-primary transition-colors flex items-center gap-1"
              >
                <span className="text-warning">🎆</span> 2026 Deals
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

            {/* Search - Hidden on smallest mobile, visible from sm */}
            <form onSubmit={handleSearch} className="hidden sm:block flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search millions of products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-card outline-none transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Spacer for mobile */}
            <div className="flex-1 sm:hidden" />

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Sign in / Register - White/neutral style */}
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-secondary-foreground hover:bg-primary/10 rounded-lg transition-colors group"
              >
                <User className="w-5 h-5" />
                <div className="hidden md:flex flex-col items-start text-xs leading-tight">
                  <span className="font-semibold group-hover:text-primary transition-colors">Sign in / Register</span>
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

      {/* Mobile Menu Sheet */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <SheetTitle className="text-left">
              <span className="text-xl font-black tracking-tight">
                <span className="text-primary">Finds</span>
                <span className="text-warning">fae</span>
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="p-4 border-b border-border">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-border bg-card focus:border-primary outline-none transition-all text-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                >
                  <link.icon className="w-5 h-5 text-muted-foreground" />
                  {link.label}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCategoryMenuOpen(true);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-foreground font-medium w-full"
              >
                <Grid3X3 className="w-5 h-5 text-muted-foreground" />
                All Categories
              </button>
            </nav>

            {/* Account Section */}
            <div className="p-4 border-t border-border">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAuthClick();
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold"
              >
                <User className="w-5 h-5" />
                Sign in / Register
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
