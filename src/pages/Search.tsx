import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search as SearchIcon, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import ShopifyProductCard from '@/components/ShopifyProductCard';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
        const data = await fetchProducts(20, `title:*${query}*`);
        setProducts(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };
    searchProducts();
  }, [query]);

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

        <div className="flex items-center gap-3 mb-6">
          <SearchIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Search results for "{query}"
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Searching...</span>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ShopifyProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found for "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Enter a search term to find products</p>
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

export default Search;
