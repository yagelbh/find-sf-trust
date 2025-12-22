import { Truck, RefreshCw, Shield } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping", subtext: "Excludes local items" },
    { icon: RefreshCw, text: "Free returns", subtext: "Up to 90 days*" },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues" },
  ];

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2.5">
          <div className="flex items-center justify-center gap-6 lg:gap-12 xl:gap-16">
            {benefits.map((benefit, index) => (
              <>
                {index > 0 && (
                  <div key={`divider-${index}`} className="h-8 w-px bg-background/30" />
                )}
                <div key={index} className="flex items-center gap-2.5">
                  <benefit.icon className="w-5 h-5 lg:w-6 lg:h-6 text-warning" strokeWidth={2} />
                  <div className="flex flex-col">
                    <span className="font-bold text-background text-sm lg:text-base tracking-tight">
                      {benefit.text}
                    </span>
                    <span className="text-xs text-background/60 hidden sm:block">{benefit.subtext}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
