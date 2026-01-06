import axios from 'axios';
import type { Product, Filters } from '../types/product';

const BASE_URL = 'https://makeup-api.herokuapp.com/api/v1/products.json';

export const fetchProducts = async (filters: Filters = { brand: null, product_tags: [] }): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.brand) {
      params.append('brand', filters.brand);
    }
    if (filters.product_tags && filters.product_tags.length > 0) {
      filters.product_tags.forEach(tag => {
        params.append('product_tags', tag);
      });
    }
    
    const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;
    const response = await axios.get<Product[]>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const fetchBrands = async (): Promise<string[]> => {
  try {
    const response = await axios.get<Product[]>(BASE_URL);
    const brands = [...new Set(response.data.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Failed to fetch brands');
  }
};

export const fetchTags = async (): Promise<string[]> => {
  try {
    const response = await axios.get<Product[]>(BASE_URL);
    const tags = new Set<string>();
    response.data.forEach(product => {
      if (product.tag_list && Array.isArray(product.tag_list)) {
        product.tag_list.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw new Error('Failed to fetch tags');
  }
};