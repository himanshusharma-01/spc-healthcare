'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './quality.css';

export default function QualitySafetyPage() {
  const [activeTab, setActiveTab] = useState('quality');

  const qualitySystems = [
    {
      icon: '🏭',
      title: 'Good Manufacturing Practices (GMP)',
      description: 'Stringent manufacturing standards ensuring product quality and consistency across all facilities.',
      features: ['FDA & EMA compliant', 'Batch record review', 'Environmental monitoring', 'Process validation']
    },
    {
      icon: '🔍',
      title: 'Quality Control Laboratories',
      description: 'State-of-the-art testing facilities for raw materials, in-process, and finished product testing.',
      features: ['HPLC/GC testing', 'Microbiological analysis', 'Stability studies', 'Method validation']
    },
    {
      icon: '📊',
      title: 'Quality Management System',
      description: 'Comprehensive QMS integrating all quality processes from development to commercial manufacturing.',
      features: ['Document control', 'Change management', 'CAPA system', 'Management review']
    },
    {
      icon: '✅',
      title: 'Audit & Compliance',
      description: 'Regular internal and external audits to maintain compliance with global regulatory standards.',
      features: ['Regulatory inspections', 'Supplier audits', 'Internal audits', 'Compliance tracking']
    }
  ];

  const safetyPrograms = [
    {
      icon: '🛡️',
      title: 'Pharmacovigilance',
      description: 'Comprehensive drug safety monitoring system for adverse event reporting and risk management.',
      features: ['Global safety database', 'Risk management plans', 'Periodic safety reports', 'Signal detection']
    },
    {
      icon: '⚕️',
      title: 'Patient Safety',
      description: 'Dedicated programs ensuring patient safety through proper product use and education.',
      features: ['Patient education materials', 'Risk communication', 'Safety updates', 'Healthcare professional training']
    },
    {
      icon: '🌍',
      title: 'Global Regulatory Compliance',
      description: 'Adherence to international safety regulations and reporting requirements across all markets.',
      features: ['FDA AE reporting', 'EMA EudraVigilance', 'WHO requirements', 'Local regulatory compliance']
    },
    {
      icon: '📈',
      title: 'Risk Management',
      description: 'Proactive risk assessment and mitigation strategies throughout product lifecycle.',
      features: ['Risk-benefit analysis', 'Safety specifications', 'Risk minimization', 'Post-authorization studies']
    }
  ];

  const certifications = [
    { name: 'ISO 13485:2016', scope: 'Medical Devices Quality Management', icon: '🏥' },
    { name: 'WHO-GMP', scope: 'Good Manufacturing Practices', icon: '🌍' },
    { name: 'FDA cGMP', scope: 'Current Good Manufacturing Practices', icon: '🇺🇸' },
    { name: 'EMA GMP', scope: 'European Medicines Agency Compliance', icon: '🇪🇺' },
    { name: 'ISO 9001:2015', scope: 'Quality Management Systems', icon: '✅' },
    { name: 'ISO 17025', scope: 'Laboratory Testing Competence', icon: '🔬' }
  ];

  const complianceStats = [
    { number: '100%', label: 'Regulatory Inspection Success', icon: '✅' },
    { number: '25+', label: 'Years Perfect Safety Record', icon: '🛡️' },
    { number: '500M+', label: 'Doses Safely Delivered', icon: '💊' },
    { number: '0', label: 'Major Quality Incidents', icon: '⭐' }
  ];

  const qualityPrinciples = [
    {
      principle: 'Quality by Design',
      description: 'Building quality into products from initial development through commercial manufacturing.',
      icon: '🎯'
    },
    {
      principle: 'Data Integrity',
      description: 'Ensuring complete, consistent, and accurate data throughout all operations.',
      icon: '📊'
    },
    {
      principle: 'Continuous Improvement',
      description: 'Ongoing enhancement of processes and systems through data-driven decisions.',
      icon: '🔄'
    },
    {
      principle: 'Patient Focus',
      description: 'Every quality decision centers on patient safety and product efficacy.',
      icon: '❤️'
    }
  ];

  return (
    <div className="l3-container quality-safety-page">
      {/* Hero Section */}
      <section className="quality-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="quality-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="quality-hero-content">
            <div className="quality-hero-text">
              <h1 className="quality-hero-title">
                <span className="l3-title-line">Quality & Safety</span>
                <span className="l3-title-line">Excellence</span>
              </h1>
              <p className="quality-hero-subtitle">
                Uncompromising commitment to quality manufacturing and patient safety. 
                Every product we deliver meets the highest global standards for efficacy and reliability.
              </p>
              <div className="quality-hero-stats">
                {complianceStats.map((stat, index) => (
                  <div key={index} className="quality-stat">
                    <div className="quality-stat-icon">{stat.icon}</div>
                    <div className="quality-stat-info">
                      <div className="quality-stat-number">{stat.number}</div>
                      <div className="quality-stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="quality-hero-visual">
              <div className="quality-visual-element">
                <div className="quality-shield">🛡️</div>
                <div className="quality-certificate">📜</div>
                <div className="quality-badge">✅</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="quality-tabs-section">
        <div className="l3-container-inner">
          <div className="quality-tabs-container">
            <button 
              className={`quality-tab ${activeTab === 'quality' ? 'active' : ''}`}
              onClick={() => setActiveTab('quality')}
            >
              <span className="tab-icon">🏭</span>
              <span className="tab-title">Quality Systems</span>
            </button>
            <button 
              className={`quality-tab ${activeTab === 'safety' ? 'active' : ''}`}
              onClick={() => setActiveTab('safety')}
            >
              <span className="tab-icon">🛡️</span>
              <span className="tab-title">Patient Safety</span>
            </button>
            <button 
              className={`quality-tab ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <span className="tab-icon">✅</span>
              <span className="tab-title">Certifications</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quality Systems Content */}
      {activeTab === 'quality' && (
        <section className="quality-content-section">
          <div className="l3-container-inner">
            <div className="section-header">
              <h2 className="l3-section-title">Quality Management Systems</h2>
              <p className="l3-section-subtitle">
                Comprehensive quality frameworks ensuring product excellence from raw materials to finished products.
              </p>
            </div>

            <div className="quality-systems-grid">
              {qualitySystems.map((system, index) => (
                <div key={index} className="quality-system-card">
                  <div className="system-header">
                    <div className="system-icon">{system.icon}</div>
                    <h3 className="system-title">{system.title}</h3>
                  </div>
                  <p className="system-description">{system.description}</p>
                  <div className="system-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {system.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Principles */}
            <div className="quality-principles-section">
              <h3 className="principles-title">Our Quality Principles</h3>
              <div className="principles-grid">
                {qualityPrinciples.map((principle, index) => (
                  <div key={index} className="principle-card">
                    <div className="principle-icon">{principle.icon}</div>
                    <h4 className="principle-name">{principle.principle}</h4>
                    <p className="principle-description">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Safety Programs Content */}
      {activeTab === 'safety' && (
        <section className="safety-content-section">
          <div className="l3-container-inner">
            <div className="section-header">
              <h2 className="l3-section-title">Patient Safety Programs</h2>
              <p className="l3-section-subtitle">
                Comprehensive safety monitoring and risk management ensuring patient wellbeing worldwide.
              </p>
            </div>

            <div className="safety-programs-grid">
              {safetyPrograms.map((program, index) => (
                <div key={index} className="safety-program-card">
                  <div className="program-header">
                    <div className="program-icon">{program.icon}</div>
                    <h3 className="program-title">{program.title}</h3>
                  </div>
                  <p className="program-description">{program.description}</p>
                  <div className="program-features">
                    <h4>Program Components:</h4>
                    <ul>
                      {program.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Commitment */}
            <div className="safety-commitment">
              <div className="commitment-content">
                <div className="commitment-icon">❤️</div>
                <div className="commitment-text">
                  <h3>Our Safety Commitment</h3>
                  <p>
                    Patient safety is our highest priority. We maintain vigilant safety monitoring 
                    throughout the entire product lifecycle, from clinical development to post-market surveillance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Content */}
      {activeTab === 'certifications' && (
        <section className="certifications-content-section">
          <div className="l3-container-inner">
            <div className="section-header">
              <h2 className="l3-section-title">Global Certifications & Compliance</h2>
              <p className="l3-section-subtitle">
                Recognized excellence through international certifications and regulatory approvals.
              </p>
            </div>

            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-card">
                  <div className="certification-header">
                    <div className="certification-icon">{cert.icon}</div>
                    <h3 className="certification-name">{cert.name}</h3>
                  </div>
                  <p className="certification-scope">{cert.scope}</p>
                  <div className="certification-status">
                    <span className="status-badge">Active</span>
                    <span className="status-date">Renewed 2024</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Map */}
            <div className="regulatory-map-section">
              <h3 className="regulatory-title">Global Regulatory Compliance</h3>
              <div className="regulatory-grid">
                <div className="regulatory-region">
                  <div className="region-icon">🇺🇸</div>
                  <h4>United States</h4>
                  <p>FDA compliant, cGMP certified, DEA registered</p>
                </div>
                <div className="regulatory-region">
                  <div className="region-icon">🇪🇺</div>
                  <h4>European Union</h4>
                  <p>EMA approved, EU GMP certified, MDR compliant</p>
                </div>
                <div className="regulatory-region">
                  <div className="region-icon">🌍</div>
                  <h4>International</h4>
                  <p>WHO prequalified, PIC/S member, ICH guidelines</p>
                </div>
                <div className="regulatory-region">
                  <div className="region-icon">🇯🇵</div>
                  <h4>Asia-Pacific</h4>
                  <p>PMDA approved, TGA certified, Health Canada</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Manufacturing Excellence */}
      <section className="manufacturing-section">
        <div className="l3-container-inner">
          <div className="manufacturing-content">
            <div className="manufacturing-text">
              <h2 className="l3-section-title">Manufacturing Excellence</h2>
              <p>
                Our state-of-the-art manufacturing facilities operate under the strictest quality controls, 
                ensuring every product meets identical standards regardless of production location.
              </p>
              <div className="manufacturing-features">
                <div className="manufacturing-feature">
                  <div className="feature-icon">🏭</div>
                  <div className="feature-content">
                    <h4>Global Manufacturing Network</h4>
                    <p>25+ facilities worldwide maintaining identical quality standards</p>
                  </div>
                </div>
                <div className="manufacturing-feature">
                  <div className="feature-icon">🔬</div>
                  <div className="feature-content">
                    <h4>Advanced Analytics</h4>
                    <p>Real-time monitoring and statistical process control</p>
                  </div>
                </div>
                <div className="manufacturing-feature">
                  <div className="feature-icon">📊</div>
                  <div className="feature-content">
                    <h4>Continuous Monitoring</h4>
                    <p>24/7 quality surveillance and automated compliance tracking</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="manufacturing-visual">
              <div className="manufacturing-placeholder">
                <div className="manufacturing-icon">⚗️</div>
                <p>Advanced Pharmaceutical Manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance Process */}
      <section className="qa-process-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Quality Assurance Process</h2>
            <p className="l3-section-subtitle">
              End-to-end quality control from raw material sourcing to patient delivery.
            </p>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>Raw Material Qualification</h4>
                <p>Rigorous testing and certification of all incoming materials</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>In-Process Controls</h4>
                <p>Continuous monitoring during manufacturing operations</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>Finished Product Testing</h4>
                <p>Comprehensive analytical testing before release</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h4>Stability Studies</h4>
                <p>Ongoing shelf-life monitoring and validation</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h4>Market Surveillance</h4>
                <p>Post-market quality monitoring and feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="quality-cta-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="quality-cta-content">
            <h2 className="quality-cta-title">Committed to Excellence</h2>
            <p className="quality-cta-text">
              Our unwavering commitment to quality and safety ensures that every SPC Healthcare product 
              meets the highest standards of efficacy and reliability for patients worldwide.
            </p>
            <div className="quality-cta-buttons">
              <button className="l3-btn l3-btn-primary l3-btn-large">Download Quality Policy</button>
              <button className="l3-btn l3-btn-secondary l3-btn-large">Contact Quality Team</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}