import { useParams } from 'react-router-dom';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import AuthModal from '@/components/AuthModal';
import CartDrawer from '@/components/CartDrawer';
import { Shield, Truck, RotateCcw, HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';

const pageContent: Record<string, { title: string; icon: React.ReactNode; content: React.ReactNode }> = {
  'about': {
    title: 'About Findsfae',
    icon: <Shield className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Welcome to Findsfae – your trusted destination for quality products at unbeatable prices.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Our Mission</h3>
          <p className="text-muted-foreground">
            We're on a mission to make quality products accessible to everyone. By working directly with manufacturers and cutting out the middlemen, we bring you the best deals on thousands of products.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Why Shop With Us?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2">✓ Unbeatable prices on quality products</li>
            <li className="flex items-center gap-2">✓ Free shipping on most items</li>
            <li className="flex items-center gap-2">✓ Secure checkout with buyer protection</li>
            <li className="flex items-center gap-2">✓ 24/7 customer support</li>
            <li className="flex items-center gap-2">✓ Easy returns within 30 days</li>
          </ul>
        </div>
      </div>
    )
  },
  'contact': {
    title: 'Contact Us',
    icon: <Mail className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          We're here to help! Reach out to us through any of the following channels.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-muted/50 p-6 rounded-xl text-center">
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Email Support</h4>
            <p className="text-muted-foreground text-sm">support@findsfae.com</p>
            <p className="text-xs text-muted-foreground mt-2">Response within 24 hours</p>
          </div>
          <div className="bg-muted/50 p-6 rounded-xl text-center">
            <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Live Chat</h4>
            <p className="text-muted-foreground text-sm">Available 24/7</p>
            <p className="text-xs text-muted-foreground mt-2">Instant response</p>
          </div>
          <div className="bg-muted/50 p-6 rounded-xl text-center">
            <Phone className="w-10 h-10 text-primary mx-auto mb-4" />
            <h4 className="font-semibold mb-2">Phone Support</h4>
            <p className="text-muted-foreground text-sm">1-800-FINDSFAE</p>
            <p className="text-xs text-muted-foreground mt-2">Mon-Fri 9AM-6PM EST</p>
          </div>
        </div>
      </div>
    )
  },
  'returns': {
    title: 'Return & Refund Policy',
    icon: <RotateCcw className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          We want you to be completely satisfied with your purchase. Here's our return policy.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">30-Day Return Window</h3>
          <p className="text-muted-foreground">
            You have 30 days from the date of delivery to return most items for a full refund.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">How to Return</h3>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Log into your account and go to "My Orders"</li>
            <li>Select the item you want to return</li>
            <li>Choose your reason for return</li>
            <li>Print the prepaid shipping label</li>
            <li>Ship the item back to us</li>
          </ol>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Refund Processing</h3>
          <p className="text-muted-foreground">
            Once we receive your return, refunds are processed within 5-7 business days to your original payment method.
          </p>
        </div>
      </div>
    )
  },
  'shipping': {
    title: 'Shipping Information',
    icon: <Truck className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          We offer fast, reliable shipping to get your items to you quickly.
        </p>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Shipping Options</h3>
          <div className="bg-muted/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Method</th>
                  <th className="text-left p-4 font-semibold">Delivery Time</th>
                  <th className="text-left p-4 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-4">Standard Shipping</td>
                  <td className="p-4">7-14 business days</td>
                  <td className="p-4 text-primary font-semibold">FREE</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-4">Express Shipping</td>
                  <td className="p-4">3-5 business days</td>
                  <td className="p-4">$9.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Tracking Your Order</h3>
          <p className="text-muted-foreground">
            Once your order ships, you'll receive a tracking number via email. You can track your package at any time through your account.
          </p>
        </div>
      </div>
    )
  },
  'faq': {
    title: 'Support Center & FAQ',
    icon: <HelpCircle className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Find answers to commonly asked questions below.
        </p>
        <div className="space-y-4">
          {[
            { q: 'How do I track my order?', a: 'Log into your account and go to "My Orders" to view tracking information for all your purchases.' },
            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and more.' },
            { q: 'Is my payment information secure?', a: 'Yes! We use industry-standard SSL encryption and never store your full card details.' },
            { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 24 hours of placement. After that, please contact support.' },
            { q: 'Do you ship internationally?', a: 'Currently, we ship to the United States only. International shipping coming soon!' },
          ].map((faq, i) => (
            <div key={i} className="bg-muted/50 p-5 rounded-xl">
              <h4 className="font-semibold mb-2">{faq.q}</h4>
              <p className="text-muted-foreground text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  'protection': {
    title: 'Purchase Protection',
    icon: <Shield className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-lg text-muted-foreground">
          Shop with confidence! Every purchase on Findsfae is protected.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-2">Money-Back Guarantee</h4>
            <p className="text-muted-foreground text-sm">
              If your item doesn't arrive, is damaged, or doesn't match the description, you'll get a full refund.
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-2">Secure Payments</h4>
            <p className="text-muted-foreground text-sm">
              All transactions are encrypted and processed through secure payment gateways.
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-2">Delivery Guarantee</h4>
            <p className="text-muted-foreground text-sm">
              Get a $5 credit if your delivery is delayed beyond the estimated date.
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-2">24/7 Support</h4>
            <p className="text-muted-foreground text-sm">
              Our customer service team is available around the clock to help with any issues.
            </p>
          </div>
        </div>
      </div>
    )
  },
  'terms': {
    title: 'Terms of Service',
    icon: <Shield className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          By using Findsfae, you agree to these terms. Please read them carefully.
        </p>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Last updated: January 2026</p>
          <p>These Terms of Service govern your use of the Findsfae website and services. By accessing or using our services, you agree to be bound by these terms.</p>
          <p>For full terms and conditions, please contact our legal team at legal@findsfae.com</p>
        </div>
      </div>
    )
  },
  'privacy': {
    title: 'Privacy Policy',
    icon: <Shield className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Last updated: January 2026</p>
          <h4 className="font-semibold text-foreground">Information We Collect</h4>
          <p>We collect information you provide when creating an account, making purchases, or contacting support.</p>
          <h4 className="font-semibold text-foreground">How We Use Your Information</h4>
          <p>We use your information to process orders, improve our services, and communicate with you about your account.</p>
          <p>For the complete privacy policy, please contact privacy@findsfae.com</p>
        </div>
      </div>
    )
  },
  'cookies': {
    title: 'Cookie Policy',
    icon: <Shield className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">
          We use cookies to enhance your browsing experience and analyze site traffic.
        </p>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>Last updated: January 2026</p>
          <p>Cookies are small text files stored on your device. We use them to remember your preferences and improve site functionality.</p>
          <p>You can manage cookie preferences in your browser settings.</p>
        </div>
      </div>
    )
  }
};

const InfoPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  useEffect(() => {
    const handleOpenCartDrawer = () => setShowCartDrawer(true);
    window.addEventListener('openCartDrawer', handleOpenCartDrawer);
    return () => window.removeEventListener('openCartDrawer', handleOpenCartDrawer);
  }, []);

  const page = pageContent[slug || ''] || {
    title: 'Page Not Found',
    icon: <HelpCircle className="w-8 h-8 text-muted-foreground" />,
    content: <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            {page.icon}
            <h1 className="text-3xl font-display font-bold">{page.title}</h1>
          </div>
          
          {page.content}
        </div>
      </main>

      <Footer />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartDrawer isOpen={showCartDrawer} onClose={() => setShowCartDrawer(false)} />
    </div>
  );
};

export default InfoPage;
