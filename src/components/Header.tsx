import { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingCart, ChevronDown, Globe, Menu } from 'lucide-react';
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
            {/* Logo - Unique hexagonal badge design */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="relative flex items-center">
                  {/* Hexagonal background */}
                  <div 
                    className="relative px-4 py-2 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 shadow-lg group-hover:shadow-xl transition-shadow"
                    style={{
                      clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                    }}
                  >
                    <div className="flex items-center gap-0.5">
                      <span className="text-xl md:text-2xl font-black text-white tracking-tight drop-shadow-md">
                        FINDS
                      </span>
                      <span className="text-xl md:text-2xl font-black text-yellow-300 tracking-tight drop-shadow-md">
                        FAE
                      </span>
                    </div>
                  </div>
                  {/* Sparkle accent */}
                  <span className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-pulse">✦</span>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              <Link 
                to="/flash-deals"
                className="px-3 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <span className="animate-pulse">⚡</span>
                Flash Deals
              </Link>
              <Link 
                to="/clearance"
                className="px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <span>🔥</span>
                Clearance
              </Link>
              <button 
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-1 bg-gray-100 hover:bg-gray-200 rounded-lg"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <Menu className="w-4 h-4" />
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
                  className="w-full h-10 pl-4 pr-12 rounded-full border-2 border-gray-200 bg-gray-50 focus:border-orange-500 focus:bg-white outline-none transition-all text-sm"
                />
                <button className="absolute right-1 top-1 h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-600" />
                <div className="hidden xl:flex flex-col items-start text-xs">
                  <span className="text-[10px] text-gray-500">Sign in</span>
                  <span className="font-medium text-gray-800">Account</span>
                </div>
              </button>

              <button
                onClick={onCountryClick}
                className="flex items-center gap-1 px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="hidden md:inline text-xs">{currentCountry.flag}</span>
              </button>

              <Link 
                to="/wishlist"
                className="relative flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </Link>

              <Link 
                to="/cart"
                className="relative flex items-center gap-2 px-2 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
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
