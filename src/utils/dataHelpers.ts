import type { Product, TableProduct, GroupByType } from '../types/product';

export const groupByField = (data: Product[], field: keyof Product): Record<string, Product[]> => {
  const grouped: Record<string, Product[]> = {};
  data.forEach(item => {
    const value = item[field];
    const key = value ? String(value) : 'Other';
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });
  return grouped;
};

export const transformToTableData = (products: Product[], groupBy: GroupByType = null): TableProduct[] => {
  if (!groupBy) {
    return products.map((product, index) => ({
      ...product,
      key: `${product.id}-${index}`
    }));
  }

  const grouped = groupByField(products, groupBy);
  const result: TableProduct[] = [];
  
  Object.entries(grouped).forEach(([groupName, items]) => {
    const groupRow: TableProduct = {
      id: 0,
      brand: '',
      name: '',
      price: '',
      price_sign: null,
      currency: null,
      image_link: '',
      product_link: '',
      website_link: '',
      description: '',
      rating: null,
      category: null,
      product_type: '',
      tag_list: [],
      created_at: '',
      updated_at: '',
      product_api_url: '',
      api_featured_image: '',
      product_colors: [],
      key: `group-${groupName}`,
      isGroup: true,
      groupName,
      children: items.map((item, index) => ({
        ...item,
        key: `${item.id}-${index}`
      }))
    };
    
    result.push(groupRow);
  });
  
  return result;
};