import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Gift, Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner';

interface LeadCapturePopupProps {
  delaySeconds?: number;
  discountCode?: string;
  discountPercent?: number;
}

const LeadCapturePopup = ({ 
  delaySeconds = 30, 
  discountCode = 'WELCOME10',
  discountPercent = 10 
}: LeadCapturePopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('findsfae_lead_popup_seen');
    if (hasSeenPopup) return;

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('findsfae_lead_popup_seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call - In production, connect to email service
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    localStorage.setItem('findsfae_lead_popup_seen', 'true');
    localStorage.setItem('findsfae_subscriber_email', email);

    toast.success('Discount code sent to your email!');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(discountCode);
    toast.success('Discount code copied!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSubmitted ? (
            <>
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-primary via-deal to-warning p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-2">
                  DON'T GO
                </h2>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  JUST YET
                </h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-center text-foreground mb-6">
                  There's a <span className="font-bold text-deal">{discountPercent}% off</span> discount code 
                  waiting for you. Enter your email and we'll send it right away.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-base border-2 focus:border-primary"
                    required
                  />

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={acceptsMarketing}
                      onCheckedChange={(checked) => setAcceptsMarketing(checked as boolean)}
                    />
                    <label htmlFor="marketing" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                      Keep me up to date on news, exclusive offers and deals. 
                      <span className="text-xs block mt-1">You can unsubscribe at any time.</span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-bold text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      'GET MY DISCOUNT'
                    )}
                  </Button>
                </form>

                <button
                  onClick={handleClose}
                  className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  No thanks, I'll pay full price
                </button>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-affirmative/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-affirmative" />
              </div>
              
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                YOU'RE IN!
              </h2>
              <p className="text-muted-foreground mb-6">
                Here's your exclusive discount code:
              </p>

              <div 
                onClick={copyCode}
                className="bg-muted border-2 border-dashed border-primary rounded-lg p-4 mb-4 cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <p className="text-3xl font-mono font-bold text-primary tracking-wider">
                  {discountCode}
                </p>
                <p className="text-xs text-muted-foreground mt-2">Click to copy</p>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Use this code at checkout for {discountPercent}% off your first order!
              </p>

              <Button
                onClick={handleClose}
                className="w-full h-12 bg-primary hover:bg-primary/90"
              >
                START SHOPPING
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCapturePopup;
