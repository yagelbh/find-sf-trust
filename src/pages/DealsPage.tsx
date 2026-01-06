import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Truck, Tag, Flame, Star, Sparkles, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

interface DealConfig {
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
  badgeText?: string;
  description: string;
}

const dealConfigs: Record<string, DealConfig> = {
  'fast-delivery': {
    title: 'Local Warehouse',
    subtitle: 'Fast Delivery From $1.99',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-600',
    icon: <Truck className="w-8 h-8" />,
    badgeText: '🚚 Ships in 24-48 hours',
    description: 'Products shipped from local warehouses for lightning-fast delivery',
  },
  'price-drop': {
    title: 'Price Drop',
    subtitle: 'Save Up To $50',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-500',
    icon: <Tag className="w-8 h-8" />,
    badgeText: '🏷️ Prices just dropped!',
    description: 'Catch these price drops before they go back up',
  },
  'popular': {
    title: 'Popular Products',
    subtitle: 'Best Selling Items',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-600',
    icon: <Star className="w-8 h-8" />,
    badgeText: '⭐ Top Rated',
    description: 'Our most loved products with thousands of happy customers',
  },
  'hot-deals': {
    title: 'Hot Deals',
    subtitle: 'Score Big Savings',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-amber-500',
    icon: <Flame className="w-8 h-8 text-rose-600" />,
    badgeText: '🔥 Selling Fast!',
    description: 'Limited time offers that are too hot to miss',
  },
  'crazy-discounts': {
    title: 'Crazy Discounts',
    subtitle: 'Up to 80% Off',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500',
    icon: <Sparkles className="w-8 h-8" />,
    badgeText: '💥 Unbelievable Prices',
    description: 'Our biggest discounts on quality products',
  },
};

const DealsPage = () => {
  const { dealType } = useParams<{ dealType: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  const config = dealConfigs[dealType || ''] || dealConfigs['popular'];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
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
  }, [dealType]);

  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  // Update page title
  useEffect(() => {
    document.title = `${config.title} | Findsfae`;
  }, [config.title]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      {/* Hero Banner */}
      <div className={`bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} text-white py-8 relative overflow-hidden`}>
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
          {/* Confetti */}
          <div className="absolute top-8 right-[20%] w-3 h-3 bg-yellow-300/60 rounded-full animate-pulse" />
          <div className="absolute top-16 right-[15%] w-2 h-2 bg-white/40 rounded-full" />
          <div className="absolute bottom-8 left-[30%] w-2 h-2 bg-white/50 rounded-full" />
          <div className="absolute top-12 left-[25%] w-1.5 h-1.5 bg-yellow-200/50 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" className="hover:opacity-80 flex items-center gap-1">
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm opacity-90">Home</span>
            </Link>
            <span className="text-sm opacity-60">/</span>
            <span className="text-sm font-medium">{config.title}</span>
          </div>

          {/* Badge */}
          {config.badgeText && (
            <div className="inline-block bg-white/90 text-gray-800 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              {config.badgeText}
            </div>
          )}

          {/* Title & Icon */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              {config.icon}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {config.title}
              </h1>
              <p className="text-lg md:text-xl font-semibold opacity-90">
                {config.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm md:text-base opacity-80 max-w-xl">
            {config.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="p-4 bg-muted rounded-full w-fit mx-auto mb-4">
              {config.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">No Products Available</h2>
            <p className="text-muted-foreground">Check back soon for amazing deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </div>
  );
};

export default DealsPage;
