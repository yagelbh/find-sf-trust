import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use all 23 main categories from the data file
  const displayCategories = [
    { name: "Recommended" },
    ...categories.map(cat => ({
      name: cat.name
    }))
  ];

  const scrollCategories = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-card py-4">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={() => scrollCategories('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Scrollable categories - Pill buttons */}
          <div 
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className={`px-5 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-card text-foreground border-border hover:border-foreground/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Right scroll button */}
          <button 
            onClick={() => scrollCategories('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-card shadow-lg rounded-full flex items-center justify-center hover:bg-muted transition-colors border border-border"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
