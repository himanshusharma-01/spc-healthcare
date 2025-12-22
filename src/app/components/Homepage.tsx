'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/getProducts';
import { filterProductsByCategory, type Product as SPCProduct } from '@/lib/productCategoryUtils';
import './Homepage.css';
import LeadForm from '@/app/leadForm/leadForm';


export default function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState<SPCProduct[]>([]);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const leadFormScheduled = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Banner carousel data
  const allBanners = [
    {
      id: 1,
      desktop: '/BANNER DESKTOP.png',
      mobile: '/BANNER MOBILE.png',
    },
    {
      id: 2,
      desktop: '/BANNER TWO DESKTOP.png',
      mobile: '/BANNER TWO MOBILE.png',
    },
    {
      id: 3,
      desktop: '/BANNER THREE DESKTOP.png',
      mobile: '/BANNER THREE MOBILE.png',
    },
    {
      id: 4,
      desktop: '/BANNER FOUR DESKTOP.png',
      mobile: '/BANNER FOUR MOBILE.png',
    },
  ];

  // Filter banners based on screen size - show only 3 on mobile
  const banners = isMobile ? allBanners.slice(0, 3) : allBanners;

  const productDivisions = [
    {
      id: 1,
      title: 'Syrups',
      image: '/2.png',
      href: '/products/Gynae',
      icon: '',
      desc: '',
      count: '',
    },
    {
      id: 2,
      title: 'Capsules',
      image: '/3.png',
      href: '/products/cardioDiabatic',
      icon: '',
      desc: '',
      count: '',
    },
    {
      id: 3,
      title: 'Tablets',
      image: '/5.png',
      href: '/products/pediatric',
      icon: '',
      desc: '',
      count: '',
    },
    {
      id: 4,
      title: 'Oral Drops',
      image: '/4.png',
      href: '/products/derma',
      icon: '',
      desc: '',
      count: '',
    },
    {
      id: 5,
      title: 'Oral Suspension',
      image: '/1.png',
      href: '/products/orthopedic',
      icon: '',
      desc: '',
      count: '',
    },
  ];

  // Company achievements instead of fake testimonials
  // const achievements = [
  //   { id: 1, title: '25+ Years', description: 'Trusted expertise in pharmaceutical manufacturing and innovation', icon: 'fas fa-calendar-check' },
  //   { id: 2, title: '500+ Products', description: 'Comprehensive portfolio across multiple therapeutic categories', icon: 'fas fa-pills' },
  //   { id: 3, title: '80+ Countries', description: 'Global reach serving healthcare communities worldwide', icon: 'fas fa-globe' },
  // ];

  useEffect(() => {
    // Only run on client side to avoid hydration errors
    if (typeof window === 'undefined') return;

    // Permanently remove scrollbars from homepage container
    const removeHomepageScrollbars = () => {
      const homepageContainer = document.querySelector('.l3-container');
      if (homepageContainer) {
        const container = homepageContainer as HTMLElement;
        // Use requestAnimationFrame to ensure React has hydrated
        requestAnimationFrame(() => {
          container.style.setProperty('overflow', 'hidden', 'important');
          container.style.setProperty('overflow-x', 'hidden', 'important');
          container.style.setProperty('overflow-y', 'hidden', 'important');
          container.style.setProperty('scrollbar-width', 'none', 'important');
          container.style.setProperty('-ms-overflow-style', 'none', 'important');
          
          // Also remove from all child elements
          const allElements = container.querySelectorAll('*');
          allElements.forEach((el) => {
            const element = el as HTMLElement;
            // Skip lead form overlay and its children so the modal can scroll internally
            if (element.closest('.lead-form-overlay')) {
              return;
            }

            element.style.setProperty('overflow', 'hidden', 'important');
            element.style.setProperty('overflow-x', 'hidden', 'important');
            element.style.setProperty('overflow-y', 'hidden', 'important');
            element.style.setProperty('scrollbar-width', 'none', 'important');
            element.style.setProperty('-ms-overflow-style', 'none', 'important');
          });
        });
      }
    };

    // Wait for React to hydrate before applying styles
    const runAfterHydration = () => {
      setTimeout(removeHomepageScrollbars, 0);
      setTimeout(removeHomepageScrollbars, 50);
      setTimeout(removeHomepageScrollbars, 100);
      setTimeout(removeHomepageScrollbars, 200);
      setTimeout(removeHomepageScrollbars, 500);
    };

    // Run after hydration
    if (document.readyState === 'complete') {
      runAfterHydration();
    } else {
      window.addEventListener('load', runAfterHydration);
    }

    // Use MutationObserver to catch any elements added later (but only after hydration)
    const observer = new MutationObserver(() => {
      // Delay to avoid hydration conflicts
      setTimeout(removeHomepageScrollbars, 100);
    });

    // Start observing after a delay to avoid hydration issues
    setTimeout(() => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style'],
        });
      }
    }, 1000);

    // Handle page refresh
    window.addEventListener('pageshow', () => {
      setTimeout(removeHomepageScrollbars, 100);
      setTimeout(removeHomepageScrollbars, 200);
      setTimeout(removeHomepageScrollbars, 500);
    });

    const loadFeatured = async () => {
      try {
        const all = await getProducts();
        const categories = ['syrups', 'tablets', 'capsules', 'drops'];
        const picks: SPCProduct[] = [];
        for (const cat of categories) {
          const list = filterProductsByCategory(all, cat);
          if (list.length > 0) {
            picks.push(list[0]);
          }
        }
        setFeaturedProducts(picks);
      } catch (error) {
        console.error('Error loading featured products:', error);
        setFeaturedProducts([]);
      }
    };
    loadFeatured();

    // Counter animation for stats
    const animateCounter = (element: HTMLElement, target: number) => {
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target + '+';
        }
      };

      updateCounter();
    };

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting && !el.classList.contains('animated')) {
            const target = parseInt(el.getAttribute('data-target') || '0');
            if (target) {
              el.classList.add('animated');
              animateCounter(el, target);
              statsObserver.unobserve(el);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    // Observe each stat number directly (more reliable on mobile)
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    statNumbers.forEach((node) => statsObserver.observe(node));

    // Fallback for older mobile browsers: trigger on scroll/resize
    const tryStartCounters = () => {
      statNumbers.forEach((node) => {
        const el = node as HTMLElement;
        if (el.classList.contains('animated')) return;
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (inView) {
          const target = parseInt(el.getAttribute('data-target') || '0');
          if (target) {
            el.classList.add('animated');
            animateCounter(el, target);
            statsObserver.unobserve(el);
          }
        }
      });
    };

    window.addEventListener('scroll', tryStartCounters, { passive: true });
    window.addEventListener('resize', tryStartCounters);
    setTimeout(tryStartCounters, 300);

    // Removed banner scroll handler - banner is now static to prevent overlap

    // Observe the about section - no longer necessary; keep for safety
    // const aboutSection = document.querySelector('.about-section');
    // if (aboutSection) statsObserver.observe(aboutSection);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
      window.removeEventListener('pageshow', removeHomepageScrollbars);
      window.removeEventListener('scroll', tryStartCounters);
      window.removeEventListener('resize', tryStartCounters);
    };
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      // Reset slide to 0 if we switch to mobile and current slide is out of bounds
      if (window.innerWidth <= 768 && currentSlide >= 3) {
        setCurrentSlide(0);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [currentSlide]);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  // Navigation functions for arrow buttons
  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  // Show lead form 2 seconds after the user's first scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timer: number | null = null;

    const handleFirstScroll = () => {
      // Ignore if we've already scheduled or if there is no actual scroll yet
      if (leadFormScheduled.current || window.scrollY <= 0) return;

      leadFormScheduled.current = true;

      // Show the lead form after 2 seconds
      timer = window.setTimeout(() => {
        setIsLeadFormOpen(true);
      }, 2000);

      window.removeEventListener('scroll', handleFirstScroll);
    };

    window.addEventListener('scroll', handleFirstScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      if (timer !== null) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  // Company highlights - can be updated with real news later
  // const highlights = [
  //   { id: 1, title: 'Quality Manufacturing', description: 'GMP-certified facilities ensuring the highest standards in pharmaceutical production', icon: 'fas fa-certificate' },
  //   { id: 2, title: 'Research & Development', description: 'Continuous innovation in developing life-changing medications for patients globally', icon: 'fas fa-flask' },
  //   { id: 3, title: 'Patient-Centric Approach', description: 'Dedicated to improving healthcare outcomes through reliable and effective treatments', icon: 'fas fa-heartbeat' },
  // ];

  // Certifications and standards instead of fake partners
  // const certifications = [
  //   { name: 'GMP Certified', icon: 'fas fa-shield-alt' },
  //   { name: 'WHO Compliant', icon: 'fas fa-globe-americas' },
  //   { name: 'Quality Assured', icon: 'fas fa-award' },
  //   { name: 'ISO Standards', icon: 'fas fa-certificate' },
  // ];

  return (
    <div className="l3-container">
      {/* Hero Section */}
      <section className="l3-hero l3-section">
        <div className="l3-hero-carousel">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`l3-hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                '--desktop-image': `url('${banner.desktop}')`,
                '--mobile-image': `url('${banner.mobile}')`,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className="l3-hero-content">
          <h1 className="l3-hero-title-main">SPC Healthcare</h1>
          <div className="l3-hero-tagline" aria-label="Secure. Pure. Cure.">Secure. Pure. Cure.</div>
        </div>
        {/* Carousel Navigation Arrows */}
        <button
          className="l3-carousel-arrow l3-carousel-arrow-left"
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="l3-carousel-arrow l3-carousel-arrow-right"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <div className="l3-carousel-dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`l3-carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="l3-about l3-section" ref={statsRef}>
        <div className="l3-container-inner">
          <div className="l3-about-content">
            <div className="l3-about-image">
              <div className="l3-image-placeholder">
                <div className="l3-lab-equipment"></div>
                <div className="l3-scientists"></div>
              </div>
            </div>
            <div className="l3-about-text">
              <h2 className="l3-section-title">Trusted Healthcare Innovation Since 1999</h2>
              <p className="l3-about-desc">
                For over two decades, SPC Healthcare has been at the forefront of medical innovation, 
                delivering trusted healthcare solutions that improve patient lives across the globe.
              </p>
              <p className="l3-about-desc">
                Our commitment to research excellence, quality manufacturing, and patient-centric 
                approach drives everything we do, ensuring better health outcomes for communities worldwide.
              </p>
              <div className="l3-stats-section">
                <div className="l3-stat-item">
                  <div className="l3-stat-number">{stats.years}+</div>
                  <div className="l3-stat-label">Years of Innovation</div>
                </div>
                <div className="l3-stat-item">
                  <div className="l3-stat-number">{stats.products}+</div>
                  <div className="l3-stat-label">Healthcare Products</div>
                </div>
                <div className="l3-stat-item">
                  <div className="l3-stat-number">{stats.countries}+</div>
                  <div className="l3-stat-label">Countries Served</div>
                </div>
                <div className="l3-stat-item">
                  <div className="l3-stat-number">{stats.research}+</div>
                  <div className="l3-stat-label">Research Papers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* About Section */}
{/* <section id="about" className="l3-about l3-section">
  <div className="l3-container-inner">
    <div className="l3-about-content">
      <div className="l3-about-image">
        <div className="l3-image-placeholder">
          <div className="l3-lab-equipment"></div>
          <div className="l3-scientists"></div>
        </div>
      </div>
      <div className="l3-about-text">
        <h2 className="l3-section-title">Trusted Healthcare Innovation Since 1999</h2>
        <p className="l3-about-desc">
          For over two decades, SPC Healthcare has been at the forefront of medical innovation, 
          delivering trusted healthcare solutions that improve patient lives across the globe.
        </p>
        <p className="l3-about-desc">
          Our commitment to research excellence, quality manufacturing, and patient-centric 
          approach drives everything we do, ensuring better health outcomes for communities worldwide.
        </p>
        <div className="l3-stats-section">
          <div className="l3-stat-item">
            <div className="l3-stat-number" data-target="25">0</div>
            <div className="l3-stat-label">Years of Innovation</div>
          </div>
          <div className="l3-stat-item">
            <div className="l3-stat-number" data-target="150">0</div>
            <div className="l3-stat-label">Healthcare Products</div>
          </div>
          <div className="l3-stat-item">
            <div className="l3-stat-number" data-target="80">0</div>
            <div className="l3-stat-label">Countries Served</div>
          </div>
          <div className="l3-stat-item">
            <div className="l3-stat-number" data-target="500">0</div>
            <div className="l3-stat-label">Research Papers</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}

 {/* Product Divisions */}
 <section id="products" className="l3-divisions l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Our Therapeutic Range</h2>
          <p className="l3-section-subtitle">Comprehensive healthcare solutions across multiple therapeutic areas</p>
          <div className="l3-divisions-grid">
            {productDivisions.map((division) => (
              <Link
                key={division.id}
                href={division.href}
                className="l3-division-card"
                role="group"
                aria-label={`${division.title} division`}
              >
                <div className="l3-division-icon">
                  {division.image ? (
                    <Image
                      src={division.image}
                      alt={`${division.title} image`}
                      className="l3-division-img"
                      width={600}
                      height={400}
                      sizes="(max-width: 900px) 50vw, 33vw"
                    />
                  ) : null}
                  {division.icon && !division.image ? (
                    <i className={division.icon}></i>
                  ) : null}
                </div>
                <div className="l3-division-content">
                  <span
                    className="l3-division-btn"
                    aria-label={`Explore ${division.title} division`}
                  >
                    Explore Division
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


<section className="about-section">
  <div className="about-container">
    <div className="about-grid">
      {/* Left Column - Main Content */}
      <div className="about-main">
        <div className="section-badge">
          <span>About Us</span>
        </div>
        
        <h2 className="about-title">
          Trusted Healthcare Innovation 
          <span className="highlight"> Since 2017</span>
        </h2>
        
        <div className="about-description">
          <p>
            For over eight years, SPC Healthcare has been at the forefront of medical innovation, 
            delivering trusted healthcare solutions that improve patient lives across the globe.
          </p>
          <p>
            Our commitment to research excellence, quality manufacturing, and patient-centric 
            approach drives everything we do, ensuring better health outcomes for communities worldwide.
          </p>
        </div>

        {/* Feature List */}
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon"><i className="fas fa-flask"></i></div>
            <div className="feature-content">
              <h4>Research Excellence</h4>
              <p>Cutting-edge medical research and development</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon"><i className="fas fa-globe"></i></div>
            <div className="feature-content">
              <h4>Global Reach</h4>
              <p>Serving communities across 15+ countries worldwide</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon"><i className="fas fa-award"></i></div>
            <div className="feature-content">
              <h4>Quality Focus</h4>
              <p>Highest standards in manufacturing and safety</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon"><i className="fas fa-lightbulb"></i></div>
            <div className="feature-content">
              <h4>Innovation Driven</h4>
              <p>Continuous improvement and technological advancement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Stats */}
      <div className="about-stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number" data-target="08">0</div>
            <div className="stat-label">Years of Innovation</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
        
          <div className="stat-item">
            <div className="stat-number" data-target="07">0</div>
            <div className="stat-label">States Served</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">

            <div className="stat-number" data-target="20">0</div>
            <div className="stat-label">Research Papers</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div> {/* TODO: Add research papers */}
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="105">0</div>
            <div className="stat-label">Healthcare Products</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>

     

      {/* Featured Products */}
      <section className="l3-featured l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Our Highlighted Products</h2>
          <p className="l3-section-subtitle">Handpicked Essentials for Better Care</p>
          <div className="l3-products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <Link prefetch key={product.id} href={`/products/${product.slug}`} className="l3-product-card">
                  <div className="l3-product-badge">Featured</div>
                  <div className="l3-product-image">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                      <Image 
                        src={product.imageUrls[0]} 
                        alt={product.name}
                        className="l3-product-img"
                        width={300}
                        height={300}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : null}
                    <div className="l3-product-visual" style={{ display: product.imageUrls && product.imageUrls.length > 0 ? 'none' : 'block' }}></div>
                  </div>
                  <div className="l3-product-content">
                    <h3>{product.name}</h3>
                    <p>{product.shortDescription}</p>
                    <span className="l3-product-btn">View Details</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="l3-loading-message">
                <p>Loading featured products... ({featuredProducts.length} loaded)</p>
              </div>
            )}
          </div>
        </div>
      </section>


      <section className="l3-globe-section l3-section">
        <div className="l3-container-inner">
          <div className="l3-globe-content">
            <div className="l3-globe-text-content">
              <h2 className="l3-globe-heading">Serving these  States</h2>
              <p className="l3-globe-description">
                With a presence in over 11+ States,
                <br /> we are committed to delivering quality healthcare solutions worldwide.
              </p>
              <div className="l3-globe-stats-horizontal">
                <div className="l3-globe-stat-item">
                  <div className="l3-globe-stat-number">11+</div>
                  <div className="l3-globe-stat-label">States</div>
                </div>
                <div className="l3-globe-stat-item">
                  <div className="l3-globe-stat-number">105+</div>
                  <div className="l3-globe-stat-label">Products</div>
                </div>
                <div className="l3-globe-stat-item">
                  <div className="l3-globe-stat-number">8+</div>
                  <div className="l3-globe-stat-label">Years</div>
                </div>
              </div>
            </div>
            <div className="l3-globe-wrapper">
              {!videoError ? (
                <video
                  ref={videoRef}
                  className="l3-indian-map-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={() => {
                    setVideoError(true);
                  }}
                  aria-label="Indian Map showing states served by SPC Healthcare"
                >
                  <source src="/indian-map.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src="/Indian Map.gif"
                  alt="Indian Map showing states served by SPC Healthcare"
                  width={480}
                  height={480}
                  className="l3-indian-map-video"
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      </section>


      {/* Simple Banner Section with homepage.png */}
      <div className="l3-homepage-banner-wrapper">
        <Image
          src="/homepage.png"
          alt="SPC Healthcare"
          width={1920}
          height={1080}
          className="l3-homepage-banner"
          priority
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {/* R&D Section */}
      <section id="research" className="l3-research l3-section">
        <div className="l3-research-background">
          <div className="l3-dna-helix"></div>
          <div className="l3-molecule-orbit"></div>
        </div>
        <div className="l3-container-inner">
          <div className="l3-research-content">
            <h2 className="l3-research-title">Driven by Research. Focused on Tomorrow.</h2>
            <div className="l3-research-grid">
              <div className="l3-research-item">
                <div className="l3-research-icon"><i className="fas fa-flask"></i></div>
                <h3>Clinical Research</h3>
                <p>Ongoing trials across 15 therapeutic areas with 500+ participants worldwide</p>
              </div>
              <div className="l3-research-item">
                <div className="l3-research-icon"><i className="fas fa-file-medical"></i></div>
                <h3> Publications</h3>
                <p> 200+ research publications in reputed medical journals</p>
              </div>
              <div className="l3-research-item">
                <div className="l3-research-icon"><i className="fas fa-handshake"></i></div>
                <h3>Global Collaborations</h3>
                <p>Partnerships with 50+ leading medical institutions and research centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Achievements
      <section className="l3-achievements l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Our Track Record</h2>
          <p className="l3-section-subtitle">Proven excellence in pharmaceutical manufacturing and innovation</p>
          <div className="l3-achievements-grid">
            {achievements.map(achievement => (
              <div key={achievement.id} className="l3-achievement-card">
                <div className="l3-achievement-icon">
                  <i className={achievement.icon}></i>
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Certifications & Standards */}
    
     

      {/* CTA Section */}
      <section id="contact" className="l3-cta l3-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="l3-cta-content">
            <h2 className="l3-cta-title">Join Us in Shaping the Future of Healthcare</h2>
            <p className="l3-cta-text">
              Partner with SPC Healthcare to deliver innovative healthcare solutions that make a difference in people&apos;s lives worldwide.
            </p>
            <div className="l3-cta-buttons">
              <button 
                className="l3-btn l3-btn-primary l3-btn-large"
                onClick={() => window.location.href = '/contact'}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

     

      <LeadForm
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        triggerElement="homepage_first_scroll"
      />

      {/* Footer */}
      {/* <footer className="l3-footer">
        <div className="l3-container-inner">
          <div className="l3-footer-content">
            <div className="l3-footer-section">
              <div className="l3-logo">
                <span className="l3-logo-icon">⚕️</span>
                <span className="l3-logo-text">SPC Healthcare</span>
              </div>
              <p className="l3-footer-desc">
                Innovating healthcare solutions for a healthier world since 1999.
              </p>
            </div>
            <div className="l3-footer-section">
              <h4>Quick Links</h4>
              <a href="#about">About Us</a>
              <a href="#products">Products</a>
              <a href="#research">Research</a>
              <a href="#news">News</a>
            </div>
            <div className="l3-footer-section">
              <h4>Contact</h4>
              <p>Email: info@spchealth.com</p>
              <p>Phone: +1 (555) 123-HEAL</p>
              <p>Address: 123 Healthcare Ave, Medical City</p>
            </div>
          </div>
          <div className="l3-footer-bottom">
            <p>&copy; 2024 SPC Healthcare. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}