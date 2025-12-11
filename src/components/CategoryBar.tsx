import { useRef } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use all 23 main categories from the data file
  const displayCategories = [
    { name: "All", image: "" },
    ...categories.map(cat => ({
      name: cat.name,
      image: cat.image
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
          
          {/* Scrollable categories */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCategories.map((cat, index) => (
              <button
                key={cat.name}
                onClick={() => onCategoryChange(cat.name)}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                {/* Circular image container */}
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all ${
                  activeCategory === cat.name 
                    ? 'border-primary shadow-lg ring-2 ring-primary/30' 
                    : 'border-border group-hover:border-primary/50 group-hover:shadow-md'
                }`}>
                  {cat.image ? (
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <LayoutGrid className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                {/* Category name */}
                <span className={`text-xs text-center font-semibold leading-tight max-w-[80px] ${
                  activeCategory === cat.name 
                    ? 'text-primary' 
                    : 'text-foreground group-hover:text-primary'
                }`}>
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Right scroll button with arrow */}
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
