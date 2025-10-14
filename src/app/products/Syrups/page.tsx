'use client';

import React, { useState } from 'react';
import './SyrupsPage.css';

export default function SyrupsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Syrups', count: 12 },
    { id: 'cough', name: 'Cough & Cold', count: 4 },
    { id: 'digestive', name: 'Digestive', count: 3 },
    { id: 'vitamin', name: 'Vitamins', count: 3 },
    { id: 'pediatric', name: 'Pediatric', count: 2 }
  ];

  const syrupProducts = [
    {
      id: 1,
      name: 'CoughRelief Syrup',
      category: 'cough',
      type: 'Cough Suppressant',
      indication: 'Dry Cough, Throat Irritation',
      description: 'Effective cough suppressant with soothing properties for dry cough and throat irritation.',
      strength: '10mg/5ml',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Fast acting', 'Sugar-free option', 'Pediatric safe', 'Long-lasting relief'],
      image: '🍯',
      productImage: '/api/placeholder/300/200?text=CoughRelief+Syrup'
    },
    {
      id: 2,
      name: 'DigestAid Syrup',
      category: 'digestive',
      type: 'Digestive Aid',
      indication: 'Indigestion, Bloating',
      description: 'Natural digestive syrup to relieve indigestion, bloating, and stomach discomfort.',
      strength: '15ml per dose',
      packaging: '200ml Bottle',
      status: 'Available',
      features: ['Natural ingredients', 'Gentle formula', 'Quick relief', 'No side effects'],
      image: '🌿',
      productImage: '/api/placeholder/300/200?text=DigestAid+Syrup'
    },
    {
      id: 3,
      name: 'Vitamax Syrup',
      category: 'vitamin',
      type: 'Multivitamin',
      indication: 'Vitamin Deficiency, General Health',
      description: 'Complete multivitamin syrup with essential vitamins and minerals for overall health.',
      strength: '5ml per dose',
      packaging: '150ml Bottle',
      status: 'Available',
      features: ['Complete nutrition', 'Tasty flavor', 'Daily dose', 'Child-friendly'],
      image: '💊',
      productImage: '/api/placeholder/300/200?text=Vitamax+Syrup'
    },
    {
      id: 4,
      name: 'KidsCalm Syrup',
      category: 'pediatric',
      type: 'Pediatric Sedative',
      indication: 'Restlessness, Sleep Aid',
      description: 'Gentle pediatric syrup to help children sleep better and reduce restlessness.',
      strength: '2.5ml per dose',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Pediatric tested', 'Natural herbs', 'Safe dosage', 'Sweet taste'],
      image: '👶',
      productImage: '/api/placeholder/300/200?text=KidsCalm+Syrup'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? syrupProducts 
    : syrupProducts.filter(product => product.category === activeFilter);

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
                  {syrupProducts.filter(p => p.category === key).length} Products
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

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.productImage} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="product-image-fallback" style={{ display: 'none' }}>
                    <span className="product-icon">{product.image}</span>
                  </div>
                </div>
                
                <div className="product-header">
                  <div className="product-basic-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-type">{product.type}</div>
                    <div 
                      className="product-category"
                      style={{ 
                        backgroundColor: `${productCategories[product.category].color}20`,
                        color: productCategories[product.category].color
                      }}
                    >
                      {productCategories[product.category].name}
                    </div>
                  </div>
                </div>

                <div className="product-indication">
                  <strong>Indication:</strong> {product.indication}
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Strength:</span>
                    <span className="detail-value">{product.strength}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Packaging:</span>
                    <span className="detail-value">{product.packaging}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="product-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="product-actions">
                  <button className="l3-btn l3-btn-primary">Product Details</button>
                  <button className="l3-btn l3-btn-secondary">Prescribing Info</button>
                </div>
              </div>
            ))}
          </div>

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
