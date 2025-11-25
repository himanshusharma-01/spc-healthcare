'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import './OralDropsPage.css';
import { loadCategoryProducts, productMatchesQuery, type Product } from '@/lib/productCategoryUtils';

export default function OralDropsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useProductSearch();

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
        const dropsProducts = await loadCategoryProducts('drops');
        setAllProducts(dropsProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);



  return (
    <div className="l3-container oral-drops-page">
      <section className="oral-drops-hero" aria-label="Oral drops banner"></section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Oral Drops Products</h2>
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
                        <span className="product-icon">💧</span>
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
