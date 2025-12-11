import { Truck, RefreshCw, Shield, ChevronRight, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onCountryClick?: () => void;
  currentCountry?: { name: string; flag: string; currency: string };
}

const TopBar = ({ onCountryClick, currentCountry }: TopBarProps) => {
  const [detectedCountry, setDetectedCountry] = useState({ name: 'United States', flag: '🇺🇸', code: 'US' });

  // Auto-detect country on mount
  useEffect(() => {
    const detectCountry = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Map common timezones to countries
        const tzCountryMap: Record<string, { name: string; flag: string; code: string }> = {
          'America/New_York': { name: 'United States', flag: '🇺🇸', code: 'US' },
          'America/Los_Angeles': { name: 'United States', flag: '🇺🇸', code: 'US' },
          'America/Chicago': { name: 'United States', flag: '🇺🇸', code: 'US' },
          'Europe/London': { name: 'United Kingdom', flag: '🇬🇧', code: 'GB' },
          'Europe/Paris': { name: 'France', flag: '🇫🇷', code: 'FR' },
          'Europe/Berlin': { name: 'Germany', flag: '🇩🇪', code: 'DE' },
          'Asia/Tokyo': { name: 'Japan', flag: '🇯🇵', code: 'JP' },
          'Asia/Shanghai': { name: 'China', flag: '🇨🇳', code: 'CN' },
          'Asia/Jerusalem': { name: 'Israel', flag: '🇮🇱', code: 'IL' },
          'Australia/Sydney': { name: 'Australia', flag: '🇦🇺', code: 'AU' },
          'America/Toronto': { name: 'Canada', flag: '🇨🇦', code: 'CA' },
        };
        
        const detected = tzCountryMap[timezone] || { name: 'United States', flag: '🇺🇸', code: 'US' };
        setDetectedCountry(detected);
      } catch (error) {
        console.error('Country detection failed:', error);
      }
    };
    detectCountry();
  }, []);

  const displayCountry = currentCountry || detectedCountry;

  const benefits = [
    { icon: Award, text: "Top Sellers", subtext: "Best picks this week", color: "text-warning", link: "/top-sellers" },
    { icon: Truck, text: "Free shipping", subtext: "Min thresholds apply", color: "text-foreground", link: null },
    { icon: RefreshCw, text: "Price adjustment", subtext: "Within 30 days", color: "text-foreground", link: null },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues", color: "text-foreground", link: null },
  ];

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const content = (
                <div className="flex items-center gap-2 group cursor-pointer">
                  <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                  <div className="flex flex-col">
                    <span className={`font-semibold ${benefit.color} flex items-center gap-1 text-xs lg:text-sm`}>
                      {benefit.text}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                    <span className="text-[10px] lg:text-xs text-secondary-foreground/70 hidden sm:block">{benefit.subtext}</span>
                  </div>
                </div>
              );

              return benefit.link ? (
                <Link key={index} to={benefit.link} className="hover:opacity-80 transition-opacity">
                  {content}
                </Link>
              ) : (
                <div key={index} className="hidden md:block">{content}</div>
              );
            })}
          </div>

          {/* Country Selector - Auto detected */}
          <button
            onClick={onCountryClick}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-secondary-foreground/10 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span className="text-lg">{displayCountry.flag}</span>
            <span className="text-xs font-medium hidden sm:inline">{displayCountry.name}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;