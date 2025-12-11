import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get first 12 main categories for the bar
  const displayCategories = [
    { name: "All", icon: "🏠", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop" },
    ...categories.slice(0, 11).map(cat => ({
      name: cat.name.replace(" - Women", "").replace(" - Men", "").replace(" - Kids", ""),
      icon: cat.icon,
      image: cat.subcategories[0]?.image || ""
    }))
  ].filter((cat, index, self) => 
    index === self.findIndex(c => c.name === cat.name)
  ).slice(0, 10);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-card border-y border-border sticky top-[60px] z-40">
      <div className="container mx-auto px-4">
        <div className="relative py-2">
          {/* Left scroll button */}
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Scrollable categories */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted/50 hover:bg-muted text-foreground'
                }`}
              >
                {/* Category icon/image */}
                <div className="w-7 h-7 rounded-full overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm">{cat.icon}</span>
                  )}
                </div>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Right scroll button */}
          <button 
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
