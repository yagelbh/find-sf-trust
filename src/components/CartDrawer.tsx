import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingCart, Check } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent className="w-[320px] sm:w-[380px] flex flex-col p-0 bg-card">
        {/* Header */}
        <SheetHeader className="px-4 py-3 border-b border-border bg-primary">
          <SheetTitle className="flex items-center gap-2 text-primary-foreground">
            <Check className="w-5 h-5" />
            <span>Checkout ({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        {/* Subtotal Banner */}
        <div className="px-4 py-3 bg-muted border-b border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-xl font-bold text-foreground">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-affirmative mt-1">
            <Check className="w-3 h-3" />
            <span>Free shipping</span>
          </div>
        </div>

        {/* Go to Cart Button */}
        <div className="px-4 py-3 border-b border-border">
          <Button
            asChild
            disabled={items.length === 0}
            className="w-full bg-deal hover:bg-deal/90 text-primary-foreground font-semibold py-3 rounded-full"
          >
            <Link to="/cart" onClick={onClose}>
              Go to cart
            </Link>
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Select all ({totalItems})</span>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-3 p-2 bg-muted/50 rounded-lg">
                  {/* Checkbox + Image */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-card border border-border">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Stock indicator */}
                    <div className="absolute -bottom-1 -right-1 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded">
                      Only {Math.floor(Math.random() * 8) + 2} left
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="font-bold text-foreground">
                          ${(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-xs text-muted-foreground ml-1">
                            (${parseFloat(item.price.amount).toFixed(2)} each)
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Variant info */}
                    {item.selectedOptions.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.selectedOptions.map(o => o.value).join(' / ')}
                      </p>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Cart Link */}
        <div className="px-4 py-3 border-t border-border">
          <Link
            to="/cart"
            onClick={onClose}
            className="block text-center text-sm text-primary hover:underline"
          >
            View full cart
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
