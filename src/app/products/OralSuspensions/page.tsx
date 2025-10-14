'use client';

import React, { useState } from 'react';
import './OralSuspensionsPage.css';

export default function OralSuspensionsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Suspensions', count: 8 },
    { id: 'antibiotic', name: 'Antibiotics', count: 3 },
    { id: 'pediatric', name: 'Pediatric', count: 3 },
    { id: 'antacid', name: 'Antacids', count: 2 }
  ];

  const suspensionProducts = [
    {
      id: 1,
      name: 'AmoxiSusp',
      category: 'antibiotic',
      type: 'Antibiotic Suspension',
      indication: 'Bacterial Infections',
      description: 'Broad-spectrum antibiotic suspension for treatment of various bacterial infections.',
      strength: '250mg/5ml',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Broad spectrum', 'Pediatric safe', 'Easy administration', 'Stable suspension'],
      image: '🦠',
      productImage: '/api/placeholder/300/200?text=AmoxiSusp'
    },
    {
      id: 2,
      name: 'KidsCalm Suspension',
      category: 'pediatric',
      type: 'Pediatric Sedative',
      indication: 'Restlessness, Sleep',
      description: 'Gentle pediatric suspension to help children sleep better and reduce restlessness.',
      strength: '2.5ml per dose',
      packaging: '100ml Bottle',
      status: 'Available',
      features: ['Pediatric tested', 'Natural herbs', 'Safe dosage', 'Sweet taste'],
      image: '👶',
      productImage: '/api/placeholder/300/200?text=KidsCalm+Suspension'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? suspensionProducts 
    : suspensionProducts.filter(product => product.category === activeFilter);

  const productCategories = {
    antibiotic: { name: 'Antibiotics', color: '#ef4444' },
    pediatric: { name: 'Pediatric', color: '#8b5cf6' },
    antacid: { name: 'Antacids', color: '#f59e0b' }
  };

  return (
    <div className="l3-container oral-suspensions-page">
      <section className="oral-suspensions-hero">
        <div className="l3-container-inner">
          <div className="oral-suspensions-hero-content">
            <div className="oral-suspensions-hero-text">
              <h1 className="oral-suspensions-hero-title">
                <span className="l3-title-line">Oral Suspensions</span>
                <span className="l3-title-line">Liquid Precision</span>
              </h1>
              <p className="oral-suspensions-hero-subtitle">
                Stable liquid suspensions for precise dosing and easy administration across all age groups.
              </p>
            </div>
            <div className="oral-suspensions-hero-visual">
              <div className="oral-suspensions-visual-element">
                <div className="oral-suspensions-bottle">🧴</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Oral Suspension Products</h2>
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
