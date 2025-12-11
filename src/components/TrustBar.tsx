import { Shield, CreditCard, Truck, CheckCircle, AlertTriangle, ChevronRight, Award } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: Award, text: "Shop with Confidence", isMain: true },
    { icon: Shield, text: "Protected checkout" },
    { icon: CreditCard, text: "Secure transactions" },
    { icon: Truck, text: "On-time delivery" },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            {trustItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${
                  item.isMain ? 'font-semibold' : ''
                }`}
              >
                {item.isMain ? (
                  <CheckCircle className="w-5 h-5 text-accent" />
                ) : (
                  <item.icon className="w-4 h-4 text-secondary-foreground/70" />
                )}
                <span className="text-sm">{item.text}</span>
                {item.isMain && <ChevronRight className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Security Warning Bar */}
      <div className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Stay alert:</span>
              <span className="text-sm text-foreground">
                Beware of scam messages. We never request additional fees through SMS or email.
              </span>
            </div>
            <button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
              Details <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
