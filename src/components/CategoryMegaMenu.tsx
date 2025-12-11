import { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryMegaMenu = ({ isOpen, onClose }: CategoryMegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("Electronics");
  const [scrollPosition, setScrollPosition] = useState(0);
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find(c => c.name === hoveredCategory);

  // Reset scroll when category changes
  useEffect(() => {
    if (subcategoriesRef.current) {
      subcategoriesRef.current.scrollTop = 0;
    }
  }, [hoveredCategory]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-full left-0 right-0 bg-card shadow-2xl z-50 border-t border-border animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[550px]">
            {/* Left sidebar - Categories */}
            <div className="w-56 border-r border-border py-3 overflow-y-auto scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-all rounded-lg mx-1 ${
                    hoveredCategory === category.name 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onClick={() => setHoveredCategory(category.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{category.icon}</span>
                    <span className="truncate">{category.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-60" />
                </button>
              ))}
            </div>

            {/* Right content - Subcategories with images */}
            <div className="flex-1 p-6 overflow-hidden" ref={subcategoriesRef}>
              {activeCategory && (
                <div className="animate-fade-in h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{activeCategory.icon}</span>
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {activeCategory.name}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 overflow-y-auto max-h-[450px] pr-2 scrollbar-hide">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all"
                        onClick={() => {
                          // TODO: Navigate to category page
                          onClose();
                        }}
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow bg-muted">
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-xs text-center text-foreground group-hover:text-primary transition-colors font-medium leading-tight line-clamp-2">
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
