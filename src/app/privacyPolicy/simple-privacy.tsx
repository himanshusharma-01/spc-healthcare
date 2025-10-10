'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './simple-privacy.css';

export default function SimplePrivacyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Information' },
    { id: 'data-sharing', title: 'Data Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'your-rights', title: 'Your Rights' },
    { id: 'cookies-tracking', title: 'Cookies & Tracking' },
    { id: 'healthcare-data', title: 'Healthcare Data' },
    { id: 'international-transfers', title: 'International Transfers' },
    { id: 'retention', title: 'Data Retention' },
    { id: 'children-privacy', title: "Children's Privacy" },
    { id: 'changes', title: 'Policy Changes' },
    { id: 'contact', title: 'Contact Us' }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="privacy-page-simple">
      {/* Hero Section - Simplified */}
      <section className="privacy-hero-simple">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy is fundamental to our mission at SPC Healthcare. This policy explains how we collect, use, protect, and respect your personal information.</p>
        </div>
      </section>

      {/* Navigation - Simplified */}
      <section className="privacy-nav-simple">
        <div className="container">
          <h2>Policy Overview</h2>
          <div className="privacy-nav-grid-simple">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`privacy-nav-item-simple ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="nav-item-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="nav-item-title">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content - Simplified */}
      <section className="privacy-content-simple">
        <div className="container">
          <div id="introduction" className="privacy-section-simple">
            <h2>01. Introduction & Scope</h2>
            <p>SPC Healthcare ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy describes how we collect, use, disclose, and protect personal information through our websites, applications, and services.</p>
            <div className="privacy-note-simple important">
              <strong>Healthcare Commitment:</strong> As a healthcare organization, we adhere to the highest standards of data protection, including HIPAA, GDPR, and other applicable healthcare privacy regulations.
            </div>
          </div>

          <div id="information-collection" className="privacy-section-simple">
            <h2>02. Information We Collect</h2>
            <p>We collect several types of information to provide and improve our services:</p>
            <div className="data-category-simple">
              <h4>Personal Identification Information</h4>
              <ul className="privacy-list-simple">
                <li>Name, contact details, and professional credentials</li>
                <li>Demographic information for healthcare professionals</li>
                <li>Employment and institutional affiliations</li>
              </ul>
            </div>
            <div className="data-category-simple">
              <h4>Healthcare & Medical Information</h4>
              <ul className="privacy-list-simple">
                <li>Professional medical qualifications and specialties</li>
                <li>Patient-reported outcomes (with consent)</li>
                <li>Adverse event reports and product safety information</li>
              </ul>
            </div>
          </div>

          <div id="how-we-use" className="privacy-section-simple">
            <h2>03. How We Use Your Information</h2>
            <p>We use collected information for legitimate business and healthcare purposes:</p>
            <div className="usage-purpose-simple">
              <h4>Healthcare Service Delivery</h4>
              <p>Providing medical information, product support, and healthcare professional resources in compliance with regulatory requirements.</p>
            </div>
            <div className="usage-purpose-simple">
              <h4>Research & Development</h4>
              <p>Conducting clinical research, improving existing products, and developing new healthcare solutions with appropriate ethical approvals.</p>
            </div>
          </div>

          <div id="data-sharing" className="privacy-section-simple">
            <h2>04. Data Sharing & Disclosure</h2>
            <p>We may share your information in limited circumstances with:</p>
            <div className="sharing-party-simple">
              <h4>Healthcare Authorities</h4>
              <p>Regulatory bodies and health authorities for safety reporting, clinical trial oversight, and compliance purposes as required by law.</p>
            </div>
            <div className="privacy-note-simple important">
              <strong>No Sale of Data:</strong> We do not sell, trade, or rent your personal information to third parties for marketing purposes.
            </div>
          </div>

          <div id="data-security" className="privacy-section-simple">
            <h2>05. Data Security Measures</h2>
            <p>We implement comprehensive security measures to protect your information:</p>
            <div className="security-measure-simple">
              <h4>Technical Safeguards</h4>
              <ul className="privacy-list-simple">
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Advanced firewall and intrusion detection systems</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for system access</li>
              </ul>
            </div>
          </div>

          <div id="your-rights" className="privacy-section-simple">
            <h2>06. Your Privacy Rights</h2>
            <p>Depending on your location and applicable laws, you may have the following rights:</p>
            <div className="privacy-rights-grid-simple">
              <div className="privacy-right-simple">
                <div className="right-icon">👁️</div>
                <div className="right-content">
                  <h4>Right to Access</h4>
                  <p>Request copies of your personal information</p>
                </div>
              </div>
              <div className="privacy-right-simple">
                <div className="right-icon">✏️</div>
                <div className="right-content">
                  <h4>Right to Rectification</h4>
                  <p>Correct inaccurate or incomplete information</p>
                </div>
              </div>
              <div className="privacy-right-simple">
                <div className="right-icon">🗑️</div>
                <div className="right-content">
                  <h4>Right to Erasure</h4>
                  <p>Request deletion of your personal data</p>
                </div>
              </div>
            </div>
          </div>

          <div id="contact" className="privacy-section-simple">
            <h2>13. Contact Information</h2>
            <p>For privacy-related questions, concerns, or to exercise your rights, please contact our Data Protection Team:</p>
            <div className="privacy-contact-details-simple">
              <div className="contact-method-simple">
                <div className="contact-icon">📧</div>
                <div className="contact-info-simple">
                  <strong>Email:</strong> privacy@spchealth.com
                </div>
              </div>
              <div className="contact-method-simple">
                <div className="contact-icon">📞</div>
                <div className="contact-info-simple">
                  <strong>Phone:</strong> +1 (555) 123-PRIVACY
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

