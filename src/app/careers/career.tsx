'use client';

import { useState } from 'react';
import '../components/Homepage.css';
import './career.css';
import Link from 'next/link';

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Format date consistently to avoid hydration mismatch
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const jobCategories = [
    { id: 'all', name: 'All Positions', count: 3, icon: '💼' },
    { id: 'sales', name: 'Sales', count: 2, icon: '📈' },
    { id: 'marketing', name: 'Marketing', count: 1, icon: '📱' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Medical Representative',
      department: 'Sales',
      location: 'Multiple Openings Across Punjab',
      type: 'Full-time',
      experience: '6 months to 2 years',
      category: 'sales',
      description: 'We are seeking experienced Medical Representatives to promote our product portfolio, strengthen retailer relationships, and drive sales performance across assigned territories in Punjab.',
      responsibilities: [
        'Visit potential and existing retail partners/chemists to pitch and promote company products',
        'Achieve assigned sales targets through effective territory coverage and consistent field activity',
        'Build and maintain strong relationships with retailers, stockists, and distributors',
        'Address customer queries promptly and ensure timely follow-ups for order placement and fulfilment',
        'Collect and report market insights, competitor activities, and customer feedback to support sales strategy',
        'Maintain daily activity reports and adhere to company reporting requirements'
      ],
      requirements: [
        'Minimum 6 months to 2 years of experience in pharmaceutical/FMCG sales or related field (mandatory)',
        'Strong communication, negotiation, and relationship-building skills',
        'Ability to independently manage field operations with discipline and accountability',
        'Valid two-wheeler and driving license preferred'
      ],
      posted: '2024-12-01'
    },
    {
      id: 2,
      title: 'Sales Support Executive',
      department: 'Sales',
      location: 'Corporate Office',
      type: 'Full-time',
      experience: '1+ years',
      category: 'sales',
      description: 'We are looking for a result-oriented Sales Support Executive to convert leads into customers, build strong customer relationships, and contribute to overall sales growth. The role requires good communication skills, product understanding, and the ability to meet sales targets consistently.',
      responsibilities: [
        'Convert assigned leads into active customers through follow-up calls and product explanations',
        'Drive sales by promoting products and ensuring repeat orders from existing customers',
        'Build and maintain strong customer relationships to ensure long-term engagement',
        'Understand customer needs and provide suitable product recommendations',
        'Maintain lead conversion records and update daily progress reports',
        'Work towards achieving monthly and quarterly sales targets',
        'Address customer queries and ensure smooth communication throughout the sales cycle'
      ],
      requirements: [
        'B.Pharmacy or D.Pharmacy preferred for better product understanding',
        'Minimum 1 year of experience in telesales, customer handling, or sales conversion roles',
        'Strong communication and persuasion skills',
        'Ability to achieve targets and manage customer relations effectively',
        'Basic knowledge of CRM tools or Excel is an added advantage'
      ],
      posted: '2024-12-01'
    },
    {
      id: 3,
      title: 'Digital Marketing Executive',
      department: 'Marketing',
      location: 'Corporate Office',
      type: 'Full-time',
      experience: '1+ years',
      category: 'marketing',
      description: 'We are seeking a creative and data-driven Digital Marketer who can manage online marketing activities, enhance brand visibility, and support sales growth through digital channels. The ideal candidate should be skilled in running targeted campaigns, creating engaging content, managing social media platforms, and analyzing performance metrics to improve ROI.',
      responsibilities: [
        'Plan, execute, and optimize digital marketing campaigns across platforms (Meta, Google, LinkedIn, etc.)',
        'Manage SPC Healthcare\'s social media presence—posting, monitoring engagement, and increasing reach',
        'Create engaging content for social media, website, emailers, and promotional materials',
        'Run paid ads and monitor campaign performance to ensure maximum lead generation',
        'Coordinate with the sales team to support product promotions and improve lead quality',
        'Track, analyze, and report on key digital metrics (traffic, leads, conversion rates, cost per lead)',
        'Maintain and update the company website with relevant banners, product info, and content',
        'Work with designers and vendors for creative assets, videos, and marketing materials',
        'Stay updated with digital trends, competitor activities, and new marketing tools',
        'Contribute to brand-building, online reputation management, and customer engagement strategies'
      ],
      requirements: [
        'Bachelor\'s degree in Marketing, Digital Media, Communications, or a related field',
        'Minimum 1 year of experience in digital marketing or managing social media campaigns',
        'Strong understanding of digital platforms: Meta Ads, Google Ads, SEO, basic analytics',
        'Good communication skills and the ability to create clear, appealing content',
        'Knowledge of tools such as Canva, Meta Business Suite, Google Analytics, Mailchimp, or similar',
        'Ability to work with sales teams and align digital activities with business goals',
        'Creative mindset with strong attention to detail and analytical thinking'
      ],
      posted: '2024-12-01'
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
      {/* Career Opportunities Description */}
      <section className="why-join-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Career Opportunities at SPC Healthcare</h2>
            <p className="l3-section-subtitle">
              At our organization, we provide dynamic and rewarding career opportunities for individuals who are passionate, dedicated, and eager to grow. We believe in fostering an environment where talent is recognized, encouraged, and empowered to thrive.
            </p>
            <p className="l3-section-subtitle">
              Our career opportunities span across various domains, offering roles for both experienced professionals and fresh graduates who aspire to build a meaningful career. We focus on continuous learning, skill development, and professional advancement to ensure our team members can achieve their full potential.
            </p>
          </div>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">💼</div>
              <h3>Diverse Roles Across Departments</h3>
              <p>
                Opportunities in operations, administration, finance, customer service, project management, technology, and more.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">📚</div>
              <h3>Professional Growth & Development</h3>
              <p>
                Access to training programs, mentorship, and skill-building initiatives to support long-term career advancement.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💡</div>
              <h3>Innovative Work Environment</h3>
              <p>
                A culture that values creativity, problem-solving, and new ideas, encouraging employees to contribute meaningfully.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">⭐</div>
              <h3>Employee-Centered Policies</h3>
              <p>
                Competitive compensation, performance recognition, work–life balance practices, and a supportive workplace atmosphere.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👔</div>
              <h3>Opportunities for Leadership</h3>
              <p>
                Clear pathways for high-performing individuals to take on leadership and managerial responsibilities.
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
                {job.responsibilities && (
                  <div className="job-responsibilities">
                    <h4>Key Responsibilities:</h4>
                    <ul>
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="job-requirements">
                  <h4>Required Qualifications:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-footer">
                  <div className="job-posted">Posted: {formatDate(job.posted)}</div>
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
             <Link href="/contact"> <button className="l3-btn l3-btn-secondary l3-btn-large">Contact To Join Talent Network</button></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}