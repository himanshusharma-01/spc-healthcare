// Optimized version with Server-Side Rendering (no loading states)
import React from 'react';
import './SyrupsPage.css';
import { getProductsByCategory } from '@/lib/getProductsSSR';
import SyrupsClient from './SyrupsClient';

export default async function SyrupsPage() {
  // Fetch data on the server (no loading state needed)
  const products = await getProductsByCategory('syrups');
  
  return <SyrupsClient initialProducts={products} />;
}
