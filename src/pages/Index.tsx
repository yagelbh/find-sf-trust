import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import TrustBar from '@/components/TrustBar';
import HeroCarousel from '@/components/HeroCarousel';
import DealsCountdown from '@/components/DealsCountdown';
import ShopifyProductGrid from '@/components/ShopifyProductGrid';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import SecurityPuzzle from '@/components/SecurityPuzzle';
import ChatWidget from '@/components/ChatWidget';
import CartDrawer from '@/components/CartDrawer';
import LeadCapturePopup from '@/components/LeadCapturePopup';
import { fetchProducts, ShopifyProduct } from '@/lib/shopify';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSecurityPuzzle, setShowSecurityPuzzle] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [dealProducts, setDealProducts] = useState<ShopifyProduct[]>([]);

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

  // Listen for cart drawer open events
  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Header */}
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      {/* Trust Bar - Green banner */}
      <div className="container mx-auto px-4 py-4">
        <TrustBar />
      </div>

      {/* Hero Carousel */}
      <HeroCarousel />

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

      <SecurityPuzzle
        isOpen={showSecurityPuzzle}
        onClose={() => setShowSecurityPuzzle(false)}
        onVerify={() => {
          sessionStorage.setItem('securityVerified', 'true');
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={showCartDrawer} 
        onClose={() => setShowCartDrawer(false)} 
      />

      {/* Lead Capture Popup - shows after 30 seconds */}
      <LeadCapturePopup 
        delaySeconds={30}
        discountCode="WELCOME10"
        discountPercent={10}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;