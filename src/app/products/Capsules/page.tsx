'use client';

import React, { useState } from 'react';
import './CapsulesPage.css';

export default function CapsulesPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Capsules', count: 18 },
    { id: 'probiotic', name: 'Probiotics', count: 4 },
    { id: 'vitamin', name: 'Vitamins', count: 5 },
    { id: 'herbal', name: 'Herbal', count: 4 },
    { id: 'supplement', name: 'Supplements', count: 5 }
  ];

  const capsuleProducts = [
    {
      id: 1,
      name: 'GutHealth Pro',
      category: 'probiotic',
      type: 'Probiotic Capsule',
      indication: 'Digestive Health, Immunity',
      description: 'High-potency probiotic capsule with multiple beneficial bacteria strains for optimal gut health.',
      strength: '50 Billion CFU',
      packaging: '30 Capsules',
      status: 'Available',
      features: ['Multiple strains', 'High potency', 'Stomach acid resistant', 'Refrigerated storage'],
      image: '🦠',
      productImage: '/api/placeholder/300/200?text=GutHealth+Pro'
    },
    {
      id: 2,
      name: 'VitaMax Complete',
      category: 'vitamin',
      type: 'Multivitamin',
      indication: 'Nutritional Support',
      description: 'Comprehensive multivitamin capsule with essential vitamins and minerals for daily nutrition.',
      strength: '1 Capsule daily',
      packaging: '60 Capsules',
      status: 'Available',
      features: ['Complete nutrition', 'Easy absorption', 'Daily dose', 'High quality'],
      image: '💊',
      productImage: '/api/placeholder/300/200?text=VitaMax+Complete'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? capsuleProducts 
    : capsuleProducts.filter(product => product.category === activeFilter);

  const productCategories = {
    probiotic: { name: 'Probiotics', color: '#10b981' },
    vitamin: { name: 'Vitamins', color: '#f59e0b' },
    herbal: { name: 'Herbal', color: '#8b5cf6' },
    supplement: { name: 'Supplements', color: '#06b6d4' }
  };

  return (
    <div className="l3-container capsules-page">
      <section className="capsules-hero">
        <div className="l3-container-inner">
          <div className="capsules-hero-content">
            <div className="capsules-hero-text">
              <h1 className="capsules-hero-title">
                <span className="l3-title-line">Capsules</span>
                <span className="l3-title-line">Encapsulated Excellence</span>
              </h1>
              <p className="capsules-hero-subtitle">
                Precision-encapsulated formulations for optimal bioavailability and targeted delivery.
              </p>
            </div>
            <div className="capsules-hero-visual">
              <div className="capsules-visual-element">
                <div className="capsules-pill">💊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Capsule Products</h2>
          </div>

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
        </div>
      </section>
    </div>
  );
}
