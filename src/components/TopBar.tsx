import { Truck, RefreshCw, Shield, ChevronRight } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping", subtext: "since 2002" },
    { icon: RefreshCw, text: "Free returns", subtext: "Up to 90 days*" },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues" },
  ];

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-4 text-sm">
          <div className="flex items-center gap-8 lg:gap-24">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <benefit.icon className="w-6 h-6 lg:w-7 lg:h-7 text-success" strokeWidth={2.5} />
                <div className="flex flex-col">
                  <span className="font-bold text-background flex items-center gap-1 text-sm lg:text-base">
                    {benefit.text}
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </span>
                  <span className="text-xs lg:text-sm text-background/70 hidden sm:block">{benefit.subtext}</span>
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
