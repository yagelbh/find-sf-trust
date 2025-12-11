import { useRef } from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryBarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryBar = ({ activeCategory, onCategoryChange }: CategoryBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get main categories with reliable images
  const displayCategories = [
    { 
      name: "Recommended", 
      image: "" 
    },
    { 
      name: "Home & Kitchen", 
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop" 
    },
    { 
      name: "Beauty & Health", 
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop" 
    },
    { 
      name: "Jewelry", 
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop" 
    },
    { 
      name: "Women's Clothing", 
      image: "https://images.unsplash.com/photo-1558171813-01ed289a814b?w=100&h=100&fit=crop" 
    },
    { 
      name: "Electronics", 
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop" 
    },
    { 
      name: "Sports & Outdoors", 
      image: "https://images.unsplash.com/photo-1461896836934- voices?w=100&h=100&fit=crop" 
    },
    { 
      name: "Toys & Games", 
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=100&h=100&fit=crop" 
    },
    { 
      name: "Arts & Crafts", 
      image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=100&h=100&fit=crop" 
    },
    { 
      name: "Garden & Patio", 
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop" 
    },
    { 
      name: "Pet Supplies", 
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop" 
    },
    { 
      name: "Baby & Kids", 
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=100&h=100&fit=crop" 
    },
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
