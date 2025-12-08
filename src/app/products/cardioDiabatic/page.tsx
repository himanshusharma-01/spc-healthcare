'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import './cardiodiabetic.css';
import { loadCategoryProducts, productMatchesQuery, type Product } from '@/lib/productCategoryUtils';

export default function CardioDiabeticPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useProductSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }
    return allProducts.filter(product =>
      productMatchesQuery(product, searchQuery)
    );
  }, [allProducts, searchQuery]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const cardioDiabeticProducts = await loadCategoryProducts('cardiodiabetic');
        setAllProducts(cardioDiabeticProducts);
      } catch (error) {
        console.error('Error loading cardio diabetic products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="l3-container cardiodiabetic-page">
      {/* Hero Section */}
      <section className="cardiodiabetic-hero" aria-label="Cardio Diabetic hero banner">
        <div className="cardiodiabetic-hero-background" role="presentation"></div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Cardio Diabetic Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality cardiovascular and diabetic formulations.
            </p>
          </div>

          {/* Search Box */}
          <div className="category-search-container">
            <div className="category-search-box">
              <i className="fas fa-search category-search-icon"></i>
              <input
                type="text"
                placeholder="Search cardio diabetic products by name, description, or usage..."
                value={localSearchQuery}
                onChange={(e) => {
                  setLocalSearchQuery(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                }}
                className="category-search-input"
              />
              {localSearchQuery && (
                <button
                  className="category-search-clear-btn"
                  onClick={() => {
                    setLocalSearchQuery('');
                    setSearchQuery('');
                  }}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
              <button
                className="category-search-btn"
                onClick={() => {
                  setSearchQuery(localSearchQuery);
                  const input = document.querySelector('.category-search-input') as HTMLInputElement;
                  if (input) {
                    input.focus();
                    input.blur();
                  }
                }}
                aria-label="Search products"
              >
                <i className="fas fa-search"></i>
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading our products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="products-grid">
                {filteredProducts.map((product, index) => (
                  <Link prefetch key={`${product.id}-${index}`} href={`/products/${product.slug}`} className="product-card-link">
                    <div className="product-card">
                      <div className="product-image-container square">
                        {product.imageUrls && product.imageUrls.length > 0 ? (
                          <Image 
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="product-image"
                            width={300}
                            height={300}
                            style={{ objectFit: 'cover' }}
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
              
              {/* Action Button Section */}
              <div className="products-action-section">
                <button
                  className="products-action-btn"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      const searchInput = document.querySelector('.category-search-input') as HTMLInputElement;
                      if (searchInput) {
                        searchInput.focus();
                      }
                    }, 500);
                  }}
                >
                  <i className="fas fa-search"></i>
                  <span>Search More Products</span>
                </button>
              </div>
            </>
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





