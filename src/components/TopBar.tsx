import { Truck, RefreshCw, Shield, ChevronRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const benefits = [
    { icon: Flame, text: "Hot-selling items", subtext: "Top picks this week", color: "text-warning", link: "/hot-selling" },
    { icon: Truck, text: "Free shipping", subtext: "Min thresholds apply", color: "text-trust", link: null },
    { icon: RefreshCw, text: "Price adjustment", subtext: "Within 30 days", color: "text-info", link: null },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues", color: "text-trust", link: null },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-2 text-sm">
          <div className="flex items-center gap-8">
            {benefits.map((benefit, index) => {
              const content = (
                <div className="flex items-center gap-2 group cursor-pointer">
                  <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                  <div className="flex flex-col">
                    <span className={`font-semibold ${benefit.color} flex items-center gap-1`}>
                      {benefit.text}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-xs text-secondary-foreground/70">{benefit.subtext}</span>
                  </div>
                </div>
              );

              return benefit.link ? (
                <Link key={index} to={benefit.link} className="hover:opacity-80 transition-opacity">
                  {content}
                </Link>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
