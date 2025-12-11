import { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { categories } from '@/data/categories';

interface CategoryMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryMegaMenu = ({ isOpen, onClose }: CategoryMegaMenuProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string>("Electronics");

  const activeCategory = categories.find(c => c.name === hoveredCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
      />
      
      {/* Menu Container - More compact */}
      <div className="absolute top-0 left-0 right-0 bg-card shadow-2xl animate-fade-in" style={{ marginTop: '100px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-2 hover:bg-muted rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex">
            {/* Left sidebar - Categories List - Narrower */}
            <div className="w-48 flex-shrink-0 bg-muted/50 border-r border-border">
              <div className="py-1 max-h-[55vh] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-all ${
                      hoveredCategory === category.name 
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onClick={() => setHoveredCategory(category.name)}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span className="truncate text-xs">{category.name}</span>
                    </span>
                    <ChevronRight className="w-3 h-3 opacity-50 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right content - Subcategories Grid - Tighter layout */}
            <div className="flex-1 p-4 bg-card min-h-[280px] max-h-[55vh] overflow-y-auto">
              {activeCategory && (
                <div>
                  {/* Category Title */}
                  <div className="mb-3 pb-2 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <span>{activeCategory.icon}</span>
                      {activeCategory.name}
                    </h3>
                  </div>
                  
                  {/* Subcategories Grid - More compact */}
                  <div className="grid grid-cols-6 xl:grid-cols-8 gap-2">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center text-center p-1.5 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {/* Circular Image */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted mb-1.5 ring-2 ring-transparent group-hover:ring-primary transition-all flex-shrink-0">
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Label */}
                        <span className="text-[10px] text-foreground group-hover:text-primary transition-colors font-medium leading-tight line-clamp-2">
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
