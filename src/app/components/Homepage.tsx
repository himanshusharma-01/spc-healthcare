'use client';

import { useEffect, useState, useRef } from 'react';
import './Homepage.css';

export default function Homepage() {
  const [stats, setStats] = useState({ years: 0, products: 0, countries: 0, research: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  const featuredProducts = [
    { id: 1, name: 'CardioPlus', benefit: 'Advanced Cardiovascular Support', category: 'Pharmaceuticals' },
    { id: 2, name: 'NeuroCalm', benefit: 'Cognitive Health & Mental Clarity', category: 'Nutraceuticals' },
    { id: 3, name: 'ImmuneShield', benefit: 'Enhanced Immune Protection', category: 'OTC & Wellness' },
    { id: 4, name: 'DermaCare', benefit: 'Advanced Skin Solutions', category: 'Dermatology' },
  ];

  const productDivisions = [
    { id: 1, title: 'Pharmaceuticals', desc: 'Research-based prescription medicines', icon: '💊', count: '200+ Products' },
    { id: 2, title: 'Nutraceuticals', desc: 'Science-backed health supplements', icon: '🌿', count: '150+ Formulas' },
    { id: 3, title: 'OTC & Wellness', desc: 'Everyday healthcare solutions', icon: '🏠', count: '100+ Products' },
    { id: 4, title: 'Dermatology', desc: 'Advanced skincare treatments', icon: '✨', count: '50+ Solutions' },
  ];

  const testimonials = [
    { id: 1, name: 'Dr. Sarah Chen', role: 'Chief Cardiologist', text: 'SPC Healthcare\'s cardiovascular products have shown remarkable results in clinical trials, improving patient outcomes significantly.', avatar: '👩‍⚕️' },
    { id: 2, name: 'Dr. Michael Rodriguez', role: 'Research Director', text: 'The innovation and quality standards at SPC Healthcare set new benchmarks in pharmaceutical research and development.', avatar: '👨‍⚕️' },
    { id: 3, name: 'Emma Thompson', role: 'Global Distribution Partner', text: 'Working with SPC Healthcare for over a decade - their reliability and product excellence are unmatched in the industry.', avatar: '👩‍💼' },
  ];

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const targetStats = { years: 25, products: 500, countries: 80, research: 50 };
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        years: Math.min(Math.floor(targetStats.years * progress), targetStats.years),
        products: Math.min(Math.floor(targetStats.products * progress), targetStats.products),
        countries: Math.min(Math.floor(targetStats.countries * progress), targetStats.countries),
        research: Math.min(Math.floor(targetStats.research * progress), targetStats.research)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepDuration);
  };


  useEffect(() => {

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('l3-animate-in');
            if (entry.target.classList.contains('l3-stats-section')) {
              animateStats();
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('.l3-section');
    sections.forEach(section => observer.observe(section));

    // Testimonial auto-rotate
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      observer.disconnect();
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]);

  const news = [
    { id: 1, title: 'Breakthrough in Diabetes Treatment', date: 'March 15, 2024', excerpt: 'New research shows promising results in managing type 2 diabetes with innovative therapy.' },
    { id: 2, title: 'Global Expansion to European Markets', date: 'March 10, 2024', excerpt: 'SPC Healthcare announces entry into 5 new European countries with comprehensive product portfolio.' },
    { id: 3, title: 'Sustainability Initiative Launched', date: 'March 5, 2024', excerpt: 'Committed to environmental responsibility with new green manufacturing practices.' },
  ];

  const partners = [
    { name: 'Global Health Org', logo: '🏥' },
    { name: 'MedResearch', logo: '🔬' },
    { name: 'Pharma Alliance', logo: '💊' },
    { name: 'Health Innovation', logo: '⚕️' },
    { name: 'BioTech Partners', logo: '🧬' },
  ];

  const pharmaceuticalLogos = [
    '💊', '🌡️', '🧪', '🔬', '🧫', '🧬', '⚗️', '🦠', '🧴', '💉'
  ];

  return (
    <div className="l3-container">
      {/* Hero Section */}
      <section className="l3-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          {/* Pharmaceutical Logos Animation */}
          <div className="l3-pharma-logos">
            {pharmaceuticalLogos.map((logo, index) => (
              <div 
                key={index} 
                className="l3-pharma-logo"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  left: `${Math.random() * 90}%`,
                  top: `${Math.random() * 90}%`
                }}
              >
                {logo}
              </div>
            ))}
          </div>
          <div className="l3-floating-shape l3-shape-1"></div>
          <div className="l3-floating-shape l3-shape-2"></div>
          <div className="l3-floating-shape l3-shape-3"></div>
        </div>
        <div className="l3-hero-content">
          <div className="l3-hero-text">
            <h1 className="l3-hero-title">
              <span className="l3-title-line">Innovating Healthcare,</span>
              <span className="l3-title-line">Improving Lives</span>
            </h1>
            <p className="l3-hero-subtitle">
              Trusted by healthcare professionals worldwide, delivering innovative solutions for better patient outcomes through cutting-edge research and development.
            </p>
            <div className="l3-hero-buttons">
              <button className="l3-btn l3-btn-primary">Explore Our Products</button>
              <button className="l3-btn l3-btn-secondary">Learn About Us</button>
            </div>
            <div className="l3-hero-stats">
              <div className="l3-hero-stat">
                <span className="l3-stat-number">25+</span>
                <span className="l3-stat-label">Years Experience</span>
              </div>
              <div className="l3-hero-stat">
                <span className="l3-stat-number">80+</span>
                <span className="l3-stat-label">Countries</span>
              </div>
              <div className="l3-hero-stat">
                <span className="l3-stat-number">500+</span>
                <span className="l3-stat-label">Products</span>
              </div>
            </div>
          </div>
          <div className="l3-hero-visual">
            <div className="l3-science-illustration">
              <div className="l3-molecule l3-mol-1"></div>
              <div className="l3-molecule l3-mol-2"></div>
              <div className="l3-molecule l3-mol-3"></div>
              <div className="l3-dna-helix-animated"></div>
              <div className="l3-medical-cross"></div>
            </div>
          </div>
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
            For over two decades, SPC Healthcare has been at the forefront of medical innovation, 
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
            <div className="feature-icon">🔬</div>
            <div className="feature-content">
              <h4>Research Excellence</h4>
              <p>Cutting-edge medical research and development</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <div className="feature-content">
              <h4>Global Reach</h4>
              <p>Serving communities across 80+ countries worldwide</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <div className="feature-content">
              <h4>Quality Focus</h4>
              <p>Highest standards in manufacturing and safety</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">💡</div>
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
            <div className="stat-number" data-target="25">25+</div>
            <div className="stat-label">Years of Innovation</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="150">500+</div>
            <div className="stat-label">Healthcare Products</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="80">80+</div>
            <div className="stat-label">Countries Served</div>
            <div className="stat-bar">
              <div className="stat-progress" style={{width: '100%'}}></div>
            </div>
          </div>
          
          <div className="stat-item">
            <div className="stat-number" data-target="500">200+</div>
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




      {/* Product Divisions */}
      <section id="products" className="l3-divisions l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Our Product Divisions</h2>
          <p className="l3-section-subtitle">Comprehensive healthcare solutions across multiple therapeutic areas</p>
          <div className="l3-divisions-grid">
            {productDivisions.map(division => (
              <div key={division.id} className="l3-division-card">
                <div className="l3-division-icon">{division.icon}</div>
                <h3>{division.title}</h3>
                <p>{division.desc}</p>
                <div className="l3-division-count">{division.count}</div>
                <button className="l3-division-btn">Explore Division</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="l3-featured l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Featured Products</h2>
          <p className="l3-section-subtitle">Our latest innovations making a difference in patient care</p>
          <div className="l3-products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="l3-product-card">
                <div className="l3-product-badge">{product.category}</div>
                <div className="l3-product-image">
                  <div className="l3-product-visual"></div>
                </div>
                <div className="l3-product-content">
                  <h3>{product.name}</h3>
                  <p>{product.benefit}</p>
                  <button className="l3-product-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <div className="l3-research-icon">🔬</div>
                <h3>Clinical Research</h3>
                <p>Ongoing trials across 15 therapeutic areas with 5,000+ participants worldwide</p>
              </div>
              <div className="l3-research-item">
                <div className="l3-research-icon">📄</div>
                <h3>Patents & Publications</h3>
                <p>150+ patents and 200+ research publications in reputed medical journals</p>
              </div>
              <div className="l3-research-item">
                <div className="l3-research-icon">🤝</div>
                <h3>Global Collaborations</h3>
                <p>Partnerships with 50+ leading medical institutions and research centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="l3-testimonials l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Trusted by Healthcare Professionals</h2>
          <div className="l3-testimonial-container">
            <div className="l3-testimonial-track" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="l3-testimonial-slide">
                  <div className="l3-testimonial-card">
                    <div className="l3-testimonial-avatar">{testimonial.avatar}</div>
                    <p className="l3-testimonial-text">&quot;{testimonial.text}&quot;</p>
                    <div className="l3-testimonial-author">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="l3-testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`l3-dot ${index === currentTestimonial ? 'l3-active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="l3-partners l3-section">
        <div className="l3-container-inner">
          <h3 className="l3-partners-title">Trusted by Leading Organizations</h3>
          <div className="l3-partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="l3-partner-logo">
                <span className="l3-partner-icon">{partner.logo}</span>
                <span className="l3-partner-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="l3-news l3-section">
        <div className="l3-container-inner">
          <h2 className="l3-section-title">Latest Updates</h2>
          <p className="l3-section-subtitle">Stay informed with our latest developments and achievements</p>
          <div className="l3-news-grid">
            {news.map(item => (
              <article key={item.id} className="l3-news-card">
                <div className="l3-news-image">
                  <div className="l3-news-overlay"></div>
                </div>
                <div className="l3-news-content">
                  <span className="l3-news-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <a href="#" className="l3-news-link">Read More →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
              <button className="l3-btn l3-btn-primary l3-btn-large">Get in Touch</button>
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