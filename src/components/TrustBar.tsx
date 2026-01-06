import { Shield, CreditCard, Truck, Star } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: Shield, text: "Secure checkout" },
    { icon: CreditCard, text: "Safe payments" },
    { icon: Truck, text: "Free shipping" },
    { icon: Star, text: "50,000+ happy customers" },
  ];

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm">
      <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-12 px-4 py-3 flex-wrap">
        {trustItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 text-muted-foreground"
          >
            <item.icon className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;