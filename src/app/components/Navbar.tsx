'use client';

import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.header-container') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar-header">
      <div className="header-container">
        <a href="#" className="logo">
          <i className="fas fa-heartbeat logo-icon"></i>
          <div className="logo-text">SPC<span>Healthcare</span></div>
        </a>
        
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Doctors</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          
          <div className="nav-buttons">
            <button className="btn btn-primary">
              <i className="fas fa-calendar-check"></i> Book Appointment
            </button>
            <button className="btn btn-accent">
              <i className="fas fa-phone-alt"></i> Emergency
            </button>
          </div>
        </nav>
        
        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Doctors</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        
        <div className="mobile-buttons">
          <button className="btn btn-primary">
            <i className="fas fa-calendar-check"></i> Book Appointment
          </button>
          <button className="btn btn-accent">
            <i className="fas fa-phone-alt"></i> Emergency
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;