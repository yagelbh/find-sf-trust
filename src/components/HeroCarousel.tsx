import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Fresh",
      discount: "50%",
      description: "OFF",
      cta: "DISCOVER",
      bgGradient: "from-primary/90 via-coral to-primary/90",
    },
    {
      title: "FREE SHIPPING",
      subtitle: "Orders Over",
      discount: "$25",
      description: "",
      cta: "LEARN MORE",
      bgGradient: "from-trust via-accent to-trust",
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
            className={`min-w-full h-[400px] bg-gradient-to-r ${slide.bgGradient} relative`}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-20 w-4 h-4 rounded-full bg-primary-foreground/20 animate-float" />
              <div className="absolute top-32 right-40 w-6 h-6 rounded-full bg-primary-foreground/10 animate-float" style={{ animationDelay: '0.5s' }} />
              <div className="absolute bottom-20 left-40 w-3 h-3 rounded-full bg-primary-foreground/15 animate-float" style={{ animationDelay: '1s' }} />
              <Sparkles className="absolute top-20 right-60 w-8 h-8 text-warning/60 animate-pulse" />
              <Sparkles className="absolute bottom-32 left-60 w-6 h-6 text-warning/40 animate-pulse" style={{ animationDelay: '0.7s' }} />
            </div>

            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-center w-full animate-fade-in">
                <p className="text-primary-foreground/80 text-lg mb-2 tracking-wider">
                  {slide.title}
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-primary-foreground text-2xl">{slide.subtitle}</span>
                  <div className="flex items-baseline">
                    <span className="text-8xl md:text-9xl font-display font-black text-primary-foreground">
                      {slide.discount}
                    </span>
                    <span className="text-4xl md:text-5xl font-bold text-primary-foreground ml-2">
                      {slide.description}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="hero"
                  className="bg-warning text-foreground hover:bg-warning/90"
                >
                  {slide.cta} <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:bg-card/40 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-primary-foreground" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:bg-card/40 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-primary-foreground w-8' 
                : 'bg-primary-foreground/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
