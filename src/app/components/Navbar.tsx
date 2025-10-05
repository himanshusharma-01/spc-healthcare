'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLayoutDropdownOpen, setIsLayoutDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLayoutDropdown = () => {
    setIsLayoutDropdownOpen(!isLayoutDropdownOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.header-container') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
      if (!target.closest('.dropdown') && isLayoutDropdownOpen) {
        setIsLayoutDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, isLayoutDropdownOpen]);

  return (
    <header className="navbar-header">
      <div className="header-container">
        <Link href="/" className="logo">
          <i className="fas fa-heartbeat logo-icon"></i>
          <div className="logo-text">SPC<span>Healthcare</span></div>
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li className="dropdown">
              <a href="#" onClick={(e) => { e.preventDefault(); toggleLayoutDropdown(); }} className="dropdown-toggle">
                Layouts <i className={`fas fa-chevron-down ${isLayoutDropdownOpen ? 'rotated' : ''}`}></i>
              </a>
              <ul className={`dropdown-menu ${isLayoutDropdownOpen ? 'active' : ''}`}>
                <li><Link href="/">Main Homepage</Link></li>
                <li><Link href="/layout1">Layout 1</Link></li>
                <li><Link href="/layout2">Layout 2</Link></li>
                <li><Link href="/layout3">Layout 3</Link></li>
              </ul>
            </li>
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
          <li className="mobile-dropdown">
            <a href="#" onClick={(e) => { e.preventDefault(); toggleLayoutDropdown(); }}>
              Layouts <i className={`fas fa-chevron-down ${isLayoutDropdownOpen ? 'rotated' : ''}`}></i>
            </a>
            <ul className={`mobile-dropdown-menu ${isLayoutDropdownOpen ? 'active' : ''}`}>
              <li><Link href="/">Main Homepage</Link></li>
              <li><Link href="/layout1">Layout 1</Link></li>
              <li><Link href="/layout2">Layout 2</Link></li>
              <li><Link href="/layout3">Layout 3</Link></li>
            </ul>
          </li>
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