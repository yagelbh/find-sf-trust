import { useState, useEffect, useMemo } from 'react';
import { Award, ChevronLeft, Star, TrendingUp, Flame, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CountryModal from '@/components/CountryModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const TopSellerCard = ({ product, rank }: { product: ShopifyProduct; rank: number }) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  const compareAtPrice = price * 1.4;
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  
  // Randomized indicator
  const indicator = useMemo(() => {
    const showDaysLeft = Math.random() > 0.5;
    if (showDaysLeft) {
      const daysLeft = Math.floor(Math.random() * 7) + 1;
      return { type: 'days', text: `Last ${daysLeft} days` };
    } else {
      const soldCount = Math.floor(Math.random() * 100) + 10;
      const soldDisplay = soldCount > 50 ? `${Math.floor(soldCount / 10) * 10}K+` : `${soldCount * 100}+`;
      return { type: 'sold', text: `${soldDisplay} sold` };
    }
  }, [node.id]);
  
  const rating = (Math.random() * 1 + 4).toFixed(1);
  const reviews = Math.floor(Math.random() * 5000) + 100;

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
      to={`/product/${node.handle}?source=top-sellers&rank=${rank}`}
      className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all group"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img 
          src={imageUrl} 
          alt={node.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 20 && (
          <div className="absolute top-2 left-2 bg-deal text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
        {/* Top Seller Rank Badge */}
        <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Award className="w-3 h-3" />
          #{rank} Top Seller
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 text-sm">
          {node.title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-deal font-bold text-lg">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-sm line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        </div>

        {/* Randomized Indicator */}
        <div className="flex items-center gap-2 mb-2 text-xs">
          {indicator.type === 'days' ? (
            <span className="text-deal font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {indicator.text}
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-deal" />
              <span className="text-foreground font-medium">{indicator.text}</span>
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(parseFloat(rating)) ? 'fill-warning text-warning' : 'text-muted'}`} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{rating} ({reviews.toLocaleString()})</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

const TopSellers = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$'
  });

  const timeFilters = [
    { id: 'all', label: 'Top Sellers' },
    { id: '30days', label: 'Within last 30 days' },
    { id: '14days', label: 'Within last 14 days' },
    { id: '7days', label: 'Within last 7 days' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'home', label: 'Home & Garden' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'toys', label: 'Toys & Games' },
    { id: 'sports', label: 'Sports' },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(24);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopBar onCountryClick={() => setShowCountryModal(true)} currentCountry={currentCountry} />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => setShowCountryModal(true)}
        currentCountry={currentCountry}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-warning via-deal to-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="hover:opacity-80">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="text-sm opacity-80">Home</span>
            <span className="text-sm opacity-60">/</span>
            <span className="text-sm">Top Sellers</span>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 fill-current" />
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Top Sellers
              </h1>
              <p className="text-sm opacity-90">Best picks this week • Most popular items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Time Filters */}
      <div className="border-b border-border bg-card sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-foreground text-background'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="border-b border-border bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-medium text-muted-foreground mr-2">Filter by category:</span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground hover:bg-card/80 border border-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Top Sellers Available</h2>
            <p className="text-muted-foreground">Check back soon for trending products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <TopSellerCard key={product.node.id} product={product} rank={index + 1} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CountryModal
        isOpen={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        currentCountry={currentCountry}
        onCountryChange={setCurrentCountry}
      />
    </div>
  );
};

export default TopSellers;