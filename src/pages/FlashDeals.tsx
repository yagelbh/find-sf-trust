import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

// Clean product card with uniform square sizing
const DealProductCard = ({ product }: { product: ShopifyProduct }) => {
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

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img 
          src={imageUrl} 
          alt={node.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-2 right-2 bg-deal text-white text-xs font-bold px-2 py-1 rounded">
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
        <h3 className="font-medium text-foreground line-clamp-2 text-sm mb-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
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

        {/* Sold count & Add to cart */}
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

      {/* Clean Hero Banner */}
      <div className="relative bg-gradient-to-r from-deal via-red-500 to-deal overflow-hidden">
        <div className="container mx-auto px-4 py-10 md:py-14 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-white/80">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">2026 Deals</span>
          </div>

          <div className="text-center">
            <p className="text-yellow-300 text-sm md:text-base font-semibold tracking-widest mb-2 uppercase">
              Limited Time Offers
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 tracking-tight">
              2026 New Year Deals
            </h1>
            <p className="text-white/90 text-base md:text-lg">
              Up to 70% off on thousands of products
            </p>
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

      {/* Uniform Grid Products */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-lg animate-pulse aspect-square" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Deals Available</h2>
            <p className="text-muted-foreground">Check back soon for exciting deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => (
              <DealProductCard key={product.node.id} product={product} />
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
