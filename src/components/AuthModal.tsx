import { useState } from 'react';
import { X, Truck, RotateCcw, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth();

  const handleClose = () => {
    setShowLeaveConfirm(true);
  };

  const handleConfirmLeave = () => {
    setShowLeaveConfirm(false);
    setEmail('');
    setPassword('');
    onClose();
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created successfully!');
          onClose();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. If you don\'t have an account yet, click “Sign up”.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Signed in successfully!');
          onClose();
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(`Google sign-in failed: ${error.message}`);
      }
      // On success, Supabase redirects away; the auth listener will update session on return.
    } catch {
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    toast.info('Facebook sign-in isn’t available in Lovable Cloud yet. Please use email/password for now.');
  };

  const handleAppleSignIn = async () => {
    toast.info('Apple sign-in isn’t available in Lovable Cloud yet. Please use email/password for now.');
  };

  return (
    <>
      <Dialog open={isOpen && !showLeaveConfirm} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="p-6">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-2xl font-display font-bold">
                {mode === 'signin' ? 'Sign in' : 'Create Account'}
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mt-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">All data is safeguarded</span>
              </div>
            </DialogHeader>

            {/* Benefits */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Free shipping</p>
                  <p className="text-xs text-muted-foreground">subject to min thresholds</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm">Free returns</p>
                  <p className="text-xs text-muted-foreground">Up to 90 days</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-input rounded-lg focus:border-primary outline-none transition-colors bg-background"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-input rounded-lg focus:border-primary outline-none transition-colors bg-background"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
              </div>

              <Button 
                variant="cta" 
                size="xl" 
                className="w-full rounded-full"
                onClick={handleEmailAuth}
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
              </Button>

              <button 
                className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                disabled={isLoading}
              >
                {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with other ways</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-4">
              <button 
                className="w-12 h-12 rounded-full border-2 border-input hover:border-primary flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>
              <button 
                className="w-12 h-12 rounded-full border-2 border-input hover:border-primary flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={handleFacebookSignIn}
                disabled={isLoading}
              >
                <svg className="w-6 h-6" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button 
                className="w-12 h-12 rounded-full border-2 border-input hover:border-primary flex items-center justify-center transition-colors disabled:opacity-50"
                onClick={handleAppleSignIn}
                disabled={isLoading}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
              </button>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-muted-foreground mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-info hover:underline">Terms of Use</a>
              {' '}and{' '}
              <a href="#" className="text-info hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Confirmation Modal */}
      <Dialog open={showLeaveConfirm} onOpenChange={() => setShowLeaveConfirm(false)}>
        <DialogContent className="sm:max-w-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-display font-bold mb-2">
              Enjoy these special offers after signing in! Are you sure you want to leave now?
            </h2>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Free shipping</p>
                <p className="text-xs text-muted-foreground">subject to min thresholds</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Free returns</p>
                <p className="text-xs text-muted-foreground">Up to 90 days</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full"
              onClick={handleConfirmLeave}
            >
              Leave
            </Button>
            <Button 
              variant="cta" 
              className="flex-1 rounded-full"
              onClick={() => setShowLeaveConfirm(false)}
            >
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;
