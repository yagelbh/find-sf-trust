import { useState, useMemo, memo } from 'react';
import { Flame, ChevronRight, Heart, ShoppingCart, Sparkles, Zap } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useFeaturedProducts } from '@/hooks/useShopifyProducts';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

const FeaturedCard = memo(({ product, discount, soldCount }: { 
  product: ShopifyProduct; 
  discount: number;
  soldCount: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/200';
  const firstVariant = node.variants.edges[0]?.node;

  const originalPrice = price / (1 - discount / 100);

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
        "flex-shrink-0 w-44 sm:w-52 bg-card rounded-xl overflow-hidden border-2 border-primary/20 transition-all duration-300 group relative",
        isHovered && "shadow-[0_10px_40px_rgba(255,107,0,0.25)] scale-[1.03] z-10 border-primary/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hot badge */}
      <div className="absolute top-0 left-0 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg flex items-center gap-1">
        <Flame className="w-3 h-3 fill-white" />
        HOT
      </div>

      <div className="relative aspect-square bg-white overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img 
          src={imageUrl} 
          alt={node.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        <div className="absolute top-2 right-2 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-lg">
          -{discount}%
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={handleLike}
          className={cn(
            "absolute bottom-2 left-2 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-all duration-200 shadow-md",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            isLiked && "opacity-100 translate-y-0"
          )}
        >
          <Heart className={cn(
            "w-4 h-4 transition-colors",
            isLiked ? "fill-destructive text-destructive" : "text-muted-foreground hover:text-destructive"
          )} />
        </button>

        {/* Add to Cart button */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs h-9"
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            Add to Cart
          </Button>
        </div>

        {/* Sparkle effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <Sparkles className="absolute top-4 left-8 w-4 h-4 text-yellow-400 animate-pulse" />
            <Sparkles className="absolute bottom-12 right-6 w-3 h-3 text-yellow-300 animate-pulse delay-150" />
          </div>
        )}
      </div>

      <div className="p-3 bg-gradient-to-b from-card to-muted/30">
        {/* Product Title */}
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight min-h-[2.5rem]">
          {node.title}
        </h3>

        {/* Sold indicator */}
        <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
          <Zap className="w-3 h-3 text-orange-500" />
          <span className="font-medium text-orange-600">{soldCount.toLocaleString()}+ sold</span>
        </div>

        {/* Price Display */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-primary">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Limited tag */}
        <div className="mt-2 text-[10px] font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block">
          ⚡ Limited time
        </div>
      </div>
    </Link>
  );
});

FeaturedCard.displayName = 'FeaturedCard';

const FeaturedProductsRow = () => {
  const { products, loading } = useFeaturedProducts();

  // Generate unique data for each product
  const productData = useMemo(() => {
    const discounts = [25, 35, 40, 45, 50, 55];
    
    return products.map((product, index) => {
      const seed = product.node.id;
      const random = seededRandom(seed);
      
      const discount = discounts[index % discounts.length];
      const soldCount = 500 + Math.floor(random * 4500);
      
      return { product, discount, soldCount };
    });
  }, [products]);

  if (loading) {
    return (
      <section className="py-5 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-52 h-80 bg-muted rounded-xl animate-pulse flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-5 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-y border-orange-200/50 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg flex-shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 fill-white animate-pulse" />
              <span className="font-display font-extrabold text-sm sm:text-lg tracking-tight whitespace-nowrap">⚡ LIGHTNING DEALS</span>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Selling fast! Don't miss out</span>
          </div>
          <Link 
            to="/flash-deals" 
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline whitespace-nowrap flex-shrink-0"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          {productData.map(({ product, discount, soldCount }) => (
            <FeaturedCard 
              key={product.node.id} 
              product={product} 
              discount={discount}
              soldCount={soldCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsRow;
