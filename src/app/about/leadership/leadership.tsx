'use client';

import { useEffect } from 'react';
import '../../components/Homepage.css';
import './leadership.css';

export default function LeadershipPage() {
  const executiveTeam = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Chief Executive Officer',
      bio: 'With over 25 years in the pharmaceutical industry, Dr. Chen has been instrumental in driving SPC Healthcare\'s global expansion and innovation strategy. She holds a PhD in Medical Sciences from Harvard University.',
      avatar: '👩‍⚕️',
      specialties: ['Strategic Leadership', 'Global Expansion', 'Medical Innovation'],
      experience: '25+ years',
      education: 'PhD Medical Sciences, Harvard University'
    },
    {
      id: 2,
      name: 'Dr. Michael Rodriguez',
      role: 'Chief Medical Officer',
      bio: 'Leading our clinical research and medical affairs, Dr. Rodriguez brings 20 years of experience in drug development and regulatory affairs. He has authored over 50 research publications.',
      avatar: '👨‍⚕️',
      specialties: ['Clinical Research', 'Regulatory Affairs', 'Medical Strategy'],
      experience: '20+ years',
      education: 'MD, Johns Hopkins University'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Chief Operations Officer',
      bio: 'Emma oversees global operations, supply chain, and manufacturing excellence. She has successfully scaled operations across 80+ countries while maintaining quality standards.',
      avatar: '👩‍💼',
      specialties: ['Operations Management', 'Supply Chain', 'Manufacturing'],
      experience: '18+ years',
      education: 'MBA, Stanford University'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      role: 'Chief Research Officer',
      bio: 'Dr. Wilson leads our R&D initiatives with expertise in pharmaceutical sciences. Under his leadership, we\'ve developed 150+ innovative healthcare products.',
      avatar: '🔬',
      specialties: ['R&D Management', 'Product Development', 'Innovation'],
      experience: '22+ years',
      education: 'PhD Pharmaceutical Sciences, MIT'
    }
  ];

  const departmentHeads = [
    {
      id: 1,
      name: 'Dr. Anita Sharma',
      role: 'Head of Clinical Research',
      department: 'Research & Development',
      avatar: '🧪',
      achievements: 'Led 100+ clinical trials, 30+ product approvals'
    },
    {
      id: 2,
      name: 'Robert Kim',
      role: 'Head of Manufacturing',
      department: 'Operations',
      avatar: '🏭',
      achievements: 'Scaled manufacturing to 25 global facilities'
    },
    {
      id: 3,
      name: 'Dr. Lisa Wang',
      role: 'Head of Quality Assurance',
      department: 'Quality & Compliance',
      avatar: '✅',
      achievements: 'Maintained 100% regulatory compliance across markets'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Head of International Markets',
      department: 'Global Business',
      avatar: '🌍',
      achievements: 'Expanded to 50+ new markets in 5 years'
    },
    {
      id: 5,
      name: 'Maria Gonzalez',
      role: 'Head of Digital Innovation',
      department: 'Technology',
      avatar: '💻',
      achievements: 'Launched AI-powered healthcare platforms'
    },
    {
      id: 6,
      name: 'Dr. Thomas Reed',
      role: 'Head of Medical Affairs',
      department: 'Medical',
      avatar: '📊',
      achievements: 'Established 200+ medical partnerships globally'
    }
  ];

  const boardMembers = [
    {
      id: 1,
      name: 'Prof. Richard Hayes',
      role: 'Chairman',
      affiliation: 'Former Dean, Harvard Medical School',
      avatar: '🎓',
      expertise: 'Medical Education, Healthcare Policy'
    },
    {
      id: 2,
      name: 'Dr. Susan Miller',
      role: 'Independent Director',
      affiliation: 'Former FDA Commissioner',
      avatar: '⚖️',
      expertise: 'Regulatory Affairs, Public Health'
    },
    {
      id: 3,
      name: 'Alex Turner',
      role: 'Independent Director',
      affiliation: 'Partner, Global Healthcare Ventures',
      avatar: '💼',
      expertise: 'Healthcare Investments, Business Strategy'
    },
    {
      id: 4,
      name: 'Dr. Fatima Al-Mansoori',
      role: 'Non-Executive Director',
      affiliation: 'Director, WHO Global Health Initiatives',
      avatar: '🌐',
      expertise: 'Global Health, International Development'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('l3-animate-in');
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll('.leadership-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="l3-container leadership-page">
      {/* Hero Section */}
      <section className="leadership-hero l3-section leadership-section" id="leadership-hero">
        <div className="l3-hero-background">
          <div className="l3-hero-overlay"></div>
          <div className="leadership-hero-pattern"></div>
        </div>
        <div className="l3-container-inner">
          <div className="leadership-hero-content" id="leadership-hero-content">
            <div className="leadership-hero-text" id="leadership-hero-text">
              <h1 className="leadership-hero-title">
                <span className="l3-title-line">Leadership</span>
                <span className="l3-title-line">That Drives Innovation</span>
              </h1>
              <p className="leadership-hero-subtitle">
                Meet the visionary leaders and dedicated experts guiding SPC Healthcare 
                toward a healthier future. Our leadership team combines decades of 
                experience with a passion for medical innovation.
              </p>
              <div className="leadership-stats">
                <div className="leadership-stat">
                  <div className="leadership-stat-number">100+</div>
                  <div className="leadership-stat-label">Years Combined Experience</div>
                </div>
                <div className="leadership-stat">
                  <div className="leadership-stat-number">25+</div>
                  <div className="leadership-stat-label">Countries of Origin</div>
                </div>
                <div className="leadership-stat">
                  <div className="leadership-stat-number">150+</div>
                  <div className="leadership-stat-label">Advanced Degrees</div>
                </div>
              </div>
            </div>
            <div className="leadership-hero-visual">
              <div className="leadership-visual-element">
                <div className="leadership-orbits">
                  <div className="orbit orbit-1"></div>
                  <div className="orbit orbit-2"></div>
                  <div className="orbit orbit-3"></div>
                </div>
                <div className="leadership-center-icon">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="executive-team leadership-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Executive Leadership</h2>
            <p className="l3-section-subtitle">
              Our executive team brings together diverse expertise to drive our mission forward
            </p>
          </div>
          <div className="executive-grid">
            {executiveTeam.map((executive) => (
              <div key={executive.id} className="executive-card">
                <div className="executive-header">
                  <div className="executive-avatar">{executive.avatar}</div>
                  <div className="executive-basic-info">
                    <h3 className="executive-name">{executive.name}</h3>
                    <div className="executive-role">{executive.role}</div>
                    <div className="executive-experience">{executive.experience}</div>
                  </div>
                </div>
                <div className="executive-bio">
                  <p>{executive.bio}</p>
                </div>
                <div className="executive-education">
                  <strong>Education:</strong> {executive.education}
                </div>
                <div className="executive-specialties">
                  <h4>Key Specialties:</h4>
                  <div className="specialties-list">
                    {executive.specialties.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Leadership */}
      <section className="department-leadership leadership-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Department Leadership</h2>
            <p className="l3-section-subtitle">
              Experts driving excellence across all areas of our organization
            </p>
          </div>
          <div className="department-grid">
            {departmentHeads.map((leader) => (
              <div key={leader.id} className="department-card">
                <div className="department-avatar">{leader.avatar}</div>
                <div className="department-info">
                  <h3 className="department-name">{leader.name}</h3>
                  <div className="department-role">{leader.role}</div>
                  <div className="department-name">{leader.department}</div>
                  <div className="department-achievements">
                    {leader.achievements}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="board-directors leadership-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Board of Directors</h2>
            <p className="l3-section-subtitle">
              Guiding our strategic direction with unparalleled expertise
            </p>
          </div>
          <div className="board-grid">
            {boardMembers.map((member) => (
              <div key={member.id} className="board-card">
                <div className="board-avatar">{member.avatar}</div>
                <h3 className="board-name">{member.name}</h3>
                <div className="board-role">{member.role}</div>
                <div className="board-affiliation">{member.affiliation}</div>
                <div className="board-expertise">
                  <strong>Expertise:</strong> {member.expertise}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="leadership-philosophy leadership-section">
        <div className="l3-container-inner">
          <div className="philosophy-content">
            <h2 className="l3-section-title">Our Leadership Philosophy</h2>
            <div className="philosophy-grid">
              <div className="philosophy-item">
                <div className="philosophy-icon">🎯</div>
                <h3>Visionary Thinking</h3>
                <p>Anticipating healthcare needs and innovating for future challenges</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">🤝</div>
                <h3>Collaborative Approach</h3>
                <p>Fostering teamwork and partnerships across global operations</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">⚡</div>
                <h3>Agile Leadership</h3>
                <p>Adapting quickly to changing healthcare landscapes and opportunities</p>
              </div>
              <div className="philosophy-item">
                <div className="philosophy-icon">❤️</div>
                <h3>Patient-Centered</h3>
                <p>Keeping patient wellbeing at the core of all decisions and innovations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="leadership-cta leadership-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="leadership-cta-content">
            <h2 className="leadership-cta-title">Join Our Leadership Team</h2>
            <p className="leadership-cta-text">
              Are you passionate about transforming healthcare? Explore opportunities 
              to join our leadership team and make a global impact.
            </p>
            <div className="leadership-cta-buttons">
              <button className="l3-btn l3-btn-primary l3-btn-large">View Open Positions</button>
              <button className="l3-btn l3-btn-secondary l3-btn-large">Contact Talent Team</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}