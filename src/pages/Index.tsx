import { useState, useEffect } from 'react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import TrustBar from '@/components/TrustBar';
import HeroCarousel from '@/components/HeroCarousel';
import ShopifyProductGrid from '@/components/ShopifyProductGrid';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CountryModal from '@/components/CountryModal';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$'
  });

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

  const handleMessagesClick = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Announcement Bar */}
      <TopBar />

      {/* Main Header */}
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onMessagesClick={handleMessagesClick}
        onCountryClick={() => setShowCountryModal(true)}
        currentCountry={currentCountry}
      />

      {/* Trust Bar */}
      <TrustBar />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <main className="container mx-auto px-4">
        {/* Shopify Products */}
        <ShopifyProductGrid />

        {/* More Products Section */}
        <section className="py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Top Rated Products
            </h2>
            <p className="text-muted-foreground">
              Trusted by millions of happy customers
            </p>
          </div>
        </section>
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

      {/* Fixed Message Button */}
      <button
        onClick={handleMessagesClick}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-glow transition-all flex items-center justify-center z-40"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Feedback Button */}
      <button className="fixed bottom-24 right-6 bg-card text-foreground px-3 py-2 rounded-l-lg shadow-lg text-sm font-medium border border-border hover:bg-muted transition-colors z-40">
        <span className="transform -rotate-90 block whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>Feedback</span>
      </button>
    </div>
  );
};

export default Index;
