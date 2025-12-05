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
    const name = product.name.toLowerCase();
    const description = product.shortDescription.toLowerCase();
    
    // Direct category match first
    if (categoryField === category) {
      return true;
    }
    
    // Check if drugType field contains any of the category keywords
    // drugType can have multiple keywords separated by comma, space, or other delimiters
    const drugTypeKeywords = drugTypeField.split(/[,;|\s]+/).map(k => k.trim()).filter(k => k);
    
    // Check if any keyword from the category matches any keyword in drugType
    const matchesDrugType = keywords.some(keyword => 
      drugTypeKeywords.some(drugKeyword => 
        drugKeyword.includes(keyword) || keyword.includes(drugKeyword)
      )
    );
    
    if (matchesDrugType) {
      return true;
    }
    
    // Also check in other fields as fallback
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
