'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    inquiryType: 'general',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const globalOffices = [
    {
      region: 'Global Headquarters',
      address: '123 Healthcare Avenue, Medical City, MC 12345',
      phone: '+1 (555) 123-HEAL',
      email: 'hq@spchealth.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM EST',
      icon: '🏢'
    },
    {
      region: 'European Operations',
      address: '456 Pharma Strasse, Berlin, Germany 10115',
      phone: '+49 30 12345678',
      email: 'europe@spchealth.com',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM CET',
      icon: '🇪🇺'
    },
    {
      region: 'Asia-Pacific Center',
      address: '789 Medical Tower, Singapore 018989',
      phone: '+65 6123 4567',
      email: 'asia@spchealth.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT',
      icon: '🌏'
    }
  ];

  const departments = [
    {
      name: 'General Inquiries',
      email: 'info@spchealth.com',
      phone: '+1 (555) 123-HEAL',
      description: 'For general questions about our company and services',
      icon: '💼'
    },
    {
      name: 'Medical Information',
      email: 'medical@spchealth.com',
      phone: '+1 (555) 123-MED1',
      description: 'Healthcare professional inquiries and product information',
      icon: '⚕️'
    },
    {
      name: 'Business Development',
      email: 'partnerships@spchealth.com',
      phone: '+1 (555) 123-BIZ1',
      description: 'Partnership opportunities and corporate collaborations',
      icon: '🤝'
    },
    {
      name: 'Investor Relations',
      email: 'investors@spchealth.com',
      phone: '+1 (555) 123-INV1',
      description: 'Investment opportunities and shareholder information',
      icon: '📈'
    },
    {
      name: 'Media & Press',
      email: 'media@spchealth.com',
      phone: '+1 (555) 123-PR01',
      description: 'Press releases and media inquiries',
      icon: '📰'
    },
    {
      name: 'Career Opportunities',
      email: 'careers@spchealth.com',
      phone: '+1 (555) 123-JOBS',
      description: 'Employment opportunities and recruitment',
      icon: '💼'
    }
  ];

  const emergencyContacts = [
    {
      type: 'Medical Emergency',
      contact: 'Local Emergency Services',
      number: '911 or 112',
      description: 'For immediate medical emergencies',
      icon: '🚨'
    },
    {
      type: 'Product Quality',
      contact: 'Quality Assurance',
      email: 'quality@spchealth.com',
      phone: '+1 (555) 123-QUAL',
      description: 'Report product quality issues',
      icon: '✅'
    },
    {
      type: 'Pharmacovigilance',
      contact: 'Drug Safety',
      email: 'safety@spchealth.com',
      phone: '+1 (555) 123-SAFE',
      description: 'Report adverse drug reactions',
      icon: '🛡️'
    }
  ];

  return (
    <div className="l3-container contact-page">
      {/* Hero Section */}
      <section className="contact-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="contact-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="contact-hero-content">
            <div className="contact-hero-text">
              <h1 className="contact-hero-title">
                <span className="l3-title-line">Get in Touch</span>
                <span className="l3-title-line">With SPC Healthcare</span>
              </h1>
              <p className="contact-hero-subtitle">
                Ready to transform healthcare together? Reach out to our team for partnerships, 
                inquiries, or to learn more about our innovative solutions.
              </p>
              <div className="contact-hero-stats">
                <div className="contact-stat">
                  <div className="contact-stat-icon">🌍</div>
                  <div className="contact-stat-info">
                    <div className="contact-stat-number">80+</div>
                    <div className="contact-stat-label">Countries Served</div>
                  </div>
                </div>
                <div className="contact-stat">
                  <div className="contact-stat-icon">⏰</div>
                  <div className="contact-stat-info">
                    <div className="contact-stat-number">24/7</div>
                    <div className="contact-stat-label">Support Available</div>
                  </div>
                </div>
                <div className="contact-stat">
                  <div className="contact-stat-icon">💬</div>
                  <div className="contact-stat-info">
                    <div className="contact-stat-number">15+</div>
                    <div className="contact-stat-label">Languages Supported</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-hero-visual">
              <div className="contact-visual-element">
                <div className="contact-orbits">
                  <div className="contact-orbit contact-orbit-1"></div>
                  <div className="contact-orbit contact-orbit-2"></div>
                  <div className="contact-orbit contact-orbit-3"></div>
                </div>
                <div className="contact-center-icon">📞</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="l3-container-inner">
          <div className="contact-form-container">
            <div className="form-header">
              <h2 className="l3-section-title">Send Us a Message</h2>
              <p className="l3-section-subtitle">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company/Organization</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="product">Product Information</option>
                    <option value="career">Career Opportunity</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="media">Media Inquiry</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Enter message subject"
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="l3-btn l3-btn-primary l3-btn-large">
                  Send Message
                </button>
                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="global-offices-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Global Offices</h2>
            <p className="l3-section-subtitle">
              Connect with our teams around the world for localized support and expertise.
            </p>
          </div>
          <div className="offices-grid">
            {globalOffices.map((office, index) => (
              <div key={index} className="office-card">
                <div className="office-header">
                  <div className="office-icon">{office.icon}</div>
                  <h3 className="office-region">{office.region}</h3>
                </div>
                <div className="office-details">
                  <div className="office-detail">
                    <span className="detail-icon">📍</span>
                    <span className="detail-text">{office.address}</span>
                  </div>
                  <div className="office-detail">
                    <span className="detail-icon">📞</span>
                    <span className="detail-text">{office.phone}</span>
                  </div>
                  <div className="office-detail">
                    <span className="detail-icon">✉️</span>
                    <span className="detail-text">{office.email}</span>
                  </div>
                  <div className="office-detail">
                    <span className="detail-icon">🕒</span>
                    <span className="detail-text">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="department-contacts-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Department Contacts</h2>
            <p className="l3-section-subtitle">
              Reach out to specific departments for specialized inquiries and support.
            </p>
          </div>
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <div className="department-icon">{dept.icon}</div>
                <h3 className="department-name">{dept.name}</h3>
                <p className="department-description">{dept.description}</p>
                <div className="department-contact">
                  <div className="contact-method">
                    <span className="method-icon">✉️</span>
                    <span className="method-text">{dept.email}</span>
                  </div>
                  <div className="contact-method">
                    <span className="method-icon">📞</span>
                    <span className="method-text">{dept.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="emergency-contacts-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Emergency & Safety Contacts</h2>
            <p className="l3-section-subtitle">
              Critical contacts for urgent medical, safety, and quality matters.
            </p>
          </div>
          <div className="emergency-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="emergency-card">
                <div className="emergency-header">
                  <div className="emergency-icon">{contact.icon}</div>
                  <h3 className="emergency-type">{contact.type}</h3>
                </div>
                <p className="emergency-description">{contact.description}</p>
                <div className="emergency-contact">
                  <div className="emergency-method">
                    <strong>{contact.contact}</strong>
                  </div>
                  {contact.number && (
                    <div className="emergency-method">
                      <span className="method-icon">📞</span>
                      <span className="method-text emergency-number">{contact.number}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="emergency-method">
                      <span className="method-icon">✉️</span>
                      <span className="method-text">{contact.email}</span>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="emergency-method">
                      <span className="method-icon">📞</span>
                      <span className="method-text">{contact.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Frequently Asked Questions</h2>
            <p className="l3-section-subtitle">
              Quick answers to common questions about contacting SPC Healthcare.
            </p>
          </div>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">What is your typical response time?</h3>
              <p className="faq-answer">
                We strive to respond to all inquiries within 24 hours during business days. 
                Urgent matters are prioritized and typically receive responses within 2-4 hours.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Do you have local representatives in my country?</h3>
              <p className="faq-answer">
                Yes, we have local representatives and partners in over 80 countries. 
                Contact our regional offices for localized support in your language and timezone.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">How can I become a distribution partner?</h3>
              <p className="faq-answer">
                Please contact our Business Development team through the form above or 
                email partnerships@spchealth.com with your company details and region of interest.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What information should I include in my inquiry?</h3>
              <p className="faq-answer">
                Please include your full contact details, company information (if applicable), 
                specific nature of your inquiry, and any relevant product or service details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}