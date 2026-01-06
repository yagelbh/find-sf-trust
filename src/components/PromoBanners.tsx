import { Truck, Tag, Flame, Star, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  link: string;
  featured?: boolean;
}

const categories: CategoryCard[] = [
  {
    id: 'hot-deals',
    title: 'Hot Deals',
    icon: <Flame className="w-6 h-6" />,
    link: '/flash-deals',
    featured: true,
  },
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    icon: <Truck className="w-6 h-6" />,
    link: '/deals/fast-delivery',
  },
  {
    id: 'best-sellers',
    title: 'Best Sellers',
    icon: <Star className="w-6 h-6" />,
    link: '/top-sellers',
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    icon: <Sparkles className="w-6 h-6" />,
    link: '/clearance',
  },
  {
    id: 'clearance',
    title: 'Clearance',
    icon: <Tag className="w-6 h-6" />,
    link: '/clearance',
  },
];

const CategoryCardItem = ({ category }: { category: CategoryCard }) => {
  return (
    <Link
      to={category.link}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        category.featured 
          ? 'bg-gradient-hero text-white border-transparent' 
          : 'bg-card border-border hover:border-primary/20'
      }`}
    >
      {/* Icon */}
      <div className={`mb-3 p-3 rounded-xl transition-transform group-hover:scale-110 ${
        category.featured 
          ? 'bg-white/20' 
          : 'bg-primary/10 text-primary'
      }`}>
        {category.icon}
      </div>
      
      {/* Title */}
      <h3 className={`font-semibold text-sm md:text-base ${
        category.featured ? 'text-white' : 'text-foreground'
      }`}>
        {category.title}
      </h3>
      
      {/* Subtle arrow on hover */}
      <ChevronRight className={`w-4 h-4 mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1 ${
        category.featured ? 'text-white/80' : 'text-primary'
      }`} />
    </Link>
  );
};

const PromoBanners = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map((category) => (
          <CategoryCardItem key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;