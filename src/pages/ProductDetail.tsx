import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { fetchProductByHandle, ShopifyProduct, getCategoryFromTags, getCategoryPath } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart, Truck, Shield, Minus, Plus, ShoppingCart, Loader2, Award, Clock, Package, CheckCircle, Globe, Share2, Copy, Mail, Facebook, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import WhyChooseFindsfae from '@/components/WhyChooseFindsfae';
import CartDrawer from '@/components/CartDrawer';
import VariantSelectionDrawer from '@/components/VariantSelectionDrawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


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
    <div className="flex items-center gap-0.5">
      <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-xs font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
      <span className="text-foreground font-bold text-xs">:</span>
      <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-xs font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
      <span className="text-foreground font-bold text-xs">:</span>
      <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-xs font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
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
  const rawCompareAtPrice = product.compareAtPriceRange?.minVariantPrice 
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) 
    : 0;
  // Only show compare price if it's greater than current price (not 0, not equal/less)
  const compareAtPrice = rawCompareAtPrice > price ? rawCompareAtPrice : null;
  const discount = compareAtPrice 
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
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 overflow-x-hidden">
        {/* Breadcrumb with full, clickable category path */}
        {(() => {
          const categoryPath = getCategoryPath(product.tags || [], product.productType);
          const categoryLink = `/category?category=${encodeURIComponent(categoryPath.category)}`;
          const subcategoryLink = categoryPath.subcategory
            ? `${categoryLink}&subcategory=${encodeURIComponent(categoryPath.subcategory)}`
            : '';
          const childLink = categoryPath.child
            ? `${subcategoryLink}&child=${encodeURIComponent(categoryPath.child)}`
            : '';

          return (
            <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 overflow-x-auto scrollbar-hide" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary whitespace-nowrap">Home</Link>
              <span className="text-muted-foreground/50">›</span>

              <Link to={categoryLink} className="hover:text-primary whitespace-nowrap">{categoryPath.category}</Link>

              {categoryPath.subcategory && (
                <>
                  <span className="text-muted-foreground/50">›</span>
                  <Link to={subcategoryLink} className="hover:text-primary whitespace-nowrap">{categoryPath.subcategory}</Link>
                </>
              )}

              {categoryPath.child && (
                <>
                  <span className="text-muted-foreground/50 hidden sm:inline">›</span>
                  <Link to={childLink} className="hover:text-primary whitespace-nowrap hidden sm:inline">{categoryPath.child}</Link>
                </>
              )}

              <span className="text-muted-foreground/50 hidden sm:inline">›</span>
              <span className="text-foreground truncate max-w-[120px] sm:max-w-xs font-medium hidden sm:inline">{product.title}</span>
            </nav>
          );
        })()}

        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {/* Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden relative flex items-center justify-center">
              {product.images.edges[selectedImage] && (
                <img
                  src={product.images.edges[selectedImage].node.url}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
                  loading="eager"
                />
              )}
            </div>
            {product.images.edges.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.edges.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 bg-white flex items-center justify-center ${
                      selectedImage === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-contain p-0.5" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3 sm:space-y-4">
            {/* Free Shipping - Simple inline text like reference */}
            <div className="bg-warning/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="text-primary font-medium whitespace-nowrap">Free shipping</span>
                </div>
                <span className="text-muted-foreground hidden sm:inline">|</span>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground flex-shrink-0" />
                  <span className="text-foreground whitespace-nowrap">$5.00 Credit for delay</span>
                </div>
              </div>
              {/* Share Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <Share2 className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="end">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Share to</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Item ID: {product.id.split('/').pop()}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(product.id.split('/').pop() || '');
                          toast.success('ID copied!');
                        }}
                        className="text-primary hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                    {(() => {
                      const shareUrl = `https://findsfae.com/product/${handle}`;
                      return (
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => {
                              window.open(`mailto:?subject=${encodeURIComponent(product.title)}&body=${encodeURIComponent(shareUrl)}`, '_blank');
                            }}
                            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                          >
                            <Mail className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              window.open(`sms:?body=${encodeURIComponent(product.title + ' - ' + shareUrl)}`, '_blank');
                            }}
                            className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                          </button>
                          <button 
                            onClick={() => {
                              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.title)}`, '_blank');
                            }}
                            className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                            }}
                            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                          >
                            <Facebook className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(product.title)}`, '_blank');
                            }}
                            className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43.2-.93 1.34-5.69 1.34-5.69s-.34-.68-.34-1.7c0-1.59.93-2.78 2.08-2.78.98 0 1.45.74 1.45 1.62 0 .99-.63 2.47-.95 3.84-.27 1.14.57 2.07 1.7 2.07 2.04 0 3.6-2.15 3.6-5.26 0-2.75-1.98-4.67-4.8-4.67-3.27 0-5.19 2.45-5.19 4.98 0 .99.38 2.05.86 2.62.09.11.1.21.08.33-.09.36-.29 1.14-.33 1.3-.05.21-.17.26-.4.16-1.46-.68-2.37-2.82-2.37-4.53 0-3.69 2.68-7.08 7.73-7.08 4.06 0 7.21 2.89 7.21 6.75 0 4.03-2.54 7.27-6.07 7.27-1.19 0-2.3-.62-2.68-1.35l-.73 2.78c-.26 1.01-.97 2.28-1.45 3.05A12 12 0 1 0 12 0z"/></svg>
                          </button>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(shareUrl);
                              toast.success('Link copied to clipboard!');
                            }}
                            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                          >
                            <Copy className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold leading-tight">{product.title}</h1>
            
            {/* Sold count & Rating */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm flex-wrap">
              <span className="text-muted-foreground">{soldCount.toLocaleString()}+ sold</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground">4.8 ★★★★★</span>
            </div>

            {/* Top Seller Badge - Only show if not from Clearance/Flash Deals */}
            {showTopSellerBanner && (
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-warning/20 text-warning px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-sm">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-bold">#{topSellerRank} Best Seller</span>
                <span className="text-xs sm:text-sm hidden sm:inline">in {getCategoryFromTags(product.tags || [], product.productType)}</span>
              </div>
            )}
            
            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-deal">
                ${price.toFixed(2)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <>
                  <span className="text-sm sm:text-lg text-muted-foreground line-through">
                    RRP ${compareAtPrice.toFixed(2)}
                  </span>
                  <span className="bg-deal/10 text-deal px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold">
                    -{discount}% limited time
                  </span>
                </>
              )}
            </div>

            {/* Deal Countdown */}
            <div className="bg-gradient-to-r from-deal/90 to-warning/90 text-primary-foreground px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm">Big sale</span>
                  <span className="opacity-80 text-xs">|</span>
                  <span className="text-xs">Ends in</span>
                </div>
                <CountdownTimer endTime={dealEndTime} />
              </div>
            </div>

            {/* Variants */}
            {product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg hover:border-primary transition-colors bg-card text-sm"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Qty</label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center hover:bg-muted bg-card"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 sm:w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center hover:bg-muted bg-card"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button variant="cta" size="lg" className="w-full text-sm sm:text-base" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
              {discount && <span className="ml-2 text-xs opacity-90">{discount}% OFF</span>}
            </Button>

            {/* Shipping Info */}
            <div className="space-y-2 sm:space-y-3 p-3 sm:p-4 bg-card rounded-xl border border-border">
              <div className="flex items-start gap-2 sm:gap-3">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-medium text-primary text-sm sm:text-base">Free shipping for this item</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Delivery: {shippingEstimate.startDate} - {shippingEstimate.endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Courier: {shippingEstimate.courier}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                    Shipping to: <span className="text-base sm:text-lg">🇺🇸</span> United States
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