'use client';

import React from 'react';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to SPC Healthcare</h1>
          <p>Your trusted partner in quality healthcare services</p>
          <button className="cta-button">Book an Appointment</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🏥</div>
            <h3>General Medicine</h3>
            <p>Comprehensive healthcare for the whole family</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💊</div>
            <h3>Pharmacy</h3>
            <p>Quality medications and expert advice</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🩺</div>
            <h3>Specialist Care</h3>
            <p>Expert care from specialized physicians</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            SPC Healthcare is dedicated to providing exceptional medical care with compassion and expertise. 
            Our team of healthcare professionals is committed to your well-being.
          </p>
          <button className="secondary-button">Learn More</button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-method">
            <span className="contact-icon">📞</span>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-method">
            <span className="contact-icon">✉️</span>
            <p>info@spchealthcare.com</p>
          </div>
          <div className="contact-method">
            <span className="contact-icon">📍</span>
            <p>123 Healthcare St, Medical District</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
