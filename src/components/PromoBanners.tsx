import { Link } from 'react-router-dom';
import { Truck, Tag, Flame, Star, Sparkles, Clock, TrendingUp, Zap } from 'lucide-react';

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  icon: React.ReactNode;
  decorations?: React.ReactNode;
  link: string;
}

const banners: PromoBanner[] = [
  {
    id: 'fast-delivery',
    badge: '🚚 LOCAL WAREHOUSE',
    title: 'Fast Delivery',
    subtitle: 'FROM $1.99',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-600',
    textColor: 'text-white',
    icon: <Truck className="w-12 h-12 text-white/30 absolute bottom-4 left-4" />,
    link: '/deals/fast-delivery',
  },
  {
    id: 'price-drop',
    badge: '🏷️ SAVE UP TO $50',
    title: 'PRICE DROP',
    subtitle: 'Limited Time',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-500',
    textColor: 'text-white',
    icon: <Tag className="w-12 h-12 text-white/30 absolute bottom-4 right-4" />,
    link: '/deals/price-drop',
  },
  {
    id: 'popular',
    badge: null,
    title: 'POPULAR',
    subtitle: 'PRODUCTS',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-amber-600',
    textColor: 'text-white',
    icon: <Star className="w-10 h-10 text-yellow-300/50 absolute top-4 left-4" />,
    link: '/deals/popular',
  },
  {
    id: 'hot-deals',
    badge: 'SCORE',
    title: 'HOT DEALS',
    subtitle: '',
    gradientFrom: 'from-yellow-400',
    gradientTo: 'to-amber-500',
    textColor: 'text-rose-600',
    icon: <Flame className="w-14 h-14 text-orange-600/30 absolute bottom-2 right-2" />,
    link: '/deals/hot-deals',
  },
  {
    id: 'crazy-discounts',
    badge: null,
    title: 'CRAZY',
    subtitle: 'DISCOUNTS',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500',
    textColor: 'text-white',
    icon: <Sparkles className="w-10 h-10 text-yellow-300/50 absolute top-4 right-4" />,
    link: '/deals/crazy-discounts',
  },
];

const PromoBannerCard = ({ banner }: { banner: PromoBanner }) => {
  return (
    <Link
      to={banner.link}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banner.gradientFrom} ${banner.gradientTo} p-5 h-48 flex flex-col justify-between group hover:scale-[1.02] hover:shadow-xl transition-all duration-300`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl" />
        {/* Confetti/sparkle decorations */}
        <div className="absolute top-3 right-8 w-2 h-2 bg-yellow-300/60 rounded-full" />
        <div className="absolute top-10 right-4 w-1.5 h-1.5 bg-white/40 rounded-full" />
        <div className="absolute bottom-12 right-12 w-1 h-1 bg-white/50 rounded-full" />
      </div>

      {/* Icon */}
      {banner.icon}

      {/* Badge */}
      {banner.badge && (
        <div className="relative z-10">
          <span className={`inline-block ${banner.id === 'hot-deals' ? 'text-rose-500 text-sm font-bold' : 'bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full'}`}>
            {banner.badge}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mt-auto">
        <h3 className={`text-2xl md:text-3xl font-black ${banner.textColor} leading-none tracking-tight`}>
          {banner.title}
        </h3>
        {banner.subtitle && (
          <p className={`text-xl md:text-2xl font-black ${banner.textColor} leading-tight tracking-tight`}>
            {banner.subtitle}
          </p>
        )}

        <button className="mt-3 bg-gray-900 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
          SHOP NOW
          <span className="transition-transform group-hover:translate-x-1">▶</span>
        </button>
      </div>
    </Link>
  );
};

const PromoBanners = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {banners.map((banner) => (
          <PromoBannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
