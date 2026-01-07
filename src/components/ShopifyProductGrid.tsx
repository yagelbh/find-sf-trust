import { useEffect, useState, useRef, useMemo } from 'react';
import { ShopifyProduct, fetchProducts, getCategoryFromTags } from '@/lib/shopify';
import ShopifyProductCard from './ShopifyProductCard';
import { Loader2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { categories as allCategories } from '@/data/categories';

const PRODUCTS_PER_PAGE = 10;

const ShopifyProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Build category bar from the 23 main categories
  const categoryBar = [
    { name: "Recommended" },
    ...allCategories.map(cat => ({ name: cat.name }))
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(50);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === "Recommended") {
      return products;
    }
    
    return products.filter(product => {
      const productCategory = getCategoryFromTags(
        product.node.tags || [], 
        product.node.productType
      );
      
      // Match if the product's category contains or matches the active category
      const categoryLower = activeCategory.toLowerCase();
      const productCategoryLower = productCategory.toLowerCase();
      
      return productCategoryLower.includes(categoryLower) || 
             categoryLower.includes(productCategoryLower) ||
             productCategoryLower === categoryLower;
    });
  }, [products, activeCategory]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [activeCategory]);

  // Products to display based on visible count
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const hasMoreProducts = visibleCount < filteredProducts.length;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + PRODUCTS_PER_PAGE);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
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
    <section className="py-6 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Pill-style Category Bar */}
        <div className="relative mb-6 sm:mb-8">
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute -left-1 sm:-left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-6 sm:px-8 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryBar.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-card text-foreground border-border hover:border-foreground/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollCategories('right')}
            className="absolute -right-1 sm:-right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Products Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-muted/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">No products in this category</h3>
            <p className="text-muted-foreground text-sm">
              Try selecting a different category or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
            {displayedProducts.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasMoreProducts && (
          <div className="text-center mt-8">
            <button 
              onClick={handleSeeMore}
              className="px-8 py-3 bg-card border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2 mx-auto"
            >
              See more <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
