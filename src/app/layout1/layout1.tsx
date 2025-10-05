import React from 'react';
import './layout1.css';

const Layout1 = () => {
  return (
    <div className="layout1-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="/BANNER2.png" 
            alt="SPC Healthcare - Advancing Medical Excellence"
            className="hero-banner"
          />
          <div className="hero-overlay"></div>
        </div>
        
        {/* Animated Medical Symbols */}
        <div className="medical-symbols">
          <div className="symbol symbol-1">❤️</div>
          <div className="symbol symbol-2">➕</div>
          <div className="symbol symbol-3">💊</div>
          <div className="symbol symbol-4">🏥</div>
          <div className="symbol symbol-5">🌡️</div>
        </div>

        {/* DNA Animation */}
        {/* DNA Animation - Fixed */}
        {/* DNA animation removed */}

        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Premium <span className="highlight">Pharmaceuticals</span> with Precision & Care
            </h1>
            <p className="hero-subtitle">
              Experience world-class healthcare solutions with cutting-edge formulations and compassionate service dedicated to your wellbeing.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                <span className="btn-icon">→</span>
                Explore Our Products
              </button>
              <button className="btn btn-accent">
                <span className="btn-icon">💊</span>
                Consult Specialist
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="quotes-section">
        <div className="container">
          <div className="animated-plus-container">
            <div className="rotating-plus">
              <div className="plus-horizontal"></div>
              <div className="plus-vertical"></div>
              <div className="pulse-ring"></div>
            </div>
          </div>
          <div className="healthcare-quotes">
            <div className="quote-card">
              <h3>Innovation in Healthcare</h3>
              <p>Advancing medicine through cutting-edge research and development</p>
            </div>
            <div className="quote-card">
              <h3>Quality Assurance</h3>
              <p>Rigorous testing standards ensuring safety and efficacy</p>
            </div>
            <div className="quote-card">
              <h3>Patient-Centered Care</h3>
              <p>Putting patient wellbeing at the heart of everything we do</p>
            </div>
            <div className="quote-card">
              <h3>Global Standards</h3>
              <p>Meeting international pharmaceutical excellence benchmarks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Premium Products</h2>
            <p className="section-subtitle">
              We offer comprehensive pharmaceutical solutions using the latest research and formulation methods.
            </p>
          </div>
          
          <div className="products-grid">
            <div className="product-card">
              <div className="product-icon">
                <span className="icon">💊</span>
              </div>
              <h3 className="product-title">Prescription Medicines</h3>
              <p className="product-desc">
                High-quality medications formulated with precision and rigorous quality control standards.
              </p>
              <button className="btn btn-outline">Learn More</button>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <span className="icon">🧴</span>
              </div>
              <h3 className="product-title">Over-the-Counter</h3>
              <p className="product-desc">
                Trusted OTC products for everyday health needs, from pain relief to allergy medication.
              </p>
              <button className="btn btn-outline">Learn More</button>
            </div>
            
            <div className="product-card">
              <div className="product-icon">
                <span className="icon">❤️</span>
              </div>
              <h3 className="product-title">Specialty Drugs</h3>
              <p className="product-desc">
                Advanced treatments for complex conditions with personalized support services.
              </p>
              <button className="btn btn-outline">Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-container">
            <div className="features-content">
              <h2 className="section-title">Why Choose SPC Healthcare?</h2>
              <p className="features-intro">
                We are committed to providing exceptional healthcare solutions with a focus on innovation, precision, and excellence.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <span className="check-icon">✓</span>
                  </div>
                  <div className="feature-text">
                    <h4>FDA Approved Formulations</h4>
                    <p>All our products meet rigorous quality and safety standards.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <span className="check-icon">✓</span>
                  </div>
                  <div className="feature-text">
                    <h4>Advanced Research</h4>
                    <p>We utilize cutting-edge research for effective treatment solutions.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <span className="check-icon">✓</span>
                  </div>
                  <div className="feature-text">
                    <h4>Personalized Support</h4>
                    <p>Every customer receives guidance tailored to their specific needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="features-visual">
              <div className="floating-elements">
                <div className="floating-element element-1">💊</div>
                <div className="floating-element element-2">🧬</div>
                <div className="floating-element element-3">🔬</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Featured Products</h2>
            <p className="section-subtitle">
              Discover our range of premium pharmaceutical solutions developed for optimal health outcomes.
            </p>
          </div>
          
          <div className="featured-grid">
            <div className="featured-card">
              <div className="product-image">
                <div className="image-placeholder">Cardiocare</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">Cardiocare Capsules</h3>
                <p className="product-category">Cardiovascular Health</p>
                <p className="product-description">
                  Advanced formula supporting heart health and circulation with natural ingredients.
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
            
            <div className="featured-card">
              <div className="product-image">
                <div className="image-placeholder">Neurozen</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">Neurozen Tablets</h3>
                <p className="product-category">Cognitive Support</p>
                <p className="product-description">
                  Enhances mental clarity and focus with scientifically-backed ingredients.
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
            
            <div className="featured-card">
              <div className="product-image">
                <div className="image-placeholder">ImmunoPlus</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">ImmunoPlus Syrup</h3>
                <p className="product-category">Immune Support</p>
                <p className="product-description">
                  Boosts natural immunity with a powerful blend of vitamins and antioxidants.
                </p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Customer Testimonials</h2>
            <p className="section-subtitle">
              Hear what our customers have to say about their experiences with our products.
            </p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                The Cardiocare capsules have made a significant difference in my blood pressure management. I feel more energetic and confident about my heart health.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RJ</div>
                <div className="author-info">
                  <h4>Robert Johnson</h4>
                  <p>Cardiocare User</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                As a senior, I&apos;ve struggled with memory issues. Neurozen has helped me maintain mental clarity and focus throughout my day. Highly recommended!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MW</div>
                <div className="author-info">
                  <h4>Margaret Williams</h4>
                  <p>Neurozen User</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                ImmunoPlus has been a game-changer for our family. We&apos;ve noticed significantly fewer sick days since incorporating it into our daily routine.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MG</div>
                <div className="author-info">
                  <h4>Maria Garcia</h4>
                  <p>ImmunoPlus User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Premium Pharmaceuticals?</h2>
            <p>Find the right solution for your health needs and take the first step towards better wellbeing.</p>
            <div className="cta-buttons">
              <button className="btn btn-accent">
                <span className="btn-icon">🛒</span>
                Shop Products
              </button>
              <button className="btn btn-outline-white">
                <span className="btn-icon">📞</span>
                Consult Expert: (123) 456-7890
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layout1;