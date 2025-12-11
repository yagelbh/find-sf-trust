import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="relative">
      <Link to="/flash-deals" className="block">
        <div className="h-[100px] md:h-[140px] bg-gradient-to-r from-rose-600 via-red-500 to-orange-500 relative overflow-hidden cursor-pointer group">
          {/* Decorative circles */}
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-2xl" />
          <div className="absolute left-1/4 top-0 w-20 h-20 bg-pink-400/20 rounded-full blur-xl" />
          
          {/* Sparkle decorations */}
          <Sparkles className="absolute left-[10%] top-[30%] w-4 h-4 md:w-5 md:h-5 text-yellow-300/70 animate-pulse" />
          <Sparkles className="absolute left-[25%] bottom-[25%] w-3 h-3 md:w-4 md:h-4 text-white/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute right-[15%] top-[25%] w-5 h-5 md:w-6 md:h-6 text-yellow-200/60 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="absolute right-[30%] bottom-[30%] w-3 h-3 text-white/40 animate-pulse" style={{ animationDelay: '0.7s' }} />

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-white/90 text-xs md:text-sm font-medium tracking-widest uppercase mb-1">
                Holiday Season
              </p>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg group-hover:scale-105 transition-transform">
                Up to 70% Off Everything
              </h2>
              <p className="text-white/80 text-xs md:text-sm mt-1 md:mt-2">
                Limited time offers • Free shipping on all orders
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <button className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20">
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
          <button className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20">
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default HeroCarousel;
