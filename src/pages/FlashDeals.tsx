import { useState, useEffect } from 'react';
import { Clock, Zap, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const CountdownTimer = ({ endTime }: { endTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1">
      <div className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {String(timeLeft.hours).padStart(2, '0')}
      </div>
      <span className="text-foreground font-bold">:</span>
      <div className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {String(timeLeft.minutes).padStart(2, '0')}
      </div>
      <span className="text-foreground font-bold">:</span>
      <div className="bg-foreground text-background px-2 py-1 rounded font-mono font-bold text-sm">
        {String(timeLeft.seconds).padStart(2, '0')}
      </div>
    </div>
  );
};

const FlashDealCard = ({ product, endTime }: { product: ShopifyProduct; endTime: Date }) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  const compareAtPrice = price * 1.6;
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  const soldPercentage = Math.floor(Math.random() * 40) + 50;

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
        <div className="absolute top-2 left-2 bg-deal text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 text-sm">
          {node.title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-deal font-bold text-lg">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-sm line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        </div>

        {/* Countdown */}
        <div className="mb-3">
          <CountdownTimer endTime={endTime} />
        </div>

        {/* Stock bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{soldPercentage}% sold</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-deal to-warning h-2 rounded-full transition-all"
              style={{ width: `${soldPercentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-3 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

const FlashDeals = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Different end times for variety
  const getRandomEndTime = (index: number) => {
    const hours = [2, 4, 6, 8, 12][index % 5];
    return new Date(Date.now() + hours * 60 * 60 * 1000);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(20);
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
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-deal via-primary to-deal/80 text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="hover:opacity-80">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="text-sm opacity-80">Home</span>
            <span className="text-sm opacity-60">/</span>
            <span className="text-sm">Flash Deals</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 fill-current" />
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                  Flash Deals
                </h1>
                <p className="text-sm opacity-90">Limited time offers • Grab before they're gone!</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-background/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">Ends in:</span>
              <CountdownTimer endTime={new Date(Date.now() + 4 * 60 * 60 * 1000)} />
            </div>
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
            <Zap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Flash Deals Available</h2>
            <p className="text-muted-foreground">Check back soon for exciting deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <FlashDealCard 
                key={product.node.id} 
                product={product} 
                endTime={getRandomEndTime(index)}
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
