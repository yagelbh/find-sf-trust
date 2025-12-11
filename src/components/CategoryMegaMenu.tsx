import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryMegaMenu = ({ isOpen, onClose }: CategoryMegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("Electronics");
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
          <div className="flex" style={{ minHeight: '500px' }}>
            {/* Left sidebar - Categories */}
            <div className="w-60 flex-shrink-0 border-r border-border py-3 overflow-y-auto scrollbar-hide bg-card">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                    hoveredCategory === category.name 
                      ? 'bg-primary text-primary-foreground font-medium' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onClick={() => setHoveredCategory(category.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{category.icon}</span>
                    <span className="truncate text-left">{category.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-60" />
                </button>
              ))}
            </div>

            {/* Right content - Subcategories with images */}
            <div className="flex-1 p-6 overflow-hidden bg-card" ref={subcategoriesRef}>
              {activeCategory && (
                <div className="animate-fade-in h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <span className="text-3xl">{activeCategory.icon}</span>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {activeCategory.name}
                    </h3>
                  </div>
                  
                  {/* Subcategories Grid - Fixed layout with proper spacing */}
                  <div 
                    className="overflow-y-auto pr-2 scrollbar-hide"
                    style={{ maxHeight: '380px' }}
                  >
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {activeCategory.subcategories.map((sub) => (
                        <button
                          key={sub.name}
                          className="group flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-all"
                          onClick={() => {
                            onClose();
                          }}
                        >
                          {/* Image container - fixed size */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-muted flex-shrink-0 mb-2">
                            <img 
                              src={sub.image} 
                              alt={sub.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                          {/* Text - fixed height with ellipsis */}
                          <span 
                            className="text-[11px] text-center text-foreground group-hover:text-primary transition-colors font-medium leading-tight w-full"
                            style={{ 
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              minHeight: '28px'
                            }}
                          >
                            {sub.name}
                          </span>
                        </button>
                      ))}
                    </div>
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
