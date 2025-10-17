'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function SyrupsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Keywords to identify syrup products
  const syrupKeywords = ['syrup', 'liquid', 'oral solution', 'elixir', 'tonic'];
  
  // Filter products that contain syrup-related keywords
  const filterSyrupProducts = (products: Product[]) => {
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
  };

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getProducts();
        const syrupProducts = filterSyrupProducts(allProducts);
        
        setProducts(syrupProducts);
        setFilteredProducts(syrupProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to sample data
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const productFilters = [
    { id: 'all', name: 'All Syrups', count: products.length },
    { id: 'cough', name: 'Cough & Cold', count: products.filter(p => 
      p.name.toLowerCase().includes('cough') || 
      p.shortDescription.toLowerCase().includes('cough') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('cough'))
    ).length },
    { id: 'digestive', name: 'Digestive', count: products.filter(p => 
      p.name.toLowerCase().includes('digest') || 
      p.shortDescription.toLowerCase().includes('digest') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('digest'))
    ).length },
    { id: 'vitamin', name: 'Vitamins', count: products.filter(p => 
      p.name.toLowerCase().includes('vitamin') || 
      p.shortDescription.toLowerCase().includes('vitamin') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('vitamin'))
    ).length },
    { id: 'pediatric', name: 'Pediatric', count: products.filter(p => 
      p.name.toLowerCase().includes('kids') || 
      p.name.toLowerCase().includes('baby') ||
      p.shortDescription.toLowerCase().includes('pediatric') ||
      p.usagePoints?.some(point => point.toLowerCase().includes('pediatric'))
    ).length }
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
          case 'cough':
            return name.includes('cough') || description.includes('cough') || usagePoints.includes('cough');
          case 'digestive':
            return name.includes('digest') || description.includes('digest') || usagePoints.includes('digest');
          case 'vitamin':
            return name.includes('vitamin') || description.includes('vitamin') || usagePoints.includes('vitamin');
          case 'pediatric':
            return name.includes('kids') || name.includes('baby') || description.includes('pediatric') || usagePoints.includes('pediatric');
          default:
            return true;
        }
      });
      setFilteredProducts(filtered);
    }
  }, [activeFilter, products]);

  const productCategories = {
    cough: { name: 'Cough & Cold', color: '#3b82f6' },
    digestive: { name: 'Digestive', color: '#10b981' },
    vitamin: { name: 'Vitamins', color: '#f59e0b' },
    pediatric: { name: 'Pediatric', color: '#8b5cf6' }
  };

  return (
    <div className="l3-container syrups-page">
      {/* Hero Section */}
      <section className="syrups-hero">
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
            <div className="syrups-hero-visual">
              <div className="syrups-visual-element">
                <div className="syrups-bottle">🍯</div>
                <div className="syrups-drops">💧</div>
                <div className="syrups-spoon">🥄</div>
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
              <p>No syrup products match your current filter. Try selecting a different category.</p>
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
