'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './TabletsPage.css';
import { loadCategoryProducts, generateFilterCounts, Product } from '@/lib/productCategoryUtils';

export default function TabletsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const tabletProducts = await loadCategoryProducts('tablets');
        setProducts(tabletProducts);
        setFilteredProducts(tabletProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filterDefinitions = [
    { id: 'all', name: 'All Tablets', keywords: [] },
    { id: 'cardio', name: 'Cardiology', keywords: ['cardio', 'heart', 'blood pressure', 'hypertension'] },
    { id: 'cns', name: 'CNS', keywords: ['cns', 'neurological', 'brain', 'nervous'] },
    { id: 'diabetes', name: 'Diabetes', keywords: ['diabetes', 'diabetic', 'glucose', 'insulin'] },
    { id: 'pain', name: 'Pain Management', keywords: ['pain', 'analgesic', 'relief', 'ache'] },
    { id: 'antibiotic', name: 'Antibiotics', keywords: ['antibiotic', 'bacterial', 'infection'] }
  ];

  const productFilters = generateFilterCounts(products, filterDefinitions);

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

  // Filter products based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      const filter = filterDefinitions.find(f => f.id === activeFilter);
      if (filter) {
        const filtered = products.filter(product => {
          const name = product.name.toLowerCase();
          const description = product.shortDescription.toLowerCase();
          const usagePoints = product.usagePoints?.join(' ').toLowerCase() || '';
          
          return filter.keywords.some(keyword => 
            name.includes(keyword) || 
            description.includes(keyword) || 
            usagePoints.includes(keyword)
          );
        });
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
      }
    }
  }, [activeFilter, products]);

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

    
      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Tablet Products</h2>
            <p className="l3-section-subtitle">
              Discover our range of high-quality tablet formulations.
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
              <p>No tablet products match your current filter. Try selecting a different category.</p>
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
