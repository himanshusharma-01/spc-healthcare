'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './career.css';

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const jobCategories = [
    { id: 'all', name: 'All Positions', count: 24, icon: '💼' },
    { id: 'research', name: 'Research & Development', count: 8, icon: '🔬' },
    { id: 'medical', name: 'Medical Affairs', count: 5, icon: '⚕️' },
    { id: 'operations', name: 'Operations', count: 6, icon: '🏭' },
    { id: 'commercial', name: 'Commercial', count: 3, icon: '📈' },
    { id: 'technology', name: 'Technology', count: 2, icon: '💻' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Clinical Research Associate',
      department: 'Research & Development',
      location: 'Boston, MA / Remote',
      type: 'Full-time',
      experience: '5+ years',
      category: 'research',
      description: 'Lead clinical trial monitoring and ensure compliance with protocols and regulatory requirements.',
      requirements: ['PhD in Life Sciences', '5+ years clinical research experience', 'GCP certification'],
      posted: '2024-03-15'
    },
    {
      id: 2,
      title: 'Pharmaceutical Manufacturing Manager',
      department: 'Operations',
      location: 'Research Triangle Park, NC',
      type: 'Full-time',
      experience: '8+ years',
      category: 'operations',
      description: 'Oversee GMP manufacturing operations and ensure quality standards in pharmaceutical production.',
      requirements: ['Bachelor in Chemical Engineering', '8+ years pharma manufacturing', 'GMP expertise'],
      posted: '2024-03-14'
    },
    {
      id: 3,
      title: 'Medical Science Liaison',
      department: 'Medical Affairs',
      location: 'Chicago, IL / Remote',
      type: 'Full-time',
      experience: '3+ years',
      category: 'medical',
      description: 'Build relationships with healthcare professionals and provide scientific expertise.',
      requirements: ['PharmD or MD', '3+ years MSL experience', 'Therapeutic area expertise'],
      posted: '2024-03-12'
    },
    {
      id: 4,
      title: 'Regulatory Affairs Specialist',
      department: 'Research & Development',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      category: 'research',
      description: 'Prepare and submit regulatory documents to health authorities worldwide.',
      requirements: ['BS in Regulatory Affairs', '4+ years regulatory experience', 'FDA/EMA knowledge'],
      posted: '2024-03-10'
    },
    {
      id: 5,
      title: 'Digital Health Product Manager',
      department: 'Technology',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      experience: '5+ years',
      category: 'technology',
      description: 'Lead development of digital healthcare solutions and patient engagement platforms.',
      requirements: ['MBA or related degree', '5+ years product management', 'Healthcare tech experience'],
      posted: '2024-03-08'
    },
    {
      id: 6,
      title: 'Quality Assurance Director',
      department: 'Operations',
      location: 'New Jersey, NJ',
      type: 'Full-time',
      experience: '10+ years',
      category: 'operations',
      description: 'Establish and maintain quality systems ensuring compliance with global regulations.',
      requirements: ['MS in Quality Assurance', '10+ years QA leadership', 'FDA inspection experience'],
      posted: '2024-03-05'
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Competitive Compensation',
      description: 'Industry-leading salary and performance bonuses'
    },
    {
      icon: '🏥',
      title: 'Comprehensive Healthcare',
      description: 'Medical, dental, and vision coverage for you and your family'
    },
    {
      icon: '📚',
      title: 'Professional Development',
      description: 'Continuous learning opportunities and education support'
    },
    {
      icon: '🌴',
      title: 'Generous Time Off',
      description: 'Flexible PTO and paid parental leave programs'
    },
    {
      icon: '⚕️',
      title: 'Wellness Programs',
      description: 'Mental health support and wellness initiatives'
    },
    {
      icon: '🌍',
      title: 'Global Opportunities',
      description: 'Career growth across 80+ countries'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="l3-container careers-page">
      {/* Hero Section */}
      <section className="careers-hero l3-section">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="careers-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="careers-hero-content">
            <div className="careers-hero-text">
              <h1 className="careers-hero-title">
                <span className="l3-title-line">Build Your Career</span>
                <span className="l3-title-line">in Healthcare Innovation</span>
              </h1>
              <p className="careers-hero-subtitle">
                Join SPC Healthcare and be part of a team that&apos;s transforming patient lives 
                worldwide through cutting-edge medical research and innovative healthcare solutions.
              </p>
              <div className="careers-hero-stats">
                <div className="career-stat">
                  <div className="career-stat-number">24</div>
                  <div className="career-stat-label">Open Positions</div>
                </div>
                <div className="career-stat">
                  <div className="career-stat-number">80+</div>
                  <div className="career-stat-label">Countries</div>
                </div>
                <div className="career-stat">
                  <div className="career-stat-number">1000+</div>
                  <div className="career-stat-label">Team Members</div>
                </div>
              </div>
              <div className="careers-hero-buttons">
                <button 
                  className="l3-btn l3-btn-primary"
                  onClick={() => document.getElementById('job-openings')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact For More Information
                </button>
                
              </div>
            </div>
            <div className="careers-hero-visual">
              <div className="careers-visual-element">
                <div className="careers-molecule"></div>
                <div className="careers-people-icon">👥</div>
                <div className="careers-growth-chart">📊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join SPC Section */}
      <section className="why-join-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Why Join SPC Healthcare?</h2>
            <p className="l3-section-subtitle">
              Be part of a mission-driven organization where your work directly impacts patient lives worldwide.
            </p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Purpose-Driven Work</h3>
              <p>
                Every role at SPC Healthcare contributes to our mission of improving patient 
                outcomes and advancing global healthcare.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🚀</div>
              <h3>Innovation Culture</h3>
              <p>
                Work with cutting-edge technologies and contribute to groundbreaking research 
                in pharmaceutical development.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🌍</div>
              <h3>Global Impact</h3>
              <p>
                Join a team that serves 80+ countries, making quality healthcare accessible 
                to communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Employee Benefits & Perks</h2>
            <p className="l3-section-subtitle">
              We invest in our team&apos;s wellbeing and professional growth with comprehensive benefits.
            </p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="job-openings" className="jobs-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Current Open Positions</h2>
            <p className="l3-section-subtitle">
              Explore opportunities to join our innovative healthcare team.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="jobs-filter-container">
            <div className="search-box">
              <div className="search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search positions by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="category-filters">
              {jobCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-badge">{job.type}</div>
                </div>
                <div className="job-meta">
                  <div className="meta-item">
                    <span className="meta-icon">🏢</span>
                    <span className="meta-text">{job.department}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📍</span>
                    <span className="meta-text">{job.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    <span className="meta-text">{job.experience}</span>
                  </div>
                </div>
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <h4>Key Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-footer">
                  <div className="job-posted">Posted: {new Date(job.posted).toLocaleDateString()}</div>
                  <button className="l3-btn l3-btn-primary">Apply Now</button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="no-jobs-message">
              <div className="no-jobs-icon">🔍</div>
              <h3>No positions found</h3>
              <p>Try adjusting your search criteria or browse all categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="culture-section">
        <div className="l3-container-inner">
          <div className="culture-content">
            <div className="culture-text">
              <h2 className="l3-section-title">Our Culture & Values</h2>
              <p>
                At SPC Healthcare, we foster a collaborative environment where innovation thrives 
                and every team member&apos;s contribution is valued. Our culture is built on:
              </p>
              <div className="values-list">
                
                <div className="value-item">
                  <strong>Scientific Excellence:</strong> Rigorous research and evidence-based approaches
                </div>
                <div className="value-item">
                  <strong>Collaborative Innovation:</strong> Cross-functional teamwork driving breakthroughs
                </div>
                <div className="value-item">
                  <strong>Global Citizenship:</strong> Commitment to healthcare accessibility worldwide
                </div>
              </div>
            </div>
            <div className="culture-visual">
              <div className="culture-placeholder">
                <div className="culture-icon">🌟</div>
                <p>Team Collaboration & Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="careers-cta-content">
            <h2 className="careers-cta-title">Ready to Make an Impact?</h2>
            <p className="careers-cta-text">
              Join our team and help shape the future of healthcare. Even if you don&apos;t see 
              the perfect role today, connect with us for future opportunities.
            </p>
            <div className="careers-cta-buttons">
              <button className="l3-btn l3-btn-secondary l3-btn-large">Contact To Join Talent Network</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}