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
      
      {/* Menu Container */}
      <div className="absolute top-0 left-0 right-0 bg-card shadow-2xl animate-fade-in" style={{ marginTop: '100px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex">
            {/* Left sidebar - Categories List */}
            <div className="w-56 flex-shrink-0 bg-muted/50 border-r border-border">
              <div className="py-2 max-h-[65vh] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                      hoveredCategory === category.name 
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'text-foreground hover:bg-muted'
                    }`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onClick={() => setHoveredCategory(category.name)}
                  >
                    <span className="truncate">{category.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right content - Subcategories Grid */}
            <div className="flex-1 p-6 bg-card min-h-[350px] max-h-[65vh] overflow-y-auto">
              {activeCategory && (
                <div>
                  {/* Category Title */}
                  <div className="mb-5 pb-3 border-b border-border">
                    <h3 className="text-xl font-bold text-foreground">
                      {activeCategory.name}
                    </h3>
                  </div>
                  
                  {/* Subcategories Grid - Tighter spacing */}
                  <div className="grid grid-cols-5 xl:grid-cols-7 gap-3">
                    {activeCategory.subcategories.map((sub, idx) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center text-center p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {/* Circular Image - Using real category images */}
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-muted mb-2 ring-2 ring-transparent group-hover:ring-primary transition-all flex-shrink-0">
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Label */}
                        <span className="text-[11px] text-foreground group-hover:text-primary transition-colors font-medium leading-tight line-clamp-2">
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
