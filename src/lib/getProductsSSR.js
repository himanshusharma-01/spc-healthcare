// Server-side version of getProducts for static generation
import { getProducts } from './getProducts.js';

// This function can be used in server components to pre-fetch data
export async function getProductsSSR() {
  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.error('Error in getProductsSSR:', error);
    return [];
  }
}

// Pre-filter products by category for better performance
export async function getProductsByCategory(category) {
  try {
    const allProducts = await getProducts();
    const keywords = {
      syrups: ['syrup', 'liquid', 'oral solution', 'elixir', 'tonic'],
      suspensions: ['suspension', 'oral suspension', 'powder', 'granules', 'reconstitute'],
      tablets: ['tablet', 'tab', 'oral tablet', 'coated', 'uncoated'],
      capsules: ['capsule', 'cap', 'gelatin', 'hard capsule', 'soft capsule'],
      drops: ['drops', 'oral drops', 'ear drops', 'eye drops', 'nasal drops']
    };

    const categoryKeywords = keywords[category] || [];
    
    return allProducts.filter(product => {
      const categoryField = product.category?.toLowerCase() || '';
      const name = product.name.toLowerCase();
      const description = product.shortDescription.toLowerCase();
      
      return categoryKeywords.some(keyword => 
        categoryField.includes(keyword) || 
        name.includes(keyword) || 
        description.includes(keyword)
      );
    });
  } catch (error) {
    console.error(`Error filtering products for category ${category}:`, error);
    return [];
  }
}
