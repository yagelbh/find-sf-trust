import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Truck, Tag, Flame, Star, Sparkles, Loader2, Package, Zap, Clock } from 'lucide-react';
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
  accentColor: string;
  bgColor: string;
  icon: React.ReactNode;
  tag: string; // Shopify tag to filter by
  emptyMessage: string;
  badge?: { text: string; color: string };
}

const dealConfigs: Record<string, DealConfig> = {
  'fast-delivery': {
    title: 'Fast Delivery',
    subtitle: 'Ships in 24-48 hours from local warehouse',
    accentColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    icon: <Truck className="w-6 h-6 text-emerald-600" />,
    tag: 'fast-delivery',
    emptyMessage: 'No fast delivery items available yet. Products tagged "fast-delivery" in AutoDS will appear here.',
    badge: { text: 'Quick Ship', color: 'bg-emerald-100 text-emerald-700' },
  },
  'price-drop': {
    title: 'Price Drop',
    subtitle: 'Catch these deals before prices go back up',
    accentColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    icon: <Tag className="w-6 h-6 text-amber-600" />,
    tag: 'price-drop',
    emptyMessage: 'No price drops right now. Tag products with "price-drop" in AutoDS to show them here.',
    badge: { text: 'Reduced', color: 'bg-amber-100 text-amber-700' },
  },
  'popular': {
    title: 'Popular Products',
    subtitle: 'Best selling items loved by our customers',
    accentColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    icon: <Star className="w-6 h-6 text-orange-500" />,
    tag: 'popular',
    emptyMessage: 'No popular products yet. Tag your best sellers with "popular" in AutoDS.',
    badge: { text: 'Trending', color: 'bg-orange-100 text-orange-700' },
  },
  'hot-deals': {
    title: 'Hot Deals',
    subtitle: 'Limited time offers selling fast',
    accentColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    icon: <Flame className="w-6 h-6 text-rose-500" />,
    tag: 'hot-deals',
    emptyMessage: 'No hot deals available. Add the "hot-deals" tag to products in AutoDS.',
    badge: { text: 'Hot!', color: 'bg-rose-100 text-rose-700' },
  },
  'crazy-discounts': {
    title: 'Crazy Discounts',
    subtitle: 'Our biggest markdowns - up to 80% off',
    accentColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    icon: <Sparkles className="w-6 h-6 text-purple-500" />,
    tag: 'crazy-discount',
    emptyMessage: 'No crazy discounts yet. Tag products with "crazy-discount" in AutoDS for massive savings.',
    badge: { text: 'Mega Sale', color: 'bg-purple-100 text-purple-700' },
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
        // Filter by Shopify tag for this deal type
        const query = `tag:${config.tag}`;
        const data = await fetchProducts(24, query);
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [dealType, config.tag]);

  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

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

      {/* Compact Page Header */}
      <div className={`${config.bgColor} border-b border-border`}>
        <div className="container mx-auto px-4 py-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className={`font-medium ${config.accentColor}`}>{config.title}</span>
          </div>

          {/* Title Row */}
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${config.bgColor} border border-current/10`}>
              {config.icon}
            </div>
            <div>
              <h1 className={`text-xl md:text-2xl font-bold ${config.accentColor}`}>
                {config.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {config.subtitle}
              </p>
            </div>
            {config.badge && (
              <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${config.badge.color}`}>
                {config.badge.text}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className={`p-4 ${config.bgColor} rounded-full w-fit mx-auto mb-4`}>
              {config.icon}
            </div>
            <h2 className="text-lg font-semibold mb-2">No Products Yet</h2>
            <p className="text-muted-foreground text-sm mb-6">
              {config.emptyMessage}
            </p>
            <div className="bg-muted/50 rounded-lg p-4 text-left text-sm">
              <p className="font-medium mb-2">💡 How to add products here:</p>
              <p className="text-muted-foreground">
                When importing products via AutoDS, add the tag <code className="bg-background px-1.5 py-0.5 rounded text-xs font-mono">{config.tag}</code> to your products. They'll automatically appear on this page.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {products.length} product{products.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </div>
  );
};

export default DealsPage;