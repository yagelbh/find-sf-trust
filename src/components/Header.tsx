import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X, Home, Flame, Tag, Grid3X3, ThumbsUp, PartyPopper, Scissors } from 'lucide-react';
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
    { to: '/', label: 'Home', icon: Home, emoji: null },
    { to: '/top-sellers', label: 'Best Sellers', icon: Flame, emoji: '🔥' },
    { to: '/flash-deals', label: '2026 Deals', icon: Tag, emoji: '🎊' },
    { to: '/clearance', label: 'Clearance', icon: Tag, emoji: '✂️' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="bg-secondary py-2 sm:py-3">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-5">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
            </button>

            {/* Logo - Blend into header background */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={findsfaeLogo} 
                  alt="Findsfae" 
                  className="h-10 sm:h-14 lg:h-20 w-auto object-contain mix-blend-lighten"
                />
              </Link>
            </div>

            {/* Navigation Links - With hover/active states */}
            <nav className="hidden lg:flex items-center gap-4 relative">
              <Link 
                to="/top-sellers"
                className="text-sm font-medium text-secondary-foreground/90 hover:text-secondary-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all whitespace-nowrap relative group flex items-center gap-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-sm">
                  <ThumbsUp className="w-3 h-3 text-white fill-white" />
                </span>
                Best Sellers
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                to="/flash-deals"
                className="text-sm font-medium text-secondary-foreground/90 hover:text-secondary-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all whitespace-nowrap relative group flex items-center gap-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-sm">
                  <PartyPopper className="w-3 h-3 text-white" />
                </span>
                2026 Deals
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                to="/clearance"
                className="text-sm font-medium text-secondary-foreground/90 hover:text-secondary-foreground hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all whitespace-nowrap relative group flex items-center gap-1.5"
              >
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-sm">
                  <Scissors className="w-3 h-3 text-white" />
                </span>
                Clearance
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary rounded-full transition-all group-hover:w-full"></span>
              </Link>
              <button 
                className={`text-sm font-semibold transition-all flex items-center gap-1 whitespace-nowrap relative ${
                  isCategoryMenuOpen 
                    ? 'text-secondary-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' 
                    : 'text-secondary-foreground/90 hover:text-secondary-foreground'
                }`}
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <span className="relative">
                  Categories
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-primary rounded-full transition-all ${
                    isCategoryMenuOpen ? 'w-full' : 'w-0'
                  }`}></span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </nav>

            {/* Search - Hero element with enhanced button */}
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
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md border border-primary/80"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Actions - Clear hierarchy: Cart > Account > Wishlist */}
            <div className="flex items-center gap-0 sm:gap-1 flex-shrink-0">
              {/* Sign in / Register - Bolder, clearer */}
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-secondary-foreground hover:bg-secondary-foreground/15 rounded-lg transition-colors group"
              >
                <User className="w-5 h-5" />
                <div className="hidden md:flex flex-col items-start leading-tight">
                  <span className="text-xs font-semibold group-hover:text-primary transition-colors">Sign in / Register</span>
                  <span className="text-[10px] text-secondary-foreground/70">Orders & Account</span>
                </div>
              </button>

              {/* Wishlist - Lower emphasis */}
              <Link 
                to="/wishlist"
                className="relative flex items-center p-1.5 sm:p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4 text-secondary-foreground/40 stroke-[1.5]" />
              </Link>

              {/* Cart - Primary action, larger & prominent */}
              <Link 
                to="/cart"
                className="relative flex items-center p-1.5 sm:p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 right-0 min-w-[16px] h-[16px] sm:min-w-[18px] sm:h-[18px] px-1 bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
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
