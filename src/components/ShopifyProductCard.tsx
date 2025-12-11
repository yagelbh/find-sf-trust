import { Star, Heart, Truck, ShoppingCart, Clock, Award, Flame } from 'lucide-react';
import { useState, useMemo } from 'react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  showTopSellerRank?: boolean;
  topSellerRank?: number;
}

const ShopifyProductCard = ({ product, showTopSellerRank = false, topSellerRank }: ShopifyProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice 
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount) 
    : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const discount = compareAtPrice && compareAtPrice > price 
    ? Math.round((1 - price / compareAtPrice) * 100) 
    : null;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/300';
  const firstVariant = node.variants.edges[0]?.node;

  // Check for special tags from Shopify
  const tags = node.tags || [];
  const isBestSeller = tags.some(tag => tag.toLowerCase().includes('best') || tag.toLowerCase().includes('popular'));
  const isDeal = tags.some(tag => tag.toLowerCase().includes('deal') || tag.toLowerCase().includes('sale'));
  const isLimited = tags.some(tag => tag.toLowerCase().includes('limited') || tag.toLowerCase().includes('last'));
  const isClearance = tags.some(tag => tag.toLowerCase().includes('clearance'));
  const isTimeLimited = tags.some(tag => tag.toLowerCase().includes('time-limited') || tag.toLowerCase().includes('flash'));

  // Randomized indicator - either "days left" or "sold count"
  const indicator = useMemo(() => {
    const showDaysLeft = Math.random() > 0.5;
    if (showDaysLeft) {
      const daysLeft = Math.floor(Math.random() * 7) + 1;
      return { type: 'days', value: daysLeft, text: `Last ${daysLeft} days` };
    } else {
      const soldCount = Math.floor(Math.random() * 50) + 5;
      const soldDisplay = soldCount > 20 ? `${Math.floor(soldCount / 10) * 10}K+` : `${soldCount * 100}+`;
      return { type: 'sold', value: soldCount, text: `${soldDisplay} sold` };
    }
  }, [node.id]);

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

    // Dispatch event to open cart drawer
    window.dispatchEvent(new CustomEvent('openCartDrawer'));
    
    toast.success('Added to cart!', {
      description: node.title,
      position: 'top-center',
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img 
          src={imageUrl} 
          alt={node.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-2 left-2 bg-deal text-primary-foreground text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {/* Special Labels from Shopify Tags */}
        {isBestSeller && (
          <div className="absolute top-2 left-2 bg-warning text-foreground text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <Award className="w-3 h-3" />
            Top Seller
          </div>
        )}
        
        {isDeal && !isBestSeller && (
          <div className="absolute top-2 left-2 bg-deal text-primary-foreground text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
            <Flame className="w-3 h-3" />
            Hot Deal
          </div>
        )}

        {isLimited && (
          <div className="absolute bottom-2 left-2 bg-secondary/90 text-secondary-foreground text-[10px] font-medium px-2 py-1 rounded flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Limited Time
          </div>
        )}

        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-deal text-deal' : 'text-muted-foreground'}`} />
        </button>

        {/* Add to Cart Button - appears on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Free Shipping Badge */}
        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium mb-2">
          <Truck className="w-3 h-3" />
          <span>Free shipping</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-bold text-foreground">
            {currency === 'USD' ? '$' : currency} {price.toFixed(2)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Randomized Indicator - Days left OR Sold count */}
        <div className="flex items-center gap-1 mb-1">
          {indicator.type === 'days' ? (
            <span className="text-xs font-semibold text-deal">
              {indicator.text}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">{indicator.text}</span>
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-sm text-foreground line-clamp-2 mb-2 min-h-[40px]">
          {node.title}
        </h3>

        {/* Rating placeholder */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-3 h-3 ${i < 4 ? 'fill-warning text-warning' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            4.5 (100+)
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;