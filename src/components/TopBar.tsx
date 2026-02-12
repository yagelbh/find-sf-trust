import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const TopBar = () => {
  const benefits = [
    { icon: Truck, text: "Free shipping on orders $29+" },
    { icon: RotateCcw, text: "Easy 30-day returns" },
    { icon: ShieldCheck, text: "Secure checkout guaranteed" },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground/80 text-xs">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 py-2">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="hidden sm:inline text-secondary-foreground/20 mr-4">|</span>}
              <b.icon className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
              <span className="hidden sm:inline font-medium tracking-wide">{b.text}</span>
              <span className="sm:hidden font-medium">{b.text.split(' ').slice(0, 2).join(' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
