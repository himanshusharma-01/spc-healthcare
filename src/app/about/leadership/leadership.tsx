'use client';

import { useEffect } from 'react';
import '../../components/Homepage.css';
import './leadership.css';
import Link from 'next/link';

export default function LeadershipPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('l3-animate-in');
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll('.leadership-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="l3-container leadership-page">
      {/* Hero Section */}
      <section className="leadership-hero l3-section leadership-section" id="leadership-hero" aria-label="Leadership hero banner">
        <div className="leadership-hero-background"></div>
      </section>

      {/* Leadership Philosophy */}
      <section className="leadership-philosophy leadership-section">
        <div className="l3-container-inner">
          <div className="philosophy-content">
            <h2 className="l3-section-title">Our Leadership Philosophy</h2>
            <p className="philosophy-intro">
              Our leadership approach is built on fundamental principles that guide every decision 
              and action we take in our mission to deliver exceptional healthcare solutions.
            </p>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <div className="philosophy-icon">🎯</div>
                <h3>Visionary Thinking</h3>
                <p>Anticipating healthcare needs and innovating for future challenges</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">🤝</div>
                <h3>Collaborative Approach</h3>
                <p>Fostering teamwork and partnerships across all operations</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">⚡</div>
                <h3>Agile Leadership</h3>
                <p>Adapting quickly to changing healthcare landscapes and opportunities</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">❤️</div>
                <h3>Customer-Centered</h3>
                <p>Keeping customer needs and wellbeing at the core of all decisions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Overview */}
      <section className="leadership-overview leadership-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Leadership</h2>
            <p className="l3-section-subtitle">
              At SPC Healthcare, our leadership team is committed to driving innovation, 
              excellence, and growth in the healthcare industry. Our leaders bring together 
              decades of combined experience and a shared vision to deliver high-quality 
              healthcare solutions.
            </p>
          </div>
          <div className="leadership-content">
            <div className="leadership-text">
              <p>
                Our leadership team combines strategic vision with operational excellence, 
                ensuring that SPC Healthcare continues to grow and serve our customers with 
                dedication and integrity. We believe in fostering a culture of collaboration, 
                innovation, and continuous improvement.
              </p>
              <p>
                Through strong leadership and a commitment to our core values, we guide our 
                organization toward achieving our mission of making healthcare products accessible, 
                dependable, and efficiently delivered to those who need them most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="leadership-cta leadership-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="leadership-cta-content">
            <h2 className="leadership-cta-title">Join Our Leadership Team</h2>
            <p className="leadership-cta-text">
              Are you passionate about transforming healthcare? Explore opportunities 
              to join our leadership team and make a global impact.
            </p>
            <div className="leadership-cta-buttons">
             <Link href="/careers"> <button className="l3-btn l3-btn-primary l3-btn-large">View Open Positions</button></Link>
            <Link href="/contact">  <button className="l3-btn l3-btn-secondary l3-btn-large">Contact Talent Team</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}