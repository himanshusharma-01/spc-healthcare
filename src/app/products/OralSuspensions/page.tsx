'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './OralSuspensionsPage.css';
import { getProducts } from '@/lib/getProducts';

interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  drugType: string;
  imageUrls: string[];
  usagePoints: string[];
  category?: string;
}

export default function OralSuspensionsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Keywords to identify oral suspension products
  const suspensionKeywords = ['suspension', 'oral suspension', 'powder', 'granules', 'reconstitute'];
  
  // Filter products that contain suspension-related keywords
  const filterSuspensionProducts = (products: Product[]) => {
    return products.filter(product => {
      const category = product.category?.toLowerCase() || '';
      const name = product.name.toLowerCase();
      const description = product.shortDescription.toLowerCase();
      
      return suspensionKeywords.some(keyword => 
        category.includes(keyword) || 
        name.includes(keyword) || 
        description.includes(keyword)
      );
    });
  };

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const suspensionProducts = filterSuspensionProducts(allProducts);
        
        setProducts(suspensionProducts);
        setFilteredProducts(suspensionProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productFilters = [
    { id: 'all', name: 'All Suspensions', count: products.length },
    { id: 'antibiotic', name: 'Antibiotics', count: products.filter(p => 
      p.name.toLowerCase().includes('antibiotic') || 
      p.shortDescription.toLowerCase().includes('antibiotic') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('antibiotic'))
    ).length },
    { id: 'pediatric', name: 'Pediatric', count: products.filter(p => 
      p.name.toLowerCase().includes('kids') || 
      p.name.toLowerCase().includes('baby') ||
      p.shortDescription.toLowerCase().includes('pediatric') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('pediatric'))
    ).length },
    { id: 'antacid', name: 'Antacids', count: products.filter(p => 
      p.name.toLowerCase().includes('antacid') || 
      p.shortDescription.toLowerCase().includes('antacid') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('antacid'))
    ).length }
  ];

  const suspensionProducts = [
    {
      id: 1,
      name: 'AmoxiSusp',
      category: 'antibiotic',
      type: 'Antibiotic Suspension',
      indication: 'Bacterial Infections',
      description: 'Broad-spectrum antibiotic suspension for treatment of various bacterial infections.',
      strength: '250mg/5ml',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Broad spectrum', 'Pediatric safe', 'Easy administration', 'Stable suspension'],
      image: '🦠',
      productImage: '/api/placeholder/300/200?text=AmoxiSusp'
    },
    {
      id: 2,
      name: 'KidsCalm Suspension',
      category: 'pediatric',
      type: 'Pediatric Sedative',
      indication: 'Restlessness, Sleep',
      description: 'Gentle pediatric suspension to help children sleep better and reduce restlessness.',
      strength: '2.5ml per dose',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Pediatric tested', 'Natural herbs', 'Safe dosage', 'Sweet taste'],
      image: '👶',
      productImage: '/api/placeholder/300/200?text=KidsCalm+Suspension'
    }
  ];

  // Filter products based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => {
        const name = product.name.toLowerCase();
        const description = product.shortDescription.toLowerCase();
        const usagePoints = product.usagePoints?.join(' ').toLowerCase() || '';
        
        switch (activeFilter) {
          case 'antibiotic':
            return name.includes('antibiotic') || description.includes('antibiotic') || usagePoints.includes('antibiotic');
          case 'pediatric':
            return name.includes('kids') || name.includes('baby') || description.includes('pediatric') || usagePoints.includes('pediatric');
          case 'antacid':
            return name.includes('antacid') || description.includes('antacid') || usagePoints.includes('antacid');
          default:
            return true;
        }
      });
      setFilteredProducts(filtered);
    }
  }, [activeFilter, products]);

  const productCategories = {
    antibiotic: { name: 'Antibiotics', color: '#ef4444' },
    pediatric: { name: 'Pediatric', color: '#8b5cf6' },
    antacid: { name: 'Antacids', color: '#f59e0b' }
  };

  return (
    <div className="l3-container oral-suspensions-page">
      <section className="oral-suspensions-hero">
        <div className="l3-container-inner">
          <div className="oral-suspensions-hero-content">
            <div className="oral-suspensions-hero-text">
              <h1 className="oral-suspensions-hero-title">
                <span className="l3-title-line">Oral Suspensions</span>
                <span className="l3-title-line">Liquid Precision</span>
              </h1>
              <p className="oral-suspensions-hero-subtitle">
                Stable liquid suspensions for precise dosing and easy administration across all age groups.
              </p>
            </div>
            <div className="oral-suspensions-hero-visual">
              <div className="oral-suspensions-visual-element">
                <div className="oral-suspensions-bottle">🧴</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Oral Suspension Products</h2>
            <h3 className="l3-section-subtitle">Discover our range of high-quality liquid formulations.</h3>
          </div>

       

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products from Google Sheets...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <Link prefetch key={`${product.id}-${index}`} href={`/products/${product.slug}`} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image-container square">
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        <img 
                          src={product.imageUrls[0]}
                          alt={product.name}
                          className="product-image"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = 'flex';
                            }
                          }}
                        />
                      ) : null}
                      <div className="product-image-fallback" style={{ display: product.imageUrls && product.imageUrls.length > 0 ? 'none' : 'flex' }}>
                        <span className="product-icon">💊</span>
                      </div>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-short">{product.shortDescription}</p>
                    <div className="product-actions">
                      <span className="l3-btn l3-btn-primary">View product details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>No oral suspension products match your current filter. Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
