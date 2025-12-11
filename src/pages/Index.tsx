import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import TrustBar from '@/components/TrustBar';
import HeroCarousel from '@/components/HeroCarousel';
import DealsCountdown from '@/components/DealsCountdown';
import ShopifyProductGrid from '@/components/ShopifyProductGrid';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CountryModal from '@/components/CountryModal';
import SecurityPuzzle from '@/components/SecurityPuzzle';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showSecurityPuzzle, setShowSecurityPuzzle] = useState(false);
  const [dealProducts, setDealProducts] = useState<ShopifyProduct[]>([]);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$'
  });

  // Show security puzzle after 30 seconds for trust building
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVerified = sessionStorage.getItem('securityVerified');
      if (!hasVerified) {
        setShowSecurityPuzzle(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  // Load products for deals section
  useEffect(() => {
    const loadDealProducts = async () => {
      try {
        const products = await fetchProducts(10);
        setDealProducts(products);
      } catch (error) {
        console.error('Failed to load deal products:', error);
      }
    };
    loadDealProducts();
  }, []);

  // Auto-detect country on mount (simulated)
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('Detected timezone:', timezone);
      } catch (error) {
        console.error('Country detection failed:', error);
      }
    };
    detectCountry();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Header */}
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => setShowCountryModal(true)}
        currentCountry={currentCountry}
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Deals Countdown Section */}
      <DealsCountdown products={dealProducts} />

      {/* Main Content */}
      <main>
        {/* Shopify Products */}
        <ShopifyProductGrid />
      </main>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <CountryModal
        isOpen={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        currentCountry={currentCountry}
        onCountryChange={setCurrentCountry}
      />

      <SecurityPuzzle
        isOpen={showSecurityPuzzle}
        onClose={() => setShowSecurityPuzzle(false)}
        onVerify={() => {
          sessionStorage.setItem('securityVerified', 'true');
        }}
      />

      {/* Feedback Button */}
      <button className="fixed bottom-6 right-6 bg-card text-foreground px-3 py-2 rounded-l-lg shadow-lg text-sm font-medium border border-border hover:bg-muted transition-colors z-40">
        <span className="transform -rotate-90 block whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>Feedback</span>
      </button>
    </div>
  );
};

export default Index;
