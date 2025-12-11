import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchProductByHandle, ShopifyProduct, getCategoryFromTags } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart, Truck, Shield, Minus, Plus, ShoppingCart, Loader2, Award, Clock, Package, CheckCircle, Globe } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import WhyChooseFindsfae from '@/components/WhyChooseFindsfae';
import CartDrawer from '@/components/CartDrawer';
import VariantSelectionDrawer from '@/components/VariantSelectionDrawer';


// Countdown Timer Component
const CountdownTimer = ({ endTime }: { endTime: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-1">
      <span className="bg-foreground text-background px-2 py-1 rounded text-sm font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-foreground font-bold">:</span>
      <span className="bg-foreground text-background px-2 py-1 rounded text-sm font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-foreground font-bold">:</span>
      <span className="bg-foreground text-background px-2 py-1 rounded text-sm font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showVariantDrawer, setShowVariantDrawer] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  // Get source and rank from URL params
  const source = searchParams.get('source');
  const rankParam = searchParams.get('rank');
  
  // Determine if product is from special pages (don't show Top Seller banner for these)
  const isFromClearance = source === 'clearance';
  const isFromFlashDeals = source === 'flash-deals';
  const showTopSellerBanner = !isFromClearance && !isFromFlashDeals;
  
  // Random Top Seller rank for display
  const topSellerRank = useMemo(() => {
    if (rankParam) return parseInt(rankParam);
    return Math.floor(Math.random() * 50) + 1;
  }, [rankParam]);

  // Deal end time (random time in next 24 hours)
  const dealEndTime = useMemo(() => {
    const end = new Date();
    end.setHours(end.getHours() + Math.floor(Math.random() * 24) + 1);
    return end;
  }, []);

  // US-only shipping estimate
  const shippingEstimate = useMemo(() => {
    const estimate = { min: 7, max: 14, courier: 'USPS / FedEx' };
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() + estimate.min);
    endDate.setDate(endDate.getDate() + estimate.max);
    
    return {
      ...estimate,
      startDate: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      endDate: endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  }, []);

  // Simulated sold count
  const soldCount = useMemo(() => {
    return Math.floor(Math.random() * 50000) + 1000;
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          setSelectedVariant(data.variants.edges[0].node.id);
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [handle]);

  const handleAddToCart = () => {
    // Always show the variant drawer for option selection
    setShowVariantDrawer(true);
  };

  const handleVariantAddToCart = (variantId: string, qty: number) => {
    if (!product) return;
    
    const variant = product.variants.edges.find(v => v.node.id === variantId)?.node;
    if (!variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions,
    });

    // Open cart drawer after adding
    window.dispatchEvent(new CustomEvent('openCartDrawer'));

    toast.success('Added to cart!', {
      description: `${product.title} x${qty}`,
      position: 'top-center',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-primary hover:underline">Return to home</Link>
        </div>
      </div>
    );
  }

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice 
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) 
    : price * 1.4;
  const discount = compareAtPrice && compareAtPrice > price 
    ? Math.round((1 - price / compareAtPrice) * 100) 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
              {product.images.edges[selectedImage] && (
                <img
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.edges.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Top Banner - Free Shipping & Credit */}
            <div className="bg-gradient-to-r from-primary to-deal text-primary-foreground p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Free shipping</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">$20 Credit for delay</span>
                </div>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-display font-bold">{product.title}</h1>
            
            {/* Sold count & Rating */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">{soldCount.toLocaleString()}+ sold</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground">4.8 ★★★★★</span>
            </div>

            {/* Top Seller Badge - Only show if not from Clearance/Flash Deals */}
            {showTopSellerBanner && (
              <div className="inline-flex items-center gap-2 bg-warning/20 text-warning px-3 py-2 rounded-lg">
                <Award className="w-5 h-5" />
                <span className="font-bold">#{topSellerRank} Top Seller</span>
                <span className="text-sm">in {getCategoryFromTags(product.tags || [], product.productType)}</span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-deal">
                ${price.toFixed(2)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    RRP ${compareAtPrice.toFixed(2)}
                  </span>
                  <span className="bg-deal/10 text-deal px-2 py-1 rounded text-sm font-bold">
                    -{discount}% limited time
                  </span>
                </>
              )}
            </div>

            {/* Deal Countdown */}
            <div className="bg-gradient-to-r from-deal/90 to-warning/90 text-primary-foreground p-4 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">Big sale</span>
                  <span className="opacity-80">|</span>
                  <span className="text-sm">Ends in</span>
                </div>
                <CountdownTimer endTime={dealEndTime} />
              </div>
            </div>

            {/* Variants */}
            {product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-4 p-4 bg-muted/50 rounded-xl border border-border">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className="px-4 py-2 border rounded-lg hover:border-primary transition-colors bg-card"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium mb-2">Qty</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted bg-card"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted bg-card"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button variant="cta" size="xl" className="w-full text-lg" onClick={handleAddToCart}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
              {discount && <span className="ml-2 text-sm opacity-90">{discount}% OFF</span>}
            </Button>

            {/* Shipping Info */}
            <div className="space-y-3 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary">Free shipping for this item</p>
                  <p className="text-sm text-muted-foreground">
                    Delivery: {shippingEstimate.startDate} - {shippingEstimate.endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Courier company: {shippingEstimate.courier}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    Shipping to: <span className="text-lg">🇺🇸</span> United States
                  </p>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Security & Privacy</p>
                  <p className="text-xs text-muted-foreground">Safe payments</p>
                  <p className="text-xs text-muted-foreground">Secure privacy</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Delivery guarantee</p>
                  <p className="text-xs text-muted-foreground">$20 Credit for delay</p>
                  <p className="text-xs text-muted-foreground">15-day no update refund</p>
                </div>
              </div>
            </div>

            {/* Why Choose Findsfae */}
            <WhyChooseFindsfae />

            {/* Description */}
            {product.description && (
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
      <VariantSelectionDrawer 
        isOpen={showVariantDrawer}
        onClose={() => setShowVariantDrawer(false)}
        product={product}
        onAddToCart={handleVariantAddToCart}
        selectedVariantId={selectedVariant}
      />
    </div>
  );
};

export default ProductDetail;