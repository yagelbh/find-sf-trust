import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Trash2, ShoppingBag, ExternalLink, Loader2 } from 'lucide-react';
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useCartStore, CartItem } from '@/stores/cartStore';
import { toast } from 'sonner';

const CartItemCard = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();
  const imageUrl = item.product.node.images?.edges?.[0]?.node?.url || 'https://via.placeholder.com/120';

  return (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
      <Link to={`/product/${item.product.node.handle}`} className="flex-shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={item.product.node.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${item.product.node.handle}`}>
          <h3 className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors">
            {item.product.node.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          {item.selectedOptions.map(opt => opt.value).join(' / ')}
        </p>
        <p className="font-bold text-lg text-primary mt-2">
          {item.price.currencyCode === 'USD' ? '$' : item.price.currencyCode}
          {parseFloat(item.price.amount).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.variantId)}
          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 bg-muted rounded-lg">
          <button
            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
            className="p-2 hover:bg-background rounded-l-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
            className="p-2 hover:bg-background rounded-r-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { items, clearCart, getTotalItems, getTotalPrice, initiateCheckout, isLoading } = useCartStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      await initiateCheckout();
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Checkout failed', { description: 'Please try again later.' });
    }
  };

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCountryClick={() => {}}
        currentCountry={{ name: 'United States', flag: '🇺🇸', currency: 'USD' }}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-display font-bold mb-8">
          Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.variantId} item={item} />
              ))}

              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                Clear all items
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      Checkout with Shopify
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Secure checkout powered by Shopify
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Cart;