import { useState, useEffect } from 'react';
import { fetchProducts, fetchBrands, fetchTags } from '../services/api';
import type { Product, Filters } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  brands: string[];
  tags: string[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    brand: null,
    product_tags: []
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [brandsData, tagsData] = await Promise.all([
          fetchBrands(),
          fetchTags()
        ]);
        setBrands(brandsData);
        setTags(tagsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  return {
    products,
    brands,
    tags,
    loading,
    error,
    filters,
    setFilters
  };
};