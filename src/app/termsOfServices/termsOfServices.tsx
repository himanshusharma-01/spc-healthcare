'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './termsOfServices.css';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'services', title: 'Services Description' },
    { id: 'intellectual', title: 'Intellectual Property' },
    { id: 'user-conduct', title: 'User Conduct' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'disclaimer', title: 'Medical Disclaimer' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing', title: 'Governing Law' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact', title: 'Contact Information' }
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
    <div className="l3-container terms-page">
      {/* Hero Section */}
      <section className="terms-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="terms-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="terms-hero-content">
            <div className="terms-hero-text">
              <h1 className="terms-hero-title">
                <span className="l3-title-line">Terms & Conditions</span>
              </h1>
              <p className="terms-hero-subtitle">
                Please read these terms and conditions carefully before using our website 
                and services. By accessing or using SPC Healthcare's digital platforms, 
                you agree to be bound by these terms.
              </p>
              <div className="terms-hero-info">
                <div className="terms-info-item">
                  <div className="terms-info-icon">📄</div>
                  <div className="terms-info-content">
                    <div className="terms-info-title">Last Updated</div>
                    <div className="terms-info-value">March 15, 2024</div>
                  </div>
                </div>
                <div className="terms-info-item">
                  <div className="terms-info-icon">⚖️</div>
                  <div className="terms-info-content">
                    <div className="terms-info-title">Legal Document</div>
                    <div className="terms-info-value">Binding Agreement</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="terms-hero-visual">
              <div className="terms-visual-element">
                <div className="terms-document-icon">📋</div>
                <div className="terms-legal-symbols">
                  <span className="legal-symbol">⚖️</span>
                  <span className="legal-symbol">📝</span>
                  <span className="legal-symbol">🔒</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="toc-section">
        <div className="l3-container-inner">
          <div className="toc-container">
            <h2 className="toc-title">Table of Contents</h2>
            <div className="toc-grid">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`toc-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="toc-item-number">
                    {String(sections.findIndex(s => s.id === section.id) + 1).padStart(2, '0')}
                  </span>
                  <span className="toc-item-title">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content-section">
        <div className="l3-container-inner">
          <div className="terms-content">
            
            {/* Acceptance of Terms */}
            <div id="acceptance" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">01</span>
                Acceptance of Terms
              </h2>
              <div className="terms-section-content">
                <p>
                  Welcome to SPC Healthcare. These Terms and Conditions ("Terms") govern your 
                  access to and use of our website, services, and applications (collectively, 
                  the "Services"). Please read these Terms carefully before using our Services.
                </p>
                <p>
                  By accessing or using our Services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms. If you do not agree to 
                  these Terms, you may not access or use our Services.
                </p>
                <div className="terms-note important">
                  <strong>Important:</strong> These Terms constitute a legally binding agreement 
                  between you and SPC Healthcare.
                </div>
              </div>
            </div>

            {/* Services Description */}
            <div id="services" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">02</span>
                Services Description
              </h2>
              <div className="terms-section-content">
                <p>
                  SPC Healthcare provides innovative healthcare solutions, including but not 
                  limited to:
                </p>
                <ul className="terms-list">
                  <li>Pharmaceutical products and information</li>
                  <li>Medical device information and support</li>
                  <li>Healthcare professional resources</li>
                  <li>Patient education materials</li>
                  <li>Research and development updates</li>
                </ul>
                <p>
                  Our Services are intended for healthcare professionals, patients, and 
                  authorized personnel only. Some Services may require registration and 
                  verification of professional credentials.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div id="intellectual" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">03</span>
                Intellectual Property Rights
              </h2>
              <div className="terms-section-content">
                <p>
                  All content, features, and functionality available through our Services, 
                  including but not limited to text, graphics, logos, images, and software, 
                  are the exclusive property of SPC Healthcare and are protected by 
                  international copyright, trademark, and other intellectual property laws.
                </p>
                <div className="terms-note">
                  <strong>License Grant:</strong> We grant you a limited, non-exclusive, 
                  non-transferable license to access and use our Services for personal, 
                  non-commercial purposes.
                </div>
                <p>
                  You may not modify, reproduce, distribute, or create derivative works 
                  based on our content without express written permission from SPC Healthcare.
                </p>
              </div>
            </div>

            {/* User Conduct */}
            <div id="user-conduct" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">04</span>
                User Conduct and Responsibilities
              </h2>
              <div className="terms-section-content">
                <p>
                  When using our Services, you agree not to:
                </p>
                <ul className="terms-list prohibited">
                  <li>Use the Services for any unlawful purpose or in violation of any laws</li>
                  <li>Attempt to gain unauthorized access to any part of our Services</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>Use our Services to provide medical advice or diagnosis</li>
                  <li>Misrepresent your identity or professional credentials</li>
                  <li>Collect or harvest any information from our Services</li>
                </ul>
                <p>
                  You are responsible for maintaining the confidentiality of your account 
                  credentials and for all activities that occur under your account.
                </p>
              </div>
            </div>

            {/* Privacy Policy */}
            <div id="privacy" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">05</span>
                Privacy and Data Protection
              </h2>
              <div className="terms-section-content">
                <p>
                  Your privacy is important to us. Our Privacy Policy explains how we collect, 
                  use, and protect your personal information. By using our Services, you 
                  consent to the collection and use of information as described in our 
                  Privacy Policy.
                </p>
                <div className="terms-note important">
                  <strong>Healthcare Data:</strong> We handle all healthcare-related data in 
                  compliance with applicable data protection laws, including HIPAA and GDPR 
                  where applicable.
                </div>
                <p>
                  We implement appropriate technical and organizational measures to protect 
                  your personal data against unauthorized access, alteration, or destruction.
                </p>
              </div>
            </div>

            {/* Medical Disclaimer */}
            <div id="disclaimer" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">06</span>
                Medical Disclaimer
              </h2>
              <div className="terms-section-content">
                <div className="terms-warning">
                  <div className="warning-icon">⚠️</div>
                  <div className="warning-content">
                    <strong>Important Medical Notice:</strong> The information provided through 
                    our Services is for educational and informational purposes only and is not 
                    intended as medical advice.
                  </div>
                </div>
                <p>
                  Always seek the advice of your physician or other qualified health provider 
                  with any questions you may have regarding a medical condition. Never disregard 
                  professional medical advice or delay in seeking it because of something you 
                  have read on our Services.
                </p>
                <p>
                  The information provided is not a substitute for professional medical advice, 
                  diagnosis, or treatment. Reliance on any information provided by SPC Healthcare 
                  is solely at your own risk.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div id="liability" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">07</span>
                Limitation of Liability
              </h2>
              <div className="terms-section-content">
                <p>
                  To the fullest extent permitted by applicable law, SPC Healthcare shall not 
                  be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including but not limited to loss of profits, data, or use, whether 
                  in an action in contract, tort, or otherwise.
                </p>
                <p>
                  Our total cumulative liability to you for all claims arising from or related 
                  to the Services shall not exceed the amount you have paid us, if any, for 
                  access to and use of the Services in the twelve (12) months prior to the 
                  event giving rise to the claim.
                </p>
                <div className="terms-note">
                  Some jurisdictions do not allow the exclusion or limitation of liability 
                  for consequential or incidental damages, so the above limitations may not 
                  apply to you.
                </div>
              </div>
            </div>

            {/* Termination */}
            <div id="termination" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">08</span>
                Termination
              </h2>
              <div className="terms-section-content">
                <p>
                  We may terminate or suspend your access to our Services immediately, without 
                  prior notice or liability, for any reason whatsoever, including without 
                  limitation if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the Services will cease immediately. 
                  All provisions of these Terms which by their nature should survive termination 
                  shall survive, including ownership provisions, warranty disclaimers, and 
                  limitations of liability.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div id="governing" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">09</span>
                Governing Law and Dispute Resolution
              </h2>
              <div className="terms-section-content">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of 
                  the State of Delaware, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any dispute arising from these Terms or your use of our Services shall be 
                  resolved through binding arbitration in accordance with the rules of the 
                  American Arbitration Association. The arbitration shall take place in 
                  Wilmington, Delaware.
                </p>
                <div className="terms-note">
                  You agree to waive any right to participate in a class-action lawsuit or 
                  class-wide arbitration.
                </div>
              </div>
            </div>

            {/* Changes to Terms */}
            <div id="changes" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">10</span>
                Changes to Terms
              </h2>
              <div className="terms-section-content">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these 
                  Terms at any time. If a revision is material, we will provide at least 
                  30 days' notice prior to any new terms taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our sole discretion. 
                  By continuing to access or use our Services after those revisions become 
                  effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div id="contact" className="terms-section">
              <h2 className="terms-section-title">
                <span className="section-number">11</span>
                Contact Information
              </h2>
              <div className="terms-section-content">
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <div className="contact-details">
                  <div className="contact-method">
                    <strong>Email:</strong> legal@spchealth.com
                  </div>
                  <div className="contact-method">
                    <strong>Phone:</strong> +1 (555) 123-LEGAL
                  </div>
                  <div className="contact-method">
                    <strong>Address:</strong><br />
                    SPC Healthcare Legal Department<br />
                    123 Healthcare Avenue<br />
                    Medical City, MC 12345<br />
                    United States
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="agreement-section">
              <div className="agreement-content">
                <h3>Agreement</h3>
                <p>
                  By using our Services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and Conditions.
                </p>
                <div className="agreement-date">
                  <strong>Effective Date:</strong> March 15, 2024
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}