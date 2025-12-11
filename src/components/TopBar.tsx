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
        <div className="flex items-center justify-center py-2 text-sm">
          <div className="flex items-center gap-6 lg:gap-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <benefit.icon className="w-4 h-4 lg:w-5 lg:h-5 text-success" strokeWidth={2.5} />
                <div className="flex flex-col">
                  <span className="font-semibold text-background flex items-center gap-1 text-xs lg:text-sm">
                    {benefit.text}
                    <ChevronRight className="w-3 h-3 opacity-70" />
                  </span>
                  <span className="text-[10px] lg:text-xs text-background/70 hidden sm:block">{benefit.subtext}</span>
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
