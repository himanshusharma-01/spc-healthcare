'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActiveLink = (path: string) => {
    return pathname === path ? 'active' : '';
  };


  const handleBookAppointment = () => {
    // Implement appointment booking logic
    console.log('Book appointment clicked');
  };

  // Navigation data
  const navItems = [
    { href: '/', label: 'Home', icon: 'fas fa-home' },
    { 
      href: '/about', 
      label: 'About Us', 
      icon: 'fas fa-info-circle',
      dropdown: [
        { href: '/about/company', label: 'Our Company' },
        { href: '/about/leadership', label: 'Leadership' }
       
      ]
    },
    { 
      href: '/products', 
      label: 'Products', 
      icon: 'fas fa-pills',
      dropdown: [
        { href: '/products/oncology', label: 'Oncology' },
        { href: '/products/cardiology', label: 'Cardiology' },
        { href: '/products/neurology', label: 'Neurology' },
        { href: '/products/vaccines', label: 'Vaccines' },
        { href: '/products/generics', label: 'Generic Medicines' }
      ]
    },
    { href: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
         
          <span>Breakthrough in Cancer Research - New Treatment Now Available</span>
         
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          
          {/* Logo with Animation */}
          <Link href="/" className="logo">
            <div className="logo-icon-wrapper">
              <i className="fas fa-heartbeat logo-icon"></i>
              <div className="logo-pulse"></div>
            </div>
            <div className="logo-text">
              <span className="logo-main">SPC</span>
              <span className="logo-sub">Healthcare</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.href} className="nav-item">
                  {item.dropdown ? (
                    <div className="dropdown-container">
                      <button 
                        className={`nav-link ${isActiveLink(item.href)} ${activeDropdown === item.label ? 'active' : ''}`}
                        onClick={() => toggleDropdown(item.label)}
                      >
                        <i className={item.icon}></i>
                        {item.label}
                        <i className="fas fa-chevron-down dropdown-arrow"></i>
                      </button>
                      <div className={`dropdown-menu ${activeDropdown === item.label ? 'active' : ''}`}>
                        {item.dropdown.map((dropdownItem) => (
                          <Link 
                            key={dropdownItem.href} 
                            href={dropdownItem.href}
                            className="dropdown-link"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={`nav-link ${isActiveLink(item.href)}`}
                    >
                      <i className={item.icon}></i>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="nav-actions">
            <button 
              className="action-btn appointment-btn"
              onClick={handleBookAppointment}
            >
              <i className="fas fa-calendar-check"></i>
              <span>Get in touch</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <i className="fas fa-heartbeat"></i>
                <span>SPC Healthcare</span>
              </div>
            </div>

            <ul className="mobile-nav-links">
              {navItems.map((item) => (
                <li key={item.href} className="mobile-nav-item">
                  <Link 
                    href={item.href} 
                    className={`mobile-nav-link ${isActiveLink(item.href)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className={item.icon}></i>
                    {item.label}
                    {item.dropdown && <i className="fas fa-chevron-right"></i>}
                  </Link>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="mobile-dropdown">
                      {item.dropdown.map((dropdownItem) => (
                        <Link 
                          key={dropdownItem.href} 
                          href={dropdownItem.href}
                          className="mobile-dropdown-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mobile-actions">
              <button 
                className="mobile-action-btn primary"
                onClick={handleBookAppointment}
              >
                <i className="fas fa-calendar-check"></i>
                Book Appointment
              </button>
            </div>

            <div className="mobile-contact">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (800) HEALTH-01</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@spchealthcare.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;