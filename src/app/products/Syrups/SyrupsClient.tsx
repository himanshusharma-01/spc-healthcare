'use client';

import React, { useState, useEffect } from 'react';

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

interface SyrupsClientProps {
  initialProducts: Product[];
}

export default function SyrupsClient({ initialProducts }: SyrupsClientProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

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
      <section className="syrups-hero">
        <div className="l3-container-inner">
          <div className="syrups-hero-content">
            <div className="syrups-hero-text">
              <h1 className="syrups-hero-title">
                <span className="l3-title-line">Syrups</span>
                <span className="l3-title-line">Liquid Solutions</span>
              </h1>
              <p className="syrups-hero-subtitle">
                High-quality liquid formulations for easy administration and effective treatment across all age groups.
              </p>
              <div className="syrups-stats">
                <div className="syrups-stat">
                  <div className="syrups-stat-number">{products.length}+</div>
                  <div className="syrups-stat-label">Products</div>
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
      <section className="product-categories-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Syrup Categories</h2>
            <p className="l3-section-subtitle">
              Specialized liquid formulations for different therapeutic needs.
            </p>
          </div>
          <div className="categories-grid">
            {Object.entries(productCategories).map(([key, category]) => (
              <div key={key} className="category-card">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {key === 'cough' && '🤧'}
                  {key === 'digestive' && '🌿'}
                  {key === 'vitamin' && '💊'}
                  {key === 'pediatric' && '👶'}
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">
                  {key === 'cough' && 'Relief from cough, cold, and respiratory symptoms'}
                  {key === 'digestive' && 'Support for digestive health and comfort'}
                  {key === 'vitamin' && 'Essential vitamins and nutritional support'}
                  {key === 'pediatric' && 'Safe and effective solutions for children'}
                </p>
                <div className="category-count">
                  {products.filter(p => {
                    const name = p.name.toLowerCase();
                    const description = p.shortDescription.toLowerCase();
                    const usagePoints = p.usagePoints?.join(' ').toLowerCase() || '';
                    
                    switch (key) {
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
                  }).length} Products
                </div>
              </div>
            ))}
          </div>
        </div>
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
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
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
                  
                  <div className="product-header">
                    <div className="product-basic-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-type">{product.drugType}</div>
                      {product.category && (
                        <div 
                          className="product-category"
                          style={{ 
                            backgroundColor: '#3b82f620',
                            color: '#3b82f6'
                          }}
                        >
                          {product.category}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="product-indication">
                    <strong>Description:</strong> {product.shortDescription}
                  </div>

                  {product.longDescription && (
                    <div className="product-description" dangerouslySetInnerHTML={{ __html: product.longDescription }} />
                  )}

                  <div className="product-details">
                    <div className="detail-item">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">{product.drugType}</span>
                    </div>
                    {product.category && (
                      <div className="detail-item">
                        <span className="detail-label">Category:</span>
                        <span className="detail-value">{product.category}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value status-available">Available</span>
                    </div>
                  </div>

                  {product.usagePoints && product.usagePoints.length > 0 && (
                    <div className="product-features">
                      <h4>Key Benefits:</h4>
                      <ul>
                        {product.usagePoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="product-actions">
                    <button className="l3-btn l3-btn-primary">Product Details</button>
                    <button className="l3-btn l3-btn-secondary">Prescribing Info</button>
                  </div>
                </div>
              ))}
            </div>
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
