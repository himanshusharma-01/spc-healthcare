'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import './OralSuspensionsPage.css';
import { getProducts } from '@/lib/getProducts';
import { productMatchesQuery, type Product as SPCProduct } from '@/lib/productCategoryUtils';

// Keywords to identify oral suspension products
const suspensionKeywords = ['suspension', 'oral suspension', 'powder', 'granules', 'reconstitute'];

export default function OralSuspensionsPage() {
  const [allProducts, setAllProducts] = useState<SPCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, setSearchQuery } = useProductSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  // Sync localSearchQuery with persisted searchQuery from context
  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);
  
  // Filter products that contain suspension-related keywords
  const filterSuspensionProducts = useCallback((products: SPCProduct[]) => {
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
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        const suspensionProducts = filterSuspensionProducts(products);
        
        setAllProducts(suspensionProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filterSuspensionProducts]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }
    return allProducts.filter(product =>
      productMatchesQuery(product, searchQuery)
    );
  }, [allProducts, searchQuery]);



  return (
    <div className="l3-container oral-suspensions-page" id="oral-suspensions-page">
      <section className="oral-suspensions-hero" id="oral-suspensions-hero" aria-label="Oral Suspensions hero banner">
        <div className="oral-suspensions-hero-background" role="presentation"></div>
      </section>

      <section className="products-section" id="oral-suspensions-products">
        <div className="l3-container-inner">
          <div className="section-header" id="oral-suspensions-header">
            <h2 className="l3-section-title">Our Oral Suspension Products</h2>
            <h3 className="l3-section-subtitle">Discover our range of high-quality liquid formulations.</h3>
          </div>

          {/* Search Box */}
          <div className="category-search-container">
            <div className="category-search-box">
              <i className="fas fa-search category-search-icon"></i>
              <input
                type="text"
                placeholder="Search oral suspensions by name, description, or usage..."
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
