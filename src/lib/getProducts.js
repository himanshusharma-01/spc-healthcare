// /src/lib/getProducts.js

// IMPORTANT: PASTE THE WEB APP URL YOU COPIED FROM GOOGLE APPS SCRIPT HERE
// Make sure to deploy as "Anyone" for CORS to work
const API_URL = "https://script.google.com/macros/s/AKfycby0QnDhYUggQ1p6Au7pOsvqxKXf-C6ThCvD4oB08hpkVCoUukuUVHK0fKuC7_mOXH5u/exec"

export async function getProducts() {
  try {
    const res = await fetch(
      API_URL,
      // This automatically updates your site in the background every 60 seconds
      { next: { revalidate: 60 } } 
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products from Google Sheet: ${res.status} ${res.statusText}`);
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
    return data;
  } catch (error) {
    console.error('Error in getProducts:', error);
    
    // Return sample data for testing if API fails
    console.log('Using sample data for testing...');
    return [
      {
        id: "1",
        name: "Sample Product 1",
        slug: "sample-product-1",
        shortDescription: "This is a sample product for testing",
        longDescription: "<p>This is a detailed description of the sample product. It contains <strong>HTML formatting</strong> and can include multiple paragraphs.</p><p>This helps test the product display functionality.</p>",
        drugType: "OTC",
        imageUrls: ["https://via.placeholder.com/400x300?text=Product+1", "https://via.placeholder.com/400x300?text=Product+1+Alt"],
        usagePoints: ["Pain relief", "Anti-inflammatory", "Fever reduction"]
      },
      {
        id: "2", 
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
