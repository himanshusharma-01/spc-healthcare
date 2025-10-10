'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with:', email);
    setEmail('');
  };


  return (
    <footer className="footer">
      {/* Newsletter Section - MOVED TO TOP */}
      <div className="footer-newsletter">
        <div className="footer-container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Informed</h3>
              <p>Subscribe to our newsletter for the latest medical breakthroughs and updates</p>
            </div>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                <i className="fas fa-paper-plane"></i>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          
          {/* Company Info Section */}
          <div className="footer-section company-info">
            <div className="footer-logo">
              <i className="fas fa-heartbeat logo-icon"></i>
              <div className="logo-text">SPC<span>Healthcare</span></div>
            </div>
            <p className="footer-desc">
              Pioneering pharmaceutical innovations for a healthier tomorrow. 
              Committed to research, development, and delivery of life-changing medications.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/research">Research & Development</Link></li>
              <li><Link href="/products">Our Products</Link></li>
              <li><Link href="/quality">Quality & Safety</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4 className="footer-title">Products</h4>
            <ul className="footer-links">
              <li><Link href="/products/oncology">Oncology</Link></li>
              <li><Link href="/products/cardiology">Cardiology</Link></li>
              <li><Link href="/products/neurology">Neurology</Link></li>
              <li><Link href="/products/vaccines">Vaccines</Link></li>
              <li><Link href="/products/generics">Generic Medicines</Link></li>
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div className="footer-section contact-info">
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Innovation Drive<br />Pharma Park, CA 94203</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (800) HEALTH-01</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@spchealthcare.com</span>
              </div>
              <div className="contact-item emergency">
                <i className="fas fa-ambulance"></i>
                <span>Medical Emergency<br /><strong>+1 (800) 911-HELP</strong></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Certifications & Awards */}
      <div className="footer-certifications">
        <div className="footer-container">
          <h5>CERTIFIED & REGULATED BY</h5>
          <div className="certification-logos">
            <div className="cert-logo">FDA</div>
            <div className="cert-logo">EMA</div>
            <div className="cert-logo">WHO</div>
            <div className="cert-logo">ISO 9001</div>
            <div className="cert-logo">GMP</div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {currentYear} SPC Healthcare. All rights reserved.
            </div>
            <div className="footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Button */}
    </footer>
  );
};

export default Footer;