import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';

import HeroCarousel from '@/components/HeroCarousel';
import FeaturedProductsRow from '@/components/FeaturedProductsRow';
import PromoBanners from '@/components/PromoBanners';
import ShopifyProductGrid from '@/components/ShopifyProductGrid';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import ChatWidget from '@/components/ChatWidget';
import CartDrawer from '@/components/CartDrawer';
import LeadCapturePopup from '@/components/LeadCapturePopup';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

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

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Featured Products Row - Before promo banners, more attractive */}
      <FeaturedProductsRow />

      {/* Promo Banners - Temu style */}
      <PromoBanners />

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