import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchProducts, ShopifyProduct, getCategoryPath } from '@/lib/shopify';

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

  useEffect(() => {
    const loadCategoryProducts = async () => {
      if (!categoryParam) return;
      
      setLoading(true);
      try {
        // Load all products and filter on client side for accurate category matching
        const data = await fetchProducts(100);
        setProducts(data);
      } catch (err) {
        console.error('Category load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryProducts();
  }, [categoryParam]);

  // Filter products based on category path
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const productPath = getCategoryPath(
        product.node.tags || [], 
        product.node.productType
      );
      
      // Match based on what level user clicked
      if (childParam) {
        return productPath.category === categoryParam && 
               productPath.subcategory === subcategoryParam && 
               productPath.child === childParam;
      } else if (subcategoryParam) {
        return productPath.category === categoryParam && 
               productPath.subcategory === subcategoryParam;
      } else {
        return productPath.category === categoryParam;
      }
    });
  }, [products, categoryParam, subcategoryParam, childParam]);

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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading products...</span>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
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
