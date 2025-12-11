import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Clock, Check, AlertCircle } from 'lucide-react';
import { ShopifyProduct } from '@/lib/shopify';

interface VariantSelectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: ShopifyProduct['node'];
  onAddToCart: (variantId: string, quantity: number) => void;
  selectedVariantId?: string | null;
}

const VariantSelectionDrawer = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  selectedVariantId 
}: VariantSelectionDrawerProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);

  // Initialize selected options from first variant or passed variant
  useEffect(() => {
    if (product && isOpen) {
      const initialOptions: Record<string, string> = {};
      
      // If variant is passed, use its options
      if (selectedVariantId) {
        const variant = product.variants.edges.find(v => v.node.id === selectedVariantId)?.node;
        if (variant?.selectedOptions) {
          variant.selectedOptions.forEach(opt => {
            initialOptions[opt.name] = opt.value;
          });
        }
      }
      
      setSelectedOptions(initialOptions);
      setQuantity(1);
      setShowError(false);
    }
  }, [product, isOpen, selectedVariantId]);

  // Find variant matching selected options
  const getSelectedVariant = () => {
    if (!product) return null;
    
    return product.variants.edges.find(v => {
      const variantOptions = v.node.selectedOptions;
      return variantOptions.every(opt => selectedOptions[opt.name] === opt.value);
    })?.node;
  };

  const selectedVariant = getSelectedVariant();
  const price = selectedVariant 
    ? parseFloat(selectedVariant.price.amount)
    : parseFloat(product.priceRange.minVariantPrice.amount);
  
  const imageUrl = product.images.edges[0]?.node.url || 'https://via.placeholder.com/120';
  
  // Check if all options are selected
  const allOptionsSelected = product.options
    .filter(opt => opt.name !== 'Title')
    .every(opt => selectedOptions[opt.name]);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionName]: value
    }));
    setShowError(false);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setShowError(true);
      return;
    }
    
    onAddToCart(selectedVariant.id, quantity);
    onClose();
  };

  // Check if option requires selection
  const hasOptions = product.options.length > 0 && product.options[0].name !== 'Title';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-2xl p-0">
        <div className="p-4 border-b border-border">
          <SheetHeader>
            <SheetTitle className="sr-only">Select Options</SheetTitle>
          </SheetHeader>
          
          {/* Product Preview */}
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
              <img 
                src={imageUrl} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Stock badge */}
              <div className="absolute bottom-1 left-1 right-1 bg-foreground/90 text-background text-[10px] px-1.5 py-0.5 rounded text-center">
                Only {Math.floor(Math.random() * 15) + 3} left
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-bold text-deal">
                ${price.toFixed(2)}
              </p>
              {selectedVariant && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedVariant.selectedOptions.map(o => o.value).join(' / ')}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                {product.title}
              </p>
            </div>
          </div>
        </div>

        {/* Options Selection */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {/* Deal banner */}
          <div className="flex items-center gap-2 bg-deal/10 text-deal px-3 py-2 rounded-lg mb-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Lightning deal | Limited time offer</span>
          </div>

          {hasOptions && (
            <div className="space-y-4">
              {product.options.filter(opt => opt.name !== 'Title').map((option) => (
                <div key={option.name}>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-sm font-medium">{option.name}:</label>
                    {!selectedOptions[option.name] && showError && (
                      <span className="text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Please select {option.name.toLowerCase()}
                      </span>
                    )}
                    {selectedOptions[option.name] && (
                      <span className="text-sm text-primary font-medium">{selectedOptions[option.name]}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedOptions[option.name] === value;
                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionSelect(option.name, value)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                            isSelected 
                              ? 'border-primary bg-primary/10 text-primary' 
                              : 'border-border hover:border-primary/50 bg-card'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="mt-4">
            <label className="text-sm font-medium mb-2 block">Qty</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted bg-card"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border-2 border-border flex items-center justify-center hover:bg-muted bg-card"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-sm text-muted-foreground ml-2">Added</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="p-4 border-t border-border bg-background">
          <Button 
            onClick={handleAddToCart}
            className="w-full h-14 bg-deal hover:bg-deal/90 text-primary-foreground font-bold text-lg rounded-full"
          >
            Go to cart
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VariantSelectionDrawer;
