'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './TabletsPage.css';
import { loadCategoryProducts, Product } from '@/lib/productCategoryUtils';

export default function TabletsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const tabletProducts = await loadCategoryProducts('tablets');
        setFilteredProducts(tabletProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);



  return (
    <div className="l3-container tablets-page">
      {/* Hero Section */}
      <section className="tablets-hero">
        <div className="l3-container-inner">
          <div className="tablets-hero-content">
            <div className="tablets-hero-text">
              <h1 className="tablets-hero-title">
                <span className="l3-title-line">Tablets</span>
                <span className="l3-title-line">Solid Dosage Forms</span>
              </h1>
              <p className="tablets-hero-subtitle">
                High-quality tablet formulations designed for precise dosing and effective treatment across multiple therapeutic areas.
              </p>
              <div className="tablets-hero-stats">
                <div className="tablets-stat">
                  <div className="tablets-stat-number">25+</div>
                  <div className="tablets-stat-label">Tablet Products</div>
                </div>
                <div className="tablets-stat">
                  <div className="tablets-stat-number">6</div>
                  <div className="tablets-stat-label">Categories</div>
                </div>
                <div className="tablets-stat">
                  <div className="tablets-stat-number">100%</div>
                  <div className="tablets-stat-label">Quality Assured</div>
                </div>
              </div>
            </div>
            <div className="tablets-hero-visual">
              <div className="tablets-visual-element">
                <div className="tablets-pill">💊</div>
                <div className="tablets-bottle">🧴</div>
                <div className="tablets-capsule">💉</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Tablet Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality tablet formulations.
            </p>
          </div>

     

          {/* Products Grid */}
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
              <p>No tablet products match your current filter. Try selecting a different category.</p>
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="no-products-message">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try selecting a different category or browse all products.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
