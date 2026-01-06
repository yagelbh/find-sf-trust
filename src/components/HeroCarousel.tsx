import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroCarousel = () => {
  return (
    <div className="relative">
      <div className="h-[200px] md:h-[280px] bg-gradient-hero relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        
        {/* Subtle sparkle - only one */}
        <Sparkles className="absolute right-[15%] top-[20%] w-5 h-5 text-white/30 animate-subtle-glow" />

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-2xl mx-auto">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3">
              Smart finds. Magical prices.
            </h1>
            <p className="text-white/80 text-sm md:text-base mb-6 font-medium">
              Up to 70% off • Free shipping • Easy returns
            </p>
            
            <Link to="/flash-deals">
              <Button 
                variant="hero" 
                className="bg-white text-primary hover:bg-white/95 hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300 font-semibold text-base px-8 py-3 h-auto rounded-full shadow-lg group"
              >
                <span>Explore Deals</span>
                <Sparkles className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;