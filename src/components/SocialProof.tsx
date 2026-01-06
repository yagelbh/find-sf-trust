import { Star, Users, TrendingUp } from 'lucide-react';

const SocialProof = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
          {/* Trusted by */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">50,000+</p>
              <p className="text-sm text-muted-foreground">Happy customers</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-border" />

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-accent/10">
              <Star className="w-5 h-5 text-accent fill-accent" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-lg md:text-xl font-bold text-foreground">4.8</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-border" />

          {/* Trending */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-lg md:text-xl font-bold text-foreground">1,200+</p>
              <p className="text-sm text-muted-foreground">Products trending now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;