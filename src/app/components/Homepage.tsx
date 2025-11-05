'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/getProducts';
import { filterProductsByCategory, type Product as SPCProduct } from '@/lib/productCategoryUtils';
import './Homepage.css';

export default function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState<SPCProduct[]>([]);

  const productDivisions = [
    { id: 1, title: 'Syrups', desc: 'Liquid medications for easy administration', icon: 'fas fa-prescription-bottle', image: '/syrup.jpeg', count: '50+ Syrups', href: '/products/Syrups' },
    { id: 2, title: 'Capsules', desc: 'Encapsulated medicines for controlled release', icon: 'fas fa-capsules', image: '/capsules.jpeg', count: '80+ Capsules', href: '/products/Capsules' },
    { id: 3, title: 'Tablets', desc: 'Solid dosage forms for precise medication', icon: 'fas fa-tablets', image: '/tablet.jpeg', count: '120+ Tablets', href: '/products/Tablets' },
    { id: 4, title: 'Oral Drops', desc: 'Concentrated liquid drops for accurate dosing', icon: 'fas fa-tint', image: '/drops.jpg', count: '30+ Drops', href: '/products/OralDrops' },
  ];

  // Company achievements instead of fake testimonials
  const achievements = [
    { id: 1, title: '25+ Years', description: 'Trusted expertise in pharmaceutical manufacturing and innovation', icon: 'fas fa-calendar-check' },
    { id: 2, title: '500+ Products', description: 'Comprehensive portfolio across multiple therapeutic categories', icon: 'fas fa-pills' },
    { id: 3, title: '80+ Countries', description: 'Global reach serving healthcare communities worldwide', icon: 'fas fa-globe' },
  ];

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

    return () => {
      observer.disconnect();
      window.removeEventListener('pageshow', removeHomepageScrollbars);
    };
  }, []);

  // Company highlights - can be updated with real news later
  const highlights = [
    { id: 1, title: 'Quality Manufacturing', description: 'GMP-certified facilities ensuring the highest standards in pharmaceutical production', icon: 'fas fa-certificate' },
    { id: 2, title: 'Research & Development', description: 'Continuous innovation in developing life-changing medications for patients globally', icon: 'fas fa-flask' },
    { id: 3, title: 'Patient-Centric Approach', description: 'Dedicated to improving healthcare outcomes through reliable and effective treatments', icon: 'fas fa-heartbeat' },
  ];

  // Certifications and standards instead of fake partners
  const certifications = [
    { name: 'GMP Certified', icon: 'fas fa-shield-alt' },
    { name: 'WHO Compliant', icon: 'fas fa-globe-americas' },
    { name: 'Quality Assured', icon: 'fas fa-award' },
    { name: 'ISO Standards', icon: 'fas fa-certificate' },
  ];

  return (
    <div className="l3-container">
      {/* Hero Section */}
      <section className="l3-hero l3-section">
        <div className="l3-hero-background"></div>
        <div className="l3-hero-content">
          <h1 className="l3-hero-title-main">SPC Healthcare</h1>
          <div className="l3-hero-tagline" aria-label="Secure. Pure. Cure.">Secure. Pure. Cure.</div>
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
          <h2 className="l3-section-title">Our Product Divisions</h2>
          <p className="l3-section-subtitle">Comprehensive healthcare solutions across multiple therapeutic areas</p>
          <div className="l3-divisions-grid">
            {productDivisions.map(division => (
              <div key={division.id} className="l3-division-card">
                <div className="l3-division-icon">
                  {division.image ? (
                    <img
                      src={division.image}
                      alt={`${division.title} image`}
                      className="l3-division-img"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const icon = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (icon) icon.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <i className={division.icon} style={{ display: division.image ? 'none' : 'block' }}></i>
                </div>
                <h3>{division.title}</h3>
                <p>{division.desc}</p>
                <div className="l3-division-count">{division.count}</div>
                <Link prefetch href={division.href} className="l3-division-btn">Explore Division</Link>
              </div>
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
          <span className="highlight"> Since 1999</span>
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
            <div className="stat-number" data-target="25">8+</div>
            <div className="stat-label">Years of Innovation</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="150">105+</div>
            <div className="stat-label">Healthcare Products</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="80">15+</div>
            <div className="stat-label">Countries Served</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="500">20+</div>
            <div className="stat-label">Research Papers</div>
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
          <h2 className="l3-section-title">Featured Products</h2>
          <p className="l3-section-subtitle">Our latest innovations making a difference in patient care</p>
          <div className="l3-products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <Link prefetch key={product.id} href={`/products/${product.slug}`} className="l3-product-card">
                  <div className="l3-product-badge">Featured</div>
                  <div className="l3-product-image">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.name}
                        className="l3-product-img"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const next = e.currentTarget.nextElementSibling as HTMLElement;
                          if (next) next.style.display = 'block';
                        }}
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

      {/* Parallax Banner Section */}
      <div className="l3-parallax-banner-wrapper">
        <div className="l3-parallax-banner"></div>
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
                <p>Ongoing trials across 15 therapeutic areas with 5,000+ participants worldwide</p>
              </div>
              <div className="l3-research-item">
                <div className="l3-research-icon"><i className="fas fa-file-medical"></i></div>
                <h3>Patents & Publications</h3>
                <p>150+ patents and 200+ research publications in reputed medical journals</p>
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