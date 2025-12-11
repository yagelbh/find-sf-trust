import { useState, useEffect } from 'react';
import { Flame, ChevronLeft, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CountryModal from '@/components/CountryModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const HotSellingCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  const compareAtPrice = price * 1.4;
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  const soldCount = Math.floor(Math.random() * 50000) + 1000;
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
      to={`/product/${node.handle}`}
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
        <div className="absolute top-2 right-2 bg-warning text-warning-foreground text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <Flame className="w-3 h-3" />
          Best Seller
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

        {/* Sold count */}
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <TrendingUp className="w-3 h-3 text-deal" />
          <span className="text-deal font-semibold">{soldCount.toLocaleString()}+ sold</span>
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

const HotSelling = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$'
  });

  const filters = [
    { id: 'all', label: 'Best-Selling Items' },
    { id: '30days', label: 'Within last 30 days' },
    { id: '14days', label: 'Within last 14 days' },
    { id: '7days', label: 'Within last 7 days' },
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
      <TopBar />
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
            <span className="text-sm">Hot-Selling Items</span>
          </div>
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 fill-current" />
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                Hot-Selling Items
              </h1>
              <p className="text-sm opacity-90">Top picks this week • Trending now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-border bg-card sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
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
            <Flame className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Hot Items Available</h2>
            <p className="text-muted-foreground">Check back soon for trending products!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <HotSellingCard key={product.node.id} product={product} />
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

export default HotSelling;
