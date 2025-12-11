import { Shield, CreditCard, Truck, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: Shield, text: "Why choose Findsfae?", isMain: true },
    { icon: Shield, text: "Secure privacy" },
    { icon: CreditCard, text: "Safe payments" },
    { icon: Truck, text: "Delivery guarantee" },
  ];

  return (
    <div className="bg-trust text-accent-foreground">
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
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <item.icon className="w-4 h-4" />
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
              <span className="text-sm font-medium">Security reminder:</span>
              <span className="text-sm text-foreground">
                Please be wary of scam messages and links. Findsfae won't ask for extra fees via SMS or email.
              </span>
            </div>
            <button className="flex items-center gap-1 text-sm text-trust font-medium hover:underline">
              View <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
