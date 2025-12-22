import { useState } from 'react';
import {
  ChevronRight,
  X,
  Shirt,
  User,
  Baby,
  Users,
  Sparkles,
  Home,
  Smartphone,
  Dumbbell,
  HeartPulse,
  PawPrint,
  Car,
  Briefcase,
  Wrench,
  Flower,
  Luggage,
  Palette,
  Gamepad2,
  Gift,
  Lightbulb,
  Archive,
  Camera,
  Plug,
  LucideIcon,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { CategoryCircleImage } from '@/components/CategoryCircleImage';

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  shirt: Shirt,
  user: User,
  baby: Baby,
  users: Users,
  sparkles: Sparkles,
  home: Home,
  smartphone: Smartphone,
  dumbbell: Dumbbell,
  'heart-pulse': HeartPulse,
  'paw-print': PawPrint,
  car: Car,
  briefcase: Briefcase,
  wrench: Wrench,
  flower: Flower,
  luggage: Luggage,
  palette: Palette,
  'gamepad-2': Gamepad2,
  gift: Gift,
  lightbulb: Lightbulb,
  archive: Archive,
  camera: Camera,
  plug: Plug,
};

const CategoryMegaMenu = ({ isOpen, onClose }: CategoryMegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string>("Women's Clothing");

  const activeCategory = categories.find((c) => c.name === hoveredCategory);

  if (!isOpen) return null;

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40" onClick={onClose} />

      {/* Menu Container */}
      <div
        className="absolute top-0 left-0 right-0 bg-card shadow-2xl animate-fade-in"
        style={{ marginTop: '100px' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex">
            {/* Left sidebar - Categories List */}
            <div className="w-56 flex-shrink-0 bg-muted/30 border-r border-border">
              <div className="py-2 max-h-[70vh] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all ${
                      hoveredCategory === category.name
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onClick={() => setHoveredCategory(category.name)}
                  >
                    <span className="flex items-center gap-3">
                      <span className="opacity-80">{getIcon(category.icon)}</span>
                      <span className="truncate text-sm">{category.name}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right content - Subcategories Grid */}
            <div className="flex-1 p-6 bg-card min-h-[400px] max-h-[70vh] overflow-y-auto">
              {activeCategory && (
                <div>
                  {/* Category Header */}
                  <div className="mb-6 pb-3 border-b border-border flex items-center gap-3">
                    <span className="opacity-80">{getIcon(activeCategory.icon)}</span>
                    <h3 className="text-xl font-bold text-foreground">
                      All {activeCategory.name}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* Subcategories Grid - Bigger circles like Temu */}
                  <div className="grid grid-cols-5 xl:grid-cols-6 gap-6">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center text-center"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {/* Circular Image with HOT badge */}
                        <div className="relative mb-3">
                          <CategoryCircleImage src={sub.image} alt={sub.name} size={80} />

                          {/* HOT Badge */}
                          {sub.isHot && (
                            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm shadow-sm">
                              HOT
                            </span>
                          )}
                        </div>
                        {/* Label */}
                        <span className="text-xs text-foreground group-hover:text-primary transition-colors font-medium leading-tight line-clamp-2 max-w-[90px]">
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
    </div>
  );
};

export default CategoryMegaMenu;

