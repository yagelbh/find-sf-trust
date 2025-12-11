import { useState } from 'react';
import { ChevronRight, Home, Shirt, Footprints, Sparkles, Dumbbell, Baby, Briefcase, Gem, HeartPulse, Gamepad2, Car, Flame } from 'lucide-react';

interface Category {
  name: string;
  icon: React.ReactNode;
  subcategories: { name: string; emoji: string; hot?: boolean }[];
}

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: Category[] = [
  {
    name: "Trending Now",
    icon: <Flame className="w-5 h-5 text-deal" />,
    subcategories: [
      { name: "Daily Deals", emoji: "🏷️", hot: true },
      { name: "Seasonal Picks", emoji: "🎁" },
      { name: "Limited Edition", emoji: "💎" },
      { name: "Flash Sales", emoji: "⚡", hot: true },
    ]
  },
  {
    name: "Home & Living",
    icon: <Home className="w-5 h-5" />,
    subcategories: [
      { name: "Home Décor", emoji: "🏠" },
      { name: "Kitchen Essentials", emoji: "🍳", hot: true },
      { name: "Bedding & Bath", emoji: "🛏️" },
      { name: "Storage Solutions", emoji: "📦" },
      { name: "Lighting", emoji: "💡" },
    ]
  },
  {
    name: "Women's Style",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      { name: "Dresses & Skirts", emoji: "👗", hot: true },
      { name: "Tops & Blouses", emoji: "👚" },
      { name: "Coats & Jackets", emoji: "🧥" },
      { name: "Activewear", emoji: "🏃‍♀️" },
      { name: "Plus Size Fashion", emoji: "✨" },
    ]
  },
  {
    name: "Men's Wear",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      { name: "Casual Shirts", emoji: "👔" },
      { name: "T-Shirts & Polos", emoji: "👕", hot: true },
      { name: "Jackets & Coats", emoji: "🧥" },
      { name: "Sportswear", emoji: "🏋️" },
      { name: "Big & Tall", emoji: "📏" },
    ]
  },
  {
    name: "Footwear",
    icon: <Footprints className="w-5 h-5" />,
    subcategories: [
      { name: "Women's Shoes", emoji: "👠" },
      { name: "Men's Shoes", emoji: "👞" },
      { name: "Sneakers", emoji: "👟", hot: true },
      { name: "Boots & Heels", emoji: "👢" },
      { name: "Kids' Shoes", emoji: "🧦" },
    ]
  },
  {
    name: "Beauty & Care",
    icon: <Sparkles className="w-5 h-5" />,
    subcategories: [
      { name: "Skincare", emoji: "🧴", hot: true },
      { name: "Makeup", emoji: "💄" },
      { name: "Hair Care", emoji: "💇‍♀️" },
      { name: "Fragrances", emoji: "🌸" },
      { name: "Personal Care", emoji: "🪥" },
    ]
  },
  {
    name: "Sports & Fitness",
    icon: <Dumbbell className="w-5 h-5" />,
    subcategories: [
      { name: "Gym Equipment", emoji: "🏋️" },
      { name: "Outdoor Gear", emoji: "🏕️", hot: true },
      { name: "Yoga & Pilates", emoji: "🧘" },
      { name: "Cycling", emoji: "🚴" },
      { name: "Team Sports", emoji: "⚽" },
    ]
  },
  {
    name: "Kids & Baby",
    icon: <Baby className="w-5 h-5" />,
    subcategories: [
      { name: "Baby Essentials", emoji: "👶", hot: true },
      { name: "Kids' Clothing", emoji: "🧒" },
      { name: "Toys & Games", emoji: "🧸" },
      { name: "School Supplies", emoji: "📚" },
    ]
  },
  {
    name: "Jewelry & Watches",
    icon: <Gem className="w-5 h-5" />,
    subcategories: [
      { name: "Women's Jewelry", emoji: "💍", hot: true },
      { name: "Men's Accessories", emoji: "⌚" },
      { name: "Watches", emoji: "🕐" },
      { name: "Fashion Jewelry", emoji: "📿" },
    ]
  },
  {
    name: "Health & Wellness",
    icon: <HeartPulse className="w-5 h-5" />,
    subcategories: [
      { name: "Supplements", emoji: "💊" },
      { name: "Medical Supplies", emoji: "🩺" },
      { name: "Massage & Relaxation", emoji: "💆", hot: true },
    ]
  },
  {
    name: "Toys & Hobbies",
    icon: <Gamepad2 className="w-5 h-5" />,
    subcategories: [
      { name: "Action Figures", emoji: "🦸" },
      { name: "Board Games", emoji: "🎲", hot: true },
      { name: "Puzzles", emoji: "🧩" },
      { name: "RC & Drones", emoji: "🚁" },
    ]
  },
  {
    name: "Auto & Moto",
    icon: <Car className="w-5 h-5" />,
    subcategories: [
      { name: "Car Accessories", emoji: "🚗" },
      { name: "Motorcycle Gear", emoji: "🏍️", hot: true },
      { name: "Tools & Equipment", emoji: "🔧" },
    ]
  },
  {
    name: "Bags & Luggage",
    icon: <Briefcase className="w-5 h-5" />,
    subcategories: [
      { name: "Handbags", emoji: "👜", hot: true },
      { name: "Backpacks", emoji: "🎒" },
      { name: "Travel Luggage", emoji: "🧳" },
      { name: "Wallets", emoji: "👛" },
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
            <div className="flex-1 p-8">
              {activeCategory && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-semibold mb-6 text-foreground">{activeCategory.name}</h3>
                  <div className="grid grid-cols-4 gap-6">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-muted transition-all hover:shadow-md"
                      >
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-background flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                          <span className="text-3xl">{sub.emoji}</span>
                          {sub.hot && (
                            <span className="absolute -top-2 -right-2 bg-deal text-primary-foreground text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                              Hot
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors text-center font-medium">
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
