import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 items-center py-10 lg:py-16">
          {/* Text */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3 font-body">Limited Time Offer</p>
            <h1 className="text-secondary-foreground text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Up to <span className="text-primary">70% Off</span><br />
              Everything
            </h1>
            <p className="text-secondary-foreground/60 mt-4 text-base lg:text-lg max-w-md mx-auto lg:mx-0 font-body">
              Discover thousands of quality products at unbeatable prices. Free shipping on all orders.
            </p>
            <div className="flex gap-3 mt-6 justify-center lg:justify-start">
              <Link to="/flash-deals" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors font-body">
                Shop Deals <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/top-sellers" className="inline-flex items-center gap-2 border border-secondary-foreground/20 text-secondary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-secondary-foreground/5 transition-colors font-body">
                Best Sellers
              </Link>
            </div>
          </div>

          {/* Visual accent — abstract shapes */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="w-64 h-64 rounded-full bg-primary/10 blur-3xl absolute" />
            <div className="w-48 h-48 rounded-full bg-primary/20 blur-2xl absolute translate-x-12 -translate-y-8" />
            <div className="relative z-10 text-center">
              <div className="text-8xl font-extrabold text-primary/15">70%</div>
              <div className="text-secondary-foreground/50 font-semibold text-lg -mt-4 font-body">OFF EVERYTHING</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
