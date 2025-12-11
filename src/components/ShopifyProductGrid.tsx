import { useEffect, useState, useRef } from 'react';
import { ShopifyProduct, fetchProducts } from '@/lib/shopify';
import ShopifyProductCard from './ShopifyProductCard';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories as allCategories } from '@/data/categories';

const ShopifyProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Build category bar with icons/images
  const categoryBar = [
    { name: "All", icon: "🏠", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=60&h=60&fit=crop" },
    { name: "Home Improvement", icon: "🔧", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=60&h=60&fit=crop" },
    { name: "Bags & Luggage", icon: "👜", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=60&h=60&fit=crop" },
    { name: "Tools", icon: "🛠️", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=60&h=60&fit=crop" },
    { name: "Home & Garden", icon: "🌿", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=60&h=60&fit=crop" },
    { name: "Automotive", icon: "🚗", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=60&h=60&fit=crop" },
    { name: "Home Appliances", icon: "🏠", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop" },
    { name: "Beauty & Health", icon: "💄", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=60&h=60&fit=crop" },
    { name: "Watches", icon: "⌚", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=60&h=60&fit=crop" },
    { name: "Sports Wear", icon: "🏃", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=60&h=60&fit=crop" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(20);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20 bg-muted rounded-lg">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Tell me what products you'd like to add to your store!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Category Pills with Scroll */}
        <div className="relative mb-6">
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-10 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryBar.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted/60 text-foreground hover:bg-muted'
                }`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ShopifyProductCard key={product.node.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-card border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
