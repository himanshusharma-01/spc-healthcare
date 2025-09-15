// Homepage.tsx
'use client';

import React, { useEffect } from 'react';
import './Homepage.css';

const Homepage: React.FC = () => {
  useEffect(() => {
    // Simple animation for elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          observer.unobserve(entry.target);
        }
      });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
      (element as HTMLElement).style.opacity = '0';
      (element as HTMLElement).style.transition = 'opacity 0.5s ease-in-out';
      fadeInObserver.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      fadeInObserver.disconnect();
    };
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="medical-symbols">
          <div className="symbol symbol-1">❤️</div>
          <div className="symbol symbol-2">➕</div>
          <div className="symbol symbol-3">💊</div>
          <div className="symbol symbol-4">🏥</div>
          <div className="symbol symbol-5">🌡️</div>
        </div>
        <div className="container hero-content fade-in">
          <h1>Premium Pharmaceuticals with Precision & Care</h1>
          <p>Experience world-class healthcare solutions with cutting-edge formulations and compassionate service dedicated to your wellbeing.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <i className="fas fa-arrow-right"></i> Explore Our Products
            </button>
            <button className="btn btn-accent">
              <i className="fas fa-prescription"></i> Consult Specialist
            </button>
          </div>
        </div>
      </section>

       {/* // Add this section after the Testimonials section and before the CTA section */}
<section className="quotes-section">
  <div className="container">
    <div className="plus-sign-container">
      <div className="rotating-plus">
        <div className="plus-horizontal"></div>
        <div className="plus-vertical"></div>
        <div className="pink-fumes"></div>
      </div>
    </div>
    <div className="healthcare-quotes">
      <div className="quote fade-in">
        <h3>Innovation in Healthcare</h3>
        <p>Advancing medicine through cutting-edge research and development</p>
      </div>
      <div className="quote fade-in">
        <h3>Quality Assurance</h3>
        <p>Rigorous testing standards ensuring safety and efficacy</p>
      </div>
      <div className="quote fade-in">
        <h3>Patient-Centered Care</h3>
        <p>Putting patient wellbeing at the heart of everything we do</p>
      </div>
      <div className="quote fade-in">
        <h3>Global Standards</h3>
        <p>Meeting international pharmaceutical excellence benchmarks</p>
      </div>
    </div>
  </div>
</section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Premium Products</h2>
            <p className="section-subtitle">We offer comprehensive pharmaceutical solutions using the latest research and formulation methods.</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card fade-in">
              <div className="service-icon">
                <i className="fas fa-pills"></i>
              </div>
              <h3 className="service-title">Prescription Medicines</h3>
              <p className="service-desc">High-quality medications formulated with precision and rigorous quality control standards.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
            
            <div className="service-card fade-in">
              <div className="service-icon">
                <i className="fas fa-capsules"></i>
              </div>
              <h3 className="service-title">Over-the-Counter</h3>
              <p className="service-desc">Trusted OTC products for everyday health needs, from pain relief to allergy medication.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
            
            <div className="service-card fade-in">
              <div className="service-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3 className="service-title">Specialty Drugs</h3>
              <p className="service-desc">Advanced treatments for complex conditions with personalized support services.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-container">
            <div className="features-content">
              <h2 className="section-title">Why Choose Our Pharmaceuticals?</h2>
              <p>We are committed to providing exceptional healthcare solutions with a focus on innovation, precision, and excellence.</p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="feature-text">
                    <h4>FDA Approved Formulations</h4>
                    <p>All our products meet rigorous quality and safety standards.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Advanced Research</h4>
                    <p>We utilize cutting-edge research for effective treatment solutions.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Personalized Support</h4>
                    <p>Every customer receives guidance tailored to their specific needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="features-image">
              <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Pharmaceutical Research" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="doctors">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Featured Products</h2>
            <p className="section-subtitle">Discover our range of premium pharmaceutical solutions developed for optimal health outcomes.</p>
          </div>
          
          <div className="doctors-grid">
            <div className="doctor-card fade-in">
              <div className="doctor-image">
                <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Cardiocare Capsules" />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">Cardiocare Capsules</h3>
                <p className="doctor-specialty">Cardiovascular Health</p>
                <p className="doctor-desc">Advanced formula supporting heart health and circulation with natural ingredients.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
            
            <div className="doctor-card fade-in">
              <div className="doctor-image">
                <img src="https://images.unsplash.com/photo-1550572017-edd951b55104?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Neurozen Tablets" />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">Neurozen Tablets</h3>
                <p className="doctor-specialty">Cognitive Support</p>
                <p className="doctor-desc">Enhances mental clarity and focus with scientifically-backed ingredients.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
            
            <div className="doctor-card fade-in">
              <div className="doctor-image">
                <img src="https://images.unsplash.com/photo-1591746316584-4210d0536af8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="ImmunoPlus Syrup" />
              </div>
              <div className="doctor-info">
                <h3 className="doctor-name">ImmunoPlus Syrup</h3>
                <p className="doctor-specialty">Immune Support</p>
                <p className="doctor-desc">Boosts natural immunity with a powerful blend of vitamins and antioxidants.</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Customer Testimonials</h2>
            <p className="section-subtitle">Hear what our customers have to say about their experiences with our products.</p>
          </div>
          
          <div className="testimonials-container">
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">The Cardiocare capsules have made a significant difference in my blood pressure management. I feel more energetic and confident about my heart health.</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Robert Johnson" />
                </div>
                <div className="author-info">
                  <h4>Robert Johnson</h4>
                  <p>Cardiocare User</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">As a senior, I've struggled with memory issues. Neurozen has helped me maintain mental clarity and focus throughout my day. Highly recommended!</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Margaret Williams" />
                </div>
                <div className="author-info">
                  <h4>Margaret Williams</h4>
                  <p>Neurozen User</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card fade-in">
              <p className="testimonial-text">ImmunoPlus has been a game-changer for our family. We've noticed significantly fewer sick days since incorporating it into our daily routine.</p>
              <div className="testimonial-author">
                <div className="author-image">
                  <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db1604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" alt="Maria Garcia" />
                </div>
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
      <section className="cta">
        <div className="container cta-content fade-in">
          <h2>Ready to Experience Premium Pharmaceuticals?</h2>
          <p>Find the right solution for your health needs and take the first step towards better wellbeing.</p>
          <div className="cta-buttons">
            <button className="btn btn-white">
              <i className="fas fa-shopping-cart"></i> Shop Products
            </button>
            <button className="btn btn-outline-white">
              <i className="fas fa-phone-alt"></i> Consult Expert: (123) 456-7890
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;