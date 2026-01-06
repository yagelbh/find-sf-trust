import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X, Home, Flame, Tag, Grid3X3 } from 'lucide-react';
import findsfaeLogo from '@/assets/findsfae-logo.png';
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
      <div className="bg-secondary py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4 lg:gap-5">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-secondary-foreground" />
            </button>

            {/* Logo - Refined size, hover glow effect */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img 
                  src={findsfaeLogo} 
                  alt="Findsfae" 
                  className="h-16 sm:h-18 lg:h-20 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                />
              </Link>
            </div>

            {/* Navigation Links - Tighter spacing */}
            <nav className="hidden lg:flex items-center gap-4 relative">
              <Link 
                to="/top-sellers"
                className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                Best Sellers
              </Link>
              <Link 
                to="/flash-deals"
                className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                2026 Deals
              </Link>
              <Link 
                to="/clearance"
                className="text-sm font-medium text-secondary-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                Clearance
              </Link>
              <button 
                className="text-sm font-semibold text-secondary-foreground hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <span className="relative">
                  Categories
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary/50 rounded-full"></span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </nav>

            {/* Search - Hero element with enhanced styling */}
            <form onSubmit={handleSearch} className="hidden sm:block flex-1 max-w-xl lg:max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search millions of products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-5 pr-14 rounded-full border-2 border-transparent bg-card text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-card outline-none transition-all text-[15px] shadow-sm"
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Spacer for mobile */}
            <div className="flex-1 sm:hidden" />

            {/* Actions - Clear hierarchy */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Sign in / Register - Subdued styling */}
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 text-secondary-foreground/90 hover:bg-secondary-foreground/10 rounded-lg transition-colors group"
              >
                <User className="w-4 h-4 opacity-80" />
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-medium group-hover:text-primary transition-colors">Sign in / Register</span>
                  <span className="text-[9px] opacity-60">Orders & Account</span>
                </div>
              </button>

              {/* Wishlist - Lower emphasis */}
              <Link 
                to="/wishlist"
                className="relative flex items-center p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4 text-secondary-foreground/50 stroke-[1.5]" />
              </Link>

              {/* Cart - Primary action, larger */}
              <Link 
                to="/cart"
                className="relative flex items-center p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-secondary-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
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
              <img 
                src={findsfaeLogo} 
                alt="Findsfae" 
                className="h-8 w-auto object-contain"
              />
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
