'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './OralDropsPage.css';
import { loadCategoryProducts, generateFilterCounts, Product } from '@/lib/productCategoryUtils';

export default function OralDropsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const dropsProducts = await loadCategoryProducts('drops');
        setProducts(dropsProducts);
        setFilteredProducts(dropsProducts);
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
    { id: 'all', name: 'All Drops', keywords: [] },
    { id: 'vitamin', name: 'Vitamins', keywords: ['vitamin', 'vit', 'nutritional', 'supplement'] },
    { id: 'pediatric', name: 'Pediatric', keywords: ['pediatric', 'kids', 'baby', 'child'] },
    { id: 'digestive', name: 'Digestive', keywords: ['digestive', 'stomach', 'gut', 'digestion'] }
  ];

  const productFilters = generateFilterCounts(products, filterDefinitions);

  const dropsProducts = [
    {
      id: 1,
      name: 'VitaDrops',
      category: 'vitamin',
      type: 'Vitamin Drops',
      indication: 'Vitamin Deficiency',
      description: 'Concentrated vitamin drops for quick absorption and easy administration.',
      strength: '1ml per dose',
      packaging: '30ml Bottle',
      status: 'Available',
      features: ['High concentration', 'Quick absorption', 'Easy dosing', 'Tasty flavor'],
      image: '💧',
      productImage: '/api/placeholder/300/200?text=VitaDrops'
    },
    {
      id: 2,
      name: 'BabyCalm Drops',
      category: 'pediatric',
      type: 'Pediatric Sedative',
      indication: 'Colic, Restlessness',
      description: 'Gentle pediatric drops to soothe colicky babies and reduce restlessness.',
      strength: '0.5ml per dose',
      packaging: '15ml Bottle',
      status: 'Available',
      features: ['Pediatric safe', 'Natural ingredients', 'Fast acting', 'Easy to administer'],
      image: '👶',
      productImage: '/api/placeholder/300/200?text=BabyCalm+Drops'
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
    vitamin: { name: 'Vitamins', color: '#f59e0b' },
    pediatric: { name: 'Pediatric', color: '#8b5cf6' },
    digestive: { name: 'Digestive', color: '#10b981' }
  };

  return (
    <div className="l3-container oral-drops-page">
      <section className="oral-drops-hero">
        <div className="l3-container-inner">
          <div className="oral-drops-hero-content">
            <div className="oral-drops-hero-text">
              <h1 className="oral-drops-hero-title">
                <span className="l3-title-line">Oral Drops</span>
                <span className="l3-title-line">Precise Liquid Dosing</span>
              </h1>
              <p className="oral-drops-hero-subtitle">
                Concentrated liquid formulations for precise dosing and rapid absorption.
              </p>
            </div>
            <div className="oral-drops-hero-visual">
              <div className="oral-drops-visual-element">
                <div className="oral-drops-dropper">💧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Oral Drops Products</h2>
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
                        <span className="product-icon">💧</span>
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
              <p>No oral drops products match your current filter. Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
