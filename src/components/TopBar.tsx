import { Truck, RefreshCw, Shield } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping", shortText: "Free ship" },
    { icon: RefreshCw, text: "Free returns", shortText: "Returns" },
    { icon: Shield, text: "Delivery guarantee", shortText: "Guarantee" },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center py-2 sm:py-2.5">
          <div className="flex items-center justify-center gap-2 sm:gap-6 lg:gap-12 xl:gap-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-1 sm:gap-2.5">
                {index > 0 && (
                  <div className="h-6 sm:h-8 w-px bg-secondary-foreground/30 mr-1 sm:mr-0" />
                )}
                <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary flex-shrink-0" strokeWidth={2} />
                <span className="font-bold text-secondary-foreground text-[11px] sm:text-sm lg:text-base tracking-tight whitespace-nowrap">
                  <span className="hidden sm:inline">{benefit.text}</span>
                  <span className="sm:hidden">{benefit.shortText}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
