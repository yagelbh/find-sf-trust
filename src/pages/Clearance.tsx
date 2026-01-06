import { useState, useEffect } from 'react';
import { Percent, ChevronLeft, Package, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';

const ClearanceCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  // Seeded random for consistent values
  const seed = node.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const compareAtPrice = price * 2;
  const discount = Math.round((1 - price / compareAtPrice) * 100);
  const stockLeft = (seed % 20) + 3;
  const daysLabels = ['Last day', 'Limited time', 'Last 3 days', 'Last 3 days'];
  const daysLeft = daysLabels[seed % daysLabels.length];
  const stockPercentage = Math.min(100, (stockLeft / 25) * 100);

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
      className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all group"
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img 
          src={imageUrl} 
          alt={node.title}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-foreground text-background text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </div>
        <div className="absolute bottom-2 right-2 bg-foreground/80 text-background text-xs px-2 py-1 rounded">
          {daysLeft}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-2 mb-2 text-sm min-h-[2.5rem]">
          {node.title}
        </h3>
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-warning font-bold text-lg">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-muted-foreground text-sm line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        </div>

        {/* Stock indicator */}
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <Package className="w-3 h-3" />
          <span>Only {stockLeft} left in stock</span>
        </div>

        {/* Stock progress bar */}
        <div className="space-y-1 mb-3">
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-warning h-1.5 rounded-full transition-all"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
          <span className="text-[10px] text-warning font-medium">Clearance</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2.5 bg-warning text-warning-foreground rounded-lg font-semibold hover:bg-warning/90 transition-colors text-sm"
        >
          Grab Deal
        </button>
      </div>
    </Link>
  );
};

const Clearance = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

      {/* Clean Header Banner */}
      <div className="bg-gradient-to-r from-warning via-amber-500 to-warning">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-3 text-foreground/80">
            <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Value Finds</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Percent className="w-7 h-7 text-foreground" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Value Finds
                </h1>
                <p className="text-sm text-foreground/80">
                  Limited stock • Up to 85% off • While supplies last
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border shadow-sm">
              <Flame className="w-4 h-4 text-warning" />
              <span className="font-bold text-foreground">Final Sale</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="bg-muted rounded-lg aspect-square animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Percent className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Value Finds Available</h2>
            <p className="text-muted-foreground">Check back soon for clearance deals!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ClearanceCard key={product.node.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Clearance;
