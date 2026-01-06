import { useState, useEffect, useMemo } from 'react';
import { Zap, Gift, Star, Truck, TrendingUp, Sparkles, ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { categories } from '@/data/categories';

// Deal category circles inspired by Temu
const dealCategories = [
  { name: 'Lightning Deals', icon: Zap, gradient: 'from-warning to-deal' },
  { name: 'Best Sellers', icon: TrendingUp, gradient: 'from-primary to-primary/70' },
  { name: 'New Year Gifts', icon: Gift, gradient: 'from-deal to-warning' },
  { name: 'Top Rated', icon: Star, gradient: 'from-amber-500 to-orange-500' },
  { name: 'Free Shipping', icon: Truck, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'New Arrivals', icon: Sparkles, gradient: 'from-violet-500 to-purple-500' },
];

// Masonry-style product card with variable heights
const MasonryProductCard = ({ 
  product, 
  variant = 'normal' 
}: { 
  product: ShopifyProduct; 
  variant?: 'tall' | 'normal' | 'wide';
}) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  // Seeded random for consistent values
  const seed = node.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const compareAtPrice = price * (1.3 + (seed % 5) * 0.1);
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  const soldCount = ((seed % 9) + 1) * 1.1;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success('Added to cart!', { description: node.title, position: 'top-center' });
  };

  const heightClass = variant === 'tall' ? 'aspect-[3/5]' : variant === 'wide' ? 'aspect-[4/3]' : 'aspect-square';

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 break-inside-avoid mb-4"
    >
      <div className={`relative ${heightClass} bg-white overflow-hidden`}>
        <img 
          src={imageUrl} 
          alt={node.title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* 2026 DEALS Badge */}
        <div className="absolute top-2 left-2 bg-gradient-to-r from-deal to-warning text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
          2026 DEALS
        </div>
        
        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-deal text-white text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </div>

        {/* Wishlist button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toast.success('Added to wishlist!');
          }}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
        >
          <Heart className="w-4 h-4 text-muted-foreground hover:text-deal transition-colors" />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-foreground line-clamp-2 text-sm mb-2 group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-deal font-bold text-lg">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-xs line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        </div>

        {/* Sold count */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {soldCount.toFixed(1)}K+ sold
          </span>
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

// Category filter tabs
const categoryTabs = [
  'All',
  'Home & Kitchen',
  'Electronics',
  'Beauty & Health',
  "Men's Clothing",
  "Women's Clothing",
  'Sports & Outdoors',
  'Toys & Games',
  'Arts & Crafts',
];

const FlashDeals = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(30);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Generate varied heights for masonry effect
  const productVariants = useMemo(() => {
    return products.map((_, index) => {
      const patterns = ['normal', 'tall', 'normal', 'normal', 'tall', 'normal'] as const;
      return patterns[index % patterns.length];
    });
  }, [products]);

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-tabs');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      {/* Festive 2026 Hero Banner - Temu inspired */}
      <div className="relative bg-gradient-to-r from-deal via-red-500 to-deal overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Firework sparkles */}
          <div className="absolute top-4 left-10 text-4xl animate-pulse">✨</div>
          <div className="absolute top-8 right-20 text-3xl animate-pulse delay-100">🎆</div>
          <div className="absolute bottom-6 left-1/4 text-2xl animate-pulse delay-200">✨</div>
          <div className="absolute top-12 left-1/3 text-3xl animate-pulse delay-300">🎇</div>
          <div className="absolute bottom-8 right-1/4 text-4xl animate-pulse">🎆</div>
          <div className="absolute top-6 right-1/3 text-2xl animate-pulse delay-150">✨</div>
          
          {/* Gift boxes */}
          <div className="absolute left-8 bottom-4 text-5xl hidden md:block">🎁</div>
          <div className="absolute right-12 top-8 text-4xl hidden md:block">🎁</div>
          
          {/* Golden ribbons effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-white/80">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-white">2026 Deals</span>
          </div>

          <div className="text-center">
            <p className="text-yellow-300 text-sm md:text-base font-semibold tracking-widest mb-2 uppercase">
              A Fresh Start to 2026
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
              NEW YEAR, AMAZING DEALS
            </h1>
            <p className="text-white/90 text-base md:text-lg">
              Limited time offers • Up to 70% off everything
            </p>
          </div>
        </div>
      </div>

      {/* Deal Category Circles */}
      <div className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-6 md:gap-12 overflow-x-auto pb-2 scrollbar-hide">
            {dealCategories.map((category) => (
              <Link
                key={category.name}
                to="#"
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="sticky top-[72px] z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 relative">
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background shadow-md rounded-full flex items-center justify-center hover:bg-muted transition-colors md:hidden"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div 
            id="category-tabs"
            className="flex gap-2 py-4 overflow-x-auto scrollbar-hide px-8 md:px-0 md:justify-center"
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === tab
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-foreground border-border hover:border-foreground/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-background shadow-md rounded-full flex items-center justify-center hover:bg-muted transition-colors md:hidden"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Masonry Products Grid */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className={`bg-muted rounded-lg animate-pulse mb-4 ${
                  i % 3 === 0 ? 'aspect-[3/5]' : 'aspect-square'
                }`} 
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No 2026 Deals Available</h2>
            <p className="text-muted-foreground">Check back soon for exciting deals!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {products.map((product, index) => (
              <MasonryProductCard 
                key={product.node.id} 
                product={product} 
                variant={productVariants[index]}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default FlashDeals;