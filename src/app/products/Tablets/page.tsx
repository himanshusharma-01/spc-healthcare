'use client';

import React, { useState } from 'react';
import './TabletsPage.css';

export default function TabletsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Tablets', count: 25 },
    { id: 'cardio', name: 'Cardiology', count: 6 },
    { id: 'cns', name: 'CNS', count: 5 },
    { id: 'diabetes', name: 'Diabetes', count: 4 },
    { id: 'pain', name: 'Pain Management', count: 5 },
    { id: 'antibiotic', name: 'Antibiotics', count: 5 }
  ];

  const tabletProducts = [
    {
      id: 1,
      name: 'CardioMax',
      category: 'cardio',
      type: 'ACE Inhibitor',
      indication: 'Hypertension, Heart Failure',
      description: 'Effective ACE inhibitor for managing hypertension and heart failure with proven clinical efficacy.',
      strength: '5mg',
      packaging: '10x10 Tablets',
      status: 'Available',
      features: ['Once daily dosing', 'Well tolerated', 'Proven efficacy', 'Cost effective'],
      image: '💊',
      productImage: '/api/placeholder/300/200?text=CardioMax'
    },
    {
      id: 2,
      name: 'NeuroCalm',
      category: 'cns',
      type: 'SSRI',
      indication: 'Depression, Anxiety',
      description: 'Selective serotonin reuptake inhibitor for treatment of depression and anxiety disorders.',
      strength: '50mg',
      packaging: '10x10 Tablets',
      status: 'Available',
      features: ['SSRI class', 'Mood improvement', 'Anxiety reduction', 'Well studied'],
      image: '🧠',
      productImage: '/api/placeholder/300/200?text=NeuroCalm'
    },
    {
      id: 3,
      name: 'GlucoControl',
      category: 'diabetes',
      type: 'Biguanide',
      indication: 'Type 2 Diabetes',
      description: 'Metformin-based tablet for effective blood glucose control in type 2 diabetes patients.',
      strength: '500mg',
      packaging: '10x15 Tablets',
      status: 'Available',
      features: ['Blood sugar control', 'Weight neutral', 'Cardioprotective', 'First line therapy'],
      image: '🩸',
      productImage: '/api/placeholder/300/200?text=GlucoControl'
    },
    {
      id: 4,
      name: 'PainRelief',
      category: 'pain',
      type: 'NSAID',
      indication: 'Pain, Inflammation',
      description: 'Non-steroidal anti-inflammatory drug for effective pain relief and inflammation reduction.',
      strength: '400mg',
      packaging: '10x10 Tablets',
      status: 'Available',
      features: ['Fast acting', 'Anti-inflammatory', 'Pain relief', 'Well tolerated'],
      image: '⚡',
      productImage: '/api/placeholder/300/200?text=PainRelief'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? tabletProducts 
    : tabletProducts.filter(product => product.category === activeFilter);

  const productCategories = {
    cardio: { name: 'Cardiology', color: '#ef4444' },
    cns: { name: 'CNS', color: '#8b5cf6' },
    diabetes: { name: 'Diabetes', color: '#f59e0b' },
    pain: { name: 'Pain Management', color: '#06b6d4' },
    antibiotic: { name: 'Antibiotics', color: '#10b981' }
  };

  return (
    <div className="l3-container tablets-page">
      {/* Hero Section */}
      <section className="tablets-hero">
        <div className="l3-container-inner">
          <div className="tablets-hero-content">
            <div className="tablets-hero-text">
              <h1 className="tablets-hero-title">
                <span className="l3-title-line">Tablets</span>
                <span className="l3-title-line">Solid Dosage Forms</span>
              </h1>
              <p className="tablets-hero-subtitle">
                High-quality tablet formulations designed for precise dosing and effective treatment across multiple therapeutic areas.
              </p>
              <div className="tablets-hero-stats">
                <div className="tablets-stat">
                  <div className="tablets-stat-number">25+</div>
                  <div className="tablets-stat-label">Tablet Products</div>
                </div>
                <div className="tablets-stat">
                  <div className="tablets-stat-number">6</div>
                  <div className="tablets-stat-label">Categories</div>
                </div>
                <div className="tablets-stat">
                  <div className="tablets-stat-number">100%</div>
                  <div className="tablets-stat-label">Quality Assured</div>
                </div>
              </div>
            </div>
            <div className="tablets-hero-visual">
              <div className="tablets-visual-element">
                <div className="tablets-pill">💊</div>
                <div className="tablets-bottle">🧴</div>
                <div className="tablets-capsule">💉</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="product-categories-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Tablet Categories</h2>
            <p className="l3-section-subtitle">
              Specialized tablet formulations for different therapeutic needs.
            </p>
          </div>
          <div className="categories-grid">
            {Object.entries(productCategories).map(([key, category]) => (
              <div key={key} className="category-card">
                <div 
                  className="category-icon"
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {key === 'cardio' && '❤️'}
                  {key === 'cns' && '🧠'}
                  {key === 'diabetes' && '🩸'}
                  {key === 'pain' && '⚡'}
                  {key === 'antibiotic' && '🦠'}
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">
                  {key === 'cardio' && 'Cardiovascular health and heart-related conditions'}
                  {key === 'cns' && 'Central nervous system and mental health'}
                  {key === 'diabetes' && 'Diabetes management and blood sugar control'}
                  {key === 'pain' && 'Pain relief and inflammation management'}
                  {key === 'antibiotic' && 'Antimicrobial therapy and infection control'}
                </p>
                <div className="category-count">
                  {tabletProducts.filter(p => p.category === key).length} Products
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
            <h2 className="l3-section-title">Our Tablet Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality tablet formulations.
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
