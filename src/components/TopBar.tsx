import { Truck, RefreshCw, Shield, ChevronRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onCountryClick?: () => void;
  currentCountry?: { name: string; flag: string; currency: string };
}

const TopBar = ({ onCountryClick, currentCountry }: TopBarProps) => {
  const [detectedCountry, setDetectedCountry] = useState({ name: 'United States', flag: '🇺🇸', code: 'US' });

  useEffect(() => {
    const detectCountry = () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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
    { icon: Truck, text: "Free shipping", subtext: "Min thresholds apply" },
    { icon: RefreshCw, text: "Price adjustment", subtext: "Within 30 days" },
    { icon: Shield, text: "Delivery guarantee", subtext: "Refund for any issues" },
  ];

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <benefit.icon className="w-4 h-4 text-warning" />
                <div className="flex flex-col">
                  <span className="font-semibold text-background flex items-center gap-1 text-xs lg:text-sm">
                    {benefit.text}
                    <ChevronRight className="w-3 h-3 opacity-70" />
                  </span>
                  <span className="text-[10px] lg:text-xs text-background/70 hidden sm:block">{benefit.subtext}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onCountryClick}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-background/10 transition-colors"
          >
            <Globe className="w-4 h-4 text-background" />
            <span className="text-lg">{displayCountry.flag}</span>
            <span className="text-xs font-medium hidden sm:inline text-background">{displayCountry.name}</span>
            <ChevronRight className="w-3 h-3 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;