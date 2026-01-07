import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Shield,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const companyLinks = [
    "About Findsfae",
    "Contact us",
  ];

  const customerLinks = [
    "Return and refund policy",
    "Shipping info",
  ];

  const helpLinks = [
    "Support center & FAQ",
    "Purchase protection",
  ];

  const paymentMethods = [
    { name: "PayPal", color: "bg-[#003087]", textColor: "text-white" },
    { name: "VISA", color: "bg-[#1A1F71]", textColor: "text-white" },
    { name: "Mastercard", color: "bg-gradient-to-r from-[#EB001B] to-[#F79E1B]", textColor: "text-white" },
    { name: "Amex", color: "bg-[#006FCF]", textColor: "text-white" },
    { name: "Discover", color: "bg-[#FF6000]", textColor: "text-white" },
    { name: "Apple Pay", color: "bg-foreground", textColor: "text-background" },
    { name: "Google Pay", color: "bg-card", textColor: "text-foreground border border-border" },
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

          {/* Social Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Connect with Findsfae</h3>
            <div className="flex gap-4 mb-6">
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
            
            <h4 className="font-semibold text-sm mb-3">Customer Support</h4>
            <p className="text-secondary-foreground/70 text-sm">
              24/7 Support Available<br />
              support@findsfae.com
            </p>
          </div>
        </div>

        {/* Security & Payment */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security certification
              </h4>
              <div className="flex items-center gap-4">
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-1 text-xs text-secondary-foreground/60 bg-secondary-foreground/10 px-2 py-1 rounded">
                    <Shield className="w-3 h-3" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                We accept
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.name} 
                    className={`${method.color} ${method.textColor} px-3 py-1.5 rounded text-xs font-bold min-w-[60px] text-center`}
                  >
                    {method.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            © 2024 Findsfae. All rights reserved. |{' '}
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
