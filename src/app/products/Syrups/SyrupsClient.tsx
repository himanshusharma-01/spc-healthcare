'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import { productMatchesQuery, type Product as SPCProduct } from '@/lib/productCategoryUtils';

interface SyrupsClientProps {
  initialProducts: SPCProduct[];
}

export default function SyrupsClient({ initialProducts }: SyrupsClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products] = useState<SPCProduct[]>(initialProducts);
  const { searchQuery, setSearchQuery } = useProductSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

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

  // Filter products based on active filter and search query
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => {
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
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        productMatchesQuery(product, searchQuery)
      );
    }

    return filtered;
  }, [activeFilter, products, searchQuery]);


  return (
    <div className="l3-container syrups-page">
      <section className="syrups-hero" aria-label="Syrups hero banner">
        <Image
          src="/syrup%20dekstop.png"
          alt="SPC Healthcare syrup product banner"
          className="syrups-hero-img"
        />
      </section>

     

      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Syrup Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality liquid formulations.
            </p>
          </div>

          {/* Search Box */}
          <div className="category-search-container">
            <div className="category-search-box">
              <i className="fas fa-search category-search-icon"></i>
              <input
                type="text"
                placeholder="Search syrups by name, description, or usage..."
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

          {/* Filter Tabs */}
          <div className="products-filter-container">
            <div className="filter-tabs">
              {productFilters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  <span className="filter-name">{filter.name}</span>
                  <span className="filter-count">{filter.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid - No Loading State Needed! */}
          {filteredProducts.length > 0 ? (
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
                    // Scroll to top and focus search
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
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>No syrup products match your current filter. Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
