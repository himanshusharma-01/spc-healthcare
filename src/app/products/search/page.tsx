'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProductSearch } from '@/app/contexts/ProductSearchContext';
import { getProducts } from '@/lib/getProducts';
import { productMatchesQuery, type Product as SPCProduct } from '@/lib/productCategoryUtils';
import '../ProductsPage.css';

export default function SearchResultsPage() {
  const [allProducts, setAllProducts] = useState<SPCProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useProductSearch();

  // Load all products from all categories
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    return allProducts.filter(product =>
      productMatchesQuery(product, searchQuery)
    );
  }, [allProducts, searchQuery]);

  // Get category label for a product
  const getCategoryLabel = (product: SPCProduct): string => {
    const category = product.category?.toLowerCase() || '';
    const name = product.name.toLowerCase();
    const description = product.shortDescription?.toLowerCase() || '';
    
    if (category.includes('syrup') || name.includes('syrup') || description.includes('syrup')) {
      return 'Syrup';
    }
    if (category.includes('tablet') || name.includes('tablet') || description.includes('tablet')) {
      return 'Tablet';
    }
    if (category.includes('capsule') || name.includes('capsule') || description.includes('capsule')) {
      return 'Capsule';
    }
    if (category.includes('drop') || name.includes('drop') || description.includes('drop')) {
      return 'Oral Drops';
    }
    if (category.includes('suspension') || name.includes('suspension') || description.includes('suspension')) {
      return 'Oral Suspension';
    }
    return 'Product';
  };

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero search-hero">
        <div className="l3-container-inner">
          <div className="products-hero-content">
            <h1 className="products-hero-title">
              Search <span className="l3-title-line">Results</span>
            </h1>
            <p className="products-hero-subtitle">
              {searchQuery.trim() 
                ? `Searching for "${searchQuery}" across all products`
                : 'Enter a search term to find products'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="products-grid-section">
        <div className="l3-container-inner">
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : !searchQuery.trim() ? (
            <div className="no-products">
              <i className="fas fa-search no-products-icon"></i>
              <h3>Start searching</h3>
              <p>Enter a product name in the search bar to find products across all categories.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <i className="fas fa-search no-products-icon"></i>
              <h3>No products found</h3>
              <p>No products match "{searchQuery}". Try a different search term.</p>
            </div>
          ) : (
            <>
              <div className="results-info">
                <p>
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              </div>
              <div className="products-grid">
                {filteredProducts.map((product, index) => (
                  <Link 
                    prefetch 
                    key={`${product.id}-${index}`} 
                    href={`/products/${product.slug}`} 
                    className="product-card-link"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="product-card">
                      <div className="product-card-header">
                        <div className="product-image">
                          {product.imageUrls && product.imageUrls.length > 0 ? (
                            <Image 
                              src={product.imageUrls[0]} 
                              alt={product.name}
                              width={300}
                              height={200}
                              style={{ objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="product-image-placeholder">
                              <i className="fas fa-pills"></i>
                            </div>
                          )}
                        </div>
                        <div className="product-badge">{getCategoryLabel(product)}</div>
                      </div>

                      <div className="product-card-body">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-generic">{product.shortDescription}</p>
                      </div>

                      <div className="product-card-footer">
                        <button className="view-details-btn">
                          <i className="fas fa-info-circle"></i>
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

