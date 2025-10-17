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

// Load products from Google Sheets with category filtering
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
    count: products.filter(product => {
      const name = product.name.toLowerCase();
      const description = product.shortDescription.toLowerCase();
      const usagePoints = product.usagePoints?.join(' ').toLowerCase() || '';
      
      return filter.keywords.some(keyword => 
        name.includes(keyword) || 
        description.includes(keyword) || 
        usagePoints.includes(keyword)
      );
    }).length
  }));
};
