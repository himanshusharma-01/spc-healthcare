'use client';

import { useState } from 'react';
import Link from 'next/link';
import './ourCompany.css';

export default function OurCompany() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Company Overview', icon: '🏢' },
    { id: 'history', label: 'Our History', icon: '📜' },
    { id: 'values', label: 'Core Values', icon: '💎' }
  ];

  const companyData = {
    overview: {
      title: "SPC Healthcare Pvt. Ltd. - Dynamic Healthcare Solutions",
      content: "SPC Healthcare Pvt. Ltd. is a dynamic healthcare solutions company established in 2018 dedicated to delivering high-quality, reliable, and customer-focused medical products across the market. Built on strong ethics and operational excellence, we serve distributors, institutions, and businesses with consistency and trust.",
      highlights: [
        "Established in 2018 with a clear mission",
        "High-quality, reliable medical products",
        "Customer-focused approach",
        "Strong ethics and operational excellence",
        "Serving distributors, institutions, and businesses"
      ],
      goal: "Our goal is simple: to make healthcare products accessible, dependable, and efficiently delivered—every single time."
    },
    history: {
      title: "Our Journey Through Time",
      content: "Founded in 2018, SPC Healthcare Pvt. Ltd. began with a clear mission to support the healthcare ecosystem with seamless supply and service.",
      milestones: [
        { year: "2018", event: "Company founded with a clear mission to support the healthcare ecosystem" },
        { year: "2020", event: "Played a crucial role during COVID-19 pandemic ensuring uninterrupted availability of essential products" },
        { year: "2020-2024", event: "Significant growth phase with agile operations, quick response mechanisms, and commitment to customer support" },
        { year: "Present", event: "Evolved from a small, determined team to a structured and expanding organization, continuing to grow with the same passion and purpose" }
      ],
      additionalContent: "During the COVID-19 pandemic, the company played a crucial role in ensuring uninterrupted availability of essential products. This period marked a significant phase of growth, as our agile operations, quick response mechanisms, and commitment to customer support helped us scale rapidly. From a small, determined team to a structured and expanding organization, SPC Healthcare continues to grow with the same passion and purpose that sparked its beginning."
    },
    values: {
      title: "Our Core Values",
      content: "These fundamental principles guide every decision we make and every action we take in our mission to deliver exceptional healthcare solutions.",
      values: [
        {
          title: "Integrity",
          description: "We operate with honesty, transparency, and responsibility.",
          icon: "⚖️"
        },
        {
          title: "Quality",
          description: "Every product and process reflects our commitment to excellence.",
          icon: "✨"
        },
        {
          title: "Customer Focus",
          description: "We prioritize the needs of every client, ensuring smooth communication and professional service.",
          icon: "❤️"
        },
        {
          title: "Reliability",
          description: "Timely delivery and consistent supply form the foundation of our operations.",
          icon: "🛡️"
        },
        {
          title: "Continuous Improvement",
          description: "We invest in systems, processes, and people as we evolve with the industry.",
          icon: "📈"
        }
      ]
    },
  };

  const currentData = companyData[activeTab as keyof typeof companyData];

  return (
    <div className="our-company-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
      </section>

      {/* Navigation Tabs */}
      <section className="tabs-section">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="content-container">
          <h2 className="content-title">{currentData.title}</h2>
          <p className="content-description">{currentData.content}</p>

          {/* Overview Content */}
          {activeTab === 'overview' && 'highlights' in currentData && (
            <div className="overview-content">
              {currentData.goal && (
                <div className="overview-goal">
                  <p className="goal-text">{currentData.goal}</p>
                </div>
              )}
              <div className="highlights-grid">
                {currentData.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="highlight-card">
                    <div className="highlight-icon">✨</div>
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History Content */}
          {activeTab === 'history' && 'milestones' in currentData && (
            <div className="history-content">
              {currentData.additionalContent && (
                <div className="history-additional">
                  <p>{currentData.additionalContent}</p>
                </div>
              )}
              <div className="timeline">
                {currentData.milestones.map((milestone: { year: string; event: string }, index: number) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-year">{milestone.year}</div>
                    <div className="timeline-content">
                      <p>{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Values Content */}
          {activeTab === 'values' && 'values' in currentData && (
            <div className="values-content">
              <div className="values-grid">
                {currentData.values.map((value: { title: string; description: string; icon: string }, index: number) => (
                  <div key={index} className="value-card">
                    <div className="value-icon">{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Join Us in Shaping the Future of Healthcare</h2>
          <p>Be part of our mission to improve global health through innovative pharmaceutical solutions</p>
          <div className="cta-buttons">
            <Link href="/contact">
              <button className="btn-secondary">Contact Us</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}