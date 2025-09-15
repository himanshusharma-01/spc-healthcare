'use client';

import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-heartbeat logo-icon"></i>
              <div className="logo-text">SPC<span>Healthcare</span></div>
            </div>
            <p className="footer-description">
              Providing premium pharmaceutical solutions with precision and care. 
              Your health is our priority.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Products</a></li>
              <li><a href="#">Doctors</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Our Services</h3>
            <ul className="footer-links">
              <li><a href="#">Prescription Medicines</a></li>
              <li><a href="#">Over-the-Counter</a></li>
              <li><a href="#">Specialty Drugs</a></li>
              <li><a href="#">Health Consultations</a></li>
              <li><a href="#">Medical Advice</a></li>
              <li><a href="#">Emergency Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Medical Avenue, Health City, HC 12345</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>(123) 456-7890</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@spchealthcare.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon-Fri: 8:00 AM - 8:00 PM<br/>Sat-Sun: 10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="newsletter-section">
          <div className="newsletter-content">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with our latest news and health tips</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
              />
              <button type="submit" className="btn btn-primary">
                Subscribe <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} SPC Healthcare. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;