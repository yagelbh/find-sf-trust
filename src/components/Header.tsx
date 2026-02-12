import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, Menu, X, Home, Flame, Tag, Grid3X3 } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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

  const navLinks = [
    { to: '/top-sellers', label: 'Best Sellers' },
    { to: '/flash-deals', label: 'New Deals' },
    { to: '/clearance', label: 'Clearance' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Main Header */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 lg:gap-6 h-16 lg:h-[72px]">
            {/* Mobile menu */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-secondary-foreground/80 hover:text-secondary-foreground">
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={findsfaeLogo} alt="Findsfae" className="h-10 sm:h-12 lg:h-14 w-auto object-contain" />
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 lg:h-11 pl-4 pr-12 rounded-lg bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/40 border border-secondary-foreground/10 focus:border-primary focus:bg-secondary-foreground/15 outline-none transition-all text-sm"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={onAuthClick} className="hidden md:flex items-center gap-2 px-3 py-2 text-secondary-foreground/80 hover:text-secondary-foreground rounded-lg transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Account</span>
              </button>

              <Link to="/wishlist" className="relative p-2 text-secondary-foreground/60 hover:text-secondary-foreground transition-colors">
                <Heart className="w-5 h-5" />
              </Link>

              <Link to="/cart" className="relative p-2 text-secondary-foreground hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
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

      {/* Navigation Bar */}
      <div className="bg-secondary border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4">
          <nav className="hidden lg:flex items-center gap-1 h-10">
            <button
              className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors font-body ${isCategoryMenuOpen ? 'bg-primary text-primary-foreground' : 'text-secondary-foreground/90 hover:bg-secondary-foreground/10'}`}
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
            >
              <Grid3X3 className="w-4 h-4 inline mr-1.5 -mt-0.5" />
              All Categories
            </button>

            <span className="w-px h-5 bg-secondary-foreground/15 mx-1" />

            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground hover:bg-secondary-foreground/10 rounded-md transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="sm:hidden py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-4 pr-10 rounded-lg bg-secondary-foreground/10 text-secondary-foreground placeholder:text-secondary-foreground/40 border border-secondary-foreground/10 focus:border-primary outline-none text-sm"
              />
              <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-8 rounded bg-primary text-primary-foreground flex items-center justify-center">
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <CategoryMegaMenu isOpen={isCategoryMenuOpen} onClose={() => setIsCategoryMenuOpen(false)} />

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="text-left">
              <img src={findsfaeLogo} alt="Findsfae" className="h-9 w-auto object-contain" />
            </SheetTitle>
          </SheetHeader>
          <nav className="p-3 space-y-0.5">
            {[
              { to: '/', label: 'Home', icon: Home },
              { to: '/top-sellers', label: 'Best Sellers', icon: Flame },
              { to: '/flash-deals', label: 'New Deals', icon: Tag },
              { to: '/clearance', label: 'Clearance', icon: Tag },
            ].map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <link.icon className="w-4 h-4 text-muted-foreground" />
                {link.label}
              </Link>
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); setIsCategoryMenuOpen(true); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-sm font-medium w-full">
              <Grid3X3 className="w-4 h-4 text-muted-foreground" />
              All Categories
            </button>
          </nav>
          <div className="p-3 mt-auto border-t">
            <button onClick={() => { setIsMobileMenuOpen(false); onAuthClick(); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
              <User className="w-4 h-4" />
              Sign in / Register
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
