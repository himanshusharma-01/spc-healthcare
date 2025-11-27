// Utility functions for product category filtering
import { getProducts } from './getProducts';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  drugType: string;
  imageUrls: string[];
  usagePoints: string[];
  category?: string;
  keyBenefits?: string[];
  productDetails?: string;
}

export interface CategoryKeywords {
  [key: string]: string[];
}

// Define keywords for each product category
export const categoryKeywords: CategoryKeywords = {
  syrups: ['syrup', 'liquid', 'oral solution', 'elixir', 'tonic', 'syrups'],
  suspensions: ['suspension', 'oral suspension', 'powder', 'granules', 'reconstitute', 'suspensions', 'oral suspensions'],
  tablets: ['tablet', 'tab', 'oral tablet', 'coated', 'uncoated', 'tablets'],
  capsules: ['capsule', 'cap', 'gelatin', 'hard capsule', 'soft capsule', 'capsules'],
  drops: ['drops', 'oral drops', 'ear drops', 'eye drops', 'nasal drops', 'drops', 'oral drops']
};

// Filter products based on category keywords
const sanitizeText = (value?: string) => {
  if (!value) return '';
  return value.replace(/<[^>]+>/g, ' ').toLowerCase();
};

const getSearchableSegments = (product: Product): string[] => [
  product.name,
  product.shortDescription,
  product.longDescription,
  product.drugType,
  product.category || '',
  product.productDetails || '',
  (product.usagePoints || []).join(' '),
  (product.keyBenefits || []).join(' ')
];

export const productMatchesQuery = (product: Product, query: string): boolean => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return getSearchableSegments(product).some(segment => 
    segment ? sanitizeText(segment).includes(normalizedQuery) : false
  );
};

export const filterProductsByCategory = (products: Product[], category: string): Product[] => {
  const keywords = categoryKeywords[category] || [];
  
  const filtered = products.filter(product => {
    const categoryField = product.category?.toLowerCase() || '';
    const name = product.name.toLowerCase();
    const description = product.shortDescription.toLowerCase();
    
    // Direct category match first
    if (categoryField === category) {
      return true;
    }
    
    // Then check keywords
    return keywords.some(keyword => 
      categoryField.includes(keyword) || 
      name.includes(keyword) || 
      description.includes(keyword)
    );
  });
  
  return filtered;
};

// Load products with category filtering
export const loadCategoryProducts = async (category: string): Promise<Product[]> => {
  try {
    const allProducts = await getProducts();
    return filterProductsByCategory(allProducts, category);
  } catch (error) {
    console.error(`Error loading ${category} products:`, error);
    return [];
  }
};

// Generate filter counts for category pages
export const generateFilterCounts = (
  products: Product[],
  filters: { id: string; name?: string; keywords: string[] }[]
) => {
  return filters.map(filter => ({
    ...filter,
    count: products.filter(product =>
      filter.keywords.some(keyword => productMatchesQuery(product, keyword))
    ).length
  }));
};
