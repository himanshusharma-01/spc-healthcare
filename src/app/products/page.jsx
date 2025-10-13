// /app/products/page.jsx
import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(p => (
          <div key={p.id} className="border rounded-lg shadow-lg overflow-hidden group">
            <div className="relative">
              {/* Use standard <img> tag and show the first image (imageUrls[0]) */}
              {p.imageUrls && p.imageUrls.length > 0 && (
                <img
                  src={p.imageUrls[0]}
                  alt={p.name}
                  className="w-full h-56 object-cover"
                />
              )}
              <span className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full text-white ${
                p.drugType === 'OTC' ? 'bg-green-500' : 'bg-blue-500'
              }`}>
                {p.drugType}
              </span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold mt-2 h-14">{p.name}</h2>
              <p className="text-gray-600 mt-2 h-12">{p.shortDescription}</p>
              <Link href={`/products/${p.slug}`} className="inline-block mt-4 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}