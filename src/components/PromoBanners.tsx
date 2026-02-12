import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const banners = [
  { id: 'fast-delivery', title: 'Fast Delivery', subtitle: 'From $1.99', bg: 'bg-emerald-600', link: '/deals/fast-delivery' },
  { id: 'price-drop', title: 'Price Drop', subtitle: 'Limited time', bg: 'bg-amber-500', link: '/deals/price-drop' },
  { id: 'popular', title: 'Most Popular', subtitle: 'Trending now', bg: 'bg-rose-500', link: '/deals/popular' },
  { id: 'hot-deals', title: 'Hot Deals', subtitle: 'Up to 60% off', bg: 'bg-violet-600', link: '/deals/hot-deals' },
];

const PromoBanners = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {banners.map((b) => (
          <Link
            key={b.id}
            to={b.link}
            className={`${b.bg} rounded-xl p-5 sm:p-6 text-white group hover:scale-[1.02] transition-transform relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <p className="text-white/70 text-xs font-medium font-body uppercase tracking-wider">{b.subtitle}</p>
              <h3 className="text-xl sm:text-2xl font-bold mt-1">{b.title}</h3>
              <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold bg-black/20 px-3 py-1.5 rounded-full font-body group-hover:bg-black/30 transition-colors">
                Shop now <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PromoBanners;
