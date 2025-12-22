import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ArrowLeft, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

// Build a Shopify search query from category/subcategory
function buildSearchQuery(category: string, subcategory?: string, child?: string): string {
  const searchTerm = child || subcategory || category;
  const words = searchTerm.toLowerCase().split(/[\s&,]+/).filter(w => w.length > 2);
  
  if (words.length > 0) {
    const queries = words.map(w => `(title:*${w}* OR tag:*${w}* OR product_type:*${w}*)`);
    return queries.join(' OR ');
  }
  
  return `title:*${searchTerm}*`;
}

const Category = () => {
  console.log('[Category] Component mounted');
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';
  const childParam = searchParams.get('child') || '';
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Listen for cart drawer open events
  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  // Use React Query for caching - keeps previous data while fetching new
  const searchQuery = categoryParam ? buildSearchQuery(categoryParam, subcategoryParam, childParam) : '';
  
  const { data: products = [], isLoading, isFetching } = useQuery({
    queryKey: ['category-products', categoryParam, subcategoryParam, childParam],
    queryFn: () => fetchProducts(50, searchQuery),
    enabled: !!categoryParam,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    placeholderData: keepPreviousData, // Keep previous data when params change
  });

  // Build breadcrumb
  const breadcrumbParts = [
    { label: 'Home', link: '/' },
    ...(categoryParam ? [{ label: categoryParam, link: `/category?category=${encodeURIComponent(categoryParam)}` }] : [])
  ];
  
  if (subcategoryParam) {
    breadcrumbParts.push({
      label: subcategoryParam,
      link: `/category?category=${encodeURIComponent(categoryParam)}&subcategory=${encodeURIComponent(subcategoryParam)}`
    });
  }
  
  if (childParam) {
    breadcrumbParts.push({
      label: childParam,
      link: `/category?category=${encodeURIComponent(categoryParam)}&subcategory=${encodeURIComponent(subcategoryParam)}&child=${encodeURIComponent(childParam)}`
    });
  }

  const pageTitle = childParam || subcategoryParam || categoryParam || 'Category';

  // Basic SEO
  useEffect(() => {
    if (!pageTitle) return;
    document.title = `${pageTitle} | FindsFae`;
  }, [pageTitle]);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header 
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      <main className="container mx-auto px-4 py-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          {breadcrumbParts.map((part, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-muted-foreground/50">›</span>}
              {idx === breadcrumbParts.length - 1 ? (
                <span className="text-foreground font-medium">{part.label}</span>
              ) : (
                <Link to={part.link} className="hover:text-primary">
                  {part.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <h1 className="text-2xl font-bold text-foreground mb-6">
          {pageTitle}
        </h1>

        {/* Products area */}
        {isLoading && products.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            {isFetching && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 rounded-lg">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm">Updating…</span>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product: ShopifyProduct) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        ) : !isLoading && categoryParam ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select a category to view products</p>
          </div>
        )}
      </main>

      <Footer />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <CartDrawer 
        isOpen={showCartDrawer} 
        onClose={() => setShowCartDrawer(false)} 
      />
    </div>
  );
};

export default Category;
