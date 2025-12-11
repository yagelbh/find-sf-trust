import ProductCard from './ProductCard';

const ProductGrid = () => {
  const products = [
    { id: 6, name: "Women's Summer Dress Floral Print", price: 18.99, originalPrice: 45.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop", rating: 4.5, reviews: 1234, discount: 59, stock: null },
    { id: 7, name: "USB-C Hub Adapter 7-in-1", price: 22.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop", rating: 4.7, reviews: 892, discount: 54, stock: null },
    { id: 8, name: "Yoga Mat Premium Non-Slip", price: 14.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop", rating: 4.6, reviews: 2103, discount: 63, stock: 7 },
    { id: 9, name: "Electric Kettle Fast Boil 1.7L", price: 19.99, originalPrice: 54.99, image: "https://images.unsplash.com/photo-1594213114663-d94db9b29928?w=300&h=300&fit=crop", rating: 4.8, reviews: 3421, discount: 64, stock: null },
    { id: 10, name: "Wireless Charging Pad 15W Fast", price: 11.99, originalPrice: 29.99, image: "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?w=300&h=300&fit=crop", rating: 4.4, reviews: 1567, discount: 60, stock: null },
    { id: 11, name: "Kids Backpack Waterproof School Bag", price: 16.99, originalPrice: 39.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop", rating: 4.5, reviews: 789, discount: 58, stock: null },
    { id: 12, name: "LED Desk Lamp Dimmable Touch", price: 24.99, originalPrice: 59.99, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop", rating: 4.7, reviews: 1432, discount: 58, stock: null },
    { id: 13, name: "Phone Case Clear Shockproof", price: 6.99, originalPrice: 15.99, image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=300&h=300&fit=crop", rating: 4.3, reviews: 5621, discount: 56, stock: null },
    { id: 14, name: "Resistance Bands Set of 5", price: 9.99, originalPrice: 24.99, image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop", rating: 4.6, reviews: 2341, discount: 60, stock: 4 },
    { id: 15, name: "Portable Blender USB Rechargeable", price: 21.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop", rating: 4.5, reviews: 1123, discount: 56, stock: null },
  ];

  const categories = [
    "All", "Electronics", "Fashion", "Home & Garden", "Beauty", "Sports", "Toys", "Automotive"
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Recommended For You
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-card border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
