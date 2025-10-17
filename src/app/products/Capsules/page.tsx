'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './CapsulesPage.css';
import { loadCategoryProducts, Product } from '@/lib/productCategoryUtils';

export default function CapsulesPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const capsuleProducts = await loadCategoryProducts('capsules');
        setFilteredProducts(capsuleProducts);
      } catch (error) {
        console.error('Error loading capsule products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);



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
              <p>Loading our products...</p>
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
                    <div className="product-content">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-short">{product.shortDescription}</p>
                      <div className="product-actions">
                        <span className="l3-product-btn">View product details</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : !loading && (
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
