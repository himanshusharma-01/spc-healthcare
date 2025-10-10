'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './privacyPolicy.css';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'how-we-use', title: 'How We Use Information' },
    { id: 'data-sharing', title: 'Data Sharing & Disclosure' },
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
    <div className="l3-container privacy-policy-page">
      {/* Hero Section */}
      <section className="privacy-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="privacy-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="privacy-hero-content">
            <div className="privacy-hero-text">
              <h1 className="privacy-hero-title">
                <span className="l3-title-line">Privacy Policy</span>
              </h1>
              <p className="privacy-hero-subtitle">
                Your privacy is fundamental to our mission at SPC Healthcare. This policy 
                explains how we collect, use, protect, and respect your personal information 
                in compliance with global healthcare privacy standards.
              </p>
              <div className="privacy-hero-info">
                <div className="privacy-info-item">
                  <div className="privacy-info-icon">🔒</div>
                  <div className="privacy-info-content">
                    <div className="privacy-info-title">Last Updated</div>
                    <div className="privacy-info-value">March 15, 2024</div>
                  </div>
                </div>
                <div className="privacy-info-item">
                  <div className="privacy-info-icon">🌍</div>
                  <div className="privacy-info-content">
                    <div className="privacy-info-title">Compliance</div>
                    <div className="privacy-info-value">HIPAA, GDPR, Global</div>
                  </div>
                </div>
                <div className="privacy-info-item">
                  <div className="privacy-info-icon">⚖️</div>
                  <div className="privacy-info-content">
                    <div className="privacy-info-title">Data Protection</div>
                    <div className="privacy-info-value">Enterprise Grade</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="privacy-hero-visual">
              <div className="privacy-visual-element">
                <div className="privacy-shield-icon">🛡️</div>
                <div className="privacy-security-elements">
                  <span className="security-element">🔐</span>
                  <span className="security-element">📊</span>
                  <span className="security-element">🌐</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="privacy-nav-section">
        <div className="l3-container-inner">
          <div className="privacy-nav-container">
            <h2 className="privacy-nav-title">Policy Overview</h2>
            <div className="privacy-nav-grid">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`privacy-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="nav-item-icon">
                    {section.id === 'healthcare-data' && '🏥'}
                    {section.id === 'data-security' && '🔒'}
                    {section.id === 'your-rights' && '👤'}
                    {section.id === 'cookies-tracking' && '🍪'}
                    {!['healthcare-data', 'data-security', 'your-rights', 'cookies-tracking'].includes(section.id) && '📄'}
                  </span>
                  <span className="nav-item-title">{section.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="privacy-content-section">
        <div className="l3-container-inner">
          <div className="privacy-content">
            
            {/* Introduction */}
            <div id="introduction" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">01</span>
                Introduction & Scope
              </h2>
              <div className="privacy-section-content">
                <p>
                  SPC Healthcare ("we," "our," or "us") is committed to protecting your privacy 
                  and ensuring the security of your personal information. This Privacy Policy 
                  describes how we collect, use, disclose, and protect personal information 
                  through our websites, applications, and services.
                </p>
                <div className="privacy-note important">
                  <strong>Healthcare Commitment:</strong> As a healthcare organization, we adhere 
                  to the highest standards of data protection, including HIPAA, GDPR, and other 
                  applicable healthcare privacy regulations.
                </div>
                <p>
                  This policy applies to all personal information we collect through:
                </p>
                <ul className="privacy-list">
                  <li>Our corporate websites and portals</li>
                  <li>Healthcare professional platforms</li>
                  <li>Patient support programs</li>
                  <li>Clinical trial management systems</li>
                  <li>Mobile applications and digital tools</li>
                </ul>
              </div>
            </div>

            {/* Information Collection */}
            <div id="information-collection" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">02</span>
                Information We Collect
              </h2>
              <div className="privacy-section-content">
                <p>
                  We collect several types of information to provide and improve our services:
                </p>

                <div className="data-category">
                  <h4>Personal Identification Information</h4>
                  <ul className="privacy-list">
                    <li>Name, contact details, and professional credentials</li>
                    <li>Demographic information for healthcare professionals</li>
                    <li>Employment and institutional affiliations</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h4>Healthcare & Medical Information</h4>
                  <ul className="privacy-list">
                    <li>Professional medical qualifications and specialties</li>
                    <li>Patient-reported outcomes (with consent)</li>
                    <li>Adverse event reports and product safety information</li>
                  </ul>
                </div>

                <div className="data-category">
                  <h4>Technical & Usage Data</h4>
                  <ul className="privacy-list">
                    <li>IP addresses, browser type, and device information</li>
                    <li>Website usage patterns and analytics data</li>
                    <li>Cookie and tracking technology information</li>
                  </ul>
                </div>

                <div className="privacy-note">
                  <strong>Consent-Based Collection:</strong> We only collect sensitive healthcare 
                  information with explicit consent or when permitted by law for specific 
                  healthcare purposes.
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div id="how-we-use" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">03</span>
                How We Use Your Information
              </h2>
              <div className="privacy-section-content">
                <p>
                  We use collected information for legitimate business and healthcare purposes:
                </p>

                <div className="usage-purpose">
                  <h4>Healthcare Service Delivery</h4>
                  <p>
                    Providing medical information, product support, and healthcare professional 
                    resources in compliance with regulatory requirements.
                  </p>
                </div>

                <div className="usage-purpose">
                  <h4>Research & Development</h4>
                  <p>
                    Conducting clinical research, improving existing products, and developing 
                    new healthcare solutions with appropriate ethical approvals.
                  </p>
                </div>

                <div className="usage-purpose">
                  <h4>Regulatory Compliance</h4>
                  <p>
                    Meeting legal obligations for pharmacovigilance, product safety monitoring, 
                    and regulatory reporting to health authorities.
                  </p>
                </div>

                <div className="usage-purpose">
                  <h4>Communication & Support</h4>
                  <p>
                    Responding to inquiries, providing technical support, and sending important 
                    safety and regulatory updates.
                  </p>
                </div>

                <div className="legal-basis">
                  <h4>Legal Basis for Processing</h4>
                  <p>
                    We process personal information based on: consent, contractual necessity, 
                    legal obligations, legitimate interests, and vital interests in healthcare 
                    contexts.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div id="data-sharing" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">04</span>
                Data Sharing & Disclosure
              </h2>
              <div className="privacy-section-content">
                <p>
                  We may share your information in limited circumstances with:
                </p>

                <div className="sharing-party">
                  <h4>Healthcare Authorities</h4>
                  <p>
                    Regulatory bodies and health authorities for safety reporting, clinical 
                    trial oversight, and compliance purposes as required by law.
                  </p>
                </div>

                <div className="sharing-party">
                  <h4>Research Partners</h4>
                  <p>
                    Academic institutions and research organizations for collaborative 
                    medical research with appropriate data protection agreements.
                  </p>
                </div>

                <div className="sharing-party">
                  <h4>Service Providers</h4>
                  <p>
                    Trusted partners who provide essential services (IT, analytics, support) 
                    under strict confidentiality and data processing agreements.
                  </p>
                </div>

                <div className="sharing-party">
                  <h4>Legal Requirements</h4>
                  <p>
                    When required by law, court order, or to protect our rights, property, 
                    or safety, or that of others.
                  </p>
                </div>

                <div className="privacy-note important">
                  <strong>No Sale of Data:</strong> We do not sell, trade, or rent your 
                  personal information to third parties for marketing purposes.
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div id="data-security" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">05</span>
                Data Security Measures
              </h2>
              <div className="privacy-section-content">
                <p>
                  We implement comprehensive security measures to protect your information:
                </p>

                <div className="security-measure">
                  <h4>Technical Safeguards</h4>
                  <ul className="privacy-list">
                    <li>End-to-end encryption for sensitive data transmission</li>
                    <li>Advanced firewall and intrusion detection systems</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Multi-factor authentication for system access</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <h4>Organizational Controls</h4>
                  <ul className="privacy-list">
                    <li>Role-based access controls and minimum necessary principle</li>
                    <li>Comprehensive employee training on data protection</li>
                    <li>Strict confidentiality agreements with all personnel</li>
                    <li>Regular privacy impact assessments</li>
                  </ul>
                </div>

                <div className="security-measure">
                  <h4>Physical Security</h4>
                  <ul className="privacy-list">
                    <li>Secure data centers with biometric access controls</li>
                    <li>24/7 monitoring and surveillance systems</li>
                    <li>Redundant backup and disaster recovery systems</li>
                  </ul>
                </div>

                <div className="privacy-note">
                  <strong>Continuous Improvement:</strong> We regularly review and enhance 
                  our security measures to address evolving threats and technologies.
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div id="your-rights" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">06</span>
                Your Privacy Rights
              </h2>
              <div className="privacy-section-content">
                <p>
                  Depending on your location and applicable laws, you may have the following rights:
                </p>

                <div className="privacy-rights-grid">
                  <div className="privacy-right">
                    <div className="right-icon">👁️</div>
                    <div className="right-content">
                      <h4>Right to Access</h4>
                      <p>Request copies of your personal information</p>
                    </div>
                  </div>
                  <div className="privacy-right">
                    <div className="right-icon">✏️</div>
                    <div className="right-content">
                      <h4>Right to Rectification</h4>
                      <p>Correct inaccurate or incomplete information</p>
                    </div>
                  </div>
                  <div className="privacy-right">
                    <div className="right-icon">🗑️</div>
                    <div className="right-content">
                      <h4>Right to Erasure</h4>
                      <p>Request deletion of your personal data</p>
                    </div>
                  </div>
                  <div className="privacy-right">
                    <div className="right-icon">⏸️</div>
                    <div className="right-content">
                      <h4>Right to Restrict</h4>
                      <p>Limit how we use your information</p>
                    </div>
                  </div>
                  <div className="privacy-right">
                    <div className="right-icon">📤</div>
                    <div className="right-content">
                      <h4>Right to Portability</h4>
                      <p>Receive your data in a portable format</p>
                    </div>
                  </div>
                  <div className="privacy-right">
                    <div className="right-icon">🚫</div>
                    <div className="right-content">
                      <h4>Right to Object</h4>
                      <p>Object to certain processing activities</p>
                    </div>
                  </div>
                </div>

                <div className="rights-exercise">
                  <h4>Exercising Your Rights</h4>
                  <p>
                    To exercise any of these rights, please contact our Data Protection Officer 
                    at <strong>privacy@spchealth.com</strong>. We will respond to your request 
                    within 30 days as required by law.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies & Tracking */}
            <div id="cookies-tracking" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">07</span>
                Cookies & Tracking Technologies
              </h2>
              <div className="privacy-section-content">
                <p>
                  We use cookies and similar technologies to enhance your experience and 
                  analyze website usage:
                </p>

                <div className="cookie-category">
                  <h4>Essential Cookies</h4>
                  <p>
                    Required for basic website functionality and security. These cannot be disabled.
                  </p>
                </div>

                <div className="cookie-category">
                  <h4>Analytics Cookies</h4>
                  <p>
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>

                <div className="cookie-category">
                  <h4>Preference Cookies</h4>
                  <p>
                    Remember your settings and preferences for future visits.
                  </p>
                </div>

                <div className="cookie-management">
                  <h4>Cookie Management</h4>
                  <p>
                    You can control cookie settings through your browser preferences. 
                    However, disabling essential cookies may affect website functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Healthcare Data */}
            <div id="healthcare-data" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">08</span>
                Special Provisions for Healthcare Data
              </h2>
              <div className="privacy-section-content">
                <div className="healthcare-notice">
                  <div className="healthcare-icon">🏥</div>
                  <div className="healthcare-content">
                    <strong>Protected Health Information:</strong> We handle healthcare data 
                    with the highest level of protection and in compliance with HIPAA, 
                    GDPR, and other healthcare privacy regulations.
                  </div>
                </div>

                <div className="healthcare-safeguards">
                  <h4>Additional Healthcare Protections</h4>
                  <ul className="privacy-list">
                    <li>Strict access controls based on "need-to-know" principle</li>
                    <li>Comprehensive audit trails for all healthcare data access</li>
                    <li>Special encryption standards for sensitive health information</li>
                    <li>Regular training on healthcare privacy requirements</li>
                    <li>Business Associate Agreements with all healthcare partners</li>
                  </ul>
                </div>

                <div className="privacy-note important">
                  <strong>Medical Confidentiality:</strong> All healthcare professionals 
                  and staff are bound by strict confidentiality obligations that extend 
                  beyond legal requirements.
                </div>
              </div>
            </div>

            {/* International Transfers */}
            <div id="international-transfers" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">09</span>
                International Data Transfers
              </h2>
              <div className="privacy-section-content">
                <p>
                  As a global healthcare organization, we may transfer your information 
                  internationally with appropriate safeguards:
                </p>

                <div className="transfer-mechanism">
                  <h4>Adequacy Decisions</h4>
                  <p>
                    Transfer to countries with adequacy decisions from the European Commission.
                  </p>
                </div>

                <div className="transfer-mechanism">
                  <h4>Standard Contractual Clauses</h4>
                  <p>
                    Use of EU-approved standard contractual clauses for international transfers.
                  </p>
                </div>

                <div className="transfer-mechanism">
                  <h4>Binding Corporate Rules</h4>
                  <p>
                    Internal global privacy policies approved by data protection authorities.
                  </p>
                </div>

                <div className="privacy-note">
                  <strong>Global Standards:</strong> We maintain consistent data protection 
                  standards across all our global operations regardless of location.
                </div>
              </div>
            </div>

            {/* Data Retention */}
            <div id="retention" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">10</span>
                Data Retention Periods
              </h2>
              <div className="privacy-section-content">
                <p>
                  We retain personal information only as long as necessary for legitimate 
                  business and legal purposes:
                </p>

                <div className="retention-category">
                  <h4>Healthcare & Safety Data</h4>
                  <p>
                    Retained as required by health authorities (typically 10+ years for 
                    pharmacovigilance and clinical trial data).
                  </p>
                </div>

                <div className="retention-category">
                  <h4>Professional Information</h4>
                  <p>
                    Retained for the duration of our relationship and for a reasonable 
                    period thereafter for regulatory purposes.
                  </p>
                </div>

                <div className="retention-category">
                  <h4>Website Analytics</h4>
                  <p>
                    Retained for up to 26 months for service improvement and analytics.
                  </p>
                </div>

                <div className="retention-policy">
                  <h4>Retention Criteria</h4>
                  <p>
                    Retention periods are determined based on legal requirements, 
                    business needs, and the nature of the information.
                  </p>
                </div>
              </div>
            </div>

            {/* Children's Privacy */}
            <div id="children-privacy" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">11</span>
                Children's Privacy
              </h2>
              <div className="privacy-section-content">
                <p>
                  Our services are not directed to individuals under the age of 16. 
                  We do not knowingly collect personal information from children without 
                  appropriate parental consent.
                </p>
                <div className="privacy-note">
                  <strong>Pediatric Research:</strong> For clinical trials and research 
                  involving minors, we obtain appropriate parental consent and follow 
                  specific pediatric research ethics guidelines.
                </div>
              </div>
            </div>

            {/* Policy Changes */}
            <div id="changes" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">12</span>
                Changes to This Policy
              </h2>
              <div className="privacy-section-content">
                <p>
                  We may update this Privacy Policy periodically to reflect changes in 
                  our practices, services, or legal requirements.
                </p>
                <div className="change-notification">
                  <h4>Notification of Changes</h4>
                  <p>
                    We will notify you of significant changes through our website, email, 
                    or other appropriate channels at least 30 days before changes take effect.
                  </p>
                </div>
                <p>
                  We encourage you to review this policy periodically to stay informed 
                  about how we protect your information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div id="contact" className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="section-number">13</span>
                Contact Information
              </h2>
              <div className="privacy-section-content">
                <p>
                  For privacy-related questions, concerns, or to exercise your rights, 
                  please contact our Data Protection Team:
                </p>

                <div className="privacy-contact-details">
                  <div className="contact-method">
                    <div className="contact-icon">📧</div>
                    <div className="contact-info">
                      <strong>Email:</strong> privacy@spchealth.com
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">📞</div>
                    <div className="contact-info">
                      <strong>Phone:</strong> +1 (555) 123-PRIVACY
                    </div>
                  </div>
                  <div className="contact-method">
                    <div className="contact-icon">📬</div>
                    <div className="contact-info">
                      <strong>Mail:</strong><br />
                      Data Protection Officer<br />
                      SPC Healthcare<br />
                      123 Healthcare Avenue<br />
                      Medical City, MC 12345<br />
                      United States
                    </div>
                  </div>
                </div>

                <div className="regulatory-contacts">
                  <h4>Regulatory Authorities</h4>
                  <p>
                    You have the right to lodge a complaint with your local data protection 
                    authority if you believe we have not addressed your concerns adequately.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Acceptance */}
            <div className="policy-acceptance-section">
              <div className="acceptance-content">
                <h3>Policy Acceptance</h3>
                <p>
                  By using our services, you acknowledge that you have read and understood 
                  this Privacy Policy and consent to the collection, use, and sharing of 
                  your information as described herein.
                </p>
                <div className="acceptance-date">
                  <strong>Effective Date:</strong> March 15, 2024<br />
                  <strong>Version:</strong> 3.2
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}