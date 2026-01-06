export interface ProductColor {
  hex_value: string;
  colour_name: string;
}

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign: string | null;
  currency: string | null;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating: number | null;
  category: string | null;
  product_type: string;
  tag_list: string[];
  created_at: string;
  updated_at: string;
  product_api_url: string;
  api_featured_image: string;
  product_colors: ProductColor[];
}

export interface Filters {
  brand: string | null;
  product_tags: string[];
}

export interface TableProduct extends Product {
  key: string;
  isGroup?: boolean;
  groupName?: string;
  children?: TableProduct[];
}

export type GroupByType = 'product_type' | 'brand' | 'category' | null;