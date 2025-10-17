// /src/lib/getProducts.js

// API URL - can be overridden with environment variable
const API_URL = process.env.GOOGLE_SHEETS_API_URL || 
  "https://script.google.com/macros/s/AKfycby0QnDhYUggQ1p6Au7pOsvqxKXf-C6ThCvD4oB08hpkVCoUukuUVHK0fKuC7_mOXH5u/exec"

// Cache for storing products data
let productsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getProducts() {
  // Check if we have valid cached data
  if (productsCache && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
    console.log('Using cached products data');
    return productsCache;
  }

  try {
    const res = await fetch(
      API_URL,
      // This automatically updates your site in the background every 60 seconds
      { next: { revalidate: 60 } } 
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    
    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON but got:', contentType);
      console.error('Response body:', text.substring(0, 500));
      throw new Error(`Expected JSON response but got ${contentType}. Check your Google Apps Script configuration.`);
    }
    
    const data = await res.json();
    
    // Ensure unique IDs by adding index if duplicates exist
    const processedData = data.map((product, index) => ({
      ...product,
      id: `${product.id}-${index}` // Make IDs unique
    }));
    
    // Cache the data
    productsCache = processedData;
    cacheTimestamp = Date.now();
    console.log('Products data cached with unique IDs');
    
    return processedData;
  } catch (error) {
    console.error('Error in getProducts:', error);
    
    // Return sample data for testing if API fails
    console.log('Using sample data for testing...');
    return [
      {
        id: "sample-1",
        name: "Sample Product 1",
        slug: "sample-product-1",
        shortDescription: "This is a sample product for testing",
        longDescription: "<p>This is a detailed description of the sample product. It contains <strong>HTML formatting</strong> and can include multiple paragraphs.</p><p>This helps test the product display functionality.</p>",
        drugType: "OTC",
        imageUrls: ["https://via.placeholder.com/400x300?text=Product+1", "https://via.placeholder.com/400x300?text=Product+1+Alt"],
        usagePoints: ["Pain relief", "Anti-inflammatory", "Fever reduction"]
      },
      {
        id: "sample-2", 
        name: "Sample Product 2",
        slug: "sample-product-2",
        shortDescription: "Another sample product for testing",
        longDescription: "<p>This is another detailed description. It shows how multiple products work in the system.</p>",
        drugType: "Prescription",
        imageUrls: ["https://via.placeholder.com/400x300?text=Product+2"],
        usagePoints: ["Prescription medication", "Doctor consultation required"]
      }
    ];
  }
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}
