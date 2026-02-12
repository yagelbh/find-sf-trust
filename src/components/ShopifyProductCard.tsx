import { memo, useState, useMemo } from 'react';
import { Heart, Truck, ShoppingCart } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ShopifyProductCardProps {
  product: ShopifyProduct;
  showTopSellerRank?: boolean;
  topSellerRank?: number;
}

const seededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
};

const ShopifyProductCard = memo(({ product, showTopSellerRank = false, topSellerRank }: ShopifyProductCardProps) => {
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
  const imageUrl = node.images.edges[0]?.node.url || '';
  const firstVariant = node.variants.edges[0]?.node;

  const soldText = useMemo(() => {
    const random = seededRandom(node.id + 'sold');
    const count = Math.floor(random * 50) + 5;
    return count > 20 ? `${Math.floor(count / 10) * 10}K+ sold` : `${count * 100}+ sold`;
  }, [node.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({ product, variantId: firstVariant.id, variantTitle: firstVariant.title, price: firstVariant.price, quantity: 1, selectedOptions: firstVariant.selectedOptions || [] });
    window.dispatchEvent(new CustomEvent('openCartDrawer'));
    toast.success('Added to cart!', { description: node.title, position: 'top-center' });
  };

  return (
    <Link
      to={`/product/${node.handle}`}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-md transition-all flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white flex-shrink-0">
        {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
        <img
          src={imageUrl}
          alt={node.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {discount && (
          <span className="absolute top-2 left-2 bg-deal text-white text-[11px] font-bold px-2 py-0.5 rounded font-body">
            -{discount}%
          </span>
        )}

        {showTopSellerRank && topSellerRank && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded font-body">
            #{topSellerRank}
          </span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsLiked(!isLiked); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-deal text-deal' : 'text-muted-foreground'}`} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-medium mb-1.5 font-body">
          <Truck className="w-3 h-3" />
          <span>Free shipping</span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-base sm:text-lg font-bold text-foreground font-body">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-xs text-muted-foreground line-through font-body">${compareAtPrice.toFixed(2)}</span>
          )}
        </div>

        <h3 className="text-xs sm:text-sm text-foreground line-clamp-2 leading-snug mb-auto font-body">
          {node.title}
        </h3>

        <p className="text-[11px] text-muted-foreground mt-2 font-body">{soldText}</p>
      </div>
    </Link>
  );
});

ShopifyProductCard.displayName = 'ShopifyProductCard';

export default ShopifyProductCard;
