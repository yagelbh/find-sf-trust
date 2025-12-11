import { Shield, CreditCard, Truck, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';

const TrustBar = () => {
  const trustItems = [
    { icon: Shield, text: "Secure privacy" },
    { icon: CreditCard, text: "Safe payments" },
    { icon: Truck, text: "Delivery guarantee" },
  ];

  return (
    <div className="space-y-2">
      {/* Main Green Trust Bar */}
      <div className="bg-emerald-600 rounded-xl text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-white" />
            <span className="font-semibold text-sm md:text-base">Why choose Findsfae?</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {trustItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <item.icon className="w-4 h-4 text-white/90" />
                <span className="text-sm text-white/90">{item.text}</span>
                {index < trustItems.length - 1 && (
                  <span className="ml-4 text-white/30">|</span>
                )}
              </div>
            ))}
            <button className="flex items-center gap-1 text-white font-medium hover:underline">
              Delivery guarantee <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Security Warning Bar */}
      <div className="bg-card border border-border rounded-lg">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                Be wary of messages about delivery issues claiming to be from USPS.
              </span>
            </div>
            <button className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
              View <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;