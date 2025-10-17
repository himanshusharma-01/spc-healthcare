// Dynamic product details page
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug } from '@/lib/getProducts';
import type { Product as SPCProduct } from '@/lib/productCategoryUtils';
import ProductDetails from './ProductDetails';

// Generate static params for all products
export async function generateStaticParams() {
  const products = (await getProducts()) as SPCProduct[];
  return products.map((product: SPCProduct) => ({
    slug: product.slug,
  }));
}

// Ensure product pages are statically generated and cached
export const dynamic = 'force-static';
export const revalidate = 300; // seconds

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
