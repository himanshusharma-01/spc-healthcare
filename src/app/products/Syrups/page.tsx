'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import './SyrupsPage.css';
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

// Keywords to identify syrup products
const syrupKeywords = ['syrup', 'liquid', 'oral solution', 'elixir', 'tonic'];

export default function SyrupsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useProductSearch();
  
  // Filter products that contain syrup-related keywords
  const filterSyrupProducts = useCallback((products: Product[]) => {
    return products.filter(product => {
      const category = product.category?.toLowerCase() || '';
      const name = product.name.toLowerCase();
      const description = product.shortDescription.toLowerCase();
      
      return syrupKeywords.some(keyword => 
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
        const syrupProducts = filterSyrupProducts(products);
        
        setAllProducts(syrupProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to empty array
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filterSyrupProducts]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }
    const query = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }, [allProducts, searchQuery]);


  return (
    <div className="l3-container syrups-page">
      {/* Hero Section */}
      <section className="syrups-hero">
        <div className="syrups-hero-background"></div>
        <div className="l3-container-inner">
          <div className="syrups-hero-content">
            <div className="syrups-hero-text">
              <h1 className="syrups-hero-title">
                <span className="l3-title-line">Syrups</span>
                <span className="l3-title-line">Liquid Health Solutions</span>
              </h1>
              <p className="syrups-hero-subtitle">
                High-quality liquid formulations designed for easy administration and effective treatment across various therapeutic areas.
              </p>
              <div className="syrups-hero-stats">
                <div className="syrups-stat">
                  <div className="syrups-stat-number">12+</div>
                  <div className="syrups-stat-label">Syrup Products</div>
                </div>
                <div className="syrups-stat">
                  <div className="syrups-stat-number">4</div>
                  <div className="syrups-stat-label">Categories</div>
                </div>
                <div className="syrups-stat">
                  <div className="syrups-stat-number">100%</div>
                  <div className="syrups-stat-label">Quality Assured</div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      {/* Product Categories */}
    
      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Syrup Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality liquid formulations.
            </p>
          </div>

         

          {/* Products Grid */}
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
