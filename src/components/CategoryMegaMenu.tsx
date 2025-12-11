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
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Menu Container - Full screen overlay */}
      <div className="absolute top-0 left-0 right-0 bg-white shadow-2xl animate-fade-in" style={{ marginTop: '120px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="flex">
            {/* Left sidebar - Categories List */}
            <div className="w-64 flex-shrink-0 bg-gray-50 border-r border-gray-200">
              <div className="py-2 max-h-[70vh] overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-all ${
                      hoveredCategory === category.name 
                        ? 'bg-primary text-white font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onClick={() => setHoveredCategory(category.name)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right content - Subcategories Grid */}
            <div className="flex-1 p-8 bg-white min-h-[400px] max-h-[70vh] overflow-y-auto">
              {activeCategory && (
                <div>
                  {/* Category Title */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <span className="text-3xl">{activeCategory.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {activeCategory.name}
                    </h3>
                  </div>
                  
                  {/* Subcategories Grid */}
                  <div className="grid grid-cols-4 xl:grid-cols-5 gap-6">
                    {activeCategory.subcategories.map((sub) => (
                      <button
                        key={sub.name}
                        className="group flex flex-col items-center text-center hover:opacity-80 transition-opacity"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        {/* Circular Image */}
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3 ring-2 ring-transparent group-hover:ring-primary transition-all">
                          <img 
                            src={sub.image} 
                            alt={sub.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Label */}
                        <span className="text-xs text-gray-700 group-hover:text-primary transition-colors font-medium leading-tight max-w-[100px]">
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
