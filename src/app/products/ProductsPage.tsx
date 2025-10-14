'use client';

import React, { useState, useEffect } from 'react';
import './ProductsPage.css';

interface Product {
  id: string;
  name: string;
  genericName: string;
  therapeuticArea: string;
  formulation: string;
  strength: string;
  packaging: string;
  imageUrl?: string;
  indications: string[];
  features: string[];
}

interface ProductFilters {
  therapeuticArea: string;
  searchQuery: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({
    therapeuticArea: '',
    searchQuery: ''
  });
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Cardiovax',
        genericName: 'Atorvastatin',
        therapeuticArea: 'Cardiology',
        formulation: 'Tablet',
        strength: '20mg',
        packaging: '10x10 Tablets',
        imageUrl: '/api/placeholder/300/200',
        indications: ['Hypertension', 'Cholesterol Management'],
        features: ['Once-daily dosing', 'Well-tolerated', 'Proven efficacy']
      },
      {
        id: '2',
        name: 'Neurocalm',
        genericName: 'Sertraline HCl',
        therapeuticArea: 'CNS',
        formulation: 'Tablet',
        strength: '50mg',
        packaging: '10x10 Tablets',
        imageUrl: '/api/placeholder/300/200',
        indications: ['Anxiety Disorders', 'Depression'],
        features: ['SSRI', 'Improves mood', 'Reduces anxiety']
      },
      {
        id: '3',
        name: 'Diabeton',
        genericName: 'Metformin',
        therapeuticArea: 'Diabetology',
        formulation: 'Tablet',
        strength: '500mg',
        packaging: '10x15 Tablets',
        imageUrl: '/api/placeholder/300/200',
        indications: ['Type 2 Diabetes'],
        features: ['Blood sugar control', 'Weight neutral', 'Cardioprotective']
      },
      {
        id: '4',
        name: 'OncoCare',
        genericName: 'Paclitaxel',
        therapeuticArea: 'Oncology',
        formulation: 'Injection',
        strength: '6mg/ml',
        packaging: '50ml Vial',
        imageUrl: '/api/placeholder/300/200',
        indications: ['Breast Cancer', 'Ovarian Cancer', 'Lung Cancer'],
        features: ['Targeted therapy', 'Proven efficacy', 'Well-tolerated']
      },
      {
        id: '5',
        name: 'OncoMax',
        genericName: 'Doxorubicin',
        therapeuticArea: 'Oncology',
        formulation: 'Injection',
        strength: '2mg/ml',
        packaging: '10ml Vial',
        imageUrl: '/api/placeholder/300/200',
        indications: ['Hodgkin\'s Lymphoma', 'Breast Cancer', 'Bladder Cancer'],
        features: ['Anthracycline', 'Broad spectrum', 'Established safety']
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  // Filter products based on criteria
  useEffect(() => {
    let filtered = products;

    if (filters.therapeuticArea) {
      filtered = filtered.filter(product => 
        product.therapeuticArea === filters.therapeuticArea
      );
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.genericName.toLowerCase().includes(query) ||
        product.indications.some(indication => 
          indication.toLowerCase().includes(query)
        )
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const therapeuticAreas = [
    'All',
    'Cardiology',
    'CNS',
    'Diabetology',
    'Oncology',
    'Gastroenterology',
    'Pain Management',
    'Anti-infectives',
    'Dermatology'
  ];

  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="l3-container-inner">
          <div className="products-hero-content">
            <h1 className="products-hero-title">
              Our <span className="l3-title-line">Products</span>
            </h1>
            <p className="products-hero-subtitle">
              Discover SPC Healthcare's comprehensive portfolio of 105+ 
              high-quality pharmaceutical products across various therapeutic areas.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="products-filters-section">
        <div className="l3-container-inner">
          <div className="filters-container">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search products by name, generic name, or indication..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-select">
              <select
                value={filters.therapeuticArea}
                onChange={(e) => handleFilterChange('therapeuticArea', e.target.value)}
                className="therapeutic-filter"
              >
                <option value="">All Therapeutic Areas</option>
                {therapeuticAreas.filter(area => area !== 'All').map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              <i className="fas fa-chevron-down select-arrow"></i>
            </div>
          </div>
          
          <div className="results-info">
            <p>
              Showing {filteredProducts.length} of {products.length} products
              {filters.therapeuticArea && ` in ${filters.therapeuticArea}`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="l3-container-inner">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <i className="fas fa-search no-products-icon"></i>
              <h3>No products found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="product-card">
      <div className="product-card-header">
        <div className="product-image">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <div className="product-image-placeholder">
              <i className="fas fa-pills"></i>
            </div>
          )}
        </div>
        <div className="product-badge">{product.therapeuticArea}</div>
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-generic">{product.genericName}</p>
        
        <div className="product-specs">
          <div className="spec-item">
            <i className="fas fa-flask"></i>
            <span>{product.strength}</span>
          </div>
          <div className="spec-item">
            <i className="fas fa-capsules"></i>
            <span>{product.formulation}</span>
          </div>
          <div className="spec-item">
            <i className="fas fa-box"></i>
            <span>{product.packaging}</span>
          </div>
        </div>

        <div className="product-indications">
          <h4>Indications:</h4>
          <ul>
            {product.indications.map((indication, index) => (
              <li key={index}>{indication}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="product-card-footer">
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(product)}
        >
          <i className="fas fa-info-circle"></i>
          View Details
        </button>
      </div>
    </div>
  );
};

// Product Modal Component
interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-image">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
              ) : (
                <div className="modal-image-placeholder">
                  <i className="fas fa-pills"></i>
                </div>
              )}
            </div>
            <div className="modal-title-section">
              <h2>{product.name}</h2>
              <p className="modal-generic">{product.genericName}</p>
              <span className="modal-therapeutic">{product.therapeuticArea}</span>
            </div>
          </div>

          <div className="modal-details">
            <div className="detail-section">
              <h3>Product Specifications</h3>
              <div className="specs-grid">
                <div className="spec-item">
                  <strong>Formulation:</strong>
                  <span>{product.formulation}</span>
                </div>
                <div className="spec-item">
                  <strong>Strength:</strong>
                  <span>{product.strength}</span>
                </div>
                <div className="spec-item">
                  <strong>Packaging:</strong>
                  <span>{product.packaging}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Indications</h3>
              <ul>
                {product.indications.map((indication, index) => (
                  <li key={index}>{indication}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-primary">
              <i className="fas fa-download"></i>
              Download SPC
            </button>
            <button className="btn-secondary">
              <i className="fas fa-file-medical"></i>
              Prescribing Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
