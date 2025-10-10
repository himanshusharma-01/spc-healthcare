'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './simple-contact.css';

export default function SimpleContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="l3-container contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="l3-container-inner">
          <div className="contact-hero-content">
            <div className="contact-hero-text">
              <h1 className="contact-hero-title">Get in Touch</h1>
              <p className="contact-hero-subtitle">
                Ready to transform healthcare together? Reach out to our team for partnerships, 
                inquiries, or to learn more about our innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="l3-container-inner">
          <div className="contact-form-container">
            <div className="contact-form-wrapper">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="l3-container-inner">
          <h2>Contact Information</h2>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <h3>Headquarters</h3>
              <p>123 Healthcare Avenue<br />Medical City, MC 12345</p>
              <p>Phone: +1 (555) 123-HEAL</p>
              <p>Email: info@spchealth.com</p>
            </div>
            <div className="contact-info-item">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 8:00 AM - 6:00 PM EST</p>
              <p>Saturday: 9:00 AM - 2:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
