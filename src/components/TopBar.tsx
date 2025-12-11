import { Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping", subtext: "Min thresholds apply", color: "text-trust" },
    { icon: RefreshCw, text: "Price adjustment", subtext: "Within 30 days", color: "text-warning" },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues", color: "text-info" },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2 text-sm">
          <div className="flex items-center gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 group cursor-pointer">
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                <div className="flex flex-col">
                  <span className={`font-semibold ${benefit.color} flex items-center gap-1`}>
                    {benefit.text}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-secondary-foreground/70">{benefit.subtext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
