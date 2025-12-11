import { useState, useEffect } from 'react';
import { Zap, Clock, ChevronRight } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface DealsCountdownProps {
  products: ShopifyProduct[];
}

const CountdownTimer = ({ endTime }: { endTime: Date }) => {
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
    <div className="flex items-center gap-1 text-xs">
      <Clock className="w-3 h-3" />
      <span className="font-mono">
        {String(timeLeft.hours).padStart(2, '0')}:
        {String(timeLeft.minutes).padStart(2, '0')}:
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

const DealCard = ({ product, dealEndTime }: { product: ShopifyProduct; dealEndTime: Date }) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currency = node.priceRange.minVariantPrice.currencyCode;
  const imageUrl = node.images.edges[0]?.node.url || 'https://via.placeholder.com/200';
  const firstVariant = node.variants.edges[0]?.node;

  // Simulate compare price (for demo - would come from Shopify in real implementation)
  const compareAtPrice = price * 1.5;
  const discount = Math.round((1 - price / compareAtPrice) * 100);

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
      className="flex-shrink-0 w-44 bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all group"
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img 
          src={imageUrl} 
          alt={node.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-1 right-1 bg-deal text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
          -{discount}%
        </div>
      </div>
      <div className="p-2">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-foreground">
            {currency === 'USD' ? '$' : currency}{price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ${compareAtPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <CountdownTimer endTime={dealEndTime} />
          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
            <div className="bg-deal h-1.5 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
    </Link>
  );
};

const DealsCountdown = ({ products }: DealsCountdownProps) => {
  const dealEndTime = new Date(Date.now() + 4 * 60 * 60 * 1000);

  if (products.length === 0) return null;

  const flashDeals = products.slice(0, 8);

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
            {flashDeals.map((product) => (
              <DealCard key={product.node.id} product={product} dealEndTime={dealEndTime} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsCountdown;
