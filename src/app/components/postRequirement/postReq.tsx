import React, { useState } from 'react';
import './PostRequirement.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  productCategory: string;
  requirement: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  requirement?: string;
}

const PostRequirement: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    productCategory: '',
    requirement: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.requirement.trim()) {
      newErrors.requirement = 'Requirement description is required';
    } else if (formData.requirement.trim().length < 10) {
      newErrors.requirement = 'Please provide more details about your requirement';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        productCategory: '',
        requirement: ''
      });
      
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const productCategories = [
    { value: '', label: 'Select a category' },
    { value: 'pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'medical-devices', label: 'Medical Devices' },
    { value: 'surgical-equipment', label: 'Surgical Equipment' },
    { value: 'diagnostic-tools', label: 'Diagnostic Tools' },
    { value: 'consumables', label: 'Medical Consumables' },
    { value: 'healthcare-it', label: 'Healthcare IT Solutions' },
    { value: 'laboratory-equipment', label: 'Laboratory Equipment' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <section className="l3-requirement-section l3-section">
      <div className="l3-requirement-container">
        <div className="l3-requirement-grid">
          {/* Content Column */}
          <div className="l3-requirement-content">
            <div className="l3-requirement-badge">
              <span>Get Custom Solutions</span>
            </div>
            <h2 className="l3-requirement-title">Tell Us Your Healthcare Needs</h2>
            <p className="l3-requirement-description">
              At SPC Healthcare, we understand that every healthcare provider has unique requirements. 
              Share your specific needs with us, and our experts will provide tailored solutions.
            </p>
            
            <div className="l3-requirement-features">
              <div className="l3-requirement-feature">
                <div className="l3-requirement-feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="l3-requirement-feature-content">
                  <h4>Expert Consultation</h4>
                  <p>Our healthcare specialists will analyze your requirements and suggest the best products.</p>
                </div>
              </div>
              
              <div className="l3-requirement-feature">
                <div className="l3-requirement-feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="l3-requirement-feature-content">
                  <h4>Quick Response</h4>
                  <p>We'll get back to you within 24 hours with initial recommendations and pricing.</p>
                </div>
              </div>
              
              <div className="l3-requirement-feature">
                <div className="l3-requirement-feature-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <div className="l3-requirement-feature-content">
                  <h4>Customized Solutions</h4>
                  <p>We offer tailored packages and products to meet your specific healthcare challenges.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Column */}
          <div className="l3-requirement-form-container">
            {isSubmitted && (
              <div className="l3-form-success">
                <i className="fas fa-check-circle"></i>
                <h3>Thank You!</h3>
                <p>Your requirement has been submitted successfully. Our team will contact you within 24 hours.</p>
              </div>
            )}
            
            <form className="l3-requirement-form" onSubmit={handleSubmit}>
              <div className="l3-form-row">
                <div className="l3-form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="l3-error-text">{errors.name}</span>}
                </div>
                <div className="l3-form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="l3-error-text">{errors.email}</span>}
                </div>
              </div>
              
              <div className="l3-form-row">
                <div className="l3-form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="l3-error-text">{errors.phone}</span>}
                </div>
                <div className="l3-form-group">
                  <label htmlFor="organization">Organization/Hospital</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="l3-form-group">
                <label htmlFor="productCategory">Product Category Interest</label>
                <select
                  id="productCategory"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                >
                  {productCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="l3-form-group">
                <label htmlFor="requirement">Your Specific Requirement *</label>
                <textarea
                  id="requirement"
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Please describe your specific needs, quantity requirements, and any other details..."
                  className={errors.requirement ? 'error' : ''}
                  required
                ></textarea>
                {errors.requirement && <span className="l3-error-text">{errors.requirement}</span>}
              </div>
              
              <button 
                type="submit" 
                className="l3-form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Submitting...
                  </>
                ) : (
                  'Submit Your Requirement'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostRequirement;