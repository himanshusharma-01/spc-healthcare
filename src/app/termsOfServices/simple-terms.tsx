'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './simple-terms.css';

export default function SimpleTermsPage() {
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="simple-terms-page">
      {/* Hero Section - Minimal */}
      <section className="terms-hero-simple">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Please read these terms and conditions carefully before using our website and services.</p>
        </div>
      </section>

      {/* Table of Contents - Minimal */}
      <section className="toc-simple">
        <div className="container">
          <h2>Table of Contents</h2>
          <div className="toc-grid-simple">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`toc-item-simple ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                <span className="toc-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="toc-title">{section.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content - Minimal */}
      <section className="content-simple">
        <div className="container">
          <div id="acceptance" className="section-simple">
            <h2>01. Acceptance of Terms</h2>
            <p>Welcome to SPC Healthcare. These Terms and Conditions ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services"). Please read these Terms carefully before using our Services.</p>
            <p>By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.</p>
            <div className="highlight-box">
              <strong>Important:</strong> These Terms constitute a legally binding agreement between you and SPC Healthcare.
            </div>
          </div>

          <div id="services" className="section-simple">
            <h2>02. Services Description</h2>
            <p>SPC Healthcare provides innovative healthcare solutions, including but not limited to:</p>
            <ul className="content-list">
              <li>Pharmaceutical products and information</li>
              <li>Medical device information and support</li>
              <li>Healthcare professional resources</li>
              <li>Patient education materials</li>
              <li>Research and development updates</li>
            </ul>
            <p>Our Services are intended for healthcare professionals, patients, and authorized personnel only. Some Services may require registration and verification of professional credentials.</p>
          </div>

          <div id="intellectual" className="section-simple">
            <h2>03. Intellectual Property Rights</h2>
            <p>All content, features, and functionality available through our Services, including but not limited to text, graphics, logos, images, and software, are the exclusive property of SPC Healthcare and are protected by international copyright, trademark, and other intellectual property laws.</p>
            <div className="highlight-box">
              <strong>License Grant:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use our Services for personal, non-commercial purposes.
            </div>
            <p>You may not modify, reproduce, distribute, or create derivative works based on our content without express written permission from SPC Healthcare.</p>
          </div>

          <div id="user-conduct" className="section-simple">
            <h2>04. User Conduct and Responsibilities</h2>
            <p>When using our Services, you agree not to:</p>
            <ul className="content-list prohibited">
              <li>Use the Services for any unlawful purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to any part of our Services</li>
              <li>Transmit any viruses, malware, or other harmful code</li>
              <li>Use our Services to provide medical advice or diagnosis</li>
              <li>Misrepresent your identity or professional credentials</li>
              <li>Collect or harvest any information from our Services</li>
            </ul>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          </div>

          <div id="privacy" className="section-simple">
            <h2>05. Privacy and Data Protection</h2>
            <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Services, you consent to the collection and use of information as described in our Privacy Policy.</p>
            <div className="highlight-box important">
              <strong>Healthcare Data:</strong> We handle all healthcare-related data in compliance with applicable data protection laws, including HIPAA and GDPR where applicable.
            </div>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
          </div>

          <div id="disclaimer" className="section-simple">
            <h2>06. Medical Disclaimer</h2>
            <div className="warning-box">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <strong>Important Medical Notice:</strong> The information provided through our Services is for educational and informational purposes only and is not intended as medical advice.
              </div>
            </div>
            <p>Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on our Services.</p>
            <p>The information provided is not a substitute for professional medical advice, diagnosis, or treatment. Reliance on any information provided by SPC Healthcare is solely at your own risk.</p>
          </div>

          <div id="liability" className="section-simple">
            <h2>07. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, SPC Healthcare shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, whether in an action in contract, tort, or otherwise.</p>
            <p>Our total cumulative liability to you for all claims arising from or related to the Services shall not exceed the amount you have paid us, if any, for access to and use of the Services in the twelve (12) months prior to the event giving rise to the claim.</p>
            <div className="highlight-box">
              Some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, so the above limitations may not apply to you.
            </div>
          </div>

          <div id="termination" className="section-simple">
            <h2>08. Termination</h2>
            <p>We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.</p>
            <p>Upon termination, your right to use the Services will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.</p>
          </div>

          <div id="governing" className="section-simple">
            <h2>09. Governing Law and Dispute Resolution</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p>
            <p>Any dispute arising from these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Wilmington, Delaware.</p>
            <div className="highlight-box">
              You agree to waive any right to participate in a class-action lawsuit or class-wide arbitration.
            </div>
          </div>

          <div id="changes" className="section-simple">
            <h2>10. Changes to Terms</h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.</p>
            <p>What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.</p>
          </div>

          <div id="contact" className="section-simple">
            <h2>11. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="contact-info">
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
      </section>
    </div>
  );
}
