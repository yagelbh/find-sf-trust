import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCountry: Country;
  onCountryChange: (country: Country) => void;
}

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencySymbol: '£' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', currencySymbol: 'C$' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', currencySymbol: 'A$' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', currencySymbol: '€' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', currencySymbol: '¥' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', currencySymbol: '₩' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', currencySymbol: 'R$' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', currencySymbol: 'MX$' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', currencySymbol: '₹' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', currency: 'ILS', currencySymbol: '₪' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', currencySymbol: 'د.إ' },
];

const languages = ['English', 'Español', 'Français', 'Deutsch', '中文', '日本語', '한국어', 'العربية'];

const CountryModal = ({ isOpen, onClose, currentCountry, onCountryChange }: CountryModalProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedCountry, setSelectedCountry] = useState(currentCountry);

  const handleSave = () => {
    onCountryChange(selectedCountry);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Language Selection */}
          <div>
            <h3 className="font-semibold mb-3">Language</h3>
            <div className="space-y-2">
              {languages.slice(0, 4).map((lang) => (
                <label key={lang} className="flex items-center gap-3 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedLanguage === lang ? 'border-primary bg-primary' : 'border-input'
                  }`}>
                    {selectedLanguage === lang && <Check className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <span className="text-sm">{lang}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Currency Selection */}
          <div>
            <h3 className="font-semibold mb-3">Currency</h3>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span>{selectedCountry.currency}: {selectedCountry.currencySymbol}</span>
              <button className="text-primary text-sm font-medium">Change ›</button>
            </div>
          </div>

          {/* Country Detection */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <p className="text-sm text-muted-foreground">
                You are shopping on FindSafe {selectedCountry.name}.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-3">
              {countries.slice(0, 6).map((country) => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    selectedCountry.code === country.code 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card hover:bg-muted border border-border'
                  }`}
                >
                  <span className="text-xl block mb-1">{country.flag}</span>
                  <span className="text-xs">{country.code}</span>
                </button>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={handleSave}>
              Change country/region
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CountryModal;
