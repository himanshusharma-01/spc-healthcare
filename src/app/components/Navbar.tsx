'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useProductSearch } from '../contexts/ProductSearchContext';
import { getProducts } from '@/lib/getProducts';
import { productMatchesQuery, type Product } from '@/lib/productCategoryUtils';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useProductSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const toggleMobileMenu = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Use functional update to avoid stale state
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      return newState;
    });
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

  // Prevent body scroll when mobile menu is open, but allow mobile menu to scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      scrollPositionRef.current = scrollY;
      
      // Get viewport width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock body scroll
      document.body.classList.add('mobile-menu-open');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Lock html scroll
      document.documentElement.classList.add('mobile-menu-open');
      document.documentElement.style.overflow = 'hidden';
      
      // Ensure mobile menu can scroll - use !important to override any conflicting styles
      // Use setTimeout to ensure this runs after PreventInternalScroll
      setTimeout(() => {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
          // Use setProperty with important flag to override PreventInternalScroll
          mobileMenu.style.setProperty('overflow-y', 'auto', 'important');
          mobileMenu.style.setProperty('overflow-x', 'hidden', 'important');
          mobileMenu.style.setProperty('touch-action', 'pan-y', 'important');
          // @ts-expect-error - WebkitOverflowScrolling is a valid CSS property
          mobileMenu.style.webkitOverflowScrolling = 'touch';
          // Ensure height is set for scrolling to work
          mobileMenu.style.setProperty('height', '100vh', 'important');
          mobileMenu.style.setProperty('max-height', '100vh', 'important');
          // Force reflow to ensure styles are applied
          void mobileMenu.offsetHeight;
        }
      }, 0);
    } else {
      // Restore body scroll
      const scrollY = parseInt(document.body.style.top || '0') * -1 || scrollPositionRef.current || 0;
      
      document.body.classList.remove('mobile-menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.paddingRight = '';
      
      document.documentElement.classList.remove('mobile-menu-open');
      document.documentElement.style.overflow = '';
      
      // Restore scroll position
      window.scrollTo({
        top: scrollY,
        behavior: 'instant'
      });
    }

    return () => {
      // Cleanup on unmount
      if (isMobileMenuOpen) {
        const scrollY = parseInt(document.body.style.top || '0') * -1 || scrollPositionRef.current || 0;
        
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.paddingRight = '';
        
        document.documentElement.classList.remove('mobile-menu-open');
        document.documentElement.style.overflow = '';
        
        window.scrollTo({
          top: scrollY,
          behavior: 'instant'
        });
      }
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
      
      // Don't close if clicking on the toggle button (it handles its own toggle)
      if (target.closest('.mobile-toggle')) {
        return;
      }
      
      // Close if clicking outside the navbar and mobile menu
      if (!target.closest('.navbar') && !target.closest('.mobile-menu')) {
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

  // Load all products for search matching
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Error loading products for search:', error);
      }
    };
    loadProducts();
  }, []);

  // Sync local search with context when pathname changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Find exact product match by name
  const findExactProductMatch = (query: string) => {
    if (!query.trim() || allProducts.length === 0) return null;
    
    const normalizedQuery = query.toLowerCase().trim();
    
    // First try exact match
    let match = allProducts.find(product => 
      product.name.toLowerCase().trim() === normalizedQuery
    );
    
    // If no exact match, try case-insensitive partial match (at least 3 characters)
    if (!match && normalizedQuery.length >= 3) {
      const matches = allProducts.filter(product => 
        productMatchesQuery(product, normalizedQuery)
      );
      // If only one match, use it
      if (matches.length === 1) {
        match = matches[0];
      }
    }
    
    return match;
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    setSearchQuery(value);
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
    
    // Auto-navigate to product detail page if exact match found (after user stops typing)
    if (value.trim().length >= 3) {
      navigationTimeoutRef.current = setTimeout(() => {
        const matchedProduct = findExactProductMatch(value);
        if (matchedProduct) {
          // Navigate directly to the product detail page
          router.push(`/products/${matchedProduct.slug}`);
        }
      }, 1000); // Wait 1 second after user stops typing
    }
    
    // On product pages, search also filters in place via context
  };

  // Handle search on Enter key or when user wants to navigate
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && localSearchQuery.trim()) {
      const isOnProductPage = pathname.startsWith('/products');
      
      // Try to find exact product match
      const matchedProduct = findExactProductMatch(localSearchQuery);
      
      if (matchedProduct) {
        // Navigate directly to the product detail page
        router.push(`/products/${matchedProduct.slug}`);
      } else {
        // No exact match, navigate to search results page
        if (!isOnProductPage) {
          router.push('/products/search');
        }
        // If on a product page, search already filters in place - no navigation needed
      }
    }
  };

  // Clear search when clicking clear button
  const handleClearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
    
    // Clear any pending navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }
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
            {/* Search bar before Get in touch button */}
            <div className="navbar-search-container">
              <button
                type="button"
                className="navbar-search-trigger"
                aria-label="Search products"
              >
                <i className="fas fa-search navbar-search-icon"></i>
              </button>
              <div className="navbar-search-dropdown">
                <div className="navbar-search-wrapper">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchSubmit}
                    className="navbar-search-input"
                  />
                  {localSearchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="navbar-search-clear"
                      aria-label="Clear search"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
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
                  
                  {/* Mobile Search bar for Products */}
                  {item.label === 'Products' && (
                    <div className="mobile-search-container">
                      <button
                        type="button"
                        className="mobile-search-trigger"
                        aria-label="Search products"
                      >
                        <i className="fas fa-search mobile-search-icon"></i>
                      </button>
                      <div className="mobile-search-dropdown">
                        <div className="mobile-search-wrapper">
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={localSearchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchSubmit}
                            className="mobile-search-input"
                          />
                          {localSearchQuery && (
                            <button
                              onClick={handleClearSearch}
                              className="mobile-search-clear"
                              aria-label="Clear search"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          )}
                        </div>
                      </div>
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