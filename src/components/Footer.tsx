import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  CreditCard, 
  Shield, 
  Lock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    "About FindSafe",
    "Affiliate & Influencer Program",
    "Contact us",
    "Careers",
    "Press",
    "Sustainability Program",
  ];

  const customerLinks = [
    "Return and refund policy",
    "Intellectual property policy",
    "Shipping info",
    "Report suspicious activity",
  ];

  const helpLinks = [
    "Support center & FAQ",
    "Safety center",
    "Purchase protection",
    "Sitemap",
    "Partner with FindSafe",
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "Amex", "PayPal", "Apple Pay", "Google Pay"
  ];

  const certifications = [
    "PCI DSS", "SSL Secure", "McAfee", "Norton", "BBB"
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Company info</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Customer service</h3>
            <ul className="space-y-3">
              {customerLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App & Social */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Download the FindSafe App</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="flex items-center gap-1 text-trust">
                  <span className="w-2 h-2 rounded-full bg-trust"></span>
                  Price-drop alerts
                </span>
                <span className="flex items-center gap-1 text-trust">
                  <span className="w-2 h-2 rounded-full bg-trust"></span>
                  Track orders
                </span>
              </div>
            </div>
            
            {/* App Buttons */}
            <div className="flex gap-2 mb-6">
              <button className="flex items-center gap-2 bg-foreground text-background px-3 py-2 rounded-lg text-xs hover:opacity-90">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </button>
              <button className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs hover:opacity-90">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Google Play
              </button>
            </div>

            {/* Social Links */}
            <h4 className="font-semibold text-sm mb-3">Connect with FindSafe</h4>
            <div className="flex gap-4">
              <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Security & Payment */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h4 className="font-semibold text-sm mb-3">Security certification</h4>
              <div className="flex items-center gap-4">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-1 text-xs text-secondary-foreground/60">
                    <Shield className="w-4 h-4" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">We accept</h4>
              <div className="flex items-center gap-3">
                {paymentMethods.map((method) => (
                  <div key={method} className="bg-card text-foreground px-2 py-1 rounded text-xs font-medium">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            © 2024 FindSafe. All rights reserved. |{' '}
            <a href="#" className="hover:text-secondary-foreground">Terms of Service</a> |{' '}
            <a href="#" className="hover:text-secondary-foreground">Privacy Policy</a> |{' '}
            <a href="#" className="hover:text-secondary-foreground">Cookie Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
