// /app/products/[slug]/page.jsx
import Link from "next/link";
import { getProducts, getProductBySlug } from "@/lib/getProducts";
import ProductDisplay from "@/app/components/ProductDisplay"; // Import the interactive component

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            href="/products" 
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      {/* Back to Products Button */}
      <div className="mb-8">
        <Link 
          href="/products" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Products
        </Link>
      </div>

      {/* Product Display */}
      <ProductDisplay product={product} />
    </main>
  );
}
