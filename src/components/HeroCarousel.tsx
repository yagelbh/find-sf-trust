import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Truck, Percent } from 'lucide-react';
import { Button } from './ui/button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "MEGA SALE",
      subtitle: "Up to",
      discount: "85%",
      description: "OFF",
      cta: "SHOP NOW",
      bgGradient: "from-secondary via-navy to-secondary",
      icon: <Percent className="w-16 h-16 text-warning/80" />,
      decorations: ["🛍️", "💎", "✨", "🎁"],
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Fresh",
      discount: "50%",
      description: "OFF",
      cta: "DISCOVER",
      bgGradient: "from-primary/90 via-coral to-primary/90",
      icon: <Gift className="w-16 h-16 text-primary-foreground/80" />,
      decorations: ["👗", "👟", "💄", "⌚"],
    },
    {
      title: "FREE SHIPPING",
      subtitle: "Orders Over",
      discount: "$25",
      description: "",
      cta: "LEARN MORE",
      bgGradient: "from-trust via-accent to-trust",
      icon: <Truck className="w-16 h-16 text-primary-foreground/80" />,
      decorations: ["📦", "🚚", "✈️", "🌍"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`min-w-full h-[160px] md:h-[200px] bg-gradient-to-r ${slide.bgGradient} relative overflow-hidden`}
          >
            {/* Decorative floating elements */}
            <div className="absolute inset-0 overflow-hidden">
              {slide.decorations.map((emoji, i) => (
                <span 
                  key={i}
                  className="absolute text-2xl md:text-3xl animate-float opacity-60"
                  style={{ 
                    left: `${15 + i * 22}%`, 
                    top: `${20 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  {emoji}
                </span>
              ))}
              <div className="absolute top-5 left-10 w-3 h-3 rounded-full bg-primary-foreground/20 animate-float" />
              <div className="absolute top-16 right-20 w-4 h-4 rounded-full bg-primary-foreground/10 animate-float" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute top-6 right-40 w-5 h-5 text-warning/60 animate-pulse" />
            </div>

            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
              <div className="flex items-center justify-center gap-6 w-full animate-fade-in">
                {/* Icon */}
                <div className="hidden md:flex items-center justify-center">
                  {slide.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <p className="text-primary-foreground/80 text-xs mb-1 tracking-wider uppercase">
                    {slide.title}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-primary-foreground text-base">{slide.subtitle}</span>
                    <div className="flex items-baseline">
                      <span className="text-4xl md:text-5xl font-display font-black text-primary-foreground drop-shadow-lg">
                        {slide.discount}
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-primary-foreground ml-1">
                        {slide.description}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="hero"
                    size="sm"
                    className="bg-warning text-foreground hover:bg-warning/90"
                  >
                    {slide.cta} <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-primary-foreground" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-primary-foreground w-6' 
                : 'bg-primary-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
