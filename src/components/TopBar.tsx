import { Truck, RefreshCw, Smartphone } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping", subtext: "Excludes local items" },
    { icon: RefreshCw, text: "Free returns", subtext: "Up to 90 days*" },
    { icon: Smartphone, text: "Get the Findsfae App", subtext: "" },
  ];

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          {/* Left spacer for balance */}
          <div className="hidden lg:block w-24" />
          
          {/* Center benefits - spread out */}
          <div className="flex items-center justify-center flex-1 gap-12 lg:gap-24 xl:gap-32">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2.5">
                <benefit.icon className="w-5 h-5 lg:w-6 lg:h-6 text-warning" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="font-bold text-background text-sm lg:text-base tracking-tight">
                    {benefit.text}
                  </span>
                  {benefit.subtext && (
                    <span className="text-xs text-background/60 hidden sm:block">{benefit.subtext}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side - CTA button */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-sm text-background/80">Sell on Findsfae</span>
            <button className="bg-warning text-foreground font-bold text-sm px-4 py-1.5 rounded-full hover:bg-warning/90 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
