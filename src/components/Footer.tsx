import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Shield, CreditCard } from 'lucide-react';
import findsfaeLogo from '@/assets/findsfae-logo.png';

const Footer = () => {
  const sections = [
    {
      title: 'Company',
      links: [
        { label: 'About Findsfae', to: '/info/about' },
        { label: 'Contact us', to: '/info/contact' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Return & refund policy', to: '/info/returns' },
        { label: 'Shipping info', to: '/info/shipping' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Support center & FAQ', to: '/info/faq' },
        { label: 'Purchase protection', to: '/info/protection' },
      ],
    },
  ];

  const payments = ['PayPal', 'Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={findsfaeLogo} alt="Findsfae" className="h-10 w-auto mb-4" />
            <p className="text-secondary-foreground/60 text-sm leading-relaxed max-w-sm font-body">
              Discover quality products at unbeatable prices. Free shipping, easy returns, and a satisfaction guarantee on every order.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/60 hover:text-secondary-foreground hover:bg-secondary-foreground/15 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4 font-body">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-secondary-foreground/60 hover:text-secondary-foreground text-sm transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <CreditCard className="w-4 h-4 text-secondary-foreground/40" />
            {payments.map((p) => (
              <span key={p} className="text-xs text-secondary-foreground/50 bg-secondary-foreground/8 px-2.5 py-1 rounded font-body">{p}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-secondary-foreground/40 font-body">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SSL Secured</span>
            <span>© 2026 Findsfae</span>
            <Link to="/info/privacy" className="hover:text-secondary-foreground">Privacy</Link>
            <Link to="/info/terms" className="hover:text-secondary-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
