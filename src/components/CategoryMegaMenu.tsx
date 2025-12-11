import { useState } from 'react';
import { ChevronRight, Home, Shirt, Footprints, Sparkles, Dumbbell, Baby, Briefcase, Gem, HeartPulse, Gamepad2, Car, Watch, Flame } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  subcategories: { name: string; hot?: boolean }[];
}

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: Category[] = [
  {
    name: "Trending Now",
    icon: <Flame className="w-5 h-5" />,
    subcategories: [
      { name: "Daily Deals", hot: true },
      { name: "Seasonal Picks" },
      { name: "Limited Edition" },
      { name: "Flash Sales", hot: true },
    ]
  },
  {
    name: "Home & Living",
    icon: <Home className="w-5 h-5" />,
    subcategories: [
      { name: "Home Décor" },
      { name: "Kitchen Essentials", hot: true },
      { name: "Bedding & Bath" },
      { name: "Storage Solutions" },
      { name: "Lighting" },
    ]
  },
  {
    name: "Women's Style",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      { name: "Dresses & Skirts", hot: true },
      { name: "Tops & Blouses" },
      { name: "Coats & Jackets" },
      { name: "Activewear" },
      { name: "Plus Size Fashion" },
    ]
  },
  {
    name: "Men's Wear",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      { name: "Casual Shirts" },
      { name: "T-Shirts & Polos", hot: true },
      { name: "Jackets & Coats" },
      { name: "Sportswear" },
      { name: "Big & Tall" },
    ]
  },
  {
    name: "Footwear",
    icon: <Footprints className="w-5 h-5" />,
    subcategories: [
      { name: "Women's Shoes" },
      { name: "Men's Shoes" },
      { name: "Sneakers", hot: true },
      { name: "Boots & Heels" },
      { name: "Kids' Shoes" },
    ]
  },
  {
    name: "Beauty & Care",
    icon: <Sparkles className="w-5 h-5" />,
    subcategories: [
      { name: "Skincare", hot: true },
      { name: "Makeup" },
      { name: "Hair Care" },
      { name: "Fragrances" },
      { name: "Personal Care" },
    ]
  },
  {
    name: "Sports & Fitness",
    icon: <Dumbbell className="w-5 h-5" />,
    subcategories: [
      { name: "Gym Equipment" },
      { name: "Outdoor Gear", hot: true },
      { name: "Yoga & Pilates" },
      { name: "Cycling" },
      { name: "Team Sports" },
    ]
  },
  {
    name: "Kids & Baby",
    icon: <Baby className="w-5 h-5" />,
    subcategories: [
      { name: "Baby Essentials", hot: true },
      { name: "Kids' Clothing" },
      { name: "Toys & Games" },
      { name: "School Supplies" },
    ]
  },
  {
    name: "Jewelry & Watches",
    icon: <Gem className="w-5 h-5" />,
    subcategories: [
      { name: "Women's Jewelry", hot: true },
      { name: "Men's Accessories" },
      { name: "Watches" },
      { name: "Fashion Jewelry" },
    ]
  },
  {
    name: "Health & Wellness",
    icon: <HeartPulse className="w-5 h-5" />,
    subcategories: [
      { name: "Supplements" },
      { name: "Medical Supplies" },
      { name: "Massage & Relaxation", hot: true },
    ]
  },
  {
    name: "Toys & Hobbies",
    icon: <Gamepad2 className="w-5 h-5" />,
    subcategories: [
      { name: "Action Figures" },
      { name: "Board Games", hot: true },
      { name: "Puzzles" },
      { name: "RC & Drones" },
    ]
  },
  {
    name: "Auto & Moto",
    icon: <Car className="w-5 h-5" />,
    subcategories: [
      { name: "Car Accessories" },
      { name: "Motorcycle Gear", hot: true },
      { name: "Tools & Equipment" },
    ]
  },
  {
    name: "Bags & Luggage",
    icon: <Briefcase className="w-5 h-5" />,
    subcategories: [
      { name: "Handbags", hot: true },
      { name: "Backpacks" },
      { name: "Travel Luggage" },
      { name: "Wallets" },
    ]
  },
];

const CategoryMegaMenu = ({ isOpen, onClose }: CategoryMegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("Trending Now");

  if (!isOpen) return null;

  const activeCategory = categories.find(c => c.name === hoveredCategory);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/20 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-full left-0 right-0 bg-card shadow-xl z-50 border-t border-border animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex">
            {/* Left sidebar - Categories */}
            <div className="w-64 border-r border-border py-4 max-h-[500px] overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted transition-colors ${
                    hoveredCategory === category.name ? 'bg-muted text-primary font-medium' : 'text-foreground'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                >
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {/* Right content - Subcategories with images */}
            <div className="flex-1 p-6">
              {activeCategory && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">{activeCategory.name}</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                          <span className="text-2xl">🛍️</span>
                          {sub.hot && (
                            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                              HOT
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors text-center">
                          {sub.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryMegaMenu;
