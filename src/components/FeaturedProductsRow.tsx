import { useState, useMemo, memo } from 'react';
import { ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useFeaturedProducts } from '@/hooks/useShopifyProducts';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || '';
  const firstVariant = node.variants.edges[0]?.node;
  const originalPrice = price / (1 - discount / 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    addItem({ product, variantId: firstVariant.id, variantTitle: firstVariant.title, price: firstVariant.price, quantity: 1, selectedOptions: firstVariant.selectedOptions || [] });
    toast.success('Added to cart!', { description: node.title, position: 'top-center' });
    window.dispatchEvent(new CustomEvent('openCartDrawer'));
  };

  return (
    <Link to={`/product/${node.handle}`} className="flex-shrink-0 w-44 sm:w-52 group">
      <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all">
        <div className="relative aspect-square bg-white overflow-hidden">
          {!imageLoaded && <div className="absolute inset-0 bg-muted animate-pulse" />}
          <img src={imageUrl} alt={node.title} loading="lazy" className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />
          <span className="absolute top-2 left-2 bg-deal text-white text-[11px] font-bold px-2 py-0.5 rounded font-body">-{discount}%</span>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsLiked(!isLiked); }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-deal text-deal' : 'text-muted-foreground'}`} />
          </button>
          <button onClick={handleAddToCart} className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-md">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <div className="p-3">
          <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-snug min-h-[2rem] font-body">{node.title}</h3>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-lg font-bold text-foreground font-body">{currency === 'USD' ? '$' : currency}{price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground line-through font-body">${originalPrice.toFixed(2)}</span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1 font-body">{soldCount.toLocaleString()}+ sold</p>
        </div>
      </div>
    </Link>
  );
});

FeaturedCard.displayName = 'FeaturedCard';

const FeaturedProductsRow = () => {
  const { products, loading } = useFeaturedProducts();

  const productData = useMemo(() => {
    const discounts = [25, 35, 40, 45, 50, 55];
    return products.map((product, index) => {
      const random = seededRandom(product.node.id);
      return { product, discount: discounts[index % discounts.length], soldCount: 500 + Math.floor(random * 4500) };
    });
  }, [products]);

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="w-52 h-72 bg-muted rounded-xl animate-pulse flex-shrink-0" />)}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-8 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Lightning Deals</h2>
            <p className="text-sm text-muted-foreground mt-0.5 font-body">Selling fast — don't miss out</p>
          </div>
          <Link to="/flash-deals" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline font-body">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {productData.map(({ product, discount, soldCount }) => (
            <FeaturedCard key={product.node.id} product={product} discount={discount} soldCount={soldCount} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsRow;
