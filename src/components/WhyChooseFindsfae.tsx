import { Shield, Package, RefreshCw, TreePine, ChevronRight, CheckCircle } from 'lucide-react';

const WhyChooseFindsfae = () => {
  return (
    <div className="space-y-4 mt-6">
      {/* Free Returns & Price Adjustment */}
      <div className="flex items-center gap-2 text-primary cursor-pointer hover:underline">
        <RefreshCw className="w-5 h-5" />
        <span className="font-medium">Free returns</span>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium">Price adjustment</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Tree Planting Program */}
      <div className="flex items-center gap-2 text-primary cursor-pointer hover:underline">
        <TreePine className="w-5 h-5" />
        <span className="font-medium">Findsfae's Tree Planting Program (500K+ trees)</span>
        <ChevronRight className="w-4 h-4" />
      </div>

      {/* Why Choose Findsfae Section */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Why choose Findsfae?</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        
        <div className="grid grid-cols-2 gap-px bg-border">
          {/* Security & Privacy */}
          <div className="bg-card p-4">
            <h4 className="font-semibold text-primary mb-2">Security & Privacy</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Safe payments</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Secure privacy</span>
              </li>
            </ul>
          </div>

          {/* Delivery Guarantee */}
          <div className="bg-card p-4">
            <h4 className="font-semibold text-primary mb-2">Delivery guarantee</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>$20 Credit for delay</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>15-day no update refund</span>
              </li>
            </ul>
          </div>

          {/* Returns Policy */}
          <div className="bg-card p-4">
            <h4 className="font-semibold text-primary mb-2">Easy returns</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Return if item damaged</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>55-day no delivery refund</span>
              </li>
            </ul>
          </div>

          {/* Quality Assurance */}
          <div className="bg-card p-4">
            <h4 className="font-semibold text-primary mb-2">Quality assurance</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Verified sellers</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span>Product authenticity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseFindsfae;
