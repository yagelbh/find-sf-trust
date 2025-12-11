import { Sparkles, Gift, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="h-[180px] md:h-[220px] bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pine branches top */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-emerald-950/40 to-transparent" />
          
          {/* Floating decorations */}
          <span className="absolute left-[3%] top-[20%] text-3xl animate-float opacity-90">🎄</span>
          <span className="absolute left-[8%] bottom-[15%] text-2xl animate-float opacity-80" style={{ animationDelay: '0.5s' }}>🎁</span>
          <span className="absolute right-[5%] top-[25%] text-2xl animate-float opacity-80" style={{ animationDelay: '1s' }}>❄️</span>
          <span className="absolute right-[12%] bottom-[20%] text-3xl animate-float opacity-90" style={{ animationDelay: '0.3s' }}>✨</span>
          <span className="absolute left-[20%] top-[10%] text-xl animate-pulse opacity-60">⭐</span>
          <span className="absolute right-[25%] top-[15%] text-xl animate-pulse opacity-60" style={{ animationDelay: '0.7s' }}>⭐</span>
          
          {/* String lights effect */}
          <div className="absolute bottom-0 left-0 w-full h-8 flex items-center justify-center gap-8 opacity-70">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: ['#fbbf24', '#ef4444', '#22c55e', '#3b82f6'][i % 4],
                  animationDelay: `${i * 0.1}s`
                }} 
              />
            ))}
          </div>

          {/* Sparkle effects */}
          <Sparkles className="absolute top-8 left-[30%] w-5 h-5 text-yellow-400/60 animate-pulse" />
          <Star className="absolute bottom-12 right-[35%] w-4 h-4 text-yellow-300/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Promo content */}
            <div className="flex items-center gap-6">
              {/* Sale badge */}
              <div className="hidden md:block relative">
                <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 rounded-lg p-4 shadow-xl transform -rotate-2 border-4 border-yellow-400">
                  <div className="text-center">
                    <span className="block text-yellow-300 text-xs font-bold tracking-wider">HOLIDAY</span>
                    <span className="block text-white text-lg font-black leading-tight">MEGA</span>
                    <span className="block text-yellow-300 text-lg font-black leading-tight">SALE</span>
                    <Gift className="w-5 h-5 text-yellow-300 mx-auto mt-1" />
                  </div>
                </div>
                {/* Ribbon */}
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-md transform rotate-12">
                  HOT!
                </div>
              </div>

              {/* Discount display */}
              <div className="text-center md:text-left">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-white/90 text-base md:text-lg font-medium">Up to</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-300 drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    70
                  </span>
                  <div className="flex flex-col ml-1">
                    <span className="text-3xl md:text-4xl font-black text-yellow-300">%</span>
                    <span className="text-xl md:text-2xl font-bold text-white -mt-1">OFF</span>
                  </div>
                </div>
                <Link to="/flash-deals">
                  <Button 
                    size="lg"
                    className="mt-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-2.5 text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 rounded-full border-2 border-yellow-400/50"
                  >
                    SHOP NOW <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Featured products preview */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="bg-white rounded-xl p-2 shadow-xl transform rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop" 
                  alt="Featured product"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="text-center mt-1">
                  <span className="text-xs font-bold text-red-600">$12.99</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop" 
                  alt="Featured product"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="text-center mt-1">
                  <span className="text-xs font-bold text-red-600">$24.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
