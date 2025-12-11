import { useState, useEffect } from 'react';
import { Zap, ChevronRight, Clock } from 'lucide-react';
import ProductCard from './ProductCard';

const LightningDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    { id: 1, name: "Wireless Bluetooth Earbuds Pro", price: 12.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop", rating: 4.8, reviews: 2341, discount: 74, stock: 3 },
    { id: 2, name: "Men's Winter Jacket Thermal Coat", price: 34.50, originalPrice: 89.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop", rating: 4.6, reviews: 1823, discount: 62, stock: 8 },
    { id: 3, name: "Smart Watch Fitness Tracker", price: 25.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", rating: 4.7, reviews: 3421, discount: 68, stock: 15 },
    { id: 4, name: "Portable Massage Gun Deep Tissue", price: 29.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=300&h=300&fit=crop", rating: 4.5, reviews: 892, discount: 70, stock: null },
    { id: 5, name: "LED Ring Light with Tripod Stand", price: 15.99, originalPrice: 45.99, image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=300&h=300&fit=crop", rating: 4.4, reviews: 1567, discount: 65, stock: 5 },
  ];

  return (
    <section className="py-6">
      {/* Header */}
      <div className="bg-gradient-deal rounded-t-xl overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-warning fill-warning" />
                <h2 className="text-2xl font-display font-bold text-primary-foreground">
                  Lightning deals
                </h2>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <span className="text-sm">Limited time offer</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-foreground/80" />
              <div className="flex items-center gap-1">
                <span className="bg-foreground text-background px-2 py-1 rounded font-bold text-lg animate-countdown">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-primary-foreground font-bold">:</span>
                <span className="bg-foreground text-background px-2 py-1 rounded font-bold text-lg">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-primary-foreground font-bold">:</span>
                <span className="bg-foreground text-background px-2 py-1 rounded font-bold text-lg">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-card rounded-b-xl shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {deals.map((product) => (
              <ProductCard key={product.id} product={product} isLightningDeal />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightningDeals;
