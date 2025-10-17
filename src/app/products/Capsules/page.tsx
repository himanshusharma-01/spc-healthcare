'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CapsulesPage.css';
import { loadCategoryProducts, generateFilterCounts, Product } from '@/lib/productCategoryUtils';

export default function CapsulesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const capsuleProducts = await loadCategoryProducts('capsules');
        setProducts(capsuleProducts);
        setFilteredProducts(capsuleProducts);
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

  const filterDefinitions = [
    { id: 'all', name: 'All Capsules', keywords: [] },
    { id: 'probiotic', name: 'Probiotics', keywords: ['probiotic', 'bacteria', 'gut', 'digestive'] },
    { id: 'vitamin', name: 'Vitamins', keywords: ['vitamin', 'vit', 'nutritional', 'supplement'] },
    { id: 'herbal', name: 'Herbal', keywords: ['herbal', 'natural', 'plant', 'botanical'] },
    { id: 'supplement', name: 'Supplements', keywords: ['supplement', 'nutritional', 'health', 'wellness'] }
  ];

  const productFilters = generateFilterCounts(products, filterDefinitions);

  const capsuleProducts = [
    {
      id: 1,
      name: 'GutHealth Pro',
      category: 'probiotic',
      type: 'Probiotic Capsule',
      indication: 'Digestive Health, Immunity',
      description: 'High-potency probiotic capsule with multiple beneficial bacteria strains for optimal gut health.',
      strength: '50 Billion CFU',
      packaging: '30 Capsules',
      status: 'Available',
      features: ['Multiple strains', 'High potency', 'Stomach acid resistant', 'Refrigerated storage'],
      image: '🦠',
      productImage: '/api/placeholder/300/200?text=GutHealth+Pro'
    },
    {
      id: 2,
      name: 'VitaMax Complete',
      category: 'vitamin',
      type: 'Multivitamin',
      indication: 'Nutritional Support',
      description: 'Comprehensive multivitamin capsule with essential vitamins and minerals for daily nutrition.',
      strength: '1 Capsule daily',
      packaging: '60 Capsules',
      status: 'Available',
      features: ['Complete nutrition', 'Easy absorption', 'Daily dose', 'High quality'],
      image: '💊',
      productImage: '/api/placeholder/300/200?text=VitaMax+Complete'
    }
  ];

  // Filter products based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      const filter = filterDefinitions.find(f => f.id === activeFilter);
      if (filter) {
        const filtered = products.filter(product => {
          const name = product.name.toLowerCase();
          const description = product.shortDescription.toLowerCase();
          const usagePoints = product.usagePoints?.join(' ').toLowerCase() || '';
          
          return filter.keywords.some(keyword => 
            name.includes(keyword) || 
            description.includes(keyword) || 
            usagePoints.includes(keyword)
          );
        });
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [activeFilter, products]);

  const productCategories = {
    probiotic: { name: 'Probiotics', color: '#10b981' },
    vitamin: { name: 'Vitamins', color: '#f59e0b' },
    herbal: { name: 'Herbal', color: '#8b5cf6' },
    supplement: { name: 'Supplements', color: '#06b6d4' }
  };

  return (
    <div className="l3-container capsules-page">
      <section className="capsules-hero">
        <div className="l3-container-inner">
          <div className="capsules-hero-content">
            <div className="capsules-hero-text">
              <h1 className="capsules-hero-title">
                <span className="l3-title-line">Capsules</span>
                <span className="l3-title-line">Encapsulated Excellence</span>
              </h1>
              <p className="capsules-hero-subtitle">
                Precision-encapsulated formulations for optimal bioavailability and targeted delivery.
              </p>
            </div>
            <div className="capsules-hero-visual">
              <div className="capsules-visual-element">
                <div className="capsules-pill">💊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Capsule Products</h2>
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
              <p>No capsule products match your current filter. Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
