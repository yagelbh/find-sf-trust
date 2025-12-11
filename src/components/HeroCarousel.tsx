import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Truck, Percent, Zap, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "HOLIDAY MEGA SALE",
      subtitle: "Up to",
      discount: "85%",
      description: "OFF",
      cta: "SHOP NOW",
      link: "/flash-deals",
      bgGradient: "from-[#1a237e] via-[#283593] to-[#1a237e]",
      accentColor: "text-yellow-400",
      icon: <Percent className="w-20 h-20" />,
      decorations: [
        { emoji: "🎄", size: "text-4xl", pos: "left-[5%] top-[15%]" },
        { emoji: "🎁", size: "text-3xl", pos: "left-[15%] bottom-[20%]" },
        { emoji: "❄️", size: "text-2xl", pos: "right-[8%] top-[20%]" },
        { emoji: "✨", size: "text-3xl", pos: "right-[18%] bottom-[25%]" },
        { emoji: "🛍️", size: "text-4xl", pos: "left-[85%] top-[30%]" },
        { emoji: "💎", size: "text-2xl", pos: "left-[10%] top-[60%]" },
      ],
      bgPattern: "radial-gradient(circle at 20% 50%, rgba(255,215,0,0.1) 0%, transparent 50%)",
    },
    {
      title: "NEW ARRIVALS",
      subtitle: "Fresh Styles",
      discount: "50%",
      description: "OFF",
      cta: "DISCOVER",
      link: "/top-sellers",
      bgGradient: "from-[#ff6b35] via-[#f7931e] to-[#ff6b35]",
      accentColor: "text-white",
      icon: <Gift className="w-20 h-20" />,
      decorations: [
        { emoji: "👗", size: "text-4xl", pos: "left-[8%] top-[20%]" },
        { emoji: "👟", size: "text-3xl", pos: "left-[12%] bottom-[25%]" },
        { emoji: "💄", size: "text-2xl", pos: "right-[10%] top-[25%]" },
        { emoji: "⌚", size: "text-3xl", pos: "right-[15%] bottom-[20%]" },
        { emoji: "🌟", size: "text-2xl", pos: "left-[80%] top-[20%]" },
      ],
      bgPattern: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
    },
    {
      title: "FREE SHIPPING",
      subtitle: "Orders Over",
      discount: "$25",
      description: "Worldwide",
      cta: "LEARN MORE",
      link: "/clearance",
      bgGradient: "from-[#00796b] via-[#009688] to-[#00796b]",
      accentColor: "text-yellow-300",
      icon: <Truck className="w-20 h-20" />,
      decorations: [
        { emoji: "📦", size: "text-4xl", pos: "left-[6%] top-[18%]" },
        { emoji: "🚚", size: "text-3xl", pos: "left-[14%] bottom-[22%]" },
        { emoji: "✈️", size: "text-2xl", pos: "right-[12%] top-[22%]" },
        { emoji: "🌍", size: "text-3xl", pos: "right-[8%] bottom-[28%]" },
        { emoji: "🎯", size: "text-2xl", pos: "left-[82%] top-[25%]" },
      ],
      bgPattern: "radial-gradient(circle at 30% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)",
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
            className={`min-w-full h-[200px] md:h-[280px] bg-gradient-to-r ${slide.bgGradient} relative overflow-hidden`}
            style={{ backgroundImage: slide.bgPattern }}
          >
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-5 left-[10%] w-32 h-32 rounded-full bg-white/5 animate-pulse" />
                <div className="absolute bottom-10 right-[15%] w-40 h-40 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white/3 animate-float" />
              </div>
              
              {/* Decorative Elements */}
              {slide.decorations.map((dec, i) => (
                <span 
                  key={i}
                  className={`absolute ${dec.size} ${dec.pos} animate-float opacity-80`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {dec.emoji}
                </span>
              ))}
              
              {/* Sparkle Effects */}
              <Sparkles className="absolute top-6 right-[30%] w-6 h-6 text-yellow-400/60 animate-pulse" />
              <Star className="absolute bottom-8 left-[25%] w-5 h-5 text-white/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Zap className="absolute top-[40%] right-[5%] w-8 h-8 text-yellow-300/50 animate-bounce" />
            </div>

            <div className="container mx-auto px-4 h-full flex items-center relative z-10">
              <div className="flex items-center justify-center gap-8 w-full">
                {/* Icon */}
                <div className={`hidden md:flex items-center justify-center ${slide.accentColor} opacity-90`}>
                  {slide.icon}
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <p className="text-white text-sm mb-2 tracking-[0.2em] uppercase font-bold drop-shadow-lg">
                    {slide.title}
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-white text-xl font-medium drop-shadow-lg">{slide.subtitle}</span>
                    <div className="flex items-baseline">
                      <span className={`text-6xl md:text-8xl font-display font-black ${slide.accentColor} drop-shadow-2xl`}>
                        {slide.discount}
                      </span>
                      <span className="text-3xl md:text-4xl font-bold text-white ml-2 drop-shadow-lg">
                        {slide.description}
                      </span>
                    </div>
                  </div>
                  <Link to={slide.link}>
                    <Button 
                      variant="hero"
                      size="lg"
                      className="bg-warning text-foreground hover:bg-warning/90 font-bold px-8 py-3 text-base shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                    >
                      {slide.cta} <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;