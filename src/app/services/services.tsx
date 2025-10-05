// services.tsx
import React from 'react';
import './services.css';

const Services = () => {
  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="/BANNER.png" 
            alt="SPC Healthcare - Our Services"
            className="hero-banner"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="dna-animation">
          <div className="dna-strand">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="dna-node">
                <div className="dna-connector"></div>
                <div className="dna-base left"></div>
                <div className="dna-base right"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Our <span className="highlight">Services</span> & Solutions
            </h1>
            <p className="hero-subtitle">
              Comprehensive pharmaceutical services designed to meet your healthcare needs with precision and care.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">View All Services</button>
              <button className="btn btn-secondary">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;