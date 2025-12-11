import { Star, Heart, Truck, Flame } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
  stock?: number | null;
}

interface ProductCardProps {
  product: Product;
  isLightningDeal?: boolean;
}

const ProductCard = ({ product, isLightningDeal = false }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-deal text-primary-foreground text-xs font-bold px-2 py-1 rounded">
          -{product.discount}%
        </div>

        {/* Like Button */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-deal text-deal' : 'text-muted-foreground'}`} />
        </button>

        {/* Stock Warning */}
        {product.stock && product.stock <= 5 && (
          <div className="absolute bottom-0 inset-x-0 bg-foreground/80 backdrop-blur-sm text-primary-foreground text-center py-1 text-sm font-medium">
            Only {product.stock} left
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Free Shipping Badge */}
        <div className="flex items-center gap-1 text-trust text-xs font-medium mb-2">
          <Truck className="w-3 h-3" />
          <span>Free shipping</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm text-foreground line-clamp-2 mb-2 min-h-[40px]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-warning text-warning' : 'text-muted'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Hot Seller Badge */}
        {isLightningDeal && product.reviews > 2000 && (
          <div className="flex items-center gap-1 mt-2 text-primary text-xs font-medium">
            <Flame className="w-3 h-3 fill-primary" />
            <span>Hot seller</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
