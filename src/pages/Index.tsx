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
import ChatWidget from '@/components/ChatWidget';
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

  // Show security puzzle after 10 seconds for trust building
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVerified = sessionStorage.getItem('securityVerified');
      if (!hasVerified) {
        setShowSecurityPuzzle(true);
      }
    }, 10000);
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

  // Auto-detect country on mount
  useEffect(() => {
    const detectCountry = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const tzCountryMap: Record<string, { code: string; name: string; flag: string; currency: string; currencySymbol: string }> = {
          'America/New_York': { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
          'America/Los_Angeles': { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
          'America/Chicago': { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
          'Europe/London': { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£' },
          'Europe/Paris': { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€' },
          'Europe/Berlin': { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€' },
          'Asia/Tokyo': { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥' },
          'Asia/Shanghai': { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', currencySymbol: '¥' },
          'Asia/Jerusalem': { code: 'IL', name: 'Israel', flag: '🇮🇱', currency: 'ILS', currencySymbol: '₪' },
          'Australia/Sydney': { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: '$' },
          'America/Toronto': { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: '$' },
        };
        
        const detected = tzCountryMap[timezone];
        if (detected) {
          setCurrentCountry(detected);
        }
      } catch (error) {
        console.error('Country detection failed:', error);
      }
    };
    detectCountry();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Announcement Bar */}
      <TopBar onCountryClick={() => setShowCountryModal(true)} currentCountry={currentCountry} />

      {/* Main Header */}
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => setShowCountryModal(true)}
        currentCountry={currentCountry}
      />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Bar - After Hero */}
      <TrustBar />

      {/* Deals Countdown Section */}
      <DealsCountdown products={dealProducts} />

      {/* Main Content */}
      <main>
        {/* Shopify Products */}
        <ShopifyProductGrid />
      </main>

      {/* Footer */}
      <Footer />

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

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;