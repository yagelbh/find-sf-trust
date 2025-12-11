import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  return (
    <div className="relative">
      <Link to="/flash-deals" className="block">
        <div className="h-[120px] md:h-[180px] bg-[#c41e3a] relative overflow-hidden cursor-pointer group">
          {/* Scattered product images - left side */}
          <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center">
            {/* Gift box with headphones */}
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-orange-400 rounded-lg rotate-12 shadow-lg flex items-center justify-center overflow-hidden">
                <span className="text-3xl md:text-4xl">🎧</span>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-pink-500 text-xl">🎀</div>
            </div>
            {/* Colorful gift boxes */}
            <div className="absolute left-[25%] top-[20%] w-10 h-10 md:w-14 md:h-14 bg-lime-400 rounded rotate-6 shadow-lg flex items-center justify-center">
              <span className="text-lg md:text-2xl">🎁</span>
            </div>
            <div className="absolute left-[15%] bottom-[15%] w-12 h-12 md:w-16 md:h-16 bg-purple-500 rounded -rotate-6 shadow-lg flex items-center justify-center">
              <span className="text-xl md:text-3xl">📦</span>
            </div>
          </div>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-lg group-hover:scale-105 transition-transform">
              Shop holiday gift guides
            </h2>
          </div>

          {/* Scattered product images - right side */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center">
            {/* Green gift box with sweater */}
            <div className="absolute right-[20%] top-1/2 -translate-y-1/2">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-emerald-600 rounded-lg -rotate-3 shadow-lg flex items-center justify-center overflow-hidden">
                <span className="text-4xl md:text-5xl">👕</span>
              </div>
              <div className="absolute -top-1 -right-1 text-pink-500 text-lg">🎀</div>
            </div>
            {/* Watch */}
            <div className="absolute right-[5%] top-[20%] w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-lg rotate-12 shadow-lg flex items-center justify-center">
              <span className="text-2xl md:text-3xl">⌚</span>
            </div>
            {/* Cosmetics */}
            <div className="absolute right-[35%] bottom-[10%] w-8 h-16 md:w-10 md:h-20 bg-pink-400 rounded-full rotate-45 shadow-lg" />
            <div className="absolute right-[8%] bottom-[15%] w-10 h-10 md:w-14 md:h-14 bg-red-500 rounded shadow-lg flex items-center justify-center">
              <span className="text-xl md:text-2xl">💄</span>
            </div>
          </div>

          {/* Navigation arrows */}
          <button className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20">
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center transition-colors z-20">
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default HeroCarousel;
