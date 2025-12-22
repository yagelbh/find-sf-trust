import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
  // Use the most specific term for searching
  const searchTerm = child || subcategory || category;
  
  // Extract key words for better matching
  const words = searchTerm.toLowerCase().split(/[\s&,]+/).filter(w => w.length > 2);
  
  // Build query: search in title, tags, and product_type
  if (words.length > 0) {
    const queries = words.map(w => `(title:*${w}* OR tag:*${w}* OR product_type:*${w}*)`);
    return queries.join(' OR ');
  }
  
  return `title:*${searchTerm}*`;
}

const Category = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const subcategoryParam = searchParams.get('subcategory') || '';
  const childParam = searchParams.get('child') || '';
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);

  // Listen for cart drawer open events
  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  // Fetch products with server-side search query
  // Keep previous results while updating to avoid a "full page reload" feel
  useEffect(() => {
    if (!categoryParam) return;

    let cancelled = false;

    const loadCategoryProducts = async () => {
      setLoading(true);
      try {
        const searchQuery = buildSearchQuery(categoryParam, subcategoryParam, childParam);
        const data = await fetchProducts(50, searchQuery);
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error('Category load error:', err);
        // Keep current products on error (do not blank the page)
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadCategoryProducts();
    return () => {
      cancelled = true;
    };
  }, [categoryParam, subcategoryParam, childParam]);

  // Build breadcrumb
  const breadcrumbParts = [
    { label: 'Home', link: '/' },
    { label: categoryParam, link: `/category?category=${encodeURIComponent(categoryParam)}` }
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

  const pageTitle = childParam || subcategoryParam || categoryParam;

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

        {/* Products area (avoid "full page reload" feel by keeping layout stable) */}
        {products.length === 0 && loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-2/5" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="relative">
            {loading && (
              <div className="absolute inset-x-0 -top-10 flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Updating products…
              </div>
            )}
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ${loading ? 'opacity-60' : ''}`}>
              {products.map((product) => (
                <ShopifyProductCard key={product.node.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category</p>
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
