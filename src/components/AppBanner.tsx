import { Smartphone, Bell, Truck, Tag, Shield, Download } from 'lucide-react';
import { Button } from './ui/button';

const AppBanner = () => {
  const features = [
    { icon: Bell, text: "Price-drop alerts" },
    { icon: Truck, text: "Track orders any time" },
    { icon: Shield, text: "Faster & more secure" },
    { icon: Tag, text: "Low stock items alerts" },
    { icon: Tag, text: "Exclusive offers" },
    { icon: Tag, text: "Coupons & offers alerts" },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-secondary via-navy to-secondary rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
            {/* Left - Content */}
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
                Download the FindSafe App
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-6 max-w-md">
                Get exclusive deals, track orders, and shop smarter on the go!
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                    <feature.icon className="w-4 h-4 text-trust" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <span className="text-xs opacity-80">Download on the</span>
                    <p className="font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <span className="text-xs opacity-80">Get it on</span>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Right - Phone Mockup */}
            <div className="relative">
              <div className="w-64 h-[500px] bg-foreground rounded-[40px] p-3 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full bg-gradient-to-b from-primary/20 to-secondary/20 rounded-[32px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center">
                      <span className="text-2xl font-display font-bold text-primary-foreground">FS</span>
                    </div>
                    <p className="text-foreground font-semibold">FindSafe</p>
                    <p className="text-muted-foreground text-sm">Shop Smarter</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-trust text-accent-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle">
                4.9★ Rating
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle" style={{ animationDelay: '0.5s' }}>
                10M+ Downloads
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
