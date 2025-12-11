import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import CountryModal from '@/components/CountryModal';

const Wishlist = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$'
  });

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => setShowCountryModal(true)}
        currentCountry={currentCountry}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back to Shopping
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">
          My Wishlist
        </h1>

        <div className="text-center py-20">
          <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Save items you love by clicking the heart icon on any product.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Discover Products
          </Link>
        </div>
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CountryModal
        isOpen={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        currentCountry={currentCountry}
        onCountryChange={setCurrentCountry}
      />
    </div>
  );
};

export default Wishlist;
