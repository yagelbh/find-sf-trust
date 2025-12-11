import { Sparkles, Gift, ChevronRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="h-[200px] md:h-[240px] bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
          
          {/* Pine branch decorations - top */}
          <div className="absolute top-0 left-0 w-40 h-24 bg-gradient-to-br from-emerald-950/60 to-transparent" />
          <div className="absolute top-0 right-0 w-40 h-24 bg-gradient-to-bl from-emerald-950/60 to-transparent" />
          
          {/* Floating holiday elements */}
          <span className="absolute left-[2%] top-[15%] text-4xl animate-float opacity-90">🎄</span>
          <span className="absolute left-[6%] bottom-[20%] text-2xl animate-float opacity-80" style={{ animationDelay: '0.5s' }}>🎁</span>
          <span className="absolute right-[3%] top-[20%] text-xl animate-float opacity-70" style={{ animationDelay: '1s' }}>❄️</span>
          <span className="absolute right-[8%] bottom-[25%] text-2xl animate-float opacity-80" style={{ animationDelay: '0.3s' }}>✨</span>
          
          {/* String lights */}
          <div className="absolute bottom-0 left-0 w-full h-6 flex items-center justify-center gap-6 opacity-80">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1.5 h-1.5 rounded-full animate-pulse shadow-lg" 
                style={{ 
                  backgroundColor: ['#fbbf24', '#ef4444', '#22c55e', '#3b82f6', '#f472b6'][i % 5],
                  animationDelay: `${i * 0.15}s`,
                  boxShadow: `0 0 8px ${['#fbbf24', '#ef4444', '#22c55e', '#3b82f6', '#f472b6'][i % 5]}`
                }} 
              />
            ))}
          </div>

          {/* Sparkle accents */}
          <Sparkles className="absolute top-10 left-[25%] w-4 h-4 text-yellow-400/50 animate-pulse" />
          <Star className="absolute bottom-16 right-[30%] w-3 h-3 text-yellow-300/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Premium sale badge & offer */}
            <div className="flex items-center gap-8">
              {/* Premium Sale Badge */}
              <div className="hidden md:block relative">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-red-600 rounded-xl blur-lg opacity-40 animate-pulse" />
                  
                  {/* Badge container */}
                  <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-xl p-5 shadow-2xl border border-amber-400/30 overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    
                    {/* Gold ribbon top */}
                    <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
                    
                    <div className="text-center relative z-10">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span className="text-amber-200 text-[10px] font-bold tracking-[0.2em] uppercase">Holiday</span>
                        <Sparkles className="w-3 h-3 text-amber-300" />
                      </div>
                      <span className="block text-white text-xl font-black tracking-tight leading-none">MEGA</span>
                      <span className="block text-amber-300 text-xl font-black tracking-tight leading-none">SALE</span>
                      <Gift className="w-5 h-5 text-amber-200 mx-auto mt-2" />
                    </div>
                  </div>
                  
                  {/* Decorative corner ribbons */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 transform rotate-45 translate-x-3 -translate-y-1" />
                </div>
              </div>

              {/* Discount display - tighter layout */}
              <div className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start">
                  <span className="text-white/80 text-sm md:text-base font-medium mr-2">Up to</span>
                  <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-400 to-orange-500 leading-none" style={{ 
                    WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                  }}>
                    70
                  </span>
                  <div className="flex flex-col items-start ml-1">
                    <span className="text-4xl md:text-5xl font-black text-amber-400 leading-none">%</span>
                    <span className="text-lg md:text-xl font-bold text-white leading-none mt-0.5">OFF</span>
                  </div>
                </div>
                
                <Link to="/flash-deals">
                  <Button 
                    size="lg"
                    className="mt-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-105 rounded-full border border-amber-300/30"
                  >
                    <span className="drop-shadow-sm">SHOP NOW</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Featured products */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="bg-white rounded-xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-all hover:scale-105 border-2 border-amber-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" 
                  alt="Featured product"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="text-center mt-1.5 bg-red-500 rounded-full px-2 py-0.5">
                  <span className="text-[10px] font-bold text-white">$12.99</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-2xl transform -rotate-2 hover:rotate-0 transition-all hover:scale-105 border-2 border-amber-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" 
                  alt="Featured product"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="text-center mt-1.5 bg-red-500 rounded-full px-2 py-0.5">
                  <span className="text-[10px] font-bold text-white">$24.99</span>
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
