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
    console.log('Mobile menu toggle clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    console.log('Mobile menu state changed:', isMobileMenuOpen);
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside navbar dropdowns
      if (!target.closest('.nav-dropdown') && !target.closest('.nav-item')) {
        setActiveDropdown(null);
      }
    };

    // Close mobile menu when clicking outside
    const handleMobileClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('.navbar') && !target.closest('.mobile-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    // Close dropdowns on Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    };

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleMobileClickOutside);
    }

    // Always listen for Escape key
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleMobileClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDropdown, isMobileMenuOpen]);

  const isActiveLink = (path: string) => {
    return pathname === path ? 'active' : '';
  };


  const handleGetInTouch = () => {
    // Navigate to contact page
    window.location.href = '/contact';
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
        { href: '/products/Syrups', label: 'Syrups' },
        { href: '/products/OralSuspensions', label: 'Oral Suspensions' },
        { href: '/products/OralDrops', label: 'Oral Drops' },
        { href: '/products/Tablets', label: 'Tablets' },
        { href: '/products/Capsules', label: 'Capsules' }
      ]
    },
    { href: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar" id="navbar-announcement">
        <div className="announcement-content">
         
          <span>"Your Health, Our Priority – Trusted Care for Every Step of Life."</span>
         
        </div>
      </div>

      {/* Main Navbar */}
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`} id="main-navbar">
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
                            onClick={() => setActiveDropdown(null)}
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
              onClick={() => window.location.href = '/contact'}
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

        {/* Dropdown Backdrop */}
        {activeDropdown && (
          <div 
            className="dropdown-backdrop"
            onClick={() => setActiveDropdown(null)}
          />
        )}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`} id="mobile-menu">
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

            <div className="mobile-actions" id="mobile-actions">
              <button 
                className="mobile-action-btn primary"
                onClick={handleGetInTouch}
                id="mobile-get-in-touch-btn"
              >
                <i className="fas fa-envelope"></i>
                Get in touch
              </button>
            </div>

            <div className="mobile-contact" id="mobile-contact">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>7710301301</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>mail@spchealthcare.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;