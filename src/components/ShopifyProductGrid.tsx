import { useState, useRef, useMemo, useEffect } from 'react';
import { getCategoryFromTags } from '@/lib/shopify';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import ShopifyProductCard from './ShopifyProductCard';
import { Loader2, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { categories as allCategories } from '@/data/categories';

const PRODUCTS_PER_PAGE = 10;

const ShopifyProductGrid = () => {
  const { products, loading, error } = useShopifyProducts(50);
  const [activeCategory, setActiveCategory] = useState("Recommended");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const scrollRef = useRef<HTMLDivElement>(null);

  const categoryBar = [
    { name: "Recommended" },
    ...allCategories.map(cat => ({ name: cat.name }))
  ];

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Recommended") return products;
    return products.filter(product => {
      const productCategory = getCategoryFromTags(product.node.tags || [], product.node.productType);
      const cl = activeCategory.toLowerCase();
      const pcl = productCategory.toLowerCase();
      return pcl.includes(cl) || cl.includes(pcl) || pcl === cl;
    });
  }, [products, activeCategory]);

  useEffect(() => { setVisibleCount(PRODUCTS_PER_PAGE); }, [activeCategory]);

  const displayedProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);
  const hasMore = visibleCount < filteredProducts.length;

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4 flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground text-sm font-body">Loading products...</span>
        </div>
      </section>
    );
  }

  if (error) return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center py-20">
        <p className="text-destructive font-body">{error}</p>
      </div>
    </section>
  );

  if (products.length === 0) return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center py-20 bg-muted rounded-xl">
        <h3 className="text-xl font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground font-body">Check back soon for new arrivals!</p>
      </div>
    </section>
  );

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-body">Browse our full collection</p>
        </div>

        {/* Category pills */}
        <div className="relative mb-6">
          <button onClick={() => scroll('left')} className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-muted border border-border">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div ref={scrollRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-8 py-1" style={{ scrollbarWidth: 'none' }}>
            {categoryBar.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all font-body ${
                  activeCategory === cat.name
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-card text-foreground border border-border hover:border-foreground/30'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button onClick={() => scroll('right')} className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-card shadow-md rounded-full flex items-center justify-center hover:bg-muted border border-border">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-muted/50 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">No products in this category</h3>
            <p className="text-muted-foreground text-sm font-body">Try a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {displayedProducts.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-8">
            <button onClick={() => setVisibleCount(v => v + PRODUCTS_PER_PAGE)} className="inline-flex items-center gap-2 px-8 py-3 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary hover:text-secondary-foreground transition-colors text-sm font-body">
              Load more <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopifyProductGrid;
