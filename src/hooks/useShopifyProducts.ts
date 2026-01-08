import { useState, useEffect, useRef } from 'react';
import { ShopifyProduct, fetchProducts } from '@/lib/shopify';

// Singleton cache to avoid duplicate API calls
let cachedProducts: ShopifyProduct[] | null = null;
let loadingPromise: Promise<ShopifyProduct[]> | null = null;

export const useShopifyProducts = (limit: number = 50) => {
  const [products, setProducts] = useState<ShopifyProduct[]>(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const loadProducts = async () => {
      // If we have cached products, use them
      if (cachedProducts) {
        setProducts(cachedProducts);
        setLoading(false);
        return;
      }

      // If already loading, wait for the existing promise
      if (loadingPromise) {
        try {
          const data = await loadingPromise;
          if (mounted.current) {
            setProducts(data);
            setLoading(false);
          }
        } catch (err) {
          if (mounted.current) {
            setError(err instanceof Error ? err.message : 'Failed to load products');
            setLoading(false);
          }
        }
        return;
      }

      // Start new fetch
      setLoading(true);
      loadingPromise = fetchProducts(limit);

      try {
        const data = await loadingPromise;
        cachedProducts = data;
        if (mounted.current) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted.current) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
          setLoading(false);
        }
      } finally {
        loadingPromise = null;
      }
    };

    loadProducts();

    return () => {
      mounted.current = false;
    };
  }, [limit]);

  return { products, loading, error };
};

// Helper to get featured products (first 6)
export const useFeaturedProducts = () => {
  const { products, loading, error } = useShopifyProducts(50);
  return {
    products: products.slice(0, 6),
    loading,
    error
  };
};

// Clear cache (useful for refresh)
export const clearProductCache = () => {
  cachedProducts = null;
  loadingPromise = null;
};
