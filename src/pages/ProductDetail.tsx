import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Heart, Truck, Shield, Minus, Plus, ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TopBar from '@/components/TopBar';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

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
    if (!product || !selectedVariant) return;
    
    const variant = product.variants.edges.find(v => v.node.id === selectedVariant)?.node;
    if (!variant) return;

    addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions,
    });

    toast.success('Added to cart!', {
      description: `${product.title} x${quantity}`,
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
    : null;
  const discount = compareAtPrice && compareAtPrice > price 
    ? Math.round((1 - price / compareAtPrice) * 100) 
    : null;

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => {}}
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
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
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
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold">{product.title}</h1>
            
            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${price.toFixed(2)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                  <span className="bg-deal text-primary-foreground px-2 py-1 rounded text-sm font-bold">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 p-4 bg-trust/10 rounded-lg">
              <div className="flex items-center gap-2 text-trust">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-medium">Free shipping</span>
              </div>
              <div className="flex items-center gap-2 text-trust">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Buyer protection</span>
              </div>
            </div>

            {/* Variants */}
            {product.options.length > 0 && product.options[0].name !== 'Title' && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium mb-2">{option.name}</label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className="px-4 py-2 border rounded-lg hover:border-primary transition-colors"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-muted"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="cta" size="xl" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="xl">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

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
    </div>
  );
};

export default ProductDetail;
