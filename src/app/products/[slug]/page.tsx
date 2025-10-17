// Dynamic product details page
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/getProducts';
import ProductDetails from './ProductDetails';

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Ensure product pages are statically generated and cached
export const dynamic = 'force-static';
export const revalidate = 300; // seconds

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - SPC Healthcare`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.imageUrls || [],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
