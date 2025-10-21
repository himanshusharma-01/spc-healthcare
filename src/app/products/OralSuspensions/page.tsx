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

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const suspensionProducts = filterSuspensionProducts(allProducts);
        
        setFilteredProducts(suspensionProducts);
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
    <div className="l3-container oral-suspensions-page" id="oral-suspensions-page">
      <section className="oral-suspensions-hero" id="oral-suspensions-hero">
        <div className="l3-container-inner">
          <div className="oral-suspensions-hero-content" id="oral-suspensions-hero-content">
            <div className="oral-suspensions-hero-text" id="oral-suspensions-hero-text">
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

      <section className="products-section" id="oral-suspensions-products">
        <div className="l3-container-inner">
          <div className="section-header" id="oral-suspensions-header">
            <h2 className="l3-section-title">Our Oral Suspension Products</h2>
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
