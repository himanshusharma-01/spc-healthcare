"use client";
import React, { useEffect, useRef } from 'react';
import './layout2.css';

const Layout2: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add('loaded');
    }
  }, []);

  const bestsellers = [
    {
      id: 1,
      name: "Cardiocor Plus",
      description: "Advanced cardiovascular support medication for maintaining heart health and circulation.",
      price: "$89.99",
      image: "/api/placeholder/300/250",
      badge: "BEST SELLER"
    },
    {
      id: 2,
      name: "NeuroCalm Pro",
      description: "Premium neurological support for enhanced cognitive function and mental clarity.",
      price: "$79.99",
      image: "/api/placeholder/300/250",
      badge: "TRENDING"
    },
    {
      id: 3,
      name: "ImmunoShield Max",
      description: "Maximum strength immune system booster with advanced protection formula.",
      price: "$95.99",
      image: "/api/placeholder/300/250",
      badge: "BEST SELLER"
    },
    {
      id: 4,
      name: "ArthroFlex Advanced",
      description: "Advanced joint and muscle support for optimal mobility and comfort.",
      price: "$67.99",
      image: "/api/placeholder/300/250",
      badge: "NEW"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Cardiocor Plus",
      description: "Advanced cardiovascular support medication for maintaining heart health and circulation.",
      category: "Cardiology",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "NeuroCalm",
      description: "Neurological support for cognitive function and mental clarity enhancement.",
      category: "Neurology",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "ImmunoShield",
      description: "Immune system booster with advanced formula for comprehensive protection.",
      category: "Immunology",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "ArthroFlex",
      description: "Joint and muscle support for improved mobility and comfort.",
      category: "Orthopedics",
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="layout2-container">
      {/* Hero Section */}
      <section ref={heroRef} className="layout2-hero">
        <div className="layout2-hero-background">
          <div className="layout2-hero-animation">
            <div className="layout2-pulse-circle"></div>
            <div className="layout2-pulse-circle delay-1"></div>
            <div className="layout2-pulse-circle delay-2"></div>
          </div>
        </div>
        
        <div className="layout2-hero-content">
          <div className="layout2-hero-text">
            <h1 className="layout2-hero-title">
              <span className="layout2-title-line">Advancing</span>
              <span className="layout2-title-line layout2-title-accent">Healthcare</span>
              <span className="layout2-title-line">Innovation</span>
            </h1>
            <p className="layout2-hero-subtitle">
              Trusted pharmaceutical solutions for a healthier tomorrow. 
              Discover our premium range of medications and healthcare products 
              backed by cutting-edge research and quality assurance.
            </p>
            <div className="layout2-hero-buttons">
              <button className="layout2-btn layout2-btn-primary">
                Explore Products
              </button>
              <button className="layout2-btn layout2-btn-secondary">
                Contact Us
              </button>
            </div>
          </div>
          
          <div className="layout2-hero-visual">
            <div className="layout2-medical-icon">
              <div className="layout2-icon-circle"></div>
              <div className="layout2-icon-cross"></div>
            </div>
          </div>
        </div>
        
        <div className="layout2-scroll-indicator">
          <div className="layout2-scroll-arrow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="layout2-features">
        <div className="layout2-container-inner">
          <h2 className="layout2-section-title">Why Choose SPC Healthcare?</h2>
          <p className="layout2-section-subtitle">
            Committed to excellence in pharmaceutical innovation and patient care
          </p>
          <div className="layout2-features-grid">
            <div className="layout2-feature-card">
              <div className="layout2-feature-icon">🔬</div>
              <h3>Research Driven</h3>
              <p>Cutting-edge research and development for innovative healthcare solutions with proven results</p>
            </div>
            <div className="layout2-feature-card">
              <div className="layout2-feature-icon">🏭</div>
              <h3>GMP Certified</h3>
              <p>Manufactured in state-of-the-art GMP certified facilities ensuring highest quality standards</p>
            </div>
            <div className="layout2-feature-card">
              <div className="layout2-feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>Sustainable practices in manufacturing and packaging for a greener future</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="layout2-bestsellers">
        <div className="layout2-container-inner">
          <h2 className="layout2-section-title">Our Best Sellers</h2>
          <p className="layout2-section-subtitle">
            Most trusted pharmaceutical solutions chosen by healthcare professionals worldwide
          </p>
          <div className="layout2-bestsellers-grid">
            {bestsellers.map((product) => (
              <div key={product.id} className="layout2-bestseller-card">
                <div className="layout2-bestseller-image">
                  <img src={product.image} alt={product.name} />
                  <div className="layout2-bestseller-badge">{product.badge}</div>
                </div>
                <div className="layout2-bestseller-content">
                  <h3 className="layout2-bestseller-name">{product.name}</h3>
                  <p className="layout2-bestseller-description">{product.description}</p>
                  <div className="layout2-bestseller-price">{product.price}</div>
                  <div className="layout2-bestseller-actions">
                    <button className="layout2-btn layout2-btn-buy">Add to Cart</button>
                    <button className="layout2-btn layout2-btn-outline">Quick View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="layout2-products">
        <div className="layout2-container-inner">
          <h2 className="layout2-section-title">Featured Products</h2>
          <p className="layout2-section-subtitle">
            Comprehensive range of pharmaceutical products for all your healthcare needs
          </p>
          <div className="layout2-products-grid">
            {products.map((product) => (
              <div key={product.id} className="layout2-product-card">
                <div className="layout2-product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="layout2-product-badge">{product.category}</div>
                </div>
                <div className="layout2-product-content">
                  <h3 className="layout2-product-name">{product.name}</h3>
                  <p className="layout2-product-description">{product.description}</p>
                  <div className="layout2-product-actions">
                    <button className="layout2-btn layout2-btn-buy">Buy Now</button>
                    <button className="layout2-btn layout2-btn-outline">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="layout2-cta">
        <div className="layout2-container-inner">
          <div className="layout2-cta-content">
            <h2 className="layout2-cta-title">Ready to Transform Healthcare?</h2>
            <p className="layout2-cta-text">
              Join thousands of healthcare professionals who trust SPC Healthcare 
              for their pharmaceutical needs. Experience the difference quality makes.
            </p>
            <button className="layout2-btn layout2-btn-cta">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layout2;