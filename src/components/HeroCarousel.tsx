import { ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import heroProducts from '@/assets/hero-products.png';

const HeroCarousel = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="h-[280px] md:h-[340px] bg-gradient-to-br from-red-700 via-red-600 to-red-700 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle star pattern */}
          <div className="absolute top-10 left-20 text-red-500/30 text-6xl">★</div>
          <div className="absolute top-32 left-[15%] text-red-500/20 text-4xl">★</div>
          <div className="absolute bottom-20 left-10 text-red-500/25 text-3xl">★</div>
          
          {/* Gold decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32">
            <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/40 to-yellow-600/20 blur-sm" />
          </div>
          
          {/* Sparkle dots */}
          <div className="absolute top-16 right-[40%] w-2 h-2 bg-yellow-300/60 rounded-full animate-pulse" />
          <div className="absolute bottom-24 left-[30%] w-1.5 h-1.5 bg-yellow-200/50 rounded-full animate-pulse delay-300" />
          
          {/* Gold ornament top right */}
          <div className="absolute top-8 right-[35%] w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-60" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Left side - Text content */}
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight mb-4">
                Holiday Deals
                <br />
                <span className="font-normal">For Everyone</span>
              </h1>
              
              <p className="text-white/80 text-sm md:text-base mb-6 max-w-md">
                Discover incredible savings on gifts, décor, and must-haves 
                that make the season bright.
              </p>
              
              <div className="flex items-center gap-3">
                <Link to="/flash-deals">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 text-sm rounded-md"
                  >
                    SHOP NOW
                  </Button>
                </Link>
                <Link to="/clearance">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-red-700 font-semibold px-6 py-3 text-sm rounded-md bg-transparent"
                  >
                    VIEW DEALS
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Product image */}
            <div className="hidden md:block relative">
              <img 
                src={heroProducts}
                alt="Holiday products"
                className="h-[260px] md:h-[320px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
