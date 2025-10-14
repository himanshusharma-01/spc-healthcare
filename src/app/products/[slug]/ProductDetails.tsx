'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './ProductDetails.css';

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

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="product-details-page">
      {/* Header */}
      <header className="product-details-header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">
              <div className="logo-icon">🌿</div>
              <div className="logo-text">
                <span className="logo-main">SPC</span>
                <span className="logo-sub">HEALTHCARE</span>
              </div>
            </Link>
            
            <nav className="header-nav">
              <Link href="/" className="nav-link">HOME</Link>
              <Link href="/about" className="nav-link">ABOUT US</Link>
              <div className="nav-dropdown">
                <Link href="/products" className="nav-link">PRODUCTS</Link>
                <span className="dropdown-arrow">▼</span>
              </div>
              <Link href="/careers" className="nav-link">CAREER</Link>
              <Link href="/contact" className="nav-link">CONTACT US</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="product-details-main">
        <div className="container">
          <div className="product-details-content">
            {/* Left Section - Product Images */}
            <div className="product-images-section">
              <div className="main-image-container">
                <img
                  src={product.imageUrls?.[selectedImage] || '/api/placeholder/400x500'}
                  alt={product.name}
                  className="main-product-image"
                  onError={(e) => {
                    e.currentTarget.src = '/api/placeholder/400x500?text=Product+Image';
                  }}
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="thumbnail-images">
                  {product.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${product.name} view ${index + 1}`}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/80x100?text=Thumb';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Section - Product Information */}
            <div className="product-info-section">
              <div className="product-brand">
                <span className="brand-icon">🌿</span>
                <span className="brand-name">SPC HEALTHCARE®</span>
              </div>
              
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-type-badge">
                <span className="type-text">{product.drugType}</span>
              </div>
              
              <div className="product-description">
                <p>{product.shortDescription}</p>
              </div>

              {/* Features List */}
              {product.usagePoints && product.usagePoints.length > 0 && (
                <div className="product-features">
                  <h3>Key Features:</h3>
                  <ul className="features-list">
                    {product.usagePoints.map((point, index) => (
                      <li key={index} className="feature-item">
                        <span className="checkmark">✓</span>
                        <span className="feature-text">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Information */}
              {product.longDescription && (
                <div className="product-details-info">
                  <h3>Product Details:</h3>
                  <div 
                    className="details-content"
                    dangerouslySetInnerHTML={{ __html: product.longDescription }}
                  />
                </div>
              )}

              {/* Call to Action Section */}
              <div className="cta-section">
                <h3 className="cta-question">Are you interested in this product?</h3>
                <div className="cta-instructions">
                  <p>Visit your nearest medical store.</p>
                  <p>Reach out to us in case, if you are unable to get one.</p>
                </div>
                <button className="cta-button">
                  Reach Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Products Link */}
      <div className="back-to-products">
        <div className="container">
          <Link href="/products" className="back-link">
            <span className="back-arrow">←</span>
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
