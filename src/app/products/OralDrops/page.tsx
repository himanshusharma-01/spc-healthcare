'use client';

import React, { useState } from 'react';
import './OralDropsPage.css';

export default function OralDropsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Drops', count: 6 },
    { id: 'vitamin', name: 'Vitamins', count: 2 },
    { id: 'pediatric', name: 'Pediatric', count: 2 },
    { id: 'digestive', name: 'Digestive', count: 2 }
  ];

  const dropsProducts = [
    {
      id: 1,
      name: 'VitaDrops',
      category: 'vitamin',
      type: 'Vitamin Drops',
      indication: 'Vitamin Deficiency',
      description: 'Concentrated vitamin drops for quick absorption and easy administration.',
      strength: '1ml per dose',
      packaging: '30ml Bottle',
      status: 'Available',
      features: ['High concentration', 'Quick absorption', 'Easy dosing', 'Tasty flavor'],
      image: '💧',
      productImage: '/api/placeholder/300/200?text=VitaDrops'
    },
    {
      id: 2,
      name: 'BabyCalm Drops',
      category: 'pediatric',
      type: 'Pediatric Sedative',
      indication: 'Colic, Restlessness',
      description: 'Gentle pediatric drops to soothe colicky babies and reduce restlessness.',
      strength: '0.5ml per dose',
      packaging: '15ml Bottle',
      status: 'Available',
      features: ['Pediatric safe', 'Natural ingredients', 'Fast acting', 'Easy to administer'],
      image: '👶',
      productImage: '/api/placeholder/300/200?text=BabyCalm+Drops'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? dropsProducts 
    : dropsProducts.filter(product => product.category === activeFilter);

  const productCategories = {
    vitamin: { name: 'Vitamins', color: '#f59e0b' },
    pediatric: { name: 'Pediatric', color: '#8b5cf6' },
    digestive: { name: 'Digestive', color: '#10b981' }
  };

  return (
    <div className="l3-container oral-drops-page">
      <section className="oral-drops-hero">
        <div className="l3-container-inner">
          <div className="oral-drops-hero-content">
            <div className="oral-drops-hero-text">
              <h1 className="oral-drops-hero-title">
                <span className="l3-title-line">Oral Drops</span>
                <span className="l3-title-line">Precise Liquid Dosing</span>
              </h1>
              <p className="oral-drops-hero-subtitle">
                Concentrated liquid formulations for precise dosing and rapid absorption.
              </p>
            </div>
            <div className="oral-drops-hero-visual">
              <div className="oral-drops-visual-element">
                <div className="oral-drops-dropper">💧</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Oral Drops Products</h2>
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
