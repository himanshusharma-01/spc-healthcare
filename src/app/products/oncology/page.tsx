'use client';

import { useState } from 'react';
import './OncologyProductsPage.css';

export default function OncologyProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const productFilters = [
    { id: 'all', name: 'All Products', count: 8 },
    { id: 'targeted', name: 'Targeted Therapy', count: 4 },
    { id: 'immuno', name: 'Immunotherapy', count: 2 },
    { id: 'chemo', name: 'Chemotherapy', count: 2 },
    { id: 'supportive', name: 'Supportive Care', count: 3 }
  ];

  const oncologyProducts = [
    {
      id: 1,
      name: 'OncoTarget Plus',
      category: 'targeted',
      type: 'Small Molecule Inhibitor',
      indication: 'Non-Small Cell Lung Cancer',
      description: 'Advanced tyrosine kinase inhibitor targeting specific genetic mutations in NSCLC with improved safety profile.',
      mechanism: 'EGFR & ALK inhibition',
      dosage: '150mg once daily',
      status: 'Approved',
      features: ['Precision targeting', 'Oral administration', 'Well-tolerated profile', 'Clinical efficacy demonstrated'],
      image: '💊',
      productImage: '/api/placeholder/300/200?text=OncoTarget+Plus'
    },
    {
      id: 2,
      name: 'ImmunoBoost PD-1',
      category: 'immuno',
      type: 'Monoclonal Antibody',
      indication: 'Melanoma, Lung Cancer',
      description: 'PD-1 checkpoint inhibitor that enhances immune system recognition and attack of cancer cells.',
      mechanism: 'PD-1 receptor blockade',
      dosage: '200mg IV every 3 weeks',
      status: 'Approved',
      features: ['Durable responses', 'Combination therapy potential', 'Improved survival', 'Manageable safety profile'],
      image: '🛡️',
      productImage: '/api/placeholder/300/200?text=ImmunoBoost+PD-1'
    },
    {
      id: 3,
      name: 'CaroThera',
      category: 'targeted',
      type: 'CAR-T Cell Therapy',
      indication: 'B-cell Malignancies',
      description: 'Innovative chimeric antigen receptor T-cell therapy for relapsed/refractory hematologic cancers.',
      mechanism: 'CD19-directed CAR-T cells',
      dosage: 'Single infusion',
      status: 'Clinical Trials',
      features: ['Personalized therapy', 'Single administration', 'High response rates', 'Advanced manufacturing'],
      image: '🧬',
      productImage: '/api/placeholder/300/200?text=CaroThera'
    },
    {
      id: 4,
      name: 'CytoGuard',
      category: 'supportive',
      type: 'Supportive Care',
      indication: 'Chemotherapy-induced Neutropenia',
      description: 'Long-acting granulocyte colony-stimulating factor for prevention of chemotherapy complications.',
      mechanism: 'G-CSF analog',
      dosage: '6mg single dose per cycle',
      status: 'Approved',
      features: ['Convenient dosing', 'Fever prevention', 'Infection risk reduction', 'Well-established safety'],
      image: '🩺',
      productImage: '/api/placeholder/300/200?text=CytoGuard'
    },
    {
      id: 5,
      name: 'AngioBlock VEGF',
      category: 'targeted',
      type: 'Monoclonal Antibody',
      indication: 'Colorectal, Renal Cell Carcinoma',
      description: 'VEGF-targeted therapy that inhibits tumor angiogenesis and blood supply.',
      mechanism: 'VEGF-A inhibition',
      dosage: '5-10mg/kg IV every 2 weeks',
      status: 'Approved',
      features: ['Angiogenesis inhibition', 'Combination approved', 'Multiple indications', 'Established efficacy'],
      image: '🔄',
      productImage: '/api/placeholder/300/200?text=AngioBlock+VEGF'
    },
    {
      id: 6,
      name: 'PlatinoThera',
      category: 'chemo',
      type: 'Platinum-based Chemotherapy',
      indication: 'Ovarian, Testicular Cancer',
      description: 'Third-generation platinum compound with improved therapeutic index and reduced toxicity.',
      mechanism: 'DNA cross-linking',
      dosage: '75-100mg/m² IV',
      status: 'Approved',
      features: ['Broad spectrum', 'Synergistic combinations', 'Dose optimization', 'Safety monitoring'],
      image: '⚗️',
      productImage: '/api/placeholder/300/200?text=PlatinoThera'
    },
    {
      id: 7,
      name: 'ImmuneCheck CTLA-4',
      category: 'immuno',
      type: 'Monoclonal Antibody',
      indication: 'Melanoma',
      description: 'CTLA-4 immune checkpoint inhibitor that activates T-cell responses against tumors.',
      mechanism: 'CTLA-4 blockade',
      dosage: '3mg/kg IV every 3 weeks',
      status: 'Approved',
      features: ['Immune activation', 'Durable responses', 'Combination potential', 'Long-term survival benefit'],
      image: '🎯',
      productImage: '/api/placeholder/300/200?text=ImmuneCheck+CTLA-4'
    },
    {
      id: 8,
      name: 'NauseaControl',
      category: 'supportive',
      type: 'Antiemetic',
      indication: 'Chemotherapy-induced Nausea',
      description: 'NK1 receptor antagonist for prevention of acute and delayed chemotherapy-induced nausea.',
      mechanism: 'Substance P/NK1 antagonism',
      dosage: '125mg oral pre-chemotherapy',
      status: 'Approved',
      features: ['Broad coverage', 'Convenient dosing', 'Delayed phase protection', 'Well-tolerated'],
      image: '🌀',
      productImage: '/api/placeholder/300/200?text=NauseaControl'
    }
  ];

  const filteredProducts = activeFilter === 'all' 
    ? oncologyProducts 
    : oncologyProducts.filter(product => product.category === activeFilter);

  const productCategories: { [key: string]: { name: string; color: string } } = {
    targeted: { name: 'Targeted Therapy', color: '#0ea5e9' },
    immuno: { name: 'Immunotherapy', color: '#10b981' },
    chemo: { name: 'Chemotherapy', color: '#f59e0b' },
    supportive: { name: 'Supportive Care', color: '#8b5cf6' }
  };

  return (
    <div className="l3-container oncology-products-page">
      {/* Hero Section */}
    

      {/* Therapeutic Areas */}
   

      {/* Products Section */}
      <section className="products-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Our Syrups Portfolio</h2>
            <p className="l3-section-subtitle">
              Discover our range of innovation and supportive care medications.
            </p>
          </div>

          {/* Filter Tabs */}
     
          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.productImage} 
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="product-image-fallback" style={{ display: 'none' }}>
                    <span className="product-icon">{product.image}</span>
                  </div>
                </div>
                
                <div className="product-header">
                  <div className="product-basic-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-type">{product.type}</div>
                    <div 
                      className="product-category"
                      style={{ 
                        backgroundColor: `${productCategories[product.category].color}20`,
                        color: productCategories[product.category].color
                      }}
                    >
                      {productCategories[product.category].name}
                    </div>
                  </div>
                </div>

                <div className="product-indication">
                  <strong>Indication:</strong> {product.indication}
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Mechanism:</span>
                    <span className="detail-value">{product.mechanism}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dosage:</span>
                    <span className="detail-value">{product.dosage}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                <div className="product-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="product-actions">
                  <button className="l3-btn l3-btn-primary">Product Details</button>
                  <button className="l3-btn l3-btn-secondary">Prescribing Info</button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="no-products-message">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try selecting a different category or browse all products.</p>
            </div>
          )}
        </div>
      </section>

      {/* Pipeline Section */}
     

      {/* Medical Resources */}
      <section className="resources-section">
        <div className="l3-container-inner">
          <div className="section-header">
            <h2 className="l3-section-title">Medical Resources</h2>
            <p className="l3-section-subtitle">
              Comprehensive support and information for healthcare professionals.
            </p>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Clinical Data</h3>
              <p>Access published studies, clinical trial results, and scientific publications.</p>
              <button className="l3-btn l3-btn-primary">View Resources</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">🎓</div>
              <h3>Medical Education</h3>
              <p>Educational programs and materials for healthcare professional training.</p>
              <button className="l3-btn l3-btn-primary">Learn More</button>
            </div>
            <div className="resource-card">
              <div className="resource-icon">💻</div>
              <h3>Digital Tools</h3>
              <p>Interactive resources and treatment decision support tools.</p>
              <button className="l3-btn l3-btn-primary">Explore Tools</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="oncology-cta-section">
        <div className="l3-cta-background">
          <div className="l3-cta-gradient"></div>
        </div>
        <div className="l3-container-inner">
          <div className="oncology-cta-content">
            <h2 className="oncology-cta-title">Advancing Cancer Care Together</h2>
            <p className="oncology-cta-text">
              Partner with SPC Healthcare to access innovative oncology therapies 
              and comprehensive support for your patients.
            </p>
            <div className="oncology-cta-buttons">
              <button className="l3-btn l3-btn-primary l3-btn-large">Contact Medical Team</button>
              <button className="l3-btn l3-btn-secondary l3-btn-large">Request Product Information</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}