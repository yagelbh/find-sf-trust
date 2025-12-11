import { Shield, CreditCard, Truck, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: CheckCircle, text: "Shop with Confidence", isMain: true },
    { icon: Shield, text: "Secure privacy" },
    { icon: CreditCard, text: "Safe payments" },
    { icon: Truck, text: "Delivery guarantee" },
  ];

  return (
    <div className="bg-trust text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-8">
            {trustItems.map((item, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${
                  item.isMain ? 'font-semibold' : ''
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.isMain ? 'text-white' : 'text-white/80'}`} />
                <span className="text-sm text-white">{item.text}</span>
                {item.isMain && <ChevronRight className="w-4 h-4 text-white/70" />}
                {!item.isMain && index < trustItems.length - 1 && (
                  <span className="ml-4 text-white/30">|</span>
                )}
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
                Beware of scam messages. Findsfae never requests additional fees through SMS or email.
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