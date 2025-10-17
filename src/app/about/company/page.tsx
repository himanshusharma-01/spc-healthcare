'use client';

import { useState } from 'react';
import './ourCompany.css';

export default function OurCompany() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Company Overview', icon: '🏢' },
    { id: 'history', label: 'Our History', icon: '📜' },
    { id: 'values', label: 'Core Values', icon: '💎' },
    { id: 'leadership', label: 'Leadership', icon: '👥' },
    { id: 'awards', label: 'Awards & Recognition', icon: '🏆' }
  ];

  const companyData = {
    overview: {
      title: "SPC Healthcare - Leading Pharmaceutical Innovation",
      content: "SPC Healthcare is a globally recognized pharmaceutical company dedicated to improving human health through innovative research, development, and manufacturing of high-quality pharmaceutical products. Founded in 1999, we have grown from a small research facility to a multinational corporation serving over 80 countries worldwide.",
      highlights: [
        "25+ years of pharmaceutical excellence",
        "500+ products in our portfolio",
        "80+ countries served globally",
        "200+ research publications",
        "50+ international partnerships"
      ]
    },
    history: {
      title: "Our Journey Through Time",
      content: "From humble beginnings to global recognition, SPC Healthcare's journey has been marked by continuous innovation, strategic partnerships, and unwavering commitment to improving patient outcomes worldwide.",
      milestones: [
        { year: "1999", event: "Company founded with focus on cardiovascular research" },
        { year: "2005", event: "First international expansion to European markets" },
        { year: "2010", event: "Launched oncology division with breakthrough cancer treatments" },
        { year: "2015", event: "Achieved $1B annual revenue milestone" },
        { year: "2020", event: "Pioneered COVID-19 treatment research and development" },
        { year: "2024", event: "Expanded to 80+ countries with 500+ products" }
      ]
    },
    values: {
      title: "Our Core Values",
      content: "These fundamental principles guide every decision we make and every action we take in our mission to improve global healthcare.",
      values: [
        {
          title: "Innovation Excellence",
          description: "We continuously push the boundaries of pharmaceutical science to develop breakthrough treatments that address unmet medical needs.",
          icon: "🔬"
        },
        {
          title: "Patient-Centric Approach",
          description: "Every product we develop and every decision we make is guided by our commitment to improving patient outcomes and quality of life.",
          icon: "❤️"
        },
        {
          title: "Quality & Safety",
          description: "We maintain the highest standards of quality and safety in all our manufacturing processes and product development.",
          icon: "🛡️"
        },
        {
          title: "Global Responsibility",
          description: "We are committed to making healthcare accessible and affordable to communities worldwide, regardless of their economic status.",
          icon: "🌍"
        },
        {
          title: "Ethical Integrity",
          description: "We conduct our business with the highest ethical standards, transparency, and accountability in all our operations.",
          icon: "⚖️"
        }
      ]
    },
    leadership: {
      title: "Meet Our Leadership Team",
      content: "Our experienced leadership team brings together decades of pharmaceutical expertise, strategic vision, and commitment to advancing global healthcare.",
      leaders: [
        {
          name: "Dr. Sarah Chen",
          position: "Chief Executive Officer",
          experience: "25+ years in pharmaceutical leadership",
          education: "Ph.D. in Pharmaceutical Sciences, Harvard University",
          image: "👩‍💼"
        },
        {
          name: "Dr. Michael Rodriguez",
          position: "Chief Scientific Officer",
          experience: "20+ years in drug development",
          education: "M.D., Ph.D. in Molecular Biology, Stanford University",
          image: "👨‍🔬"
        },
        {
          name: "Emma Thompson",
          position: "Chief Operating Officer",
          experience: "18+ years in global operations",
          education: "MBA in International Business, Wharton School",
          image: "👩‍💼"
        },
        {
          name: "Dr. James Wilson",
          position: "Chief Medical Officer",
          experience: "22+ years in clinical research",
          education: "M.D. in Internal Medicine, Johns Hopkins University",
          image: "👨‍⚕️"
        }
      ]
    },
    awards: {
      title: "Recognition & Achievements",
      content: "Our commitment to excellence has been recognized by industry leaders, regulatory bodies, and healthcare organizations worldwide.",
      awards: [
        {
          year: "2024",
          title: "Global Pharmaceutical Excellence Award",
          organization: "International Pharmaceutical Federation",
          description: "Recognized for outstanding contribution to global healthcare access"
        },
        {
          year: "2023",
          title: "Innovation in Drug Development",
          organization: "World Health Organization",
          description: "Awarded for breakthrough treatments in rare diseases"
        },
        {
          year: "2022",
          title: "Best Manufacturing Practices",
          organization: "FDA Excellence Program",
          description: "Recognized for maintaining highest quality standards"
        },
        {
          year: "2021",
          title: "Corporate Social Responsibility Award",
          organization: "Global Health Initiative",
          description: "Acknowledged for our commitment to affordable healthcare"
        },
        {
          year: "2020",
          title: "COVID-19 Response Excellence",
          organization: "United Nations",
          description: "Recognized for rapid development of pandemic treatments"
        }
      ]
    }
  };

  const currentData = companyData[activeTab as keyof typeof companyData];

  return (
    <div className="our-company-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>About Our Company</h1>
          <p>Discover the story, values, and people behind SPC Healthcare's mission to improve global health</p>
        </div>
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

          {/* Leadership Content */}
          {activeTab === 'leadership' && 'leaders' in currentData && (
            <div className="leadership-content">
              <div className="leaders-grid">
                {currentData.leaders.map((leader: { name: string; position: string; experience: string; education: string; image: string }, index: number) => (
                  <div key={index} className="leader-card">
                    <div className="leader-image">{leader.image}</div>
                    <h3>{leader.name}</h3>
                    <p className="leader-position">{leader.position}</p>
                    <p className="leader-experience">{leader.experience}</p>
                    <p className="leader-education">{leader.education}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards Content */}
          {activeTab === 'awards' && 'awards' in currentData && (
            <div className="awards-content">
              <div className="awards-list">
                {currentData.awards.map((award, index) => (
                  <div key={index} className="award-item">
                    <div className="award-year">{award.year}</div>
                    <div className="award-content">
                      <h3>{award.title}</h3>
                      <p className="award-organization">{award.organization}</p>
                      <p className="award-description">{award.description}</p>
                    </div>
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
          
            <button className="btn-secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}