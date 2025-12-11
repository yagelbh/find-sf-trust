import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="h-[140px] md:h-[160px] bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Pine branch effect at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-900/50 to-transparent" />
          
          {/* String lights */}
          <div className="absolute bottom-2 left-0 w-full flex items-center justify-start gap-4 px-8 opacity-70">
            {Array.from({ length: 25 }).map((_, i) => (
              <div 
                key={i} 
                className="w-1 h-1 rounded-full animate-pulse" 
                style={{ 
                  backgroundColor: ['#fbbf24', '#ef4444', '#22c55e', '#f472b6'][i % 4],
                  animationDelay: `${i * 0.1}s`,
                  boxShadow: `0 0 4px ${['#fbbf24', '#ef4444', '#22c55e', '#f472b6'][i % 4]}`
                }} 
              />
            ))}
          </div>
          
          {/* Sparkle accents */}
          <span className="absolute top-4 left-[15%] text-yellow-400/60 text-xs">✦</span>
          <span className="absolute bottom-8 left-[40%] text-yellow-300/40 text-[10px]">✦</span>
          <span className="absolute top-6 right-[45%] text-yellow-400/50 text-xs">✦</span>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Sale badge and discount */}
            <div className="flex items-center gap-4 md:gap-8">
              {/* Christmas Sale Badge */}
              <Link to="/flash-deals" className="hidden sm:block">
                <div className="relative group cursor-pointer">
                  {/* Gold ribbon bow */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
                  
                  {/* Badge */}
                  <div className="bg-gradient-to-b from-red-600 via-red-700 to-red-800 rounded-lg px-4 py-3 shadow-xl border border-yellow-500/30 transform group-hover:scale-105 transition-transform">
                    <div className="text-center">
                      <span className="block text-yellow-300 text-[10px] font-bold tracking-wider">CHRISTMAS</span>
                      <span className="block text-white text-sm font-black leading-tight">SALE'S ON</span>
                      <div className="mt-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 text-[10px] font-bold px-2 py-0.5 rounded flex items-center justify-center gap-1">
                        SHOP NOW <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Up to 70% OFF */}
              <div className="flex items-baseline">
                <span className="text-white/80 text-xs md:text-sm font-medium mr-2">UP TO</span>
                <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-amber-500 leading-none" style={{ 
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>
                  70
                </span>
                <div className="flex flex-col items-start ml-1">
                  <span className="text-2xl md:text-4xl font-black text-amber-400 leading-none">%</span>
                  <span className="text-sm md:text-lg font-bold text-white leading-none">OFF</span>
                </div>
              </div>
            </div>

            {/* Right side - Featured products */}
            <div className="hidden md:flex items-center gap-3">
              <div className="bg-white rounded-lg p-1.5 shadow-xl transform rotate-2 hover:rotate-0 transition-all hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=100&h=100&fit=crop" 
                  alt="Holiday product"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded"
                />
                <div className="text-center mt-1 bg-white rounded px-1">
                  <span className="text-xs font-bold text-foreground">$6.66</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-1.5 shadow-xl transform -rotate-2 hover:rotate-0 transition-all hover:scale-105">
                <img 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100&h=100&fit=crop" 
                  alt="Winter product"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded"
                />
                <div className="text-center mt-1 bg-white rounded px-1">
                  <span className="text-xs font-bold text-foreground">$5.23</span>
                </div>
              </div>
            </div>

            {/* Mobile - Shop Now Button */}
            <Link to="/flash-deals" className="sm:hidden">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg">
                SHOP NOW <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
