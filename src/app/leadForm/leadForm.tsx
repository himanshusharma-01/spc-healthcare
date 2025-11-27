import React, { useState, useEffect } from 'react';
import './leadForm.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  message?: string;
}

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: string;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, triggerElement }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Normalize to digits only and validate Indian numbers: optional 91 prefix + 10 digits starting 6-9
      const digitsOnly = formData.phone.replace(/\D/g, '');
      const indianPattern = /^(91)?[6-9]\d{9}$/;
      if (!indianPattern.test(digitsOnly)) {
        newErrors.phone = 'Please enter a valid Indian phone number (e.g. +91 98765 43210)';
      }
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          message: formData.message,
        triggerElement,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.success) {
        console.error('Lead form submission failed:', data);
        alert('Failed to send your details. Please try again.');
        return;
      }
      
      setIsSubmitted(true);
      
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      message: ''
    });
    setErrors({});
    setIsSubmitted(false);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const certificateBadges = ['WHO-GMP', 'ISO 9001:2015', 'GMP Certified', 'FDA Approved'];

  return (
    <div className="lead-form-overlay" onClick={handleBackdropClick}>
      <div className="lead-form-modal">
        <button 
          className="lead-form-close"
          onClick={handleClose}
          aria-label="Close form"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 6L6 18M6 6l12 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="lead-form-body">
          <div className="lead-form-visual">
            <div className="lead-form-visual-content">
              <span className="visual-pill">PCD Pharma Franchise</span>
              <h3>Pan India on Monopoly Basis</h3>
              <p>Delivering trusted specialty formulations backed by GMP certified facilities.</p>
              <div className="visual-highlight">
                <span>More than</span>
                <strong>100+</strong>
                <small>Products</small>
              </div>
              <div className="visual-footer">
                <span>A promise for</span>
                <div>Healthy Life</div>
              </div>
            </div>
            <div className="lead-form-certifications">
              {certificateBadges.map((badge) => (
                <span key={badge}>{badge}</span>
              ))}
            </div>
          </div>

          <div className="lead-form-right">
            <div className="lead-form-brand-row">
              <h2>SPC Healthcare</h2>
              <p>Share your details and we&apos;ll get in touch with tailored franchise opportunities.</p>
            </div>

            {isSubmitted ? (
              <div className="lead-form-success">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="32" fill="#00A676" fillOpacity="0.1"/>
                    <path 
                      d="M44 24L28 40L20 32" 
                      stroke="#00A676" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your message has been received. Our team will contact you shortly.</p>
                <button 
                  className="success-close-btn"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="lead-form-fields" onSubmit={handleSubmit}>
                <div className="lead-form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="lead-form-grid">
                  <div className="form-group">
                    <label htmlFor="phone">Phone No. *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'input-error' : ''}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={errors.city ? 'input-error' : ''}
                      placeholder="Enter your city"
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Tell us about your requirements..."
                    rows={3}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className={`lead-form-submit ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;