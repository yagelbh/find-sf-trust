import { useState, useEffect, useMemo } from 'react';
import { Zap, Clock, ChevronRight, Heart, ShoppingCart, Flame } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DealsCountdownProps {
  products: ShopifyProduct[];
}

// Generate a seeded random number for consistent values per product
const seededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
};

const CountdownTimer = ({ endTime, isUrgent }: { endTime: Date; isUrgent: boolean }) => {
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
    <div className={cn(
      "flex items-center gap-1 text-xs",
      isUrgent && "text-destructive animate-pulse"
    )}>
      {isUrgent && <Flame className="w-3 h-3 text-destructive fill-destructive" />}
      <Clock className="w-3 h-3" />
      <span className="font-mono">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

// Star rating component
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={cn(
              "text-xs",
              star <= rating ? "text-amber-400" : "text-muted-foreground/30"
            )}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground">({reviewCount})</span>
    </div>
  );
};

const DealCard = ({ product, dealEndTime, discount, category, rating, reviewCount }: { 
  product: ShopifyProduct; 
  dealEndTime: Date;
  discount: number;
  category: string;
  rating: number;
  reviewCount: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/200';
  const firstVariant = node.variants.edges[0]?.node;

  // Calculate original price based on discount
  const originalPrice = price / (1 - discount / 100);
  const savings = originalPrice - price;
  
  // Check if less than 1 hour remaining
  const hoursRemaining = (dealEndTime.getTime() - Date.now()) / (1000 * 60 * 60);
  const isUrgent = hoursRemaining < 1;

  // Determine badge color based on discount
  const getBadgeColor = () => {
    if (discount > 50) return 'bg-destructive text-destructive-foreground';
    if (discount >= 30) return 'bg-orange-500 text-white';
    return 'bg-blue-500 text-white';
  };

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
    window.dispatchEvent(new CustomEvent('openCartDrawer'));
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist', { position: 'top-center' });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className={cn(
        "flex-shrink-0 w-48 bg-card rounded-lg overflow-hidden border border-border transition-all duration-300 group relative",
        isHovered && "shadow-[0_10px_30px_rgba(0,0,0,0.15)] scale-[1.03] z-10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-white overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${node.title} - ${category} product on sale`}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        <div className={cn(
          "absolute top-2 right-2 text-[11px] font-bold px-2 py-1 rounded-md shadow-sm",
          getBadgeColor()
        )}>
          -{discount}%
        </div>

        {/* Wishlist Heart - appears on hover */}
        <button
          onClick={handleLike}
          className={cn(
            "absolute top-2 left-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-sm",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
            isLiked && "opacity-100 translate-y-0"
          )}
        >
          <Heart className={cn(
            "w-4 h-4 transition-colors",
            isLiked ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
          )} />
        </button>

        {/* Add to Cart button - slides up on hover */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full bg-white text-foreground hover:bg-white/90 font-semibold text-xs h-8"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-3">
        {/* Category Tag */}
        <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
          {category}
        </span>

        {/* Product Title */}
        <h3 className="text-sm font-medium text-foreground mt-1 line-clamp-2 leading-tight min-h-[2.5rem]">
          {node.title}
        </h3>

        {/* Star Rating */}
        <div className="mt-1">
          <StarRating rating={rating} reviewCount={reviewCount} />
        </div>

        {/* Price Display */}
        <div className="mt-2 space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-[11px] font-medium text-green-600">
            You save: ${savings.toFixed(2)}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
          <CountdownTimer endTime={dealEndTime} isUrgent={isUrgent} />
          <div className="w-16 bg-muted rounded-full h-1.5">
            <div className="bg-deal h-1.5 rounded-full" style={{ width: `${Math.max(20, 100 - discount)}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const DealsCountdown = ({ products }: DealsCountdownProps) => {
  // Generate unique data for each product
  const productData = useMemo(() => {
    const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys', 'Books', 'Garden'];
    const discounts = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    
    return products.map((product) => {
      const seed = product.node.id;
      const random = seededRandom(seed);
      
      // Random hours between 1-8
      const hours = 1 + Math.floor(random * 7);
      const minutes = Math.floor((random * 1000) % 60);
      const endTime = new Date(Date.now() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
      
      // Random discount from array
      const discount = discounts[Math.floor(random * discounts.length)];
      
      // Random category
      const category = categories[Math.floor((random * 100) % categories.length)];
      
      // Random rating 3-5
      const rating = 3 + Math.floor(random * 3);
      
      // Random review count 12-500
      const reviewCount = 12 + Math.floor(random * 488);
      
      return { product, endTime, discount, category, rating, reviewCount };
    });
  }, [products]);

  if (products.length === 0) return null;

  const flashDeals = productData.slice(0, 8);

  return (
    <section className="py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Flash Deals Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-deal fill-deal" />
              <h2 className="font-display font-extrabold text-xl text-deal tracking-tight">Quick Deals</h2>
              <span className="text-sm text-muted-foreground ml-2">Limited time offers</span>
            </div>
            <Link 
              to="/flash-deals" 
              className="flex items-center gap-1 text-sm font-semibold text-deal hover:underline"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {flashDeals.map(({ product, endTime, discount, category, rating, reviewCount }) => (
              <DealCard 
                key={product.node.id} 
                product={product} 
                dealEndTime={endTime}
                discount={discount}
                category={category}
                rating={rating}
                reviewCount={reviewCount}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsCountdown;
