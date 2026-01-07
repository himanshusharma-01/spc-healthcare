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
  drops: ['drops', 'oral drops', 'ear drops', 'eye drops', 'nasal drops', 'drops', 'oral drops'],
  orthopedic: ['orthopedic', 'orthopaedic', 'bone', 'joint', 'musculoskeletal', 'fracture', 'arthritis', 'osteoporosis', 'ortho'],
  gynae: ['gynae', 'gynecology', 'gynaecology', 'gynecological', 'gynaecological', 'women', 'female', 'reproductive', 'menstrual', 'pregnancy', 'fertility', 'hormone', 'estrogen', 'progesterone'],
  gastro: ['gastro', 'gastroenterology', 'gastroenterological', 'stomach', 'digestive', 'intestinal', 'gut', 'acid', 'ulcer', 'gastritis', 'indigestion', 'antacid', 'peptic', 'gerd', 'reflux'],
  derma: ['derma', 'dermatology', 'dermatological', 'skin', 'topical', 'cream', 'ointment', 'lotion', 'gel', 'dermatitis', 'eczema', 'psoriasis', 'acne', 'fungal', 'rash', 'allergy'],
  antibiotic: ['antibiotic', 'antibiotics', 'anti-biotic', 'anti-bacterial', 'antibacterial', 'antimicrobial', 'bacterial', 'infection', 'bactericidal', 'bacteriostatic', 'amoxicillin', 'penicillin', 'cephalosporin', 'macrolide', 'quinolone'],
  analgesic: ['analgesic', 'analgesics', 'pain', 'painkiller', 'pain relief', 'pain management', 'antipyretic', 'fever', 'paracetamol', 'acetaminophen', 'ibuprofen', 'aspirin', 'naproxen', 'diclofenac', 'morphine', 'opioid', 'non-opioid'],
  cardiodiabetic: ['cardiodiabetic', 'cardio diabetic', 'cardiovascular', 'cardiac', 'heart', 'diabetes', 'diabetic', 'diabetes mellitus', 'blood sugar', 'glucose', 'insulin', 'hypertension', 'blood pressure', 'cholesterol', 'lipid', 'statin', 'ace inhibitor', 'beta blocker', 'antidiabetic', 'metformin', 'sulfonylurea'],
  anticold: ['anticold', 'anti cold', 'anti-cold', 'cold', 'cough', 'cough syrup', 'decongestant', 'expectorant', 'antitussive', 'nasal', 'sinus', 'congestion', 'sore throat', 'phlegm', 'mucus', 'respiratory', 'bronchial', 'flu', 'influenza', 'rhinitis', 'allergic rhinitis'],
  neuro: ['neuro', 'neurology', 'neurological', 'neurological disorder', 'brain', 'nervous system', 'cns', 'central nervous system', 'epilepsy', 'seizure', 'migraine', 'headache', 'parkinson', 'alzheimer', 'dementia', 'anxiety', 'depression', 'antidepressant', 'anticonvulsant', 'antiepileptic', 'antipsychotic', 'neuropathic', 'neuralgia'],
  pediatric: ['pediatric', 'paediatric', 'pediatrics', 'paediatrics', 'child', 'children', 'infant', 'baby', 'toddler', 'kids', 'pediatrician', 'paediatrician', 'pediatric medicine', 'child health', 'pediatric formulation', 'pediatric dosage', 'pediatric care', 'neonatal', 'newborn', 'adolescent', 'juvenile']
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
    const drugTypeField = product.drugType?.toLowerCase() || '';
    
    // Direct category match first
    if (categoryField === category) {
      return true;
    }
    
    // ONLY check drugType field - don't check name or description
    // drugType can have multiple keywords separated by comma, space, or other delimiters
    const drugTypeKeywords = drugTypeField.split(/[,;|\s]+/).map(k => k.trim()).filter(k => k);
    
    // Check if any keyword from the category matches any keyword in drugType
    const matchesDrugType = keywords.some(keyword => 
      drugTypeKeywords.some(drugKeyword => 
        drugKeyword.includes(keyword) || keyword.includes(drugKeyword)
      )
    );
    
    return matchesDrugType;
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

// Extract subcategories from drugType field for a given therapeutic category
export interface Subcategory {
  id: string;
  name: string;
  keywords: string[];
}

export const extractSubcategories = (products: Product[], mainCategory: string): Subcategory[] => {
  const mainCategoryLower = mainCategory.toLowerCase();
  
  // Normalize main category (handle pediatric/pediatrics and derma/skin)
  let normalizedMainCategory: string[];
  if (mainCategoryLower === 'pediatric') {
    normalizedMainCategory = ['pediatric', 'pediatrics'];
  } else if (mainCategoryLower === 'derma') {
    normalizedMainCategory = ['derma', 'skin', 'dermatology', 'dermatological'];
  } else {
    normalizedMainCategory = [mainCategoryLower];
  }
  
  // Map to store subcategories and their product counts
  const subcategoryMap = new Map<string, number>();
  
  // First, filter products that belong to main category
  const mainCategoryProducts = products.filter(product => {
    const drugType = (product.drugType || '').toLowerCase();
    const keywords = drugType.split(/[,;|\s]+/).map(k => k.trim().toLowerCase()).filter(k => k);
    
    // Check if product contains main category keyword
    return keywords.some(k => 
      normalizedMainCategory.some(mc => k === mc || k.includes(mc) || mc.includes(k))
    );
  });
  
  // Count products for "All Products"
  subcategoryMap.set('all', mainCategoryProducts.length);
  
  // Find subcategories by checking other keywords in drugType
  mainCategoryProducts.forEach(product => {
    const drugType = (product.drugType || '').toLowerCase();
    const keywords = drugType.split(/[,;|\s]+/).map(k => k.trim().toLowerCase()).filter(k => k);
    
    // Find other categories in the drugType (subcategories)
    const otherCategories = keywords.filter(k => {
      const kLower = k.toLowerCase();
      // Exclude the main category variants and common words
      const isMainCategory = normalizedMainCategory.some(mc => 
        kLower === mc || kLower.includes(mc) || mc.includes(kLower)
      );
      return !isMainCategory && 
             kLower !== 'general' && 
             kLower !== 'products' &&
             kLower !== 'n/a' &&
             kLower.length > 2;
    });
    
    // Create subcategory key
    if (otherCategories.length > 0) {
      const subcategoryKey = otherCategories.sort().join('; ');
      subcategoryMap.set(subcategoryKey, (subcategoryMap.get(subcategoryKey) || 0) + 1);
    }
  });
  
  // Convert to Subcategory array, only include subcategories with products
  const subcategories: Subcategory[] = [];
  
  // Add "All Products" first if there are products
  if (subcategoryMap.get('all')! > 0) {
    subcategories.push({
      id: 'all',
      name: 'All Products',
      keywords: []
    });
  }
  
  // Add other subcategories that have products
  Array.from(subcategoryMap.entries())
    .filter(([key, count]) => key !== 'all' && count > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key]) => {
      // Format name: capitalize first letter of each word
      const nameParts = key.split(';').map(part => {
        const trimmed = part.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      });
      const displayName = nameParts.join(' + ');
      
      subcategories.push({
        id: key,
        name: displayName,
        keywords: key.split(';').map(k => k.trim())
      });
    });
  
  return subcategories;
};

// Filter products by subcategory
export const filterProductsBySubcategory = (
  products: Product[],
  mainCategory: string,
  subcategoryId: string
): Product[] => {
  const mainCategoryLower = mainCategory.toLowerCase();
  // Normalize main category (handle pediatric/pediatrics and derma/skin)
  let normalizedMainCategory: string[];
  if (mainCategoryLower === 'pediatric') {
    normalizedMainCategory = ['pediatric', 'pediatrics'];
  } else if (mainCategoryLower === 'derma') {
    normalizedMainCategory = ['derma', 'skin', 'dermatology', 'dermatological'];
  } else {
    normalizedMainCategory = [mainCategoryLower];
  }
  
  // First filter by main category - products must contain main category keyword
  let filtered = products.filter(product => {
    const drugType = (product.drugType || '').toLowerCase();
    const keywords = drugType.split(/[,;|\s]+/).map(k => k.trim().toLowerCase()).filter(k => k);
    
    // Must contain main category keyword
    return keywords.some(k => 
      normalizedMainCategory.some(mc => k === mc || k.includes(mc) || mc.includes(k))
    );
  });
  
  // If "all", return all products with main category
  if (subcategoryId === 'all') {
    return filtered;
  }
  
  // Filter by subcategory keywords - product must contain ALL subcategory keywords
  const subcategoryKeywords = subcategoryId.split(';').map(k => k.trim().toLowerCase());
  
  return filtered.filter(product => {
    const drugType = (product.drugType || '').toLowerCase();
    const keywords = drugType.split(/[,;|\s]+/).map(k => k.trim().toLowerCase()).filter(k => k);
    
    // Check if ALL subcategory keywords are present in drugType
    return subcategoryKeywords.every(subKeyword => 
      keywords.some(k => k === subKeyword || k.includes(subKeyword) || subKeyword.includes(k))
    );
  });
};