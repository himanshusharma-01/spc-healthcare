'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const categorySlug = (product.category || '').toLowerCase();
  let backHref = '/';
  if (categorySlug.includes('syrup')) backHref = '/products/Syrups';
  else if (categorySlug.includes('tablet')) backHref = '/products/Tablets';
  else if (categorySlug.includes('capsule')) backHref = '/products/Capsules';
  else if (categorySlug.includes('drop')) backHref = '/products/OralDrops';
  else if (categorySlug.includes('susp')) backHref = '/products/OralSuspensions';

  const currentImageUrl = product.imageUrls?.[selectedImage] || '/api/placeholder/400x500';

  return (
    <div className="product-details-page">
      {/* Main Content */}
      <main className="product-details-main">
        <div className="container">
          <div className="product-details-content">
            {/* Left Section - Product Images */}
            <div className="product-images-section">
              <div className="main-image-container">
                <Image
                  src={currentImageUrl}
                  alt={product.name}
                  className="main-product-image"
                  width={600}
                  height={600}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.imageUrls && product.imageUrls.length > 1 && (
                <div className="thumbnail-images">
                  {product.imageUrls.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`${product.name} view ${index + 1}`}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      width={80}
                      height={100}
                      style={{ objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(index)}
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
                <Link prefetch href="/contact" className="cta-button" aria-label="Go to Contact page">
                  Reach Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Back to Products Link */}
      <div className="back-to-products">
        <div className="container">
          <a
            href={backHref}
            className="back-link"
            onClick={(e) => {
              // Prefer true back to the exact grid user came from
              e.preventDefault();
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
              } else {
                // Fallback to category-derived URL if no history
                window.location.href = backHref;
              }
            }}
          >
            <span className="back-arrow">←</span>
            Back to All Products
          </a>
        </div>
      </div>
    </div>
  );
}
